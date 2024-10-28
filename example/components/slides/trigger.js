const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')


class TriggerSlideComponent extends BaseComponent {
	static steps = 9
	step = 1

	constructor(data) {
		super(data)
		this.step = data.step
	}

	getChildren(data) {
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

		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Зачем нужен ещё один фреймворк?',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							...lines.splice(0, this.step).map((line) => {
								return new TextComponent({
									style: 'h2Text',
									text: line,
								})
							}),
							new LayoutComponent({
								style: {
									size: TriggerSlideComponent.steps - this.step,
								},
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { TriggerSlideComponent }
