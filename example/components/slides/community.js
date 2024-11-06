const { text, image, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class CommunitySlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({ value: 'Активное сообщество', style: 'h1' }),
				layout({
					style: [{ size: 9 }, 'gap_2'],
					children: [
						image({
							style: { size: 2 },
							src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
						}),
						image({
							style: { size: 2 },
							src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
						}),
						image({
							style: { size: 2 },
							src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
						}),
						image({
							style: { size: 2 },
							src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { CommunitySlideComponent }
