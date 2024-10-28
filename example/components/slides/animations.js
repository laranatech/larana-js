const { BaseComponent, TextComponent, LayoutComponent, ImageComponent, ThrobberComponent } = require('larana-js')

class AnimationsSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Анимация',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new ThrobberComponent({
								model: 'throbber',
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { AnimationsSlideComponent }
