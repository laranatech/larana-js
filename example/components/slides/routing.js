const { BaseComponent, text, layout } = require('larana-js')

class RoutingSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Routing в LaranaJS',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'Пример инициализации',
						}),
						text({
							style: 'h2Text',
							value: 'Пример использования 1',
						}),
						text({
							style: 'h2Text',
							value: 'Пример использования 2',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { RoutingSlideComponent }
