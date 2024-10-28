const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class ConfigSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Config / DI',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							// new TextComponent({
							// 	style: 'h2Text',
							// 	text: 'ссылка на канал',
							// }),
							// new TextComponent({
							// 	style: 'h2Text',
							// 	text: 'ссылка на сайт',
							// }),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { ConfigSlideComponent }
