const { Style, BaseComponent, LayoutComponent, TextComponent, useStyleVar } = require('larana-js')

const { styles } = require('../styles')

class HeaderComponent extends BaseComponent {
	items = [
		{ label: 'Home', name: 'home' },
		{ label: 'Bar chart', name: 'home' },
		{ label: 'Todo list', name: 'todo-list' },
	]

	constructor(data) {
		super(data)

		this.style.minHeight = 80
		this.style.maxHeight = 100
	}

	getChildren(state) {
		return [
			new LayoutComponent({
				parent: this,
				style: new Style({
					direction: 'row',
					gap: 8,
					bg: '#333',
				}),
				children: [
					new TextComponent({
						text: 'LaranaJS',
						style: new Style({
							...styles.get('h1Text'),
							fg: useStyleVar('accent'),
						})
					}),
				],
			})
		]
	}
}

module.exports = { HeaderComponent }
