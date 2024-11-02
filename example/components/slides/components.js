const { BaseComponent, text, layout } = require('larana-js')

class ComponentsSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Создание компонента',
				}),
				layout({
					style: ['column', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'скрин кода компонента',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ComponentsSlideComponent }
