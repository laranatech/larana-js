const { Page, text, layout } = require('larana-js')

const { header } = require('../components')

class GamePage extends Page {
	title = 'Game'

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
							value: 'Game page',
							style: 'h1Text',
						}),
						text({
							value: 'Soon here will be demo',
							style: 'text',
						}),
					],
				})
			],
		})
	}
}

module.exports = { GamePage }
