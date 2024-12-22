const { Page, layout, text, laranaLogo } = require('larana-js')

const { header } = require('../components')

class NotFoundPage extends Page {
	title() {
		return '404 | Page not found'
	}

	root({ w }) {
		const logoH = 512

		return layout({
			outlineColor: '#00f',
			id: 'body',
			style: [
				'body',
				'column',
			],
			children: [
				header({}),
				// layout({}),
				// laranaLogo({
				// 	style: {
				// 		width: logoH * (16 / 9),
				// 		height: logoH,
				// 	},
				// }),
				// layout({}),
				layout({
					id: 'layout1',
					style: {
						direction: w > 1028 ? 'row' : 'column',
						size: 9,
						padding: 'var:u2',
						gap: 'var:u2',
					},
					outlineColor: '#0f0',
					children: [
						text({
							outlineColor: '#0ff',
							id: 'text1',
							value: '404',
							style: 'h1',
						}),
						text({
							outlineColor: '#0ff',
							id: 'text2',
							value: 'Go back to home',
							style: 'text',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { NotFoundPage }
