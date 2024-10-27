const { BaseComponent } = require('../base-component.js')
const { LayoutComponent } = require('../layout.js')
const { ButtonComponent } = require('../button.js')

class TabsComponent extends BaseComponent {
	tabs = []

	defaultStyle = {
		gap: 'var:u2',
		padding: 'var:u2',
		bg: 'var:componentBg',
		radius: 'var:radius',
	}

	onChange = null

	constructor(data) {
		super(data)
		
		const { tabs, onChange } = data

		this.tabs = tabs
		this.onChange = onChange
	}

	getChildren(data) {
		const activeTab = this.getModelValue(data)

		const c = new LayoutComponent({
			parent: this,
			children: this.tabs.map((tab) => {
				return new ButtonComponent({
					style: {
						bg: tab.value === activeTab ? 'var:accent' : null,
						fg: tab.disabled ? '#888' : 'var:fg',
						radius: 'var:radius',
					},
					text: tab.label,
					onClick: () => {
						if(tab.disabled) {
							return
						}

						if (this.onChange) {
							this.onChange(tab.value)
						}

						this.updateModelValue(data, tab.value)
					},
				})
			}),
		})

		return [c]
	}
}

module.exports = { TabsComponent }
