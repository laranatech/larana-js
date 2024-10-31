const { BaseComponent } = require('../base-component.js')
const { click } = require('../../events/click.js')
const { rect, line, point } = require('../../shapes')

class CheckboxComponent extends BaseComponent {
	value = false

	onChange = (value) => {}

	defaultStyle = {
		bg: 'var:componentBg',
		fg: 'var:accent',
		radius: 'var:radius',
		borderWidth: 2,
		borderCap: 'round',
		borderColor: 'var:componentBorderColor',
		width: 'var:componentHeight',
		height: 'var:componentHeight',
	}

	constructor(options) {
		super(options)

		const {
			value = false,
			onChange = (value) => {},
		} = options

		this.value = value
		this.onChange = onChange

		this.events = [
			...this.events,
			click({ handler: () => {
				this.onClick()
			}})(this),
		]
	}

	onClick() {
		if (this.disabled) {
			return
		}
		const value = this.getModelValue()

		this.onChange(!value)
		this.updateModelValue(!value)
	}

	render(queue) {
		const { x, y, w, h } = this.computeDimensions()
		const style = this.computeStyle()

		const value = this.getModelValue()

		rect({
			x, y, w, h,
			...style,
			bg: value ? style.fg : style.bg,
		}).to(queue)

		if (value) {
			line({
				points: [
					point({ x: x + w * 0.15, y: y + h * 0.4 }),
					point({ x: x + w * 0.5, y: y + h * 0.7 }),
					point({ x: x + w * 0.9, y: y + h * 0.15 }),
				],
				...style,
				borderWidth: w * 0.1,
				borderColor: style.bg,
			}).to(queue)
		}

		return queue
	}
}

const checkbox = (options) => {
	return new CheckboxComponent(options)
}

module.exports = { CheckboxComponent, checkbox }
