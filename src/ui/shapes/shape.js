const { Schemer, rules } = require('@laranatech/schemer')
const { Point } = require('./point.js')

const shapeSchemer = new Schemer({
	points: {
		type: Point,
	},
	style: {
		type: 'any',
		required: false,
	},
})

class Shape {
	points = []

	constructor(l) {
		lineSchemer.validate(l)
		const { points, style } = l
	}
}

module.exports = { Shape }
