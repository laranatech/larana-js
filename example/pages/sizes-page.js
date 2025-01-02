const { Page, layout, column, row } = require('larana-js')

class SizesPage extends Page {
	title() {
		return 'Sizes'
	}

	root() {
		return column({
			outlineColor: '#00f',
			id: 'body',
			style: [
				'body',
				'gap_2',
				'p_4',
			],
			children: [
				layout({
					id: 'green',
					style: { bg: '#0f0', height: 30 },
				}),
				row({
					id: 'blue',
					style: { bg: '#00f', size: 3, padding: 'var:u2', gap: 'var:u2' },
					children: [
						layout({ style: { size: 10, bg: '#ff0', maxWidth: 150 } }),
						layout({ style: { size: 20, bg: '#f0f' } }),
						layout({ style: { size: 10, bg: '#0ff', minWidth: 500 } }),
						layout({ id: 'white', style: { width: 100, bg: '#fff', aspectRatio: 16/9 } }),
						layout({ style: { size: 10, bg: '#0ff' } }),
						layout({ style: { size: 10, bg: '#0ff' } }),
						layout({ style: { size: 10, bg: '#0ff' } }),
						column({
							id: 'hug',
							style: {
								size: 'hug',
								bg: '#0ff',
								gap: 'var:u2',
								padding: 'var:u2',
							},
							children: [
								layout({}),
								layout({ style: { width: 100 } }),
								layout({}),
								layout({}),
							],
						}),
					],
				}),
				layout({
					id: 'red',
					outlineColor: '#00f',
					style: { bg: '#f00', size: 2, maxHeight: 150 },
				}),
				layout({
					outlineColor: '#00f',
					style: { bg: '#f00', size: 2 },
				}),
				layout({
					outlineColor: '#00f',
					style: { bg: '#f00', size: 2, minHeight: 500 },
				}),
				layout({
					outlineColor: '#00f',
					style: { bg: '#f00', size: 2 },
				}),
			],
		})
	}
}

module.exports = { SizesPage }
