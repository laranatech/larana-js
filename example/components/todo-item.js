const { BaseComponent, text, layout, button } = require('larana-js')

class TodoItemComponent extends BaseComponent {
	defaultStyle = {
		gap: 'var:u2',
		padding: 'var:u2',
		radius: 'var:radius',
		borderColor: 'var:fg',
		height: 'var:componentHeight',
	}

	item = null
	onDelete = null

	constructor(options) {
		super(options)

		const { item, onDelete } = options

		this.item = item
		this.onDelete = onDelete
	}

	root() {
		return layout({
			children: [
				text({
					value: this.item.label,
					style: ['text', { size: 9 }],
				}),
				button({
					text: 'X',
					onClick: () => {
						this.onDelete(this.item.value)
					},
				})
			],
		})
	}
}

module.exports = { TodoItemComponent }
