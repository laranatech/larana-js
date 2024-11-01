const { BaseComponent, text, layout } = require('larana-js')

class ToolingSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Tooling в LaranaJS',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							value: 'npm init larana-js',
						}),
						text({
							style: 'h2Text',
							value: 'schemer',
						}),
						text({
							style: 'h2Text',
							value: 'logger',
						}),
						text({
							style: 'h2Text',
							value: 'testing',
						}),
						text({
							style: 'h2Text',
							value: 'designer',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ToolingSlideComponent }
