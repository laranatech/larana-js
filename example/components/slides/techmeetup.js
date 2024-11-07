const { text, layout, image } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class TechmeetupSlideComponent extends SlideComponent {
	static steps = 3

	root() {
		const { h } = this.useResolution()

		return layout({
			children: [
				text({ value: 'Первые шаги', style: 'h1' }),
				layout({
					style: { size: 9 },
					children: [
						layout({}),
						image({
							style: { height: h * 0.85, aspectRatio: 1000 / 667 },
							src: [
								'https://kucheriavyi.ru/images/slides/techmeetup.jpg',
								'https://kucheriavyi.ru/images/slides/techmeetup_fun.jpg',
								'https://kucheriavyi.ru/images/slides/techmeetup_sad.jpg',
							][this.step-1],
						}),
						layout({}),
					],
				}),
			],
		})
	}
}

module.exports = { TechmeetupSlideComponent }
