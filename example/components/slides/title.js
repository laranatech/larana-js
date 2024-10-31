const { BaseComponent, text, layout, image } = require('larana-js')

class TitleSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		const page = this.usePage()

		return layout({
			children: [
				layout({
					style: {
						size: 2,
					},
					children: [
						image({
							src: 'https://larana.tech/larana.svg',
							onLoad: (r) => {
								page.rerender()
							},
						}),
					],
				}),
				layout({
					style: 'col',
					children: [
						text({
							style: 'h1Text',
							text: 'LaranaJS: Настоящий SSR',
						}),
						text({
							style: 'h2Text',
							text: 'Женя Кучерявый',
						}),
						text({
							style: 'h3Text',
							text: 'Founder of LaranaTech',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TitleSlideComponent }
