const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class RoutingSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Routing в LaranaJS',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new TextComponent({
								style: 'h2Text',
								text: 'Пример инициализации',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'Пример использования 1',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'Пример использования 2',
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { RoutingSlideComponent }
