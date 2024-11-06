const { BaseComponent } = require('../base')
const { click } = require('../../events/click.js')
const { rect, line, point } = require('../../shapes')
const { figure } = require('../figure.js')

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

	defaultDisabledStyle = {
		fg: 'var:disabledAccent',
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
		const { modelValue, setModel } = this.useModel()

		this.onChange(!modelValue)
		setModel(!modelValue)
	}

	root() {
		const style = this.computeStyle()
		const { modelValue } = this.useModel()

		return figure({
			template: (fig, queue) => {
				const { x, y, w, h } = fig.computeDimensions()
				rect({
					x, y, w, h,
					...style,
					bg: modelValue ? style.fg : style.bg,
				}).to(queue)

				if (modelValue) {
					line({
						points: [
							point({ x: x + w * 0.15, y: y + h * 0.4 }),
							point({ x: x + w * 0.5, y: y + h * 0.7 }),
							point({ x: x + w * 0.9, y: y + h * 0.15 }),
						],
						...style,
						bg: null,
						borderWidth: w * 0.1,
						borderColor: style.bg,
					}).to(queue)
				}
			},
		})
	}
}

const checkbox = (options) => {
	return new CheckboxComponent(options)
}

module.exports = { CheckboxComponent, checkbox }
