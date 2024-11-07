const { point } = require('./point.js')
// const { Schemer } = require('@laranatech/schemer')

// const pointSchemer = new Schemer({ x: 'number', y: 'number' })

class ArcPoint {
	name = 'arc-point'

	p1 = point({ x: 0, y: 0 })
	p2 = point({ x: 0, y: 0 })
	radius = 0

	/**
	 * @param {{ x: number; y: number }} p1
	 * @param {{ x: number; y: number }} p2
	 * @param {number} radius
	 */
	constructor(p1, p2, radius) {
		// pointSchemer.validate(p)
		this.p1 = p1
		this.p2 = p2
		this.radius = radius
	}
}

const arcPoint = (...args) => {
	return new ArcPoint(...args)
}

module.exports = { ArcPoint, arcPoint }
