const { BaseComponent, text, layout } = require('larana-js')

class ImplementationSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					text: 'Имплементация LaranaJS',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							text: 'Похожие инструменты',
						}),
						text({
							style: 'h2Text',
							text: 'Другой результат',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ImplementationSlideComponent }
