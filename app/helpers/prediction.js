const DataHandler = require("../../ai/datahandler.js")
const fs = require('fs');
const addRelativeValues = require("../../ai/relative.js");
const model = JSON.parse(fs.readFileSync("ai/model.json"))

let data = new DataHandler()
data.uploadModel(model)

// assumes data starts an hour before and ends now
function predict(data) {
	let current = data[data.length - 1].dataValues
	let start = data[0].dataValues

	addRelativeValues(start, current)

	
	console.log(start, current)



	return data
}

module.exports = predict
