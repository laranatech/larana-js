const { Schemer, rules, common } = require('@laranatech/schemer')

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
			rules.allowlist(['start', 'end', 'left', 'right', 'center']),
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

const styleSchemer = new Schemer({
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
})

class Style {
	alignment = 'start'
	direction = 'row'
	size = 1
	minWidth = null
	maxWidth = null
	minHeight = null
	maxHeight = null
	fg = null
	bg = null
	padding = 0
	gap = 0
	radius = 0

	fontSize = 16
	fontWeight = '400'
	fontFamily = 'monospace'
	textAlign = 'center'
	textBaseline = 'middle'

	borderWidth = 1
	borderColor = null
	borderCap = 'butt'

	constructor(style) {
		styleSchemer.validate(style)

		const {
			alignment,
			direction,
			size,
			minWidth,
			maxWidth,
			minHeight,
			maxHeight,
			fg,
			bg,
			padding,
			gap,
			borderWidth,
			borderColor,
			borderCap,
			radius,
			fontSize,
			fontWeight,
			fontFamily,
			textAlign,
			textBaseline,
		} = style

		if (size !== undefined) {
			this.size = size
		}
		if (minWidth !== undefined) {
			this.minWidth = minWidth
		}
		if (maxWidth !== undefined) {
			this.maxWidth = maxWidth
		}
		if (minHeight !== undefined) {
			this.minHeight = minHeight
		}
		if (maxHeight !== undefined) {
			this.maxHeight = maxHeight
		}

		if (gap !== undefined) {
			this.gap = gap
		}
		if (padding !== undefined) {
			this.padding = padding
		}
		if (radius !== undefined) {
			this.radius = radius
		}
		if (bg !== undefined) {
			this.bg = bg
		}
		if (direction) {
			this.direction = direction
		}
		if (alignment) {
			this.alignment = alignment
		}

		if (fg !== undefined) {
			this.fg = fg
		}
		if (fontFamily !== undefined) {
			this.fontFamily = fontFamily
		}
		if (fontSize !== undefined) {
			this.fontSize = fontSize
		}
		if (fontWeight !== undefined) {
			this.fontWeight = fontWeight
		}
		if (textAlign !== undefined) {
			this.textAlign = textAlign
		}
		if (textBaseline !== undefined) {
			this.textBaseline = textBaseline
		}

		if (borderWidth !== undefined) {
			this.borderWidth = borderWidth
		}
		if (borderColor !== undefined) {
			this.borderColor = borderColor
		}
		if (borderCap !== undefined) {
			this.borderCap = borderCap
		}
	}

	get font() {
		const fw = fontWeights[this.fontWeight] ?? this.fontWeight
		return `${this.fontSize}px ${fw} ${this.fontFamily}`
	}

	json() {
		return {
			size: this.size ?? undefined,
			minWidth: this.minWidth ?? undefined,
			maxWidth: this.maxWidth ?? undefined,
			minHeight: this.minHeight ?? undefined,
			maxHeight: this.maxHeight ?? undefined,
			alignment: this.alignment ?? undefined,
			direction: this.direction ?? undefined,
			fg: this.fg ?? undefined,
			bg: this.bg ?? undefined,
			padding: this.padding,
			gap: this.gap,
			borderWidth: this.borderWidth,
			borderColor: this.borderColor,
			borderCap: this.borderCap,
			radius: this.radius,
			fontSize: this.fontSize,
			fontWeight: this.fontWeight,
			fontFamily: this.fontFamily,
			textAlign: this.textAlign,
			textBaseline: this.textBaseline,
		}
	}

	copy() {
		return new Style(this.json())
	}
}

module.exports = { Style }
