const {
	Page, text, layout, keypress, progressBar, button, qrcode, img,
	image,
} = require('larana-js')

const { slides } = require('../components')

class SlidesPage extends Page {
	title() {
		return 'HolyJS 2024 Autumn'
	}

	images = [
		'https://kucheriavyi.ru/images/slides/wink_1.webp',
		'https://kucheriavyi.ru/images/slides/portrait_1.webp',
		'https://kucheriavyi.ru/images/slides/vueact.png',
		'https://kucheriavyi.ru/images/slides/larana-suit.jpg',
		'https://kucheriavyi.ru/images/slides/techmeetup.jpg',
		'https://kucheriavyi.ru/images/slides/techmeetup_fun.jpg',
		'https://kucheriavyi.ru/images/slides/techmeetup_sad.jpg',
		'https://kucheriavyi.ru/images/slides/point.jpg',
		'https://larana.tech/larana.svg',
		'https://kucheriavyi.ru/images/slides/money.jpg',
		'https://kucheriavyi.ru/images/slides/no-money.jpg',
		'https://kucheriavyi.ru/images/slides/point_larana.jpg',
		'https://kucheriavyi.ru/images/slides/seo.jpeg',
		'https://kucheriavyi.ru/images/slides/maul.jpg',
		'https://kucheriavyi.ru/images/slides/hypejs.jpg',
		'https://kucheriavyi.ru/images/slides/designer.png',
	]

	qrcodes = [
		'Hello, world!',
		'https://t.me/+1aK0hJw21ShlMWVi',
		'https://t.me/+oiDOgBndnZ5hYzIy',
	]

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
				{ label: 'Открытый стейт', done: false },
				{ label: 'Разница дев и прод сборок', done: false },
				{ label: 'HTML & CSS', done: false },
				{ label: 'JavaScript', done: false },
				{ label: 'Дизайнеры и верстальщики', done: false },
				{ label: 'Сложно тестировать', done: false },
				{ label: 'Много типовых проблем', done: false },
			],
		})
	}

	loadResources() {
		this.images.forEach((src) => img(src))
		this.qrcodes.forEach((qr) => qrcode(qr))
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
						layout({
							style: { size: 0, width: 0, height: 0 },
							children: [
								...this.images.map((v) => image({ src: v })),
								...this.qrcodes.map((v) => image({ qr: v })),
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
