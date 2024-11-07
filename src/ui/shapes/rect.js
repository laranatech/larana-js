const { Shape } = require('./shape.js')

class Rect extends Shape {
	name = 'rect'

	x = 0
	y = 0
	w = 0
	h = 0
	radius = 0

	constructor(options) {
		super(options)
		const { x, y, w, h, radius } = options

		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.radius = radius
	}

	command() {
		return {
			...this.style,
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h,
			radius: this.radius,
		}
	}
}

const rect = (options) => {
	return new Rect(options)
}

module.exports = { Rect, rect }
