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
	}

	command() {
		const { textAlign, textBaseline } = this.style

		let x = this.x
		let y = this.y

		if (textAlign === 'center') {
			x = x + this.w * 0.5
		}

		if (textBaseline === 'middle') {
			y = y + this.h * 0.5
		}

		return {
			x,
			y,
			w: this.w,
			h: this.h,
			font: this.style.font,
			text: this.clear(this.text),
			align: this.style.textAlign,
			baseline: this.style.textBaseline,
			fg: this.rawOptions.fg ?? '#000',
		}
	}

	to(queue) {
		queue.add(this.name, this.command())

		// if (this.style.striked) {
		// 	const { textAlign, textBaseline } = this.style

		// 	let x = this.x
		// 	let y = this.y

		// 	if (textAlign === 'center') {
		// 		x = x + this.w * 0.5
		// 	}

		// 	if (textBaseline === 'middle') {
		// 		y = y + this.h * 0.5
		// 	}

		// 	x -= 230

		// 	line({
		// 		points: [
		// 			point({ x, y }),
		// 			point({ x: x + 460, y }),
		// 		],
		// 		borderColor: this.style.fg,
		// 		fg: this.style.fg,
		// 		bg: this.style.fg,
		// 	}).to(queue)
		// }
	}
}

const t = (options) => {
	return new T(options)
}

module.exports = { T, t }
