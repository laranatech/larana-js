const { text, layout, list } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ForWhoSlideComponent extends SlideComponent {
	static steps = 6

	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Кому нужна Larana',
				}),
				layout({}),
				layout({
					style: { size: 9 },
					children: [
						layout({}),
						list({
							style: ['gap_3'],
							value: [
								'Банкоматы',
								'Тонкие клиенты',
								'Платформы с экслюзивным и платным контентом',
								'Стриминг',
								'Игры',
							],
							offset: 0,
							limit: this.step - 1,
							template: (line, i) => {
								return text({
									style: [
										'h1',
										{
											height: 'var:componentHeight',
											textAlign: 'start',
										},
									],
									value: `${i + 1}. ${line}`,
								})
							},
						}),
						layout({}),
					],
				}),
			],
		})
	}
}

module.exports = { ForWhoSlideComponent }
