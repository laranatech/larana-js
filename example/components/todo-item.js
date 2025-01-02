const { BaseComponent, text, row, button, checkbox } = require('larana-js')

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
		return row({
			children: [
				text({
					value: this.item.label,
					style: ['text', { size: 9 }],
				}),
				row({
					style: ['gap_2', { height: 'var:componentHeight' }],
					children: [
						checkbox({
							value: this.item.done,
							onChange: () => this.onDone(),
						}),
						button({
							text: 'X',
							onClick: () => this.onDelete(),
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TodoItemComponent }
