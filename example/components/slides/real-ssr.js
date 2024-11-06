const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class RealSSRSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Настоящий SSR/CSR',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: 'Фреймворк сам решает, как всё рендерить',
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

module.exports = { RealSSRSlideComponent }
