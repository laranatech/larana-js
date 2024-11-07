const { Schemer } = require('@laranatech/schemer')

const pointSchemer = new Schemer({ x: 'number', y: 'number' })

class Point {
	name = 'point'

	x = 0
	y = 0

	/**
	 * @param {{ x: number; y: number }} p
	 */
	constructor(p) {
		pointSchemer.validate(p)
		const { x, y } = p

		this.x = x
		this.y = y
	}

	collide({ x, y, w, h }) {
		if (this.x < x || this.x > x + w) {
			return false
		}
		if (this.y < y || this.y > y + h) {
			return false
		}
		return true
	}
}

const point = (options) => {
	return new Point(options)
}

module.exports = { Point, point }
