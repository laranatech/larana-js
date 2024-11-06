const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class HypeJSSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Hype.js',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: 'Скрин доклада с холи',
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

module.exports = { HypeJSSlideComponent }
