const { click, keypress } = require('../events')
const { BaseComponent } = require('./base-component.js')
const { TextComponent } = require('./text.js')

class TextInputComponent extends BaseComponent {
	model = ''

	focusable = true
	onFocus = null
	onInput = null

	constructor(data) {
		super(data)

		const { model, id, onFocus, onInput } = data

		if (!id) {
			this.id = model
		}

		this.onInput = onInput
		this.onFocus = onFocus
		this.model = model

		this.events = [
			...this.events,
			click({
				handler: () => {
					this.onFocus(this.id)
				},
			})(this),
			keypress({
				handler: (data, value) => {
					let inputValue = data.state[model]
					if (value === 'Backspace') {
						inputValue = inputValue.slice(0, -1)
					} else {
						inputValue += `${value}`
					}
					this.onInput(inputValue, this.id)
				},
			})(this),
		]
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
