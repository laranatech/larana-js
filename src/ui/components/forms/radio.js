const { BaseComponent } = require('../base-component.js')
const { click } = require('../../events/click.js')
const { arc } = require('../../shapes/arc.js')

class RadioComponent extends BaseComponent {
	name = ''

	onSelect = (name) => {}

	defaultStyle = {
		bg: 'var:componentBg',
		fg: 'var:accent',
		borderWidth: 2,
		borderCap: 'round',
		borderColor: 'var:componentBorderColor',
		height: 'var:componentHeight',
	}

	constructor(options) {
		super(options)

		const {
			name = '',
			onSelect = (name) => {},
		} = options

		this.name = name
		this.onSelect = onSelect

		this.events = [
			...this.events,
			click({ handler: () => {
				this.onClick()
			}})(this),
		]
	}

	getIsSelected() {
		const value = this.getModelValue()
		return value === this.name
	}

	onClick() {
		const selected = this.getIsSelected()

		if (this.disabled || selected) {
			return
		}

		this.onSelect(this.name)
		this.updateModelValue(this.name)
	}

	render(queue) {
		const { x, y, w, h } = this.computeDimensions()
		const { bg, fg, borderColor, borderWidth }= this.computeStyle()

		const selected = this.getIsSelected()

		const r = this.computeMaxRadius({ w, h })

		arc({
			x: x + w / 2,
			y: y + h / 2,
			radius: r,
			bg,
			borderColor,
			borderWidth,
		}).to(queue)

		if (selected) {
			arc({
				x: x + w / 2,
				y: y + h / 2,
				radius: r * 0.8,
				fg,
			}).to(queue)
		}

		return queue
	}
}

const radio = (options) => {
	return new RadioComponent(options)
}

module.exports = { RadioComponent, radio }
