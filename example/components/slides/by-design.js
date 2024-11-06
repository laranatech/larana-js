const { text, layout, list, checkbox } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ByDesignSlideComponent extends SlideComponent {
	static steps = 1

	markAsDone(i) {
		const { state, setState } = this.useState()
		const problems = [...state.problems]
		problems[i].done = !problems[i].done
		setState({ problems })
	}

	root() {
		return layout({
			style: ['column', 'gap_1'],
			children: [
				text({
					style: 'h1',
					value: 'Решение проблем на уровне архитектуры',
				}),
				layout({}),
				layout({
					style: { size: 8 },
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
				}),
			],
		})
	}
}

module.exports = { ByDesignSlideComponent }
