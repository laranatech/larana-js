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
	const text = {
		fontWeight: 'var:fontWeight',
		fg: 'var:fg',
		fontSize: 'var:fontSize',
		fontFamily: 'var:fontFamily',
	}

	const names = {
		row: { direction: 'row' },
		column: { direction: 'column' },
		hug: { size: 'hug' },
		radius: { radius: 'var:radius' },
		card: {
			radius: 'var:radius',
			bg: 'var:componentBg',
			padding: 'var:u2',
		},
		body: { bg: 'var:bg' },
		text,
		h0: {
			...text,
			fontSize: 'var:h0FontSize',
		},
		h1: {
			...text,
			fontSize: 'var:h1FontSize',
		},
		h2: {
			...text,
			fontSize: 'var:h2FontSize',
		},
		h3: {
			...text,
			fontSize: 'var:h3FontSize',
		},
		link: {
			...text,
			fg: 'var:accent',
		},
	}

	const items = [1, 2, 3, 4, 5]

	items.forEach(((item) => {
		names[`gap_${item}`] = { gap: `var:u${item}`}
		names[`p_${item}`] = { padding: `var:u${item}`}
		names[`size_${item}`] = { size: item }
	}))

	const textAlignments = ['start', 'end', 'center']
	const textBaselines = [
		'top',
		'hanging',
		'middle',
		'alphabetic',
		'ideographic',
		'bottom',
	]

	textAlignments.forEach((ta) => {
		names[`ta_${ta}`] = { textAlign: ta }
	})

	textBaselines.forEach((tb) => {
		names[`tb_${tb}`] = { textBaseline: tb }
	})

	styleNames(names)
}

module.exports = {
	styleName,
	styleNames,
	initDefaultStyleNames,
}
