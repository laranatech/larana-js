const { text, layout, list } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ImplementationSlideComponent extends SlideComponent {
	static steps = 2

	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Имплементация Larana',
				}),
				layout({}),
				list({
					style: ['column', 'gap_5', { size: 8 }],
					offset: 0,
					limit: this.step,
					value: [
						'Похожие инструменты',
						'Другой результат',
					],
					template: (line) => text({
						style: ['h0'],
						value: line,
					}),
				}),
			],
		})
	}
}

module.exports = { ImplementationSlideComponent }
