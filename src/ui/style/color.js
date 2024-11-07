const { Schemer, rules, validate } = require('@laranatech/schemer')

const channelScheme = {
	type: 'int',
	rules: [
		rules.positive(),
		rules.max(255),
	],
}

const rgbScheme = {
	r: channelScheme,
	g: channelScheme,
	b: channelScheme,
}

const rgbSchemer = new Schemer(rgbScheme)

const rgbaScheme = {
	...rgbScheme,
	a: channelScheme,
}

const rgbaSchemer = new Schemer(rgbaScheme)

const hexSheme = {
	type: 'string',
	rules: [
		rules.regexp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/),
	],
}

const rgb = (r, g, b) => {
	rgbSchemer.validate({ r, g, b })

	return `rgb(${r}, ${g}, ${b})`
}

const rgba = (r, g, b, a) => {
	rgbaSchemer.validate({ r, g, b, a })

	return `rgba(${r}, ${g}, ${b}, ${a})`
}

const hex = (value) => {
	validate(value, hexSheme)

	return value
}

module.exports = {
	rgb,
	rgba,
	hex,
}
