const { BaseComponent, text, layout } = require('larana-js')

class HypeJSSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					text: 'Hype.js',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							text: 'Скрин доклада с холи',
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

module.exports = { HypeJSSlideComponent }
