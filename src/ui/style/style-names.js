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

const initDefaultStyleNames = () => {
	const names = {
		row: { direction: 'row' },
		column: { direction: 'column' },
	}

	const items = [1, 2, 3, 4, 5]

	items.forEach(((item) => {
		names[`gap_${item}`] = { gap: `var:u${item}`}
		names[`p_${item}`] = { padding: `var:u${item}`}
		names[`size_${item}`] = { size: item }
	}))

	styleNames(names)
}

module.exports = {
	styleName,
	styleNames,
	initDefaultStyleNames,
}
