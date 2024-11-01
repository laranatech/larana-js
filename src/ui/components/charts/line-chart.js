const { BaseComponent } = require('../base')
const { figure } = require('../figure.js')
const { layout } = require('../layout.js')
const { list } = require('../list.js')
const { line, point, arc } = require('../../shapes')

class LineChartComponent extends BaseComponent {
	title = ''

	defaultStyle = {
		fg: 'var:fg',
		bg: 'var:accent',
		borderWidth: 'var:u1',
		borderCap: 'round',
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
		let totalValue = 0

		items.forEach((item) => {
			totalValue += item.value

			if (maxValue < item.value) {
				maxValue = item.value
			}
		})

		maxValue *= 1.05

		return layout({
			style: [
				'col',
				'gap_1',
				'p_1',
			],
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
							borderColor: style.bg,
							borderWidth: style.borderWidth,
							borderCap: style.borderCap,
							bg: 'var:accent',
						}).to(queue)

						items.forEach((item, i) => {
							const s = item.value / maxValue
							arc({
								x: d.x + i * deltaW + deltaW / 2,
								y: bottom - d.h * s,
								borderColor: 'var:componentBg',
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
