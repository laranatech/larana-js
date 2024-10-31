const { BaseComponent } = require('../base-component.js')
const { layout } = require('../layout.js')
const { text } = require('../text.js')

const { click } = require('../../events')

class LinkComponent extends BaseComponent {
	text = ''
	to = {}

	defaultHoveredStyle = {
		borderWidth: 3,
	}

	constructor(options) {
		super(options)

		const { text, to, events = [] } = options

		this.text = text
		this.to = to

		this.events = [
			click({})(this),
			...events.map((e) => e(this)),
		]
	}

	root() {
		const style = this.computeStyle()

		return layout({
			children: [
				text({
					text: this.text,
					style,
				}),
			],
		})
	}
}

const link = (options) => {
	return new LinkComponent(options)
}

module.exports = { LinkComponent, link }
