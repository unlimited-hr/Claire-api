// judgement is number ; -2, -1, 0, 1, 2
function judge(item) {
	const IAQ_JUDGEMENTS = {
		"co2": {"optimal": 400, "optimal_diff": 50, "min": 200, "max": 750},
		"tvoc": {"optimal": 100, "optimal_diff": 100, "min": 0, "max": 500},
		"humidity": {"optimal": 40, "optimal_diff": 5, "min": 30, "max": 50},
		"temperature": {"optimal": 20, "optimal_diff": 2, "min": 16, "max": 24}
	}

	let judgement = {};

	for (k in IAQ_JUDGEMENTS) {
		let j = IAQ_JUDGEMENTS[k];
		let v = item[k];
		let score = 0;
		let diff = v - j.optimal;

		if (v > j.max || v < j.min) score = 2 * Math.sign(diff);
		else if (Math.abs(v - j.optimal) > j.optimal_diff) score = 1 * Math.sign(diff);

		judgement[k] = score;
	}

	return judgement;
}

module.exports = judge;
