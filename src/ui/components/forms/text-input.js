const { BaseComponent } = require('../base')
const { click, keypress } = require('../../events/index.js')
const { layout } = require('../layout.js')
const { text } = require('../text.js')

class TextInputComponent extends BaseComponent {
	focusable = true
	onFocus = () => {}
	onInput = (value) => {}
	onEnter = () => {}

	carretPosition = 0

	defaultStyle = {
		bg: 'var:componentBg',
		fg: 'var:fg',
		borderColor: 'var:componentBorderColor',
		radius: 'var:radius',
		height: 'var:componentHeight',
	}

	defaultFocusedStyle = {
		borderColor: 'var:accent',
	}

	constructor(options) {
		super(options)

		const {
			model,
			id,
			onFocus = () => {},
			onInput = (value) => {},
			onEnter = (value) => {},
		} = options

		if (!id) {
			this.id = model
		}

		this.onInput = onInput
		this.onFocus = onFocus
		this.onEnter = onEnter

		this.events = [
			...this.events,
			click({
				handler: () => {
					this.focus()
				},
			})(this),
			keypress({
				handler: (value) => {
					this.handleInput(value)
				},
			})(this),
		]
	}

	handleInput(value) {
		if (!this.isFocused()) {
			return
		}

		const { modelValue, setModel } = this.useModel()

		let inputValue = modelValue
		if (value === 'Backspace') {
			inputValue = inputValue.slice(0, -1)
		} else if (value === 'Enter') {
			this.onEnter(inputValue)
			return
		} else if (value === 'Delete') {

		} else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',].includes(value)) {
			this.moveCarret(value)
		} else {
			if ([
				'Shift',
				'Control',
				'Tab',
				'Alt',
				'AltGraph',
				'Compose',
				'Escape',
			].includes(value)) {
				return
			}
			inputValue += `${value}`
			this.moveCarret(value)
		}
		this.onInput(inputValue)
		setModel(inputValue)
	}

	moveCarret(key) {
		const { modelValue } = this.useModel()

		let carret = this.carretPosition

		if (key === 'ArrowLeft') {
			carret -= 1
		} else if (key === 'ArrowRight') {
			carret += 1
		} else if (key === 'ArrowUp') {
			carret = 0
		} else if (key === 'ArrowDown') {
			carret = modelValue.length
		}

		if (carret < 0) {
			carret = 0
		}

		if (carret > modelValue.length) {
			carret = modelValue.length
		}

		this.carretPosition = carret
	}

	getCarret() {
		return this.carretPosition
	}

	root() {
		const { modelValue } = this.useModel()
		let inputValue = modelValue

		const carret = this.getCarret()

		const a = inputValue.split('')
		// a.splice(carret, 0, '|')

		return layout({
			children: [
				text({
					value: a.join(''),
					style: this.computeStyle(),
				}),
			],
		})
	}
}

const textInput = (options) => {
	return new TextInputComponent(options)
}

module.exports = { TextInputComponent, textInput }
