const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')

class ListComponent extends BaseComponent {
	defaultStyle = {
		direction: 'column',
		gap: 'var:u2',
	}

	template = (data, item) => {}

	constructor(data) {
		super(data)

		this.template = data.template
	}

	getChildren(data) {
		const items = this.getModelValue(data)

		return [
			new LayoutComponent({
				style: this.computeStyle(data),
				parent: this,
				children: [
					...items.map((item, i) => {
						return this.template(data, item, i)
					}),
				],
			})
		]
	}
}

module.exports = { ListComponent }
