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
					text: 'UIDesigner',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							text: '- Встроенный инструмент типа фигмы',
						}),
						text({
							style: 'h2Text',
							text: '- Дизайнер рисует руками и получает на выходе готовый код, который сразу сохраняется в файлы',
						}),
						text({
							style: 'h2Text',
							text: '- Рендерится всё сразу на движке лараны, поэтому никаких расхождений',
						}),
						text({
							style: 'h2Text',
							text: '- LowCode, но весь код остаётся у вас, а не на закрытом сервере, поэтому его легко менять',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { DesignerSlideComponent }
