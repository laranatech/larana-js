const {
	Page,
	layout,
	text,
	textInput,
	button,
	hover,
	list,
} = require('larana-js')

const { header, TodoItemComponent } = require('../components')

class TodoPage extends Page {
	title = 'Todo'

	init() {
		this.state = {
			items: [
				{ label: 'Item 1', value: crypto.randomUUID() },
				{ label: 'Item 2', value: crypto.randomUUID() },
				{ label: 'Item 3', value: crypto.randomUUID() },
			],
			inputValue: '',
		}
	}

	prepareRoot({ w, h }) {
		const buttonDisabled = this.state.inputValue === ''

		return layout({
			id: 'body',
			style: [
				'body',
				{
					gap: 'var:u2',
					direction: 'column',
				},
			],
			children: [
				header({}),
				layout({
					id: 'layout',
					style: { size: 9, gap: 'var:u2', direction: 'column' },
					children: [
						text({
							id: 'titleText',
							value: 'Todo',
							style: 'h1Text',
						}),
						list({
							id: 'list',
							style: { size: 9, padding: 'var:u2' },
							model: 'items',
							template: (item, i) => new TodoItemComponent({
								id: `todo-item_${i}`,
								item,
								onDelete: (value) => {
									this.setState({
										items: this.state.items.filter((it) => it.value !== value)
									})
								}
							}),
						}),
						layout({
							id: 'bottom',
							style: { padding: 'var:u2', gap: 'var:u2' },
							children: [
								textInput({
									model: 'inputValue',
									onFocus: (id) => {
										this.focused = id
									},
								}),
								button({
									id: 'addButton',
									// style: buttonDisabled ? { fg: 'var:disabledFg' } : {},
									text: 'Add',
									onClick: () => {
										if (buttonDisabled) {
											return
										}
										this.setState({
											items: [
												...this.state.items,
												{ label: this.state.inputValue, value: crypto.randomUUID() },
											],
											inputValue: '',
										})
									},
								}),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = {
	TodoPage,
}
