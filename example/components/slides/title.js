const { BaseComponent, text, layout, image } = require('larana-js')

class TitleSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				layout({
					style: {
						size: 2,
					},
					children: [
						image({
							src: 'https://larana.tech/larana.svg',
						}),
					],
				}),
				layout({
					style: 'column',
					children: [
						text({
							style: 'h1Text',
							value: 'LaranaJS: Настоящий SSR',
						}),
						text({
							style: 'h2Text',
							value: 'Женя Кучерявый',
						}),
						text({
							style: 'h3Text',
							value: 'Founder of LaranaTech',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TitleSlideComponent }
