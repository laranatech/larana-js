const {
	text,
	layout,
	button,
	textInput,
	list,
} = require('larana-js')
const { TodoItemComponent } = require('../todo-item.js')
const { SlideComponent } = require('../slide.js')

class TODOListSlideComponent extends SlideComponent {
	static steps = 1

	toggleItem(item, index) {
		const { state, setState} = this.useState()
		const items = state.todoItems

		items[index].done = !item.done

		setState({
			todoItems: items,
		})
	}

	deleteItem(item, index) {
		const { state, setState } = this.useState()

		setState({
			todoItems: state.todoItems.filter((_, i) => i !== index),
		})
	}

	createItem() {
		const { state, setState } = this.useState()

		const inputValue = state.todoInputValue

		if (!inputValue) {
			return
		}

		setState({
			todoItems: [
				...state.todoItems,
				{ ts: Date.now(), label: inputValue, done: false },
			],
			todoInputValue: '',
		})
	}

	todoBody() {
		return layout({
			style: ['column', 'gap_2'],
			children: [
				list({
					style: ['size_5', 'p_2', { borderColor: 'var:componentBorderColor' }],
					model: 'todoItems',
					template: (item, i) => new TodoItemComponent({
						item,
						onDone: () => this.toggleItem(item, i),
						onDelete: () => this.deleteItem(item, i),
					}),
				}),
				layout({
					style: 'gap_2',
					children: [
						layout({}),
						textInput({
							model: 'todoInputValue',
							onEnter: () => {
								this.createItem()
							},
						}),
						button({
							text: 'Add',
							onClick: () => {
								this.createItem()
							},
						}),
						layout({}),
					],
				}),
			],
		})
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'TODO-List на LaranaJS',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						this.todoBody(),
					],
				}),
			],
		})
	}
}

module.exports = { TODOListSlideComponent }
