const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class TestingSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Тестирование LaranaJS',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: 'Использование стейта в тестах',
						}),
						text({
							style: 'h2',
							value: 'скриншотные тесты',
						}),
						text({
							style: 'h2',
							value: 'скриншотные тесты с чексуммой',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TestingSlideComponent }
