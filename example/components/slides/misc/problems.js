const { BaseComponent, layout, list, checkbox, text } = require('larana-js')

class ProblemsComponent extends BaseComponent {
	defaultStyle = { size: 8 }

	markAsDone(i) {
		const { state, setState } = this.useState()
		const problems = [...state.problems]
		problems[i].done = !problems[i].done
		setState({ problems })
	}

	root() {
		return layout({
			children: [
				layout({}),
				list({
					style: { gap: 'var:u3' },
					model: 'problems',
					template: (problem, i) => {
						return layout({
							style: ['hug', 'gap_3'],
							children: [
								checkbox({ value: problem.done, onChange: () => this.markAsDone(i) }),
								text({
									style: [
										'h1',
										{
											height: 'var:componentHeight',
											textAlign: 'start',
										},
									],
									value: `${i + 1}. ${problem.label}`,
								}),
							],
						})
					},
				}),
				layout({}),
			],
		})
	}
}

module.exports = { ProblemsComponent }
