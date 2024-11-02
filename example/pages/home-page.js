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
	title = 'Home'

	prepareMeta() {
		return [
			'<meta name="description" content="Larana-js example home page"/>',
		].join('\n')
	}

	init() {
		this.initState({
			radius: 30,
			d: 1,
			checkboxValue1: true,
			checkboxValue2: true,
			checkboxValue3: true,
			radioValue: 'item_1',
		})
	}

	prepareRoot({ w, h }) {
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
								{ name: 'item_1', text: 'item_1', fg: '#ff0' },
								{ name: 'item_2', text: 'item_2', fg: '#f0f' },
								{ name: 'item_3', text: 'item_3', fg: '#00f' },
							],
							template: (item, i) => layout({
								style: 'gap_1',
								children: [
									radio({
										model: 'radioValue',
										name: item.name,
										style: { fg: item.fg },
									}),
									text({ value: item.text, style: 'h2Text' }),
								],
							}),
						}),
						layout({
							style: ['column', 'gap_2'],
							children: [
								list({
									style: ['column', 'gap_2'],
									value: ['checkboxValue1', 'checkboxValue2', 'checkboxValue3'],
									template: (item, i) => checkbox({ model: item }),
								}),
								list({
									style: ['column', 'gap_2'],
									value: ['checkboxValue1', 'checkboxValue2', 'checkboxValue3'],
									template: (item, i) => toggle({ model: item }),
								}),
							],
						}),
						text({ value: 'Home', style: 'h1Text' }),
						new CircleComponent({
							style: { size: 1, bg: 'var:accent', borderColor: '#f00' },
							radius: this.state.radius,
							onAnimate: () => {
								// let d = this.state.d
								// if (this.state.radius >= 100 || this.state.radius <= 3) {
								// 	d *= -1
								// }
								// this.setState({
								// 	radius: this.state.radius + 1 * d,
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
