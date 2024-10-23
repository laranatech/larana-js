const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')

class ProgressBarComponent extends BaseComponent {
	total = 100
	value = 0
	model = ''

	defaultStyle = {
		radius: 4,
		padding: 8,
		bg: '#333',
		fg: '#3caa3c',
	}

	constructor(data) {
		super(data)

		const { total = 100, value = 0, model = '' } = data

		this.total = total
		this.value = value
		this.model = model
	}

	getChildren(data) {
		const style = this.computeStyle(data)

		const value = this.model ? data.state[this.model] : this.value

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
