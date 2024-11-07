const { Page, text, layout } = require('larana-js')

const { header } = require('../components')

class GamePage extends Page {
	title() {
		return 'Game'
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
							value: 'Game page',
							style: 'h1',
						}),
						text({
							value: 'Soon here will be demo',
							style: 'text',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { GamePage }
