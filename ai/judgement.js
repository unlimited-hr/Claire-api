
export function judge(item) {
	const IAQ_JUDGEMENTS = {
		"CO2": [-1, 0, 250, 2000],
		"FRM": [-1, 0, 100, 10000],
		"RH": [10, 35, 45, 60]
	}

	let total_quality = 0;

	for (k in IAQ_JUDGEMENTS) {
		j = IAQ_JUDGEMENTS[k];
		
	}
}


// def judgeAirQuality(item, judgements):
// 	totalQuality = 0
// 	for k in judgements.keys():
// 		j = judgements[k]
// 		try:
// 			v = float(item[k])
// 		except:
// 			continue
// 		vRange = -1
// 		kScore = 0
// 		for i in range(len(j)):
// 			if v > j[i]:
// 				vRange = i
// 		if vRange <= -1:
// 			kScore = -1
// 		elif vRange == 1:
// 			kScore = 0
// 		elif vRange >= 3:
// 			kScore = 1
// 		elif vRange == 0:
// 			totalRange = j[1] - j[0]
// 			relativeValue = v - j[0]
// 			kScore = -relativeValue / totalRange
// 		elif vRange == 2:
// 			totalRange = j[2] - j[3]
// 			relativeValue = v - j[2]
// 			kScore = relativeValue / totalRange
// 		item[F"{k}_score"] = kScore

// 		totalQuality += abs(kScore)
// 	item["total_score"] = totalQuality / len(judgements.keys())