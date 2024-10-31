const { BaseComponent, text, layout, throbber } = require('larana-js')

class AnimationsSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					text: 'Анимация',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						throbber({ model: 'throbber' }),
					],
				}),
			],
		})
	}
}

module.exports = { AnimationsSlideComponent }
