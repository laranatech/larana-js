const { BaseComponent, text, image, layout } = require('larana-js')

class CommunitySlideComponent extends BaseComponent {
	static steps = 1
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		const page = this.usePage()

		return layout({
			children: [
				text({ value: 'Большое сообщество', style: 'h1Text' }),
				layout({
					style: ['size_5', 'gap_2'],
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
