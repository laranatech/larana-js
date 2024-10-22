const { click } = require('../events/click.js')
const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')
const { TextComponent } = require('./text.js')

class ButtonComponent extends BaseComponent {
	text = ''

	defaultStyle = {}

	onClick = null

	constructor(data) {
		super(data)
		const { text, onClick } = data

		this.text = text
		this.onClick = onClick

		this.events = [
			...this.events,
			click({
				handler: this.onClick,
			})(this),
		]
	}

	render(queue, data) {
		const style = this.computeStyle(data)

		const c = new LayoutComponent({
			parent: this,
			style,
			children: [
				new TextComponent({
					text: this.text,
					style: {
						fg: style.fg,
						fontFamily: style.fontFamily,
						fontWeight: style.fontWeight,
						fontSize: style.fontSize,
					},
				}),
			],
		})

		c.render(queue, data)

		return queue
	}
}

module.exports = { ButtonComponent }
