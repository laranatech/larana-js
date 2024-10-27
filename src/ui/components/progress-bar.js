const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')

class ProgressBarComponent extends BaseComponent {
	total = 100
	value = 0

	defaultStyle = {
		radius: 'var:radius',
		padding: 'var:u2',
		bg: '#333',
		fg: '#3caa3c',
	}

	constructor(data) {
		super(data)

		const { total = 100, value = 0 } = data

		this.total = total
		this.value = value
	}

	getChildren(data) {
		const style = this.computeStyle(data)

		const value = this.getModelValue(data)

		return [
			new LayoutComponent({
				parent: this,
				children: [
					new LayoutComponent({
						style: { bg: style.fg, size: value, radius: style.radius },
					}),
					new LayoutComponent({
						style: { size: this.total - value },
					}),
				],
			}),
		]
	}
}

module.exports = { ProgressBarComponent }
