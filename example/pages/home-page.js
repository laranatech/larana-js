const {
	Page,
	row,
	column,
	text,
	radio,
	checkbox,
	toggle,
	list,
} = require('larana-js')

const { header } = require('../components')

class HomePage extends Page {
	title() {
		return 'Home'
	}

	meta() {
		return [
			'<meta name="description" content="Larana-js example home page"/>',
		].join('\n')
	}

	init() {
		const { initState } = this.useState()

		initState({
			radius: 30,
			d: 1,
			checkbox1: true,
			checkbox2: true,
			checkbox3: true,
			disabledCheckbox: 'checkbox1',
		})
	}

	root() {
		const { state } = this.useState()
		const { disabledCheckbox } = state

		return column({
			style: 'body',
			children: [
				header({}),
				row({
					style: ['gap_2', 'size_1', 'p_2'],
					children: [
						list({
							style: ['column', 'gap_2'],
							value: [
								{ name: 'checkbox1', text: 'checkbox1', fg: '#ff0' },
								{ name: 'checkbox2', text: 'checkbox2', fg: '#f0f' },
								{ name: 'checkbox3', text: 'checkbox3', fg: '#00f' },
							],
							template: (item) => row({
								style: ['gap_1', 'hug'],
								children: [
									radio({
										model: 'disabledCheckbox',
										name: item.name,
										style: { fg: item.fg },
									}),
									text({ value: item.text, style: ['h2', { textAlign: 'left' }] }),
								],
							}),
						}),
						row({
							style: ['column', 'gap_2'],
							children: [
								list({
									style: ['column', 'gap_2'],
									value: ['checkbox1', 'checkbox2', 'checkbox3'],
									template: (item) => checkbox({
										model: item,
										disabled: disabledCheckbox === item,
									}),
								}),
								list({
									style: ['column', 'gap_2'],
									value: ['checkbox1', 'checkbox2', 'checkbox3'],
									template: (item) => toggle({
										model: item,
										disabled: disabledCheckbox === item,
									}),
								}),
							],
						}),
						text({ value: 'Home', style: 'h1' }),
					],
				}),
			],
		})
	}
}

module.exports = {
	HomePage,
}
