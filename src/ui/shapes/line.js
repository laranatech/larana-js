const { Shape } = require('./shape.js')

class Line extends Shape {
	name = 'line'

	points = []

	constructor(options) {
		super(options)

		this.points = options.points
	}

	command() {
		
		return {
			points: this.points,
			...this.style,
		}
	}
}

const line = (options) => {
	return new Line(options)
}

module.exports = { Line, line }