const { Page, layout, text, table } = require('larana-js')

const { header } = require('../components')

class TablePage extends Page {
	title() {
		return 'Table page'
	}

	init() {
		const { initState } = this.useState()

		initState({
			items: [
				{ name: 'LaranaJS', language: 'JavaScript', version: '0.2.0', state: 'Active' },
				{ name: 'LaranaRS', language: 'Rust', version: '-', state: 'none' },
				{ name: 'Laranavel', language: 'PHP', version: '-', state: 'none' },
				{ name: 'Gorana', language: 'Go', version: '-', state: 'none' },
				{ name: 'Javarana', language: 'Java', version: '-', state: 'none' },
				{ name: 'RSSR', language: 'Python', version: '1', state: 'Legacy' },
			],
		})
	}

	root() {
		return layout({
			outlineColor: '#00f',
			id: 'body',
			style: [
				'body',
				'column',
			],
			children: [
				header({}),
				text({ value: 'Larana implementations', style: 'h1' }),
				layout({
					id: 'layout1',
					style: ['p_2', { size: 9 }],
					outlineColor: '#0f0',
					children: [
						table({
							model: 'items',
							showIndex: true,
							columns: [
								{ name: 'name', label: 'Name', size: 3 },
								{ name: 'language', label: 'Language', size: 2 },
								{ name: 'version', label: 'Latest version', size: 1, sortable: true },
								{ name: 'state', label: 'State', size: 1, sortable: true },
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TablePage }
