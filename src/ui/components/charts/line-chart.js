const { BaseComponent } = require('../base')
const { figure } = require('../figure.js')
const { layout } = require('../layout.js')
const { list } = require('../list.js')
const { line, point, arc } = require('../../shapes')

class LineChartComponent extends BaseComponent {
	title = ''

	defaultStyle = {
		fg: 'var:fg',
		borderWidth: 'var:u1',
		borderCap: 'round',
		direction: 'column',
		borderColor: 'var:accent',
	}

	constructor(options) {
		super(options)
		const { title } = options

		if (title !== undefined) {
			this.title = title
		}
	}

	root() {
		const { modelValue } = this.useModel()
		const items = modelValue

		const style = this.computeStyle()

		let maxValue = 0

		items.forEach((item) => {
			if (maxValue < item.value) {
				maxValue = item.value
			}
		})

		maxValue *= 1.05

		return layout({
			children: [
				figure({
					style: { size: 10 },
					template: (fig, queue) => {
						const d = fig.computeDimensions()

						const deltaW = d.w / items.length
						const bottom = d.y + d.h

						line({
							points: items.map((item, i) => {
								const s = item.value / maxValue

								return point({
									x: d.x + i * deltaW + deltaW / 2,
									y: bottom - d.h * s,
								})
							}),
							borderColor: style.borderColor,
							borderWidth: style.borderWidth,
							borderCap: style.borderCap,
						}).to(queue)

						items.forEach((item, i) => {
							const s = item.value / maxValue
							arc({
								x: d.x + i * deltaW + deltaW / 2,
								y: bottom - d.h * s,
								borderColor: style.borderColor,
								bg: style.bg,
								radius: style.borderWidth,
							}).to(queue)
						})
					},
				}),
				list({
					style: 'row',
					value: items.map((item) => item.label),
				}),
			],
		})
	}
}

const lineChart = (options) => {
	return new LineChartComponent(options)
}

module.exports = {
	LineChartComponent,
	lineChart,
}
