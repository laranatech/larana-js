const { BaseComponent } = require('./base')
const { layout } = require('./layout.js')
const { text } = require('./text/text.js')

class ListComponent extends BaseComponent {
	defaultStyle = {
		direction: 'column',
		// alignment: 'start',
		// padding: 'var:u2',
		gap: 'var:u2',
	}

	offset = null
	limit = null

	template = (item, i) => {
		return text({ value: String(item) })
	}

	constructor(options) {
		super(options)

		if (options.template) {
			this.template = options.template
		}

		const { offset = null, limit = null } = options

		this.offset = offset
		this.limit = limit
	}

	root() {
		const { modelValue } = this.useModel()

		let items = [...modelValue]

		if (this.offset !== null && this.limit !== null) {
			items = items.splice(this.offset, this.limit)
		}

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
