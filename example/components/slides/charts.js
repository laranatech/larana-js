const { text, layout, barChart, lineChart, code } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ChartsSlideComponent extends SlideComponent {
	static steps = 4

	root() {
		const barChartCode = code({
			value: [
				'init() {',
				'    const { initState } = this.useState()',
				'    initState({',
				'        chartItems: [',
				'            { value: 100, label: "01" }',
				'            // more items...',
				'        ],',
				'    })',
				'}',
				'',
				'root() {',
				'    return barChart({ model: "chartItems" })',
				'}',
			],
		})

		const barChartExample = barChart({
			model: 'chartItems',
			text: 'ссылка на сайт',
		})

		const lineChartCode = code({
			value: [
				'init() {',
				'    const { initState } = this.useState()',
				'    initState({',
				'        chartItems: [',
				'            { value: 100, label: "01" }',
				'            // more items...',
				'        ],',
				'    })',
				'}',
				'',
				'root() {',
				'    return lineChart({ model: "chartItems" })',
				'}',
			],
		})

		const lineChartExample = lineChart({
			model: 'chartItems',
			text: 'ссылка на сайт',
		})

		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Построение графиков',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
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
