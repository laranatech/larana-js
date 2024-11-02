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
					value: 'Имплементация LaranaJS',
				}),
				layout({
					style: ['column', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'Похожие инструменты',
						}),
						text({
							style: 'h2Text',
							value: 'Другой результат',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ImplementationSlideComponent }
