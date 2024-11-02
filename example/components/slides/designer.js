const { BaseComponent, text, layout } = require('larana-js')

class DesignerSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'UIDesigner',
				}),
				layout({
					style: ['column', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: '- Встроенный инструмент типа фигмы',
						}),
						text({
							style: 'h2Text',
							value: '- Дизайнер рисует руками и получает на выходе готовый код, который сразу сохраняется в файлы',
						}),
						text({
							style: 'h2Text',
							value: '- Рендерится всё сразу на движке лараны, поэтому никаких расхождений',
						}),
						text({
							style: 'h2Text',
							value: '- LowCode, но весь код остаётся у вас, а не на закрытом сервере, поэтому его легко менять',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { DesignerSlideComponent }
