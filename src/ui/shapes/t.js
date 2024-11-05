const { Shape } = require('./shape.js')

class T extends Shape {
	name = 'text'

	text = ''

	x = 0
	y = 0
	w = 0
	h = 0

	constructor(options) {
		super(options)

		const { x, y, w, h, text } = options

		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.text = text
	}

	clear(text) {
		return String(text)
			.replaceAll('"', '\\"')
			.replaceAll("'", "\\'")
	}

	command() {
		return {
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h,
			font: this.style.font,
			text: this.clear(this.text),
			align: this.style.textAlign,
			baseline: this.style.textBaseline,
			fg: this.rawOptions.fg ?? '#000',
		}
	}
}

const t = (options) => {
	return new T(options)
}

module.exports = { T, t }
