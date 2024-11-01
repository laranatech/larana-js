const { BaseComponent, text, layout } = require('larana-js')

class A11ySlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Доступность (A11y)',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'Как ларана работает с доступностью?',
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

module.exports = { A11ySlideComponent }
