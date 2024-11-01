const { BaseComponent, text, layout } = require('larana-js')

class PagesSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'col',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Создание страницы',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'скрин кода страницы',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { PagesSlideComponent }
