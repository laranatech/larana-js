const { BaseComponent, TextComponent, ImageComponent, LayoutComponent } = require('larana-js')

class WhoamiSlideComponent extends BaseComponent {
	static steps = 4
	step = 1

	constructor(data) {
		super(data)
		this.step = data.step ?? 1
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				children: [
					new LayoutComponent({
						style: { size: 2, direction: 'column', alignment: 'start' },
						children: [
							...[
								new TextComponent({ text: 'Женя Кучерявый', style: 'h1Text' }),
								new TextComponent({ text: '— Организатор BeerJS Moscow DrinkUp', style: 'h3Text' }),
								new TextComponent({ text: '— Автор канала «Директор фронтенда»', style: 'h3Text' }),
								new TextComponent({ text: '— Изобретатель LaranaJS', style: 'h3Text' }),
							].slice(0, this.step),
							new LayoutComponent({
								style: { size: WhoamiSlideComponent.steps - this.step },
							}),
						],
					}),
					new LayoutComponent({
						children: [
							new ImageComponent({
								src: 'https://kucheriavyi.ru/images/evgenii-kucheriavyi_2.webp',
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

module.exports = { WhoamiSlideComponent }
