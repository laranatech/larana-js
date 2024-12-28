const { Page, layout, column, image, button } = require('larana-js')

const { header } = require('../components')

class ImagePage extends Page {
	title() {
		return 'Image example'
	}

	handleClick() {

	}

	root({ w }) {
		return column({
			outlineColor: '#00f',
			id: 'body',
			style: 'body',
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
						column({
							style: 'gap_2',
							children: [
								image({
									src: '/static/images/96x96.jpg',
									style: {
										radius: 96,
										width: 96,
										aspectRatio: 1,
									},
								}),
								button({
									text: 'Change',
									onClick: () => this.handleClick(),
								}),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ImagePage }
