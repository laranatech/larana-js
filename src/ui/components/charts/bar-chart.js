const { BaseComponent } = require('../base')
const { layout } = require('../layout.js')
const { text } = require('../text.js')

class BarChartComponent extends BaseComponent {
	title = ''

	defaultStyle = {
		fg: 'var:fg',
		// bg: 'var:accent',
		padding: 'var:u2',
		gap: 'var:u2',
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
			children: items.map((item) => {
				const s = item.value / maxValue * 10

				return layout({
					style: {
						direction: 'column',
						gap: 4,
						bg: style.bg,
					},
					children: [
						layout({
							style: { size: 10 - s, bg: style.bg, },
						}),
						layout({
							style: {
								size: s,
								bg: item.color ?? 'var:accent', // TODO: fix
							},
							children: [
								text({
									value: item.value,
									style: { fg: style.fg },
								}),
							],
						}),
						text({
							value: item.label,
							style: { fg: style.fg },
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
