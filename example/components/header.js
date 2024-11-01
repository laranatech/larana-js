const { BaseComponent, layout, text } = require('larana-js')

class HeaderComponent extends BaseComponent {
	items = [
		{ label: 'Home', name: 'home' },
		{ label: 'Bar chart', name: 'home' },
		{ label: 'Todo list', name: 'todo-list' },
	]

	defaultStyle = {
		minHeight: 80,
		maxHeight: 100,
		direction: 'row',
		gap: 'var:u2',
		bg: 'var:accent',
	}

	root() {
		const route = this.useRoute()

		return layout({
			outlineColor: '#f00',
			id: 'header',
			children: [
				text({
					outlineColor: '#f0f',
					id: 'headerText1',
					value: 'LaranaJS',
					style: 'h1Text',
				}),
				text({
					outlineColor: '#f0f',
					id: 'headerText2',
					value: route.name,
					style: 'h3Text',
				}),
			],
		})
	}
}

const header = (options) => {
	return new HeaderComponent(options)
}

module.exports = { HeaderComponent, header }
