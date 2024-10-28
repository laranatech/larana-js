const { Page, LayoutComponent, TextComponent, keypress, ProgressBarComponent, ButtonComponent, qrcode } = require('larana-js')

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
			checkboxValue1: true,
			checkboxValue2: false,
			checkboxValue3: false,
			radioValue: 'item_1',
			throbber: 0,
			chartItems: this.prepareChartItems(),
			todoItems: [
				{ ts: Date.now() + 2, label: 'Buy milk', done: true },
				{ ts: Date.now() + 3, label: 'Buy eggs', done: true },
				{ ts: Date.now() + 4, label: 'Buy cookies', done: false },
			],
			todoInputValue: '',
		}
	}

	loadResources() {
		qrcode('Hello, world!')
	}

	prepareChartItems() {
		return [
			{ value: 100, label: '01' },
			{ value: 90, label: '02' },
			{ value: 60, label: '03' },
			{ value: 190, label: '04' },
			{ value: 60, label: '05' },
			{ value: 100, label: '06' },
			{ value: 120, label: '07' },
			{ value: 300, label: '08' },
			{ value: 500, label: '09' },
			{ value: 150, label: '10' },
			{ value: 100, label: '11' },
			{ value: 70, label: '12' },
		]
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
		this.pushQueryParams({ step: currentStep })
	}
}

module.exports = { SlidesPage }
