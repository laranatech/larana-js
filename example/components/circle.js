const { BaseComponent } = require('larana-js')

class CircleComponent extends BaseComponent {
	radius = 0

	onAnimate = () => {}

	constructor(data) {
		super(data)

		const { onAnimate = () => {}, radius } = data

		this.radius = radius
		this.onAnimate = onAnimate

		this.onAnimate()
	}

	render(queue, data) {
		const { x, y, w, h } = this.computeDimensions(data)

		const cs = this.computeStyle(data)

		queue.add('arc', {
			x: x + w / 2,
			y: y + h / 2,
			radius: data.state.radius,
			fillStyle: cs.bg,
			strokeStyle: cs.borderColor,
		})

		return queue
	}
}

module.exports = { CircleComponent }
