const { BaseComponent } = require('./base')
const { arc } = require('../shapes/arc.js')
const { figure } = require('./figure.js')

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

	tick() {
		const { getModel, setModel } = this.useModel()

		setTimeout(() => {
			const value = getModel()
			setModel(value + this.step)
		}, this.delay)
	}

	root() {
		const { borderColor, borderCap, borderWidth } = this.computeStyle()
		const { modelValue } = this.useModel()

		this.tick()

		return figure({
			template: (fig, queue) => {
				const { x, y, w, h } = fig.computeDimensions()
				arc({
					x: x + w * 0.5,
					y: y + h * 0.5,
					radius: this.computeMaxRadius(),
					start: modelValue,
					end: modelValue + this.length,
					borderColor,
					borderCap,
					borderWidth,
				}).to(queue)
			},
		})
	}
}

const throbber = (options) => {
	return new ThrobberComponent(options)
}

module.exports = { ThrobberComponent, throbber }
