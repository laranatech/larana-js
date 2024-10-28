const { BaseComponent, TextComponent, ImageComponent, LayoutComponent } = require('larana-js')

class ConsSlideComponent extends BaseComponent {
	static steps = 2
	step = 1

	constructor(data) {
		super(data)
		this.step = data.step ?? 1
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: { direction: 'column' },
				children: [
					new TextComponent({ text: 'Недостатки', style: 'h1Text' }),
					new LayoutComponent({
						style: { direction: 'column', size: 9 },
						children: [
							new TextComponent({ text: this.step === 2 ? '1. Game changer' : '', style: 'h3Text' }),
							new LayoutComponent({ style: { size: 9 } }),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { ConsSlideComponent }
