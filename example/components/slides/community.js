const { BaseComponent, TextComponent, ImageComponent, LayoutComponent } = require('larana-js')

class CommunitySlideComponent extends BaseComponent {
	static steps = 1
	step = 1

	constructor(data) {
		super(data)
		this.step = data.step ?? 1
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: { direction: 'column' },
				children: [
					new TextComponent({ text: 'Большое сообщество', style: 'h1Text' }),
					new LayoutComponent({
						style: ['size_5', 'gap_2'],
						children: [
							new ImageComponent({
								style: { size: 2 },
								src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
								onLoad: () => {
									data.session.page.rerender()
								},
							}),
							new ImageComponent({
								style: { size: 2 },
								src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
							}),
							new ImageComponent({
								style: { size: 2 },
								src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
							}),
							new ImageComponent({
								style: { size: 2 },
								src: 'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
								onLoad: () => {
									data.session.page.rerender()
								},
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { CommunitySlideComponent }
