function addRelativeValues(start, end, columns = ['co2', 'tvoc', 'humidity', 'temperature']) {
	for (c of columns) {
		end[`rel_${c}`] = end[c] - start[c];
	}
}

module.exports = addRelativeValues

/*
def addRelativeValues(set, columns):
	newset = []
	lastItem = False
	for i in range(len(set)):
		item = set[i]
		if not lastItem == False:
			for key in columns:
				try:
					rKey = F"rel_{key}"
					rValue = float(item[key]) - float(lastItem[key])
					item[rKey] = str(rValue)
				except:
					lastItem = item
					continue
			newset.append(item)
		lastItem = item
	return newset
*/