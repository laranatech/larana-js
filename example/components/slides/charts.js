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
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Построение графиков',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						this.step === 1 ? text({
							style: 'h2Text',
							value: 'Пример кода колончатого графика',
						})
						: this.step === 2 ? barChart({
							model: 'chartItems',
							text: 'ссылка на сайт',
						})
						: this.step === 3 ? text({
							style: 'h2Text',
							value: 'Пример кода линейного графика',
						})
						: lineChart({
							model: 'chartItems',
							text: 'ссылка на сайт',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ChartsSlideComponent }
