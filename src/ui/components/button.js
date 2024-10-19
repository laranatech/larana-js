const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')
const { TextComponent } = require('./text.js')

const { Style } = require('../style')

class ButtonComponent extends BaseComponent {
	text = ''

	defaultStyle = new Style({})

	constructor(data) {
		super(data)
		const { text } = data

		this.text = text
	}

	render(queue, state) {
		const style = this.getStyle()

		const c = new LayoutComponent({
			parent: this,
			style,
			children: [
				new TextComponent({
					text: this.text,
					style: new Style({
						fg: style.fg,
						fontFamily: style.fontFamily,
						fontWeight: style.fontWeight,
						fontSize: style.fontSize,
					})
				}),
			],
		})

		c.render(queue, state)

		return queue
	}
}

module.exports = { ButtonComponent }
