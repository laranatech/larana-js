const { BaseComponent, arc } = require('larana-js')

class CircleComponent extends BaseComponent {
	radius = 0

	defaultStyle = {
		borderWidth: 1,
	}

	onAnimate = () => {}

	constructor(options) {
		super(options)

		const { onAnimate = () => {}, radius } = options

		this.radius = radius
		this.onAnimate = onAnimate

		this.onAnimate()
	}

	render(queue) {
		const { x, y, w, h } = this.computeDimensions()

		const { bg, borderColor, borderWidth } = this.computeStyle()

		const { state } = this.useState()

		arc({
			x: x + w / 2,
			y: y + h / 2,
			radius: state.radius,
			bg,
			borderColor,
			borderWidth,
		}).to(queue)

		return queue
	}
}

module.exports = { CircleComponent }
