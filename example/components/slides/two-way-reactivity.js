const {
	text,
	layout,
	list,
	radio,
	checkbox,
	toggle,
	code,
} = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ReactivitySlideComponent extends SlideComponent {
	root() {
		const { state } = this.useState()

		const textLines = [
			'state: {',
			`    disabledCheckbox: "${state.disabledCheckbox}",`,
			`    checkbox1: ${state.checkbox1},`,
			`    checkbox2: ${state.checkbox2},`,
			`    checkbox3: ${state.checkbox3},`,
			'}',
		]

		const codeLines = [
			'root() {',
			'    const { state } = this.useState()',
			'    return layout({',
			'        children: [',
			'            checkbox({',
			'                model: "checkbox1",',
			'                disabled: state.disabledCheckbox === "checkbox1",',
			'            }),',
			'            toggle({',
			'                model: "checkbox1",',
			'                disabled: state.disabledCheckbox === "checkbox1",',
			'            }),',
			'        ],',
			'    })',
			'}',
		]

		const getLineColor = (line) => {
			if (line.includes('true')) {
				return 'var:accent'
			}

			if (line.includes('false')) {
				return 'var:fg'
			}

			if (line.includes('checkbox1')) {
				return '#ff0'
			}

			if (line.includes('checkbox2')) {
				return '#f0f'
			}

			if (line.includes('checkbox3')) {
				return '#00f'
			}

			return 'var:fg'
		}

		return layout({
			children: [
				text({ value: 'Реактивность', style: 'h1' }),
				layout({
					style: ['row', { size: 9 }],
					children: [
						code({
							style: 'size_2',
							value: codeLines,
						}),
						layout({
							style: ['gap_5', 'p_5', 'column'],
							children: [
								list({
									style: ['column', 'gap_2'],
									value: [
										{ name: 'checkbox1', text: 'checkbox1', fg: '#ff0' },
										{ name: 'checkbox2', text: 'checkbox2', fg: '#f0f' },
										{ name: 'checkbox3', text: 'checkbox3', fg: '#00f' },
									],
									template: (item) => layout({
										style: ['hug', 'gap_2'],
										children: [
											radio({
												model: 'disabledCheckbox',
												name: item.name,
												style: { fg: item.fg },
											}),
											text({ value: item.text, style: ['h2', { textAlign: 'start' }] }),
										],
									}),
								}),
								layout({
									style: ['row', 'gap_2'],
									children: [
										list({
											style: ['column', 'gap_2'],
											value: ['checkbox1', 'checkbox2', 'checkbox3'],
											template: (item) => checkbox({
												model: item,
												disabled: state.disabledCheckbox === item,
											}),
										}),
										list({
											style: ['column', 'gap_2'],
											value: ['checkbox1', 'checkbox2', 'checkbox3'],
											template: (item) => toggle({
												model: item,
												disabled: state.disabledCheckbox === item,
											}),
										}),
									],
								}),
								list({
									style: 'size_2',
									value: textLines,
									template: (line) => text({
										style: [
											'h1',
											{
												height: 'var:componentHeight',
												textAlign: 'start',
												fg: getLineColor(line),
											},
										],
										value: line,
									}),
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
