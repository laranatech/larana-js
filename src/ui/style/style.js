const { Schemer, rules, common } = require('@laranatech/schemer')
const { styleName } = require('./style-names')
const { useStyleVar } = require('./style-variables')
const { mixStyles } = require('./mix')

const fontWeights = {
	'100': 'thin',
	'200': 'extra light',
	'300': 'light',
	'400': 'regular',
	'500': 'medium',
	'600': 'semi-bold',
	'700': 'bold',
	'800': 'extra bold',
	'900': 'black',
	'950': 'extra black',
}

const textScheme = {
	fg: 'any',
	fontWeight: {
		type: 'string',
		rules: [
			rules.allowlist([
				...Object.keys(fontWeights),
				...Object.keys(fontWeights).map((k) => String(k)),
				...Object.values(fontWeights),
			]),
		],
	},
	fontFamily: {
		type: 'string',
		required: false,
	},
	fontSize: {
		...common.positiveInt,
		required: false,
	},
	textAlign: {
		type: 'string',
		required: false,
		rules: [
			rules.allowlist(['start', 'end', 'center']),
		],
	},
	textBaseline: {
		type: 'string',
		required: false,
		rules: [
			rules.allowlist([
				'top',
				'hanging',
				'middle',
				'alphabetic',
				'ideographic',
				'bottom',
			]),
		],
	},
	minWidth: {
		...common.positiveInt,
		required: false,
		nullable: true,
	},
	maxWidth: {
		...common.positiveInt,
		required: false,
		nullable: true,
	},
	minHeight: {
		...common.positiveInt,
		required: false,
		nullable: true,
	},
	maxHeight: {
		...common.positiveInt,
		required: false,
		nullable: true,
	},
}

const borderScheme = {
	borderCap: {
		type: 'string',
		required: false,
		rules: [
			rules.allowlist(['butt', 'round', 'square']),
		],
	},
	borderColor: 'any',
	borderWidth: {
		...common.positiveInt,
		required: false,
	},
}

const styleScheme = {
	gap: {
		...common.positiveInt,
		required: false,
	},
	padding: {
		...common.positiveInt,
		required: false,
	},
	radius: {
		...common.positiveInt,
		required: false,
	},
	size: {
		...common.positiveNumber,
		required: false,
	},
	alignment: {
		type: 'string',
		required: false,
		rules: [
			rules.allowlist(['start', 'end', 'center']),
		],
	},
	direction: {
		type: 'string',
		required: false,
		rules: [
			rules.allowlist(['row', 'column']),
		],
	},
	bg: 'any',
	...borderScheme,
	...textScheme,
}

const styleSchemer = new Schemer(styleScheme)

class Style {
	alignment = 'start'
	direction = 'row'

	size = null
	width = null
	minWidth = null
	maxWidth = null
	height = null
	minHeight = null
	maxHeight = null
	aspectRatio = null

	fg = null
	bg = null
	padding = 0
	gap = 0
	radius = 0

	fontSize = 16
	fontWeight = '400'
	fontFamily = 'my-mono'
	textAlign = 'center'
	textBaseline = 'middle'

	borderWidth = 1
	borderColor = null
	borderCap = 'butt'

	constructor(style) {
		// styleSchemer.validate(style)

		Object.keys(style).forEach((key) => {
			const v = style[key]

			if (v !== undefined) {
				this[key] = v
			}
		})
	}

	static compute(value, request, session) {
		if (!value) {
			throw new Error(`Cannot compute style: ${value}`)
		}
		if (Array.isArray(value)) {
			const m = mixStyles(value.map((v) => Style.compute(v, request, session)))
			return m
		}
		if (typeof value === 'object') {
			return Style._resolveVars(value, request, session)
		}
		if (typeof value === 'string') {
			const cs = Style._resolveVars(styleName(value), request, session)
			return cs
		}
		throw new Error(`Invalid type: [${typeof value}] ${value}`)
	}

	static _resolveVars(value, request, session) {
		Object.keys(value).forEach((key) => {
			const v = value[key]
			if (typeof v !== 'string' || !v.startsWith('var:')) {
				return
			}
			value[key] = useStyleVar(v.replace('var:', ''))(session.storage.theme)
		})

		return value
	}

	get font() {
		const fw = fontWeights[this.fontWeight] ?? this.fontWeight
		return `${this.fontSize}px ${fw} ${this.fontFamily}`
	}

	json() {
		const result = {}

		Object.keys(styleScheme).forEach((key) => {
			const v = this[key]

			if (v !== undefined) {
				result[key] = v
			}
		})

		return result
	}

	copy() {
		return new Style(this.json())
	}
}

module.exports = { Style }
