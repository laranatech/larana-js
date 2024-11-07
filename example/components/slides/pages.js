const { text, layout, code } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class PagesSlideComponent extends SlideComponent {
	static steps = 6

	root() {
		const code1 = [
			`class TodoPage extends Page {`,
			`    title() {`,
			`        return "Todo"`,
			`    }`,
			'',
			`    init() {`,
			`        const { initState } = this.useState()`,
			`        initState({`,
			`            items: [],`,
			`            inputValue: "",`,
			`        })`,
			`    }`,
		]

		const code2 = [
			`class TodoPage extends Page {`,
			`// ...`,
			`    addItem() {`,
			`        const { state, setState } = this.useState()`,
			`        setState({`,
			`            items: [`,
			`                ...state.items,`,
			`                { label: state.inputValue, value: crypto.randomUUID() },`,
			`            ],`,
			`            inputValue: "",`,
			`        })`,
			`    }`,
		]

		const code3 = [
			`class TodoPage extends Page {`,
			`// ...`,
			`    deleteItem(i) {`,
			`        const { state, setState } = this.useState()`,
			`        setState({`,
			`            items: state.items.filter((_, index) => index !== i),`,
			`        })`,
			`    }`,
			'',
			`    toggleItem(i) {`,
			`        const { state, setState } = this.useState()`,
			`        state.items[i].done = !state.items[i].done`,
			`        setState({ items: state.items })`,
			`    }`,
		]

		const code4 = [
			`class TodoPage extends Page {`,
			`// ...`,
			`    todoList() {`,
			`        return list({`,
			`            style: { size: 9, padding: "var:u2" },`,
			`            model: "items",`,
			`            template: (item, i) => new TodoItemComponent({`,
			"                id: `todo-item_${i}`,",
			`                item,`,
			`                onDelete: () => this.deleteItem(i),`,
			`                onDone: () => this.toggleItem(i),`,
			`            }),`,
			`        })`,
			`    }`,
		]

		const code5 = [
			`class TodoPage extends Page {`,
			`// ...`,
			`    inputBar() {`,
			`        const { state } = this.useState()`,
			`        return layout({`,
			`            style: ["gap_2", "p_2", "hug"],`,
			`            children: [`,
			`                textInput({ model: "inputValue", onEnter: () => this.addItem() }),`,
			`                button({`,
			`                    text: "Add",`,
			`                    disabled: state.inputValue === "",`,
			`                    onClick: () => this.addItem(),`,
			`                }),`,
			`            ],`,
			`        })`,
			`    }`,
		]

		const code6 = [
			`class TodoPage extends Page {`,
			`// ...`,
			`    root() {`,
			`        return layout({`,
			`            style: ["body", "gap_5", "column"],`,
			`            children: [`,
			`                header({}),`,
			`                layout({`,
			`                    style: { size: 9, gap: "var:u2", direction: "column" },`,
			`                    children: [ this.todoList(), this.inputBar() ],`,
			`                }),`,
			`            ],`,
			`       })`,
			`    }`,
			'}',
		]

		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Создание страницы',
				}),
				code({
					style: { size: 9 },
					value: [
						code1,
						code2,
						code3,
						code4,
						code5,
						code6,
					][this.step-1],
				}),
			],
		})
	}
}

module.exports = { PagesSlideComponent }
