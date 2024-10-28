const { BaseComponent, TextComponent, ImageComponent, LayoutComponent } = require('larana-js')

class VueranaSlideComponent extends BaseComponent {
	static steps = 2
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
							new TextComponent({ text: [
								'Vue + React = Vueact',
								'Vue + Larana = Vuerana',
							][this.step-1], style: 'h1Text' }),
							new ImageComponent({
								style: { size: 5 },
								src: [
									'https://kucheriavyi.ru/images/slides/vueact.png',
									'https://kucheriavyi.ru/images/slides/vuerana.png',
								][this.step-1],
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

module.exports = { VueranaSlideComponent }
