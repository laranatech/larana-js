const { BaseComponent } = require('./base-component.js')

class ThrobberComponent extends BaseComponent {
	delay = 50
	step = 0.25
	length = Math.PI * 0.5

	defaultStyle = {
		borderWidth: 15,
		borderCap: 'round',
		fg: 'var:fg',
	}

	constructor(data) {
		super(data)

		const {
			delay = 50,
			step = 0.25,
			length = Math.PI * 0.5,
		} = data

		this.delay = delay
		this.step = step
		this.length = length
	}

	onRender(queue, data) {
		setTimeout(() => {
			const value = this.getModelValue(data)
			this.updateModelValue(data, value + this.step)
		}, this.delay)
	}

	render(queue, data) {
		this.onRender(queue, data)

		const { x, y, w, h } = this.computeDimensions(data)
		const style = this.computeStyle(data)

		const value = this.getModelValue(data)

		queue.add('arc', {
			x: x + w * 0.5,
			y: y + h * 0.5,
			radius: this.computeMaxRadius({ w, h }),
			startAngle: value,
			endAngle: value + this.length,
			strokeStyle: style.fg,
			lineWidth: style.borderWidth,
			lineCap: style.borderCap,
		})

		return queue
	}
}

module.exports = { ThrobberComponent }
