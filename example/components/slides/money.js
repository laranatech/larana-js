const { text, layout, image } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class MoneySlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({ value: '$$$', style: 'h1' }),
				layout({
					style: { size: 9, gap: 'var:u5' },
					children: [
						layout({}),
						layout({
							style: ['column', 'hug'],
							children: [
								image({
									style: { width: 680, aspectRatio: 680 / 661 },
									src: 'https://kucheriavyi.ru/images/slides/money_empty.jpg',
								}),
								text({ value: 'Other devs', style: 'h1' }),
							],
						}),
						layout({
							style: ['column', 'hug'],
							children: [
								image({
									style: { width: 680, aspectRatio: 680 / 661 },
									src: 'https://kucheriavyi.ru/images/slides/money_full.jpg',
								}),
								text({ value: 'Larana Devs', style: 'h1' }),
							],
						}),
						layout({}),
					],
				}),
			],
		})
	}
}

module.exports = { MoneySlideComponent }
