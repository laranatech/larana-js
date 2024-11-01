const { BaseComponent, text, layout } = require('larana-js')

class TestingSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Тестирование LaranaJS',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'Использование стейта в тестах',
						}),
						text({
							style: 'h2Text',
							value: 'скриншотные тесты',
						}),
						text({
							style: 'h2Text',
							value: 'скриншотные тесты с чексуммой',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TestingSlideComponent }
