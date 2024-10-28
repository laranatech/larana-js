const {
	BaseComponent,
	TextComponent,
	CheckboxComponent,
	RadioComponent,
	LayoutComponent,
} = require('larana-js')

class ReactivitySlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		const textLines = [
			'state: {',
			`    radioValue: "${data.session.page.state.radioValue}",`,
			`    checkboxValue1: ${data.session.page.state.checkboxValue1},`,
			`    checkboxValue2: ${data.session.page.state.checkboxValue2},`,
			`    checkboxValue3: ${data.session.page.state.checkboxValue3},`,
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

		return [
			new LayoutComponent({
				parent: this,
				style: { direction: 'column' },
				children: [
					new TextComponent({ text: 'Реактивность', style: 'h1Text' }),
					new LayoutComponent({
						style: { size: 9 },
						children: [
							new LayoutComponent({
								style: ['col', 'gap_2'],
								children: [
									new LayoutComponent({
										style: 'gap_1',
										children: [
											new RadioComponent({
												model: 'radioValue',
												name: 'item_1',
												style: { fg: '#ff0' },
											}),
											new TextComponent({ text: 'item_1', style: 'h2Text' }),
										],
									}),
									new LayoutComponent({
										style: 'gap_1',
										children: [
											new RadioComponent({
												model: 'radioValue',
												name: 'item_2',
												style: { fg: '#f0f' },
											}),
											new TextComponent({ text: 'item_2', style: 'h2Text' }),
										],
									}),
									new LayoutComponent({
										style: 'gap_1',
										children: [
											new RadioComponent({
												model: 'radioValue',
												name: 'item_3',
												style: { fg: '#00f' },
											}),
											new TextComponent({ text: 'item_3', style: 'h2Text' }),
										],
									}),
								],
							}),
							new LayoutComponent({
								style: ['col', 'gap_2'],
								children: [
									new CheckboxComponent({ model: 'checkboxValue1' }),
									new CheckboxComponent({ model: 'checkboxValue2' }),
									new CheckboxComponent({ model: 'checkboxValue3' }),
								],
							}),
							new LayoutComponent({
								style: ['size_5', 'col'],
								children: [
									...textLines.map((line) => {
										return new TextComponent({
											style: [
												'h1Text',
												{ textAlign: 'left',
													fg: getLineColor(line),
												},
											],
											text: line,
										})
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

module.exports = { ReactivitySlideComponent }
