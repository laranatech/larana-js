const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')
const { ProblemsComponent } = require('./misc')

class TestingProblemsSlideComponent extends SlideComponent {
	static steps = 1

	root() {
		return layout({
			style: ['column', 'gap_1'],
			children: [
				text({
					style: 'h1',
					value: 'Решение проблем',
				}),
				layout({}),
				new ProblemsComponent({}),
			],
		})
	}
}

module.exports = { TestingProblemsSlideComponent }
