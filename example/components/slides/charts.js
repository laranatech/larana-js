const { BaseComponent, TextComponent, LayoutComponent, ImageComponent, BarChartComponent } = require('larana-js')

class ChartsSlideComponent extends BaseComponent {
	static steps = 4
	step = 1

	constructor(data) {
		super(data)
		this.step = data.step
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Построение графиков',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							this.step === 1 ? new TextComponent({
								style: 'h2Text',
								text: 'Пример кода колончатого графика',
							})
							: this.step === 2 ? new BarChartComponent({
								model: 'chartItems',
								text: 'ссылка на сайт',
							})
							: this.step === 3 ? new TextComponent({
								style: 'h2Text',
								text: 'Пример кода линейного графика',
							})
							: new BarChartComponent({
								model: 'chartItems',
								text: 'ссылка на сайт',
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { ChartsSlideComponent }
