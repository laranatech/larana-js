const { click, keypress } = require('../../events/index.js')
const { BaseComponent } = require('../base-component.js')
const { TextComponent } = require('../text.js')

class TextInputComponent extends BaseComponent {
	focusable = true
	onFocus = () => {}
	onInput = (value) => {}

	defaultStyle = {
		bg: 'var:componentBg',
		fg: 'var:fg',
		borderColor: 'var:componentBorderColor',
		radius: 'var:radius',
	}

	constructor(data) {
		super(data)

		const {
			model,
			id,
			onFocus = () => {},
			onInput = (value) => {},
		} = data

		if (!id) {
			this.id = model
		}

		this.onInput = onInput
		this.onFocus = onFocus

		this.events = [
			...this.events,
			click({
				handler: (data) => {
					this.focus(data)
				},
			})(this),
			keypress({
				handler: (data, value) => {
					this.handleInput(data, value)
				},
			})(this),
		]
	}

	handleInput(data, value) {
		let inputValue = this.getModelValue(data)
		if (value === 'Backspace') {
			inputValue = inputValue.slice(0, -1)
		} else {
			inputValue += `${value}`
		}
		this.onInput(inputValue)
		this.updateModelValue(data, inputValue)
	}

	getChildren(data) {
		return [
			new TextComponent({
				parent: this,
				model: this.model,
				style: this.computeStyle(data),
			}),
		]
	}
}

module.exports = { TextInputComponent }
