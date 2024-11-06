const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class SeoSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'SEO',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h1',
							value: 'Как ларана работает с SEO?',
						}),
						// text({
						// 	style: 'h2',
						// 	value: 'ссылка на сайт',
						// }),
					],
				}),
			],
		})
	}
}

module.exports = { SeoSlideComponent }
