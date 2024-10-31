const { BaseComponent } = require('../base-component.js')
const { layout } = require('../layout.js')
const { button } = require('../button.js')

class TabsComponent extends BaseComponent {
	tabs = []

	defaultStyle = {
		gap: 'var:u2',
		padding: 'var:u2',
		bg: 'var:componentBg',
		radius: 'var:radius',
		height: 'var:componentHeight',
	}

	onChange = null

	constructor(options) {
		super(options)
		
		const { tabs, onChange } = options

		this.tabs = tabs
		this.onChange = onChange
	}

	root() {
		const activeTab = this.getModelValue()

		return layout({
			children: this.tabs.map((tab) => {
				return button({
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

						this.updateModelValue(tab.value)
					},
				})
			}),
		})
	}
}

const tabs = (options) => {
	return new TabsComponent(options)
}

module.exports = { TabsComponent, tabs }
