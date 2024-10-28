const {
	BaseComponent,
	TextComponent,
	LayoutComponent,
	ImageComponent,
	ListComponent,
	ButtonComponent,
	CheckboxComponent,
	TextInputComponent,
} = require('larana-js')

class TODOListSlideComponent extends BaseComponent {
	static steps = 2
	step = 1

	constructor(data) {
		super(data)
		this.step = data.step
	}

	toggleItem(data, item, index) {
		const { state, setState } = data.session.page.getState()
		const items = state.todoItems

		items[index].done = !item.done

		setState({
			todoItems: items,
		})
	}

	deleteItem(data, item, index) {
		const { state, setState } = data.session.page.getState()

		setState({
			todoItems: state.todoItems.filter((_, i) => i !== index),
		})
	}

	createItem(data) {
		const { state, setState } = data.session.page.getState()

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

	templateItem = (data, item, i) => {
		return new LayoutComponent({
			children: [
				new TextComponent({
					text: i,
				}),
				new TextComponent({
					style: ['text', { size: 9 }],
					text: item.label,
				}),
				new LayoutComponent({
					style: 'gap_2',
					children: [
						new CheckboxComponent({
							value: item.done,
							onChange: () => {
								console.log(this)
								this.toggleItem(data, item, i)
							},
						}),
						new ButtonComponent({
							text: 'X',
							onClick: () => {
								this.deleteItem(data, item, i)
							},
						}),
					],
				}),
				
			],
		})
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'TODO-List на LaranaJS',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new LayoutComponent({
								style: ['col', 'gap_1'],
								children: [
									new ListComponent({
										style: 'size_5',
										model: 'todoItems',
										template: this.templateItem,
									}),
									new LayoutComponent({
										style: 'gap_2',
										children: [
											new TextInputComponent({
												model: 'todoInputValue',
												onEnter: () => {
													this.createItem(data)
												},
											}),
											new ButtonComponent({
												text: 'Add',
												onClick: () => {
													this.createItem(data)
												},
											}),
										],
									}),
								],
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { TODOListSlideComponent }
