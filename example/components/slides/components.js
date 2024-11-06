const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ComponentsSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Создание компонента',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: 'скрин кода компонента',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ComponentsSlideComponent }
