const { BaseComponent, layout, text } = require('larana-js')

class HeaderComponent extends BaseComponent {
	id = 'header'

	items = [
		{ label: 'Home', name: 'home' },
		{ label: 'Bar chart', name: 'home' },
		{ label: 'Todo list', name: 'todo-list' },
	]

	defaultStyle = {
		height: 80,
		direction: 'row',
		gap: 'var:u2',
		bg: 'var:accent',
	}

	root() {
		const route = this.useRoute()

		return layout({
			id: 'header',
			children: [
				text({
					id: 'headerText1',
					outlineColor: '#f0f',
					value: 'LaranaJS',
					style: 'h1Text',
				}),
				text({
					id: 'headerText2',
					outlineColor: '#f0f',
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
