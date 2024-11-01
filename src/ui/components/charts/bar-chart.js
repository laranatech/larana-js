const { BaseComponent } = require('../base')
const { layout } = require('../layout.js')
const { text } = require('../text.js')

class BarChartComponent extends BaseComponent {
	title = ''

	defaultStyle = {
		fg: 'var:fg',
		bg: 'var:accent',
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
			style: ['row', 'p_1', 'gap_1'],
			children: items.map((item) => {
				const s = item.value / maxValue * 10

				const cs = this.computeStyle()

				return layout({
					style: {
						direction: 'column',
						gap: 4,
					},
					children: [
						layout({
							style: { size: 10 - s },
						}),
						layout({
							style: {
								size: s,
								bg: item.color ?? cs.bg,
							},
							children: [
								text({
									value: item.value,
									style: { fg: cs.fg },
								}),
							],
						}),
						text({
							value: item.label,
							style: { fg: cs.fg },
						}),
					]
				})
			}),
		})
	}
}

const barChart = (options) => {
	return new BarChartComponent(options)
}

module.exports = { BarChartComponent, barChart }
