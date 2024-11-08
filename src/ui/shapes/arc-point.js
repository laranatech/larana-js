// const { Schemer } = require('@laranatech/schemer')

// const pointSchemer = new Schemer({ x: 'number', y: 'number' })

class ArcPoint {
	name = 'arc-point'

	x = 0
	y = 0
	radius = 0
	start = 0
	end = 0

	/**
	 * @param {{ x: number; y: number, start: number, end: number, radius: number }} options
	 */
	constructor(options) {
		// pointSchemer.validate(p)
		const { x, y, radius, start, end } = options
		this.x = x
		this.y = y
		this.radius = radius
		this.start = start
		this.end = end
	}
}

/**
 * @param {{ x: number; y: number, start: number, end: number, radius: number }} options
 */
const arcPoint = (options) => {
	return new ArcPoint(options)
}

module.exports = { ArcPoint, arcPoint }
