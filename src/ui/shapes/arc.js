const { Shape } = require('./shape.js')

class Arc extends Shape{
	name = 'arc'
	x = 0
	y = 0
	radius = 0
	start = 0
	end = 0

	constructor(options) {
		super(options)
		const {
			x,
			y,
			radius,
			start = 0,
			end = 2 * Math.PI,
		} = options

		this.x = x
		this.y = y
		this.radius = radius
		this.start = start
		this.end = end
	}

	command() {
		return {
			x: this.x,
			y: this.y,
			radius: this.radius,
			startAngle: this.start,
			endAngle: this.end,
			...this.style,
		}
	}
}

const arc = (options) => {
	return new Arc(options)
}

module.exports = {
	Arc,
	arc,
}
