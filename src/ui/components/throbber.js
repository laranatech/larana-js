const { arc } = require('../shapes/arc.js')
const { BaseComponent } = require('./base')

class ThrobberComponent extends BaseComponent {
	delay = 50
	step = 0.25
	length = Math.PI * 0.5

	defaultStyle = {
		borderWidth: 15,
		borderCap: 'round',
		borderColor: 'var:fg',
	}

	constructor(options) {
		super(options)

		const {
			delay = 50,
			step = 0.25,
			length = Math.PI * 0.5,
		} = options

		this.delay = delay
		this.step = step
		this.length = length
	}

	onRender(queue) {
		const { getModel, setModel } = this.useModel()

		setTimeout(() => {
			const value = getModel()
			setModel(value + this.step)
		}, this.delay)
	}

	render(queue) {
		this.onRender(queue)

		const { x, y, w, h } = this.computeDimensions()
		const { borderColor, borderCap, borderWidth } = this.computeStyle()

		const { modelValue } = this.useModel()

		arc({
			x: x + w * 0.5,
			y: y + h * 0.5,
			radius: this.computeMaxRadius({ w, h }),
			start: modelValue,
			end: modelValue + this.length,
			borderColor,
			borderCap,
			borderWidth,
		}).to(queue)

		return queue
	}
}

const throbber = (options) => {
	return new ThrobberComponent(options)
}

module.exports = { ThrobberComponent, throbber }
