const { LayoutComponent } = require('./layout.js')
const { BaseComponent } = require('./base-component.js')
const { TextComponent } = require('./text.js')

const { click, hover } = require('../events')

const { Style } = require('../style')

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
				style: new Style({ borderColor: '#f00' }),
			})(this),
			hover({
				style: new Style({ borderWidth: 3 }),
			})(this),
			...events.map((e) => e(this)),
		]
	}

	getChildren(state) {
		return [
			new LayoutComponent({
				parent: this,
				style: this.getStyle(),
				children: [
					new TextComponent({
						text: this.text,
						style: this.getStyle(),
					}),
				],
			}),
		]
	}
}

module.exports = { LinkComponent }
