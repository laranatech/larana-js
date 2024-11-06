const { text, layout, list } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class TriggerSlideComponent extends SlideComponent {
	static steps = 9

	root() {
		const { state } = this.useState()

		const lines = state.problems.map((p) => p.label)

		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Зачем нужен ещё один фреймворк?',
				}),
				layout({}),
				layout({
					style: { size: 9 },
					children: [
						layout({}),
						list({
							style: ['gap_3'],
							value: lines,
							offset: 0,
							limit: this.step - 1,
							template: (line, i) => {
								return text({
									style: [
										'h1',
										{
											height: 'var:componentHeight',
											textAlign: 'start',
										},
									],
									value: `${i + 1}. ${line}`
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

module.exports = { TriggerSlideComponent }
