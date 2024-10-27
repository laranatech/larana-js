const { BaseComponent } = require('../base-component.js')
const { click } = require('../../events/click.js')

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
	}

	constructor(data) {
		super(data)

		const {
			value = false,
			onChange = (value) => {},
		} = data

		this.value = value
		this.onChange = onChange

		this.events = [
			...this.events,
			click({ handler: (data) => {
				this.onClick(data)
			}})(this),
		]
	}

	onClick(data) {
		if (this.disabled) {
			return
		}
		const value = this.getModelValue(data)

		this.onChange(!value)
		this.updateModelValue(data, !value)
	}

	render(queue, data) {
		const { x, y, w, h } = this.computeDimensions(data)
		const style = this.computeStyle(data)

		const value = this.getModelValue(data)

		queue.add('rect', {
			x, y, w, h,
			radius: style.radius,
			fillStyle: value ? style.fg : style.bg,
			strokeStyle: style.borderColor,
			lineWidth: style.borderWidth,
		})

		if (value) {
			queue.add('line', {
				points: [
					{ x: x + w * 0.15, y: y + h * 0.4 },
					{ x: x + w * 0.5, y: y + h * 0.7 },
					{ x: x + w * 0.9, y: y + h * 0.15 },
				],
				strokeStyle: style.bg,
				lineWidth: w * 0.1,
				lineCap: style.borderCap,
			})
		}

		return queue
	}
}

module.exports = { CheckboxComponent }
