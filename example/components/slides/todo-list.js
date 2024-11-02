const {
	BaseComponent,
	text,
	layout,
	button,
	textInput,
	list,
	checkbox,
} = require('larana-js')

class TODOListSlideComponent extends BaseComponent {
	static steps = 2
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}

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

	templateItem = (item, i) => {
		return layout({
			children: [
				text({ value: i }),
				text({
					style: ['text', { size: 9 }],
					value: item.label,
				}),
				layout({
					style: 'gap_2',
					children: [
						checkbox({
							value: item.done,
							onChange: () => {
								this.toggleItem(item, i)
							},
						}),
						button({
							text: 'X',
							onClick: () => {
								this.deleteItem(item, i)
							},
						}),
					],
				}),
				
			],
		})
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'TODO-List на LaranaJS',
				}),
				layout({
					style: ['column', 'gap_1', 'size_5'],
					children: [
						this.step === 1 ? text({ value: 'Пример кода TODO list' })
						: layout({
							style: ['column', 'gap_1'],
							children: [
								list({
									style: 'size_5',
									model: 'todoItems',
									template: this.templateItem,
								}),
								layout({
									style: 'gap_2',
									children: [
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
									],
								}),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { TODOListSlideComponent }
