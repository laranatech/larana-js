const {
	Page,
	LayoutComponent,
	TextComponent,
	TabsComponent,
} = require('larana-js')

const { HeaderComponent } = require('../components')

class TabsPage extends Page {
	title = 'Tabs'

	init() {
		this.state = {
			tabs: [
				{ value: 'tab_1', label: 'Tab 1' },
				{ value: 'tab_2', label: 'Tab 2' },
				{ value: 'tab_3', label: 'Tab 3', disabled: true },
				{ value: 'tab_4', label: 'Tab 4' },
			],
			activeTab: 'tab_1',
		}
	}

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: [
				'body',
				{
					gap: 'var:u2',
					direction: 'column',
				},
			],
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: { size: 9, direction: 'column', padding: 'var:u2' },
					children: [
						new TabsComponent({
							style: { size: 1 },
							tabs: this.state.tabs,
							model: 'activeTab',
						}),
						new TextComponent({ style: ['h1Text', { size: 9 }], model: 'activeTab' }),
					],
				}),
			],
		})
	}
}

module.exports = {
	TabsPage,
}
