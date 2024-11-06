const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ImplementationSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Имплементация LaranaJS',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: 'Похожие инструменты',
						}),
						text({
							style: 'h2',
							value: 'Другой результат',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ImplementationSlideComponent }
