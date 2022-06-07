const DataHandler = require("../../ai/datahandler.js")
const fs = require('fs');
const addRelativeValues = require("../../ai/relative.js");
const judge = require("../../ai/judgement.js");
const model = JSON.parse(fs.readFileSync("ai/model.json"))

const IAQ_KEYS = ["temperature", "humidity", "tvoc", "co2"];

const filter_iaq = (data, prefix = "") => {
	let new_data = {};
	for (let key in data) {
		if (IAQ_KEYS.indexOf(key) != -1) new_data[prefix + key] = data[key];
	}
	return new_data
}

const TIPS = JSON.parse(fs.readFileSync('ai/tips.json', 'utf8'));


let dataHandler = new DataHandler();
// data.uploadModel(model)

const BASE_CONFIG = {
	trainingSet: [],
	categoryAttr: "",
	ignoredAttributes: ["next_temperature", "next_humidity", "next_tvoc", "next_co2"]
}

const VALID_FACTORS = ["air_conditioning"];

let models = {};

function train(data, dist) {
	let l = Math.floor(Object.values(data).length / dist);
	let trainData = [];

	for (let i = 0; i < l - 2; i++) {
		let prev = filter_iaq(data[i * dist].dataValues, "prev_");
		let current = filter_iaq(data[(i + 1) * dist].dataValues);
		let next = data[(i + 2) * dist].dataValues;
		next = filter_iaq(judge(next), "next_");
		let set = {...prev, ...current, ...next};
		trainData.push(set);
	}

	for (let k of BASE_CONFIG.ignoredAttributes) {
		trainData[k] = {}
		dataHandler.config = {trainingSet: trainData, categoryAttr: k, 
			ignoredAttributes: BASE_CONFIG.ignoredAttributes.filter(key => key != k)};
		dataHandler.train();
		models[k.slice(5)] = dataHandler.dt.root;
	}

	return models
}

function sortTips(values) {
	let new_tips = JSON.parse(JSON.stringify(TIPS));

	for (let tip of new_tips) {
		let score = 0;
		const mod = 1;
		for (let pos of tip.positive) {
			score += values[pos] * mod;
		}
		for (let pos of tip.negative) {
			score -= values[pos] * mod;
		}
		for (let req of tip.requirements) {
			if (!(req in VALID_FACTORS)) score = -10;
		}
		tip.score = score;
	}

	new_tips.sort((tipa, tipb) => tipb.score - tipa.score);

	return new_tips[0].tip;
}

// assumes data starts {dist} before and ends now
function predict(res, data, dist) {
	if (data.length < 2) res.status(500).send("No recent iaq-data available for this user. Unable to form a prediction.");
	let current = data[data.length - 1].dataValues;
	let start = data[data.length - dist].dataValues;

	let predValues = {};
	const predict_data = {...filter_iaq(current), ...filter_iaq(start, "prev_")};

	for (k in models) {
		let current_config = {trainingSet: predict_data, categoryAttr: k, 
			ignoredAttributes: BASE_CONFIG.ignoredAttributes};
		dataHandler.uploadModel(models[k], current_config);
		predValues[k] = dataHandler.predictObj(predict_data)
	}

	return sortTips(predValues);
}

module.exports = {predict, train}
