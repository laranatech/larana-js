const { text, layout, list } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class PhylosophySlideComponent extends SlideComponent {
	static steps = 4

	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Философия Larana',
				}),
				list({
					style: { size: 9 },
					value: [
						'Минимум кода на клиенте',
						'Минимум доверия клиенту',
						'Rebuild the web',
					],
					offset: 0,
					limit: this.step - 1,
					template: (line) => text({ value: line, style: 'h0' }),
				}),
			],
		})
	}
}

module.exports = { PhylosophySlideComponent }
