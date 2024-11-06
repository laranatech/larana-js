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
				{ label: 'Item 1', value: crypto.randomUUID(), done: false },
				{ label: 'Item 2', value: crypto.randomUUID(), done: false },
				{ label: 'Item 3', value: crypto.randomUUID(), done: false },
			],
			inputValue: '',
		})
	}

	deleteItem(i) {
		const { state, setState } = this.useState()
		setState({
			items: state.items.filter((_, index) => index !== i),
		})
	}

	toggleItem(i) {
		const { state, setState } = this.useState()
		state.items[i].done = !state.items[i].done
		setState({ items: state.items })
	}

	addItem() {
		const { state, setState } = this.useState()
		setState({
			items: [
				...state.items,
				{ label: state.inputValue, value: crypto.randomUUID() },
			],
			inputValue: '',
		})
	}

	inputBar() {
		const { state } = this.useState()

		return layout({
			style: ['gap_2', 'p_2', 'hug'],
			children: [
				textInput({
					model: 'inputValue',
					onEnter: () => this.addItem(),
				}),
				button({
					text: 'Add',
					disabled: state.inputValue === '',
					onClick: () => this.addItem(),
				}),
			],
		})
	}

	todoList() {
		return list({
			style: { size: 9, padding: 'var:u2' },
			model: 'items',
			template: (item, i) => new TodoItemComponent({
				id: `todo-item_${i}`,
				item,
				onDelete: () => this.deleteItem(i),
				onDone: () => this.toggleItem(i),
			}),
		})
	}

	root() {
		return layout({
			style: ['body', 'gap_5', 'column'],
			children: [
				header({}),
				layout({
					style: { size: 9, gap: 'var:u2', direction: 'column' },
					children: [
						this.todoList(),
						this.inputBar(),
					],
				}),
			],
		})
	}
}

module.exports = {
	TodoPage,
}
