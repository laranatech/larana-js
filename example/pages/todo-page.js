const {
	Page,
	LayoutComponent,
	TextComponent,
	TextInputComponent,
	ButtonComponent,
	hover,
} = require('larana-js')

const { HeaderComponent, TodoItemComponent } = require('../components')

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

		return new LayoutComponent({
			style: [
				'body',
				{
					gap: 8,
					direction: 'column',
				},
			],
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: { size: 9, gap: 8, direction: 'column' },
					children: [
						new TextComponent({
							text: 'Todo',
							style: 'h1Text',
						}),
						new LayoutComponent({
							style: { size: 8, gap: 8, padding: 8, direction: 'column' },
							children: this.state.items.map((item) => {
								return new TodoItemComponent({
									item,
									onDelete: (value) => {
										this.setState({
											items: this.state.items.filter((it) => it.value !== value)
										})
									}
								})
							}),
						}),
						new LayoutComponent({
							style: { padding: 8, gap: 8 },
							children: [
								new TextInputComponent({
									model: 'inputValue',
									style: 'input',
									onFocus: (id) => {
										this.focused = id
									},
									onInput: (value, id) => {
										if (this.focused !== id) {
											return
										}
										this.setState({ inputValue: value })
									},
								}),
								new ButtonComponent({
									style: [
										'button',
										buttonDisabled ? { fg: '#888' } : {},
									],
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
									events: [
										hover({
											style: { borderColor: !buttonDisabled ? 'var:accent' : '#f00' },
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

module.exports = {
	TodoPage,
}
