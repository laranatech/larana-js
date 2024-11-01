const { BaseComponent, text, layout } = require('larana-js')

class GameSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Demo: game',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'Тут будет демо игры',
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

module.exports = { GameSlideComponent }
