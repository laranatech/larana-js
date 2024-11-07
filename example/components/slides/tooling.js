const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ToolingSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Tooling в LaranaJS',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h2',
							value: 'npm init larana-js',
						}),
						text({
							style: 'h2',
							value: 'schemer',
						}),
						text({
							style: 'h2',
							value: 'logger',
						}),
						text({
							style: 'h2',
							value: 'testing',
						}),
						text({
							style: 'h2',
							value: 'designer',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ToolingSlideComponent }
