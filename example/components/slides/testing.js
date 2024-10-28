const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class TestingSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Тестирование LaranaJS',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new TextComponent({
								style: 'h2Text',
								text: 'Использование стейта в тестах',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'скриншотные тесты',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'скриншотные тесты с чексуммой',
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { TestingSlideComponent }
