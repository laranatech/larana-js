const {
	Page,
	layout,
	text,
	radio,
	checkbox,
	toggle,
	list,
} = require('larana-js')

const { header, CircleComponent } = require('../components')

class HomePage extends Page {
	title() {
		'Home'
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

		return layout({
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
					style: ['gap_2', 'size_1'],
					children: [
						list({
							style: ['column', 'gap_2'],
							value: [
								{ name: 'checkbox1', text: 'checkbox1', fg: '#ff0' },
								{ name: 'checkbox2', text: 'checkbox2', fg: '#f0f' },
								{ name: 'checkbox3', text: 'checkbox3', fg: '#00f' },
							],
							template: (item) => layout({
								style: 'gap_1',
								children: [
									radio({
										model: 'disabledCheckbox',
										name: item.name,
										style: { fg: item.fg },
									}),
									text({ value: item.text, style: 'h2' }),
								],
							}),
						}),
						layout({
							style: ['column', 'gap_2'],
							children: [
								list({
									style: ['column', 'gap_2'],
									value: ['checkbox1', 'checkbox2', 'checkbox3'],
									template: (item) => checkbox({ model: item }),
								}),
								list({
									style: ['column', 'gap_2'],
									value: ['checkbox1', 'checkbox2', 'checkbox3'],
									template: (item) => toggle({ model: item }),
								}),
							],
						}),
						text({ value: 'Home', style: 'h1' }),
						new CircleComponent({
							style: { size: 1, bg: 'var:accent', borderColor: '#f00' },
							radius: state.radius,
							onAnimate: () => {
								// let d = state.d
								// if (state.radius >= 100 || state.radius <= 3) {
								// 	d *= -1
								// }
								// setState({
								// 	radius: state.radius + 1 * d,
								// 	d,
								// })
							},
						}),
					],
				}),
			],
		})
	}
}

module.exports = {
	HomePage,
}
