const { Page, layout, text } = require('larana-js')

const { header } = require('../components')

class SizesPage extends Page {
	title = 'Sizes'

	prepareRoot({ w, h }) {
		return layout({
			outlineColor: '#00f',
			id: 'body',
			style: [
				'body',
				'col',
				'gap_2',
				'p_4',
			],
			children: [
				layout({
					id: 'green',
					style: { bg: '#0f0', height: 30 },
				}),
				layout({
					id: 'blue',
					style: { bg: '#00f', size: 3, padding: 'var:u2', gap: 'var:u2' },
					children: [
						layout({ style: { size: 10, bg: '#ff0'} }),
						layout({ style: { size: 20, bg: '#f0f'} }),
						layout({ style: { size: 10, bg: '#0ff'} }),
						layout({ style: { width: 100, bg: '#fff'} }),
					],
				}),
				layout({
					id: 'red',
					style: { bg: '#f00', size: 2 },
				}),
			],
		})
	}
}

module.exports = { SizesPage }
