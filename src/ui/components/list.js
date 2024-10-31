const { BaseComponent } = require('./base-component.js')
const { layout } = require('./layout.js')
const { text } = require('./text.js')

class ListComponent extends BaseComponent {
	defaultStyle = {
		direction: 'column',
		gap: 'var:u2',
	}

	template = (item, i) => {
		return text({ text: item })
	}

	constructor(options) {
		super(options)

		if (options.template) {
			this.template = options.template
		}
	}

	root() {
		const items = this.getModelValue()

		return layout({
			children: items.map((item, i) => {
				return this.template(item, i)
			}),
		})
	}
}

const list = (options) => {
	return new ListComponent(options)
}

module.exports = { ListComponent, list }
