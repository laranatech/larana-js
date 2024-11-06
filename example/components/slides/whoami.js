const { text, layout, image, list } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class WhoamiSlideComponent extends SlideComponent {
	static steps = 7

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
								'— 10+ лет программирую',
								'— Организатор BeerJS Moscow DrinkUp',
								'— Автор канала «Директор фронтенда»',
								'— Бывший служитель церкви',
								'— Умер и воскрес (клиническая смерть)',
								'— Изобретатель LaranaJS',
							],
							template: (line) => text({
								value: line,
								style: ['h1', { height: 'var:componentHeight', textAlign: 'start' }],
							}),
						}),
					],
				}),
				layout({
					children: [
						image({
							src: 'https://kucheriavyi.ru/images/evgenii-kucheriavyi_2.webp',
							style: { width: 512, aspectRatio: 1 },
						}),
					],
				}),
			],
		})
	}
}

module.exports = { WhoamiSlideComponent }
