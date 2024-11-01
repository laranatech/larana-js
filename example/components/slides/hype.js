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
					value: 'Hype.js',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'Скрин доклада с холи',
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

module.exports = { HypeJSSlideComponent }
