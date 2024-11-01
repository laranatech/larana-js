const { BaseComponent, text, layout } = require('larana-js')

class DocsSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Понятная документация',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'ссылка на канал',
						}),
						text({
							style: 'h2Text',
							value: 'ссылка на сайт',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { DocsSlideComponent }
