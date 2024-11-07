const { Shape } = require('./shape.js')

class Line extends Shape {
	name = 'line'

	points = []

	constructor(options) {
		super(options)

		this.points = options.points
	}

	command() {
		const points = this.points.map((p) => {
			if (p.name === 'point') {
				const { x, y, name } = p
				return { x, y, name }
			}

			if (p.name === 'arc-point') {
				const { p1, p2, radius, name } = p
				return { p1, p2, radius, name }
			}
		})

		return {
			points,
			...this.style,
		}
	}
}

const line = (options) => {
	return new Line(options)
}

module.exports = { Line, line }