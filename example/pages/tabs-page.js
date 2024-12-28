const {
	Page,
	column,
	text,
	tabs,
} = require('larana-js')

const { header } = require('../components')

class TabsPage extends Page {
	title() {
		return 'Tabs'
	}

	init() {
		const { initState } = this.useState()

		initState({
			tabs: [
				{ value: 'tab_1', label: 'Tab 1' },
				{ value: 'tab_2', label: 'Tab 2' },
				{ value: 'tab_3', label: 'Tab 3', disabled: true },
				{ value: 'tab_4', label: 'Tab 4' },
			],
			activeTab: 'tab_1',
		})
	}

	root() {
		const { state } = this.useState()

		return column({
			style: [
				'body',
				{ gap: 'var:u2' },
			],
			children: [
				header({}),
				column({
					style: { size: 9, padding: 'var:u2' },
					children: [
						tabs({
							tabs: state.tabs,
							model: 'activeTab',
						}),
						text({ style: ['h1', { size: 9 }], model: 'activeTab' }),
					],
				}),
			],
		})
	}
}

module.exports = {
	TabsPage,
}
