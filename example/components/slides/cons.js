const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ConsSlideComponent extends SlideComponent {
	static steps = 2

	root() {
		return layout({
			children: [
				text({ value: 'Недостатки', style: 'h1' }),
				layout({
					style: { direction: 'column', size: 9 },
					children: [
						text({ value: this.step === 2 ? '1. Game changer' : '', style: 'h1' }),
						layout({ style: { size: 9 } }),
					],
				}),
			],
		})
	}
}

module.exports = { ConsSlideComponent }
