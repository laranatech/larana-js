const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class DesignerSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'UIDesigner',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new TextComponent({
								style: 'h2Text',
								text: '- Встроенный инструмент типа фигмы',
							}),
							new TextComponent({
								style: 'h2Text',
								text: '- Дизайнер рисует руками и получает на выходе готовый код, который сразу сохраняется в файлы',
							}),
							new TextComponent({
								style: 'h2Text',
								text: '- Рендерится всё сразу на движке лараны, поэтому никаких расхождений',
							}),
							new TextComponent({
								style: 'h2Text',
								text: '- LowCode, но весь код остаётся у вас, а не на закрытом сервере, поэтому его легко менять',
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { DesignerSlideComponent }
