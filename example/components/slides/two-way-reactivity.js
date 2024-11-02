const {
	BaseComponent,
	text,
	layout,
	list,
	radio,
	checkbox,
} = require('larana-js')

class ReactivitySlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		const { state } = this.useState()

		const textLines = [
			'state: {',
			`    radioValue: "${state.radioValue}",`,
			`    checkboxValue1: ${state.checkboxValue1},`,
			`    checkboxValue2: ${state.checkboxValue2},`,
			`    checkboxValue3: ${state.checkboxValue3},`,
			'}',
		]

		const getLineColor = (line) => {
			if (line.includes('item_1')) {
				return '#ff0'
			}
			// if (line.includes('false')) {
			// 	return '#f00'
			// }

			if (line.includes('item_2')) {
				return '#f0f'
			}

			if (line.includes('true')) {
				return 'var:accent'
			}

			if (line.includes('item_3')) {
				return '#00f'
			}

			return 'var:fg'
		}

		return layout({
			children: [
				text({ value: 'Реактивность', style: 'h1Text' }),
				layout({
					style: { size: 9 },
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
						list({
							style: ['column', 'gap_2'],
							value: ['checkboxValue1', 'checkboxValue2', 'checkboxValue3'],
							template: (item, i) => checkbox({ model: item }),
						}),
						layout({
							style: ['size_5', 'column'],
							children: [
								...textLines.map((line) => {
									return text({
										style: [
											'h1Text',
											{ textAlign: 'left',
												fg: getLineColor(line),
											},
										],
										value: line,
									})
								}),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ReactivitySlideComponent }
