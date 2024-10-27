const { Page, LayoutComponent, TextComponent, keypress, ProgressBarComponent, ButtonComponent } = require('larana-js')

const { slides } = require('../components')

class SlidesPage extends Page {
	title = 'LaranaJS | Slides'

	focused = 'body'

	init() {
		const currentStep = Number(this.session.route.queryParams.step ?? 1)

		const s = Object.values(slides)

		this.state = {
			slides: s,
			currentStep,
			totalSteps: s.reduce((acc, curr) => acc + curr.steps, 0),
		}
	}

	getCurrentSlideInfo() {
		let currentSlideIndex = -1
		let passedSteps = 0

		const { slides, currentStep, totalSteps } = this.state

		slides.forEach((slide, i) => {
			const steps = slide.steps
			if (currentSlideIndex !== -1) {
				return
			}

			if (passedSteps + steps >= currentStep && passedSteps <= currentStep) {
				currentSlideIndex = i
				return
			}

			passedSteps += steps
		})

		if (currentSlideIndex === -1) {
			currentSlideIndex = 0
		}

		return {
			slide: this.state.slides[currentSlideIndex],
			passedSteps,
		}
	}

	prepareRoot({ w, h }) {
		const { slide, passedSteps } = this.getCurrentSlideInfo()

		return new LayoutComponent({
			id: 'body',
			focusable: true,
			style: [
				'body',
				{ direction: 'column' },
			],
			events: [
				keypress({
					handler: (data, value) => this.handleSlideChange(value),
				}),
			],
			children: [
				new LayoutComponent({
					style: {
						size: 9,
						direction: 'column',
						padding: 'var:u2',
					},
					children: [
						new slide({
							step: this.state.currentStep - passedSteps,
						}),
					],
				}),
				new LayoutComponent({
					style: { gap: 'var:u2', padding: 'var:u2' },
					children: [
						new ProgressBarComponent({
							value: this.state.currentStep,
							total: this.state.totalSteps,
							style: { size: 12 },
						}),
						new LayoutComponent({
							style: {
								borderColor: '#ccc',
								padding: 'var:u1',
								radius: 'var:radius',
							},
							children: [
								new ButtonComponent({
									text: '←',
									onClick: () => this.changeStep(-1),
								}),
								new TextComponent({
									style: 'text',
									text: this.state.currentStep,
								}),
								new ButtonComponent({
									text: '→',
									onClick: () => this.changeStep(1),
								}),
							],
						})
					],
				}),
			],
		})
	}

	handleSlideChange(value) {
		const d = ['ArrowLeft', 'ArrowUp'].includes(value) ? -1 : ['ArrowRight', 'ArrowDown'].includes(value) ? 1 : 0

		this.changeStep(d)
	}

	changeStep(d) {
		let currentStep = this.state.currentStep + d

		if (currentStep < 1) {
			currentStep = 1
		}
		if (currentStep >= this.state.totalSteps) {
			currentStep = this.state.totalSteps
		}

		this.setState({ currentStep })
	}
}

module.exports = { SlidesPage }
