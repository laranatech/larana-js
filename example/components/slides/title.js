const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class TitleSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: {
					direction: 'column',
				},
				children: [
					new LayoutComponent({
						style: {
							size: 2,
						},
						children: [
							new ImageComponent({
								src: 'https://larana.tech/larana.svg',
								onLoad: (r) => {
									data.session.page.rerender()
								},
							}),
						],
					}),
					new LayoutComponent({
						style: {
							size: 1,
							direction: 'column',
						},
						children: [
							new TextComponent({
								style: 'h1Text',
								text: 'LaranaJS: Настоящий SSR',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'Женя Кучерявый',
							}),
							new TextComponent({
								style: 'h3Text',
								text: 'Founder of LaranaTech',
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { TitleSlideComponent }
