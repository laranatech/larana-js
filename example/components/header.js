const { BaseComponent, LayoutComponent, TextComponent } = require('larana-js')

class HeaderComponent extends BaseComponent {
	items = [
		{ label: 'Home', name: 'home' },
		{ label: 'Bar chart', name: 'home' },
		{ label: 'Todo list', name: 'todo-list' },
	]

	defaultStyle = {
		minHeight: 80,
		maxHeight: 100,
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: {
					direction: 'row',
					gap: 'var:u2',
					bg: 'var:accent',
				},
				children: [
					new TextComponent({
						text: 'LaranaJS',
						style: [
							'h1Text',
							{ fg: 'var:fg' },
						],
					}),
				],
			})
		]
	}
}

module.exports = { HeaderComponent }
