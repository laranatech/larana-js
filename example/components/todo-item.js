const { BaseComponent, text, layout, button } = require('larana-js')

class TodoItemComponent extends BaseComponent {
	defaultStyle = {
		gap: 'var:u2',
		padding: 'var:u2',
		radius: 'var:radius',
		borderColor: 'var:fg',
		size: 'hug',
	}

	item = null
	onDelete = null
	onDone = null

	constructor(options) {
		super(options)

		const { item, onDelete, onDone } = options

		this.item = item
		this.onDelete = onDelete
		this.onDone = onDone
	}

	root() {
		return layout({
			children: [
				text({
					// id: 'todo_text_id',
					value: this.item.label,
					style: ['text', { size: 9 }],
				}),
				// layout({
				// 	style: 'gap_2',
				// 	children: [
				// 		checkbox({
				// 			value: item.done,
				// 			onChange: () => {
				// 				this.toggleItem(item, i)
				// 			},
				// 		}),
				// 		button({
				// 			text: 'X',
				// 			onClick: () => {
				// 				this.deleteItem(item, i)
				// 			},
				// 		}),
				// 	],
				// }),
				button({
					text: 'X',
					onClick: () => {
						this.onDelete(this.item.value)
					},
				}),
			],
		})
	}
}

module.exports = { TodoItemComponent }
