const { BaseComponent } = require('./base')
const { layout } = require('./layout.js')
const { text } = require('./text.js')

class ListComponent extends BaseComponent {
	defaultStyle = {
		direction: 'column',
		// alignment: 'start',
		// padding: 'var:u2',
		gap: 'var:u2',
	}

	template = (item, i) => {
		return text({ value: String(item) })
	}

	constructor(options) {
		super(options)

		if (options.template) {
			this.template = options.template
		}
	}

	root() {
		const { modelValue } = this.useModel()

		return layout({
			children: modelValue.map((item, i) => {
				return this.template(item, i)
			}),
		})
	}
}

const list = (options) => {
	return new ListComponent(options)
}

module.exports = { ListComponent, list }
