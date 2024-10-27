const { BaseComponent } = require('../base-component.js')
const { LayoutComponent } = require('../layout.js')
const { TextComponent } = require('../text.js')

class BarChartComponent extends BaseComponent {
	title = ''
	items = []

	constructor(data) {
		super(data)
		const { items, title } = data

		if (items !== undefined) {
			this.items = items
		}

		if (title !== undefined) {
			this.title = title
		}
	}

	getModelValue(data) {
		return this.model ? data.state[this.model] : this.items
	}

	render(queue, data) {
		const items = this.getModelValue(data)

		let maxValue = 0
		let totalValue = 0

		items.forEach((item) => {
			totalValue += item.value

			if (maxValue < item.value) {
				maxValue = item.value
			}
		})

		maxValue *= 1.05

		const root = new LayoutComponent({
			parent: this,
			style: {
				gap: 4,
				padding: 4,
				direction: 'row',
			},
			children: items.map((item) => {
				const s = item.value / maxValue * 10

				const cs = this.computeStyle(data)

				return new LayoutComponent({
					style: {
						direction: 'column',
						gap: 4,
					},
					children: [
						new LayoutComponent({
							style: { size: 10 - s },
						}),
						new LayoutComponent({
							style: {
								size: s,
								bg: item.color ?? cs.bg,
							},
							children: [
								new TextComponent({
									text: item.value,
									style: { fg: cs.fg },
								}),
							],
						}),
						new TextComponent({
							text: item.label,
							style: { fg: cs.fg },
						}),
					]
				})
			}),
		})

		root.render(queue, data)

		return queue
	}
}

module.exports = { BarChartComponent }
