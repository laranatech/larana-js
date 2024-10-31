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
					text: 'Tooling в LaranaJS',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({
							style: 'h2Text',
							text: 'npm init larana-js',
						}),
						text({
							style: 'h2Text',
							text: 'schemer',
						}),
						text({
							style: 'h2Text',
							text: 'logger',
						}),
						text({
							style: 'h2Text',
							text: 'testing',
						}),
						text({
							style: 'h2Text',
							text: 'designer',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ToolingSlideComponent }
