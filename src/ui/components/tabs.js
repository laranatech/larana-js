const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')
const { ButtonComponent } = require('./button.js')
const { click } = require('../events')

class TabsComponent extends BaseComponent {
	tabs = []
	model = ''

	defaultStyle = {
		gap: 8,
		padding: 8,
		bg: 'var:componentBg',
		radius: 4,
	}

	onChange = null

	constructor(data) {
		super(data)
		
		const { tabs, model, onChange } = data

		this.tabs = tabs
		this.model = model
		this.onChange = onChange
	}

	getChildren(data) {
		const { state } = data

		const activeTab = state[this.model]

		const c = new LayoutComponent({
			parent: this,
			children: this.tabs.map((tab) => {
				return new ButtonComponent({
					style: {
						bg: tab.value === activeTab ? 'var:accent' : null,
						fg: tab.disabled ? '#888' : 'var:fg',
						radius: 4,
					},
					text: tab.label,
					onClick: () => {
						if (this.onChange && !tab.disabled) {
							this.onChange(tab.value)
						}
					},
				})
			}),
		})

		return [c]
	}
}

module.exports = { TabsComponent }
