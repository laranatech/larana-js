const { CheckboxComponent } = require('./checkbox.js')
const { rect, arc } = require('../../shapes')
const { figure } = require('../figure.js')
const { useStyleVar } = require('../../style/style-variables.js')

class ToggleComponent extends CheckboxComponent {
	constructor(options) {
		super(options)

		this.defaultStyle = {
			...this.defaultStyle,
			width: useStyleVar('componentHeight')() * 2,
		}
	}

	root() {
		const style = this.computeStyle()
		const { modelValue } = this.useModel()

		return figure({
			template: (fig, queue) => {
				const { x, y, w, h } = fig.computeDimensions()
				const radius = fig.computeMaxRadius()
				rect({
					x, y, w, h,
					...style,
					bg: modelValue ? style.fg : style.bg,
					radius,
				}).to(queue)

				arc({
					y: y + h / 2,
					x: modelValue ? x + w * 0.75 : x + w * 0.25,
					radius: radius * 0.8,
					bg: '#fff',
				}).to(queue)
			},
		})
	}
}

const toggle = (options) => {
	return new ToggleComponent(options)
}

module.exports = { ToggleComponent, toggle }
