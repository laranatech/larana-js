const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')
const { TextComponent } = require('./text.js')

class ButtonComponent extends BaseComponent {
	text = ''

	constructor(data) {
		super(data)
		const { text } = data

		this.text = text
	}

	render(queue, state) {
		const c = new LayoutComponent({
			parent: this,
			style: this.getStyle(),
			children: [
				new TextComponent({
					text: this.text,
				}),
			],
		})

		c.render(queue, state)

		return queue
	}
}

module.exports = { ButtonComponent }
