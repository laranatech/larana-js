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
			if (p.name === 'point' || p.name === 'move-point') {
				const { x, y, name } = p
				return { x, y, name }
			}

			if (p.name === 'arc-point') {
				const { x, y, radius, name, start, end } = p
				return { x, y, radius, name, start, end }
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