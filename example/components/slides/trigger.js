const { BaseComponent, text, layout } = require('larana-js')


class TriggerSlideComponent extends BaseComponent {
	static steps = 9
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		const lines = [
			'',
			'Много проблем с современным фронтендом:',
			'- Большая нагрузка на клиент',
			'- Открытый стейт',
			'- Разница дев и прод сборок',
			'- Рантайм',
			'- сложно тестировать',
			'- HTML & CSS',
			'- Много типовых проблем',
		]

		return layout({
			children: [
				text({
					style: 'h1Text',
					text: 'Зачем нужен ещё один фреймворк?',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						...lines.splice(0, this.step).map((line) => {
							return text({
								style: 'h2Text',
								text: line,
							})
						}),
						layout({
							style: {
								size: TriggerSlideComponent.steps - this.step,
							},
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TriggerSlideComponent }
