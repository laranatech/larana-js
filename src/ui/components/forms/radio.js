const { BaseComponent } = require('../base')
const { click } = require('../../events/click.js')
const { arc } = require('../../shapes/arc.js')
const { figure } = require('../figure.js')

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
		width: 'var:componentHeight',
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
		const { modelValue } = this.useModel()
		return modelValue === this.name
	}

	onClick() {
		const selected = this.getIsSelected()

		if (this.disabled || selected) {
			return
		}

		const { setModel } = this.useModel()

		this.onSelect(this.name)
		setModel(this.name)
	}

	root() {
		const selected = this.getIsSelected()
		const { bg, fg, borderColor, borderWidth } = this.computeStyle()

		return figure({
			template: (fig, queue) => {
				const { x, y, w, h } = fig.computeDimensions()
				const r = fig.computeMaxRadius()

				const cX = x + w / 2
				const cY = y + h / 2

				arc({
					x: cX,
					y: cY,
					radius: r,
					bg,
					borderColor,
					borderWidth,
				}).to(queue)
		
				if (selected) {
					arc({
						x: cX,
						y: cY,
						radius: r * 0.8,
						fg,
					}).to(queue)
				}
			},
		})
	}
}

const radio = (options) => {
	return new RadioComponent(options)
}

module.exports = { RadioComponent, radio }
