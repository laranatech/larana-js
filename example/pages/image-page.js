const { Page, layout, image, button } = require('larana-js')

const { header } = require('../components')

class ImagePage extends Page {
	title() {
		return 'Image example'
	}

	handleClick() {

	}

	root({ w }) {
		return layout({
			outlineColor: '#00f',
			id: 'body',
			style: [
				'body',
				'column',
			],
			children: [
				header({}),
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
						image({
							src: '/static/images/larana.svg',
						}),
						button({
							text: 'Change',
							onClick: () => this.handleClick(),
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ImagePage }
