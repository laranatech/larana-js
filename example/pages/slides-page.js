const { Page, text, layout, keypress, progressBar, button, qrcode } = require('larana-js')

const { slides } = require('../components')

class SlidesPage extends Page {
	title() {
		return 'LaranaJS | Slides'
	}

	focused = 'body'

	init() {
		const { initState } = this.useState()

		const { queryParams } = this.useRoute()

		const currentStep = Number(queryParams.step ?? 1)

		const s = Object.values(slides)

		initState({
			slides: s,
			currentStep,
			totalSteps: s.reduce((acc, curr) => acc + curr.steps, 0),
			checkbox1: true,
			checkbox2: false,
			checkbox3: false,
			disabledCheckbox: 'checkbox1',
			throbber: 0,
			progress: 0,
			chartItems: this.prepareChartItems(),
			todoItems: [
				{ ts: Date.now() + 2, label: 'Buy milk', done: true },
				{ ts: Date.now() + 3, label: 'Buy eggs', done: true },
				{ ts: Date.now() + 4, label: 'Buy cookies', done: false },
			],
			todoInputValue: '',
			problems: [
				{ label: 'Большая нагрузка на клиент', done: false },
				{ label: 'Множество разных клиентов', done: false },
				{ label: 'HTML & CSS', done: false },
				{ label: 'Открытый стейт', done: false },
				{ label: 'Разница дев и прод сборок', done: false },
				{ label: 'Рантайм', done: false },
				{ label: 'Сложно тестировать', done: false },
				{ label: 'Много типовых проблем', done: false },
			],
		})
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
		const { state } = this.useState()

		let currentSlideIndex = -1
		let passedSteps = 0

		const { slides, currentStep } = state

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
			slide: state.slides[currentSlideIndex],
			passedSteps,
		}
	}

	root() {
		const { state } = this.useState()
		const { slide, passedSteps } = this.getCurrentSlideInfo()

		return layout({
			id: 'body',
			focusable: true,
			style: [
				'body',
				{ direction: 'column' },
			],
			events: [
				keypress({
					handler: (value) => this.handleSlideChange(value),
				}),
			],
			children: [
				layout({
					style: {
						size: 9,
						direction: 'column',
						padding: 'var:u2',
					},
					children: [
						new slide({
							step: state.currentStep - passedSteps,
						}),
					],
				}),
				layout({
					style: {
						gap: 'var:u2',
						padding: 'var:u2',
						size: 'hug',
					},
					children: [
						progressBar({
							model: 'currentStep',
							total: state.totalSteps,
							style: { size: 12, height: 16, padding: 0 },
						}),
						layout({
							children: [
								button({
									style: { height: 16 },
									text: '←',
									onClick: () => this.changeStep(-1),
								}),
								text({
									style: 'text',
									value: state.currentStep,
								}),
								button({
									style: { height: 16 },
									text: '→',
									onClick: () => this.changeStep(1),
								}),
							],
						}),
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
		const { state, setState } = this.useState()
		const router = this.useRouter()

		let currentStep = state.currentStep + d

		if (currentStep < 1) {
			currentStep = 1
		}
		if (currentStep >= state.totalSteps) {
			currentStep = state.totalSteps
		}

		setState({ currentStep })
		router.push({ queryParams: { step: currentStep } })
	}
}

module.exports = { SlidesPage }
