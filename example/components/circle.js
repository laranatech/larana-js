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

	render(queue, state) {
		const { x, y, w, h } = this.getDimensions(state)

		queue.add('arc', {
			x: x + w / 2,
			y: y + h / 2,
			radius: state.state.radius,
			fillStyle: '#3caa3c',
		})

		return queue
	}
}

module.exports = { CircleComponent }
