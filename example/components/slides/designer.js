const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class DesignerSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'UIDesigner',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: '- Встроенный инструмент типа фигмы',
						}),
						text({
							style: 'h2',
							value: '- Дизайнер рисует руками и получает на выходе готовый код, который сразу сохраняется в файлы',
						}),
						text({
							style: 'h2',
							value: '- Рендерится всё сразу на движке лараны, поэтому никаких расхождений',
						}),
						text({
							style: 'h2',
							value: '- LowCode, но весь код остаётся у вас, а не на закрытом сервере, поэтому его легко менять',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { DesignerSlideComponent }
