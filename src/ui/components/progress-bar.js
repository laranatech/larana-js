const { BaseComponent } = require('./base')
const { layout } = require('./layout.js')

class ProgressBarComponent extends BaseComponent {
	total = 100
	value = 0

	defaultStyle = {
		radius: 'var:radius',
		padding: 'var:u2',
		bg: 'var:componentBg',
		fg: 'var:accent',
		height: 'var:componentHeight',
	}

	constructor(options) {
		super(options)

		const { total = 100 } = options

		this.total = total
	}

	root() {
		const style = this.computeStyle()
		const { modelValue } = this.useModel()

		return layout({
			children: [
				layout({
					style: { bg: style.fg, size: modelValue, radius: style.radius },
				}),
				layout({
					style: { size: this.total - modelValue },
				}),
			],
		})
	}
}

const progressBar = (options) => {
	return new ProgressBarComponent(options)
}

module.exports = { ProgressBarComponent, progressBar }
