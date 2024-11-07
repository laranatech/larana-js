const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide')

class A11ySlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Доступность (A11y)',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h0',
							value: 'Как ларана работает с доступностью?',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { A11ySlideComponent }
