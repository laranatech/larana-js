const { BaseComponent } = require('../base-component.js')
const { LayoutComponent } = require('../layout.js')
const { TextComponent } = require('../text.js')
const { Style } = require('../../style')

class BarChartComponent extends BaseComponent {
	model = ''
	title = ''
	items = []

	constructor(data) {
		super(data)
		const { model, items, title } = data

		if (model !== undefined) {
			this.model = model
		}

		if (items !== undefined) {
			this.items = items
		}

		if (title !== undefined) {
			this.title = title
		}
	}

	render(queue, state) {
		const data = this.model ? state.state[this.model] : this.items

		let maxValue = 0
		let totalValue = 0

		data.forEach((item) => {
			totalValue += item.value

			if (maxValue < item.value) {
				maxValue = item.value
			}
		})

		maxValue *= 1.05

		const root = new LayoutComponent({
			parent: this,
			style: new Style({
				gap: 4,
				padding: 4,
				direction: 'row',
			}),
			children: data.map((item) => {
				const s = item.value / maxValue * 10

				return new LayoutComponent({
					style: new Style({
						direction: 'column',
						gap: 4,
					}),
					children: [
						new LayoutComponent({
							style: new Style({ size: 10 - s }),
						}),
						new LayoutComponent({
							style: new Style({
								size: s,
								bg: item.color ?? this.getStyle().bg,
							}),
							children: [
								new TextComponent({
									text: item.value,
									style: new Style({ fg: this.getStyle().fg }),
								}),
							],
						}),
						new TextComponent({
							text: item.label,
							style: new Style({ fg: this.getStyle().fg }),
						}),
					]
				})
			}),
		})

		root.render(queue, state)

		return queue
	}
}

module.exports = { BarChartComponent }
