const { Page, layout, text } = require('larana-js')

const { header } = require('../components')

class ShapesPage extends Page {
	title() {
		return 'Shapes page'
	}

	root({ w }) {
		return layout({
			style: [
				'body',
				{ direction: 'column' },
			],
			children: [
				header({}),
				layout({
					style: {
						direction: w > 1028 ? 'row' : 'column',
						size: 9,
					},
					children: [
						text({
							value: 'shapes',
							style: 'h1',
						}),
						text({
							value: 'Go back to home',
							style: 'text',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ShapesPage }
