const { BaseComponent, text, layout, image } = require('larana-js')

class VueranaSlideComponent extends BaseComponent {
	static steps = 2
	step = 1

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		const page = this.usePage()
		
		return layout({
			children: [
				layout({
					style: { size: 2, direction: 'column', alignment: 'start' },
					children: [
						text({ value: [
							'Vue + React = Vueact',
							'Vue + Larana = Vuerana',
						][this.step-1], style: 'h1Text' }),
						image({
							style: { size: 5 },
							src: [
								'https://kucheriavyi.ru/images/slides/vueact.png',
								'https://kucheriavyi.ru/images/slides/vuerana.png',
							][this.step-1],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { VueranaSlideComponent }
