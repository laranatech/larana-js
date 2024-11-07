const { Line, line } = require('./line.js')
const { point } = require('./point.js')

class Arrow extends Line {
	name = 'arrow'

	arrowLength = 8

	constructor(options) {
		super(options)

		const { arrowLength = 8 } = options

		this.arrowLength = arrowLength
	}

	arrowHead({ dX, dY, tip }) {
		let first = point({ x: tip.x, y: tip.y })
		let last = point({ x: tip.x, y: tip.y })

		if (dX === 0) {
			const d = dY < 0 ? 1 : -1
			first = point({
				x: tip.x + this.arrowLength,
				y: tip.y + this.arrowLength * d,
			})
			last = point({
				x: tip.x - this.arrowLength,
				y: tip.y + this.arrowLength * d,
			})
		} else if (dY === 0) {
			const d = dX < 0 ? 1 : -1
			first = point({
				x: tip.x + this.arrowLength * d,
				y: tip.y + this.arrowLength,
			})
			last = point({
				x: tip.x + this.arrowLength * d,
				y: tip.y - this.arrowLength,
			})
		}

		return [first, tip, last]
	}

	to(queue) {
		line({
			...this.rawOptions,
			fg: null,
			bg: null,
		}).to(queue)

		const prevPoint = this.points[this.points.length - 2]
		const lastPoint = this.points[this.points.length - 1]

		const dX = lastPoint.x - prevPoint.x
		const dY = lastPoint.y - prevPoint.y

		line({
			...this.rawOptions,
			points: this.arrowHead({ dX, dY, tip: lastPoint }),
		}).to(queue)
	}
}

const arrow = (options) => {
	return new Arrow(options)
}

module.exports = { Arrow, arrow }