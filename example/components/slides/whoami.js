const { BaseComponent, text, layout, image } = require('larana-js')

class WhoamiSlideComponent extends BaseComponent {
	static steps = 4
	step = 1

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		const page = this.usePage()

		return layout({
			children: [
				layout({
					style: { size: 2, direction: 'column', alignment: 'start' },
					children: [
						...[
							text({ value: 'Женя Кучерявый', style: 'h1Text' }),
							text({ value: '— Организатор BeerJS Moscow DrinkUp', style: 'h3Text' }),
							text({ value: '— Автор канала «Директор фронтенда»', style: 'h3Text' }),
							text({ value: '— Изобретатель LaranaJS', style: 'h3Text' }),
						].slice(0, this.step),
						layout({
							style: { size: WhoamiSlideComponent.steps - this.step },
						}),
					],
				}),
				layout({
					children: [
						image({
							src: 'https://kucheriavyi.ru/images/evgenii-kucheriavyi_2.webp',
							onLoad: () => {
								page.rerender()
							},
						}),
					],
				}),
			],
		})
	}
}

module.exports = { WhoamiSlideComponent }
