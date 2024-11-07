const { text, layout, image, laranaLogo } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class TitleSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				layout({
					style: {
						size: 2,
					},
					children: [
						// laranaLogo({
						// 	style: { width: 749 },
						// }),
						image({
							src: 'https://larana.tech/larana.svg',
						}),
					],
				}),
				layout({
					style: 'column',
					children: [
						text({
							style: 'h1',
							value: 'LaranaJS: Настоящий SSR',
						}),
						text({
							style: 'h2',
							value: 'Женя Кучерявый',
						}),
						text({
							style: 'h3',
							value: 'Founder of LaranaTech',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TitleSlideComponent }
