const { Page, layout, text } = require('larana-js')

const { header } = require('../components')

class ShapesPage extends Page {
	title = 'Shapes page'

	prepareRoot({ w, h }) {
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
							text: 'shapes',
							style: 'h1Text',
						}),
						text({
							text: 'Go back to home',
							style: 'text',
						}),
					],
				})
			],
		})
	}
}

module.exports = { ShapesPage }
