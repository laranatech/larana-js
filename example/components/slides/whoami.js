const { text, layout, image, list } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class WhoamiSlideComponent extends SlideComponent {
	static steps = 9

	defaultStyle = {
		direction: 'row',
	}

	root() {
		return layout({
			children: [
				layout({
					style: ['column'],
					children: [
						text({ value: 'Женя Кучерявый', style: 'h1' }),
						list({
							style: ['size_5', 'gap_5', 'p_5'],
							offset: 0,
							limit: this.step - 1,
							value: [
								'— Программировал 10+ лет',
								'— Поднимал и ронял стартапы',
								'— Вносил вклад в MDN и Nuxt',
								'— Организовывал BeerJS Moscow DrinkUp',
								'— Писал в канал «Директор фронтенда» и на хабр',
								'— Служил в церкви',
								'— Умер и воскрес (клиническая смерть)',
								'— Изобрёл LaranaJS',
							],
							template: (line) => text({
								value: line,
								style: ['h1', { height: 'var:componentHeight', textAlign: 'start' }],
							}),
						}),
					],
				}),
				image({
					src: `https://kucheriavyi.ru/images/slides/${ this.step === 9 ? 'wink' : 'portrait' }_1.webp`,
					style: { width: 512, aspectRatio: 9 / 16 },
				}),
			],
		})
	}
}

module.exports = { WhoamiSlideComponent }
