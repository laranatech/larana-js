const styleNamesStorage = new Map()

const styleName = (name, value = undefined) => {
	if (value) {
		styleNamesStorage.set(name, value)
		return value
	}

	const s = styleNamesStorage.get(name)

	if (!s) {
		throw new Error(`StyleName not found: ${name}`)
	}

	return s
}

const styleNames = (values) => {
	Object.keys(values).forEach((key) => {
		styleName(key, values[key])
	})
}

module.exports = {
	styleName,
	styleNames,
}
