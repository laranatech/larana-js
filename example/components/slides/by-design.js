const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')
const { ProblemsComponent } = require('./misc')

class ByDesignSlideComponent extends SlideComponent {
	static steps = 1

	root() {
		return layout({
			style: ['column', 'gap_1'],
			children: [
				text({
					style: 'h1',
					value: 'Решение проблем на уровне архитектуры',
				}),
				layout({}),
				new ProblemsComponent({}),
			],
		})
	}
}

module.exports = { ByDesignSlideComponent }
