const { BaseComponent, text, layout } = require('larana-js')

class ConsSlideComponent extends BaseComponent {
	static steps = 2
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		return layout({
			children: [
				text({ text: 'Недостатки', style: 'h1Text' }),
				layout({
					style: { direction: 'column', size: 9 },
					children: [
						text({ text: this.step === 2 ? '1. Game changer' : '', style: 'h3Text' }),
						layout({ style: { size: 9 } }),
					],
				}),
			],
		})
	}
}

module.exports = { ConsSlideComponent }
