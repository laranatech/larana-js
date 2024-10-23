const { Page, LayoutComponent, TextComponent, keypress, ProgressBarComponent } = require('larana-js')

class SlidesPage extends Page {
	title = 'LaranaJS | Slides'

	focused = 'body'

	init() {
		const currentSlide = Number(this.session.route.queryParams.slide ?? 1) - 1

		this.state = {
			slides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			currentSlide,
		}
	}

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			id: 'body',
			focusable: true,
			style: [
				'body',
				{ direction: 'column' },
			],
			events: [
				keypress({
					handler: (data, value) => {
						const d = value === 'ArrowLeft' ? -1 : value === 'ArrowRight' ? 1 : 0

						let currentSlide = this.state.currentSlide + d

						if (currentSlide < 0) {
							currentSlide = 0
						}
						if (currentSlide > this.state.slides.length) {
							currentSlide = this.state.slides.length
						}

						this.setState({ currentSlide })
					},
				}),
			],
			children: [
				new LayoutComponent({
					style: {
						size: 9,
						direction: 'column',
						padding: 8,
					},
					children: [
						new TextComponent({
							text: '404',
							style: 'h1Text',
						}),
						new TextComponent({
							text: 'Go back to home',
							style: 'text',
						}),
					],
				}),
				new LayoutComponent({
					style: { size: 1, padding: 8 },
					children: [
						new LayoutComponent({
							style: { size: 10 },
						}),
						new LayoutComponent({
							style: {
								borderColor: '#ccc',
							},
							children: [
								new TextComponent({
									style: 'text',
									text: this.state.currentSlide + 1,
								}),
							],
						})
					],
				}),
				new LayoutComponent({
					style: { padding: 8 },
					children: [
						new ProgressBarComponent({ model: 'currentSlide', total: this.state.slides.length }),
					],
				}),
			],
		})
	}
}

module.exports = { SlidesPage }
