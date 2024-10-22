const { BaseComponent, LayoutComponent, TextComponent, ButtonComponent } = require('larana-js')

class TodoItemComponent extends BaseComponent {
	defaultStyle = {
		gap: 8,
		padding: 8,
		radius: 'var:radius',
		borderColor: 'var:fg',
	}

	item = null
	onDelete = null

	constructor(data) {
		super(data)

		const { item, onDelete } = data

		this.item = item
		this.onDelete = onDelete
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				children: [
					new TextComponent({
						text: this.item.label,
						style: ['text', { size: 9 }],
					}),
					new ButtonComponent({
						text: 'X',
						style: 'button',
						onClick: () => {
							this.onDelete(this.item.value)
						},
					})
				],
			})
		]
	}
}

module.exports = { TodoItemComponent }
