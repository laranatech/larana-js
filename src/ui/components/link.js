const { LayoutComponent } = require('./layout.js')
const { BaseComponent } = require('./base-component.js')
const { TextComponent } = require('./text.js')

const { click, hover } = require('../events')

class LinkComponent extends BaseComponent {
	text = ''
	to = {}

	constructor(data) {
		super(data)

		const { text, to, events = [] } = data

		this.text = text
		this.to = to

		this.events = [
			click({
				style: { borderColor: '#f00' },
			})(this),
			hover({
				style: { borderWidth: 3 },
			})(this),
			...events.map((e) => e(this)),
		]
	}

	getChildren(data) {
		const cs = this.computeStyle(data)

		return [
			new LayoutComponent({
				parent: this,
				style: cs,
				children: [
					new TextComponent({
						text: this.text,
						style: cs,
					}),
				],
			}),
		]
	}
}

module.exports = { LinkComponent }
