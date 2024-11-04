const {
	Page,
	layout,
	text,
	textInput,
	button,
	list,
} = require('larana-js')

const { header, TodoItemComponent } = require('../components')

class TodoPage extends Page {
	title() {
		return 'Todo'
	}

	init() {
		const { initState } = this.useState()

		initState({
			items: [
				{ label: 'Item 1', value: crypto.randomUUID() },
				{ label: 'Item 2', value: crypto.randomUUID() },
				{ label: 'Item 3', value: crypto.randomUUID() },
			],
			inputValue: '',
		})
	}

	root() {
		const { state, setState } = this.useState()

		const buttonDisabled = state.inputValue === ''

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
									setState({
										items: state.items.filter((it) => it.value !== value),
									})
								},
							}),
						}),
						layout({
							id: 'bottom',
							style: {
								padding: 'var:u2', gap: 'var:u2',
								size: 'hug',
							},
							children: [
								textInput({ model: 'inputValue' }),
								button({
									id: 'addButton',
									// style: buttonDisabled ? { fg: 'var:disabledFg' } : {},
									text: 'Add',
									onClick: () => {
										if (buttonDisabled) {
											return
										}
										setState({
											items: [
												...state.items,
												{ label: state.inputValue, value: crypto.randomUUID() },
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
