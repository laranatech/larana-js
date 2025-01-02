const {
	Page,
	text,
	row,
	column,
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

		return column({
			style: [
				'body',
				{ gap: 'var:u2' },
			],
			children: [
				header({}),
				column({
					style: { size: 9 },
					children: [
						text({
							style: [
								'h2',
								{ size: 9, fg: 'var:fg' },
							],
							value: `Counter: ${state.counter}`,
						}),
						row({
							style: {
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
