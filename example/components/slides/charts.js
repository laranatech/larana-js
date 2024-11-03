const { BaseComponent, text, layout, barChart, lineChart } = require('larana-js')

class ChartsSlideComponent extends BaseComponent {
	static steps = 4
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		const barChartCode = text({
			style: 'h2Text',
			value: 'Пример кода колончатого графика',
		})

		const barChartExample = barChart({
			model: 'chartItems',
			text: 'ссылка на сайт',
		})

		const lineChartCode = text({
			style: 'h2Text',
			value: 'Пример кода линейного графика',
		})

		const lineChartExample = lineChart({
			model: 'chartItems',
			text: 'ссылка на сайт',
		})

		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Построение графиков',
				}),
				layout({
					style: ['column', 'gap_1', 'size_5'],
					children: [
						[
							barChartCode,
							barChartExample,
							lineChartCode,
							lineChartExample,
						][this.step - 1],
					],
				}),
			],
		})
	}
}

module.exports = { ChartsSlideComponent }
