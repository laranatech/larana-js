const { BaseComponent, text, layout } = require('larana-js')

class SeoSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					text: 'SEO',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							text: 'Как ларана работает с SEO?',
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

module.exports = { SeoSlideComponent }
