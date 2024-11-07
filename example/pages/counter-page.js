const {
	Page,
	text,
	layout,
	button,
} = require('larana-js')

const { header } = require('../components')

class CounterPage extends Page {
	title() {
		'Counter'
	}

	init() {
		const { initState } = this.useState()

		initState({ counter: 0 })
	}

	root() {
		const { state, setState } = this.useState()

		return layout({
			style: [
				'body',
				{ gap: 'var:u2', direction: 'column' },
			],
			children: [
				header({}),
				layout({
					style: { size: 9, direction: 'column' },
					children: [
						text({
							style: [
								'h2',
								{ size: 9, fg: 'var:fg' },
							],
							value: `Counter: ${state.counter}`,
						}),
						layout({
							style: {
								direction: 'row',
								size: 1,
								gap: 'var:u2',
								padding: 'var:u2',
							},
							children: [
								button({
									text: '+',
									onClick: () => {
										setState({ counter: state.counter + 1 })
									},
								}),
								button({
									text: '-',
									onClick: () => {
										setState({ counter: state.counter - 1 })
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
	CounterPage,
}
