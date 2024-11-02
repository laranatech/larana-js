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
					value: 'Config / DI',
				}),
				layout({
					style: ['column', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'скрин конфига',
						}),
						// text({
						// 	style: 'h2Text',
						// 	value: 'ссылка на сайт',
						// }),
					],
				}),
			],
		})
	}
}

module.exports = { ConfigSlideComponent }
