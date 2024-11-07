const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class DocsSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Понятная документация',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: 'ссылка на канал',
						}),
						text({
							style: 'h2',
							value: 'ссылка на сайт',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { DocsSlideComponent }
