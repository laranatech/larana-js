const { BaseComponent, text, layout } = require('larana-js')

class ConfigSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					text: 'Config / DI',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							text: 'скрин конфига',
						}),
						// text({
						// 	style: 'h2Text',
						// 	text: 'ссылка на сайт',
						// }),
					],
				}),
			],
		})
	}
}

module.exports = { ConfigSlideComponent }
