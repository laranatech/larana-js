const { text, layout, throbber } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class AnimationsSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Анимация',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						throbber({ model: 'throbber' }),
					],
				}),
			],
		})
	}
}

module.exports = { AnimationsSlideComponent }
