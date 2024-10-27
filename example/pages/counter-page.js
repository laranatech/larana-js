const {
	Page,
	LayoutComponent,
	TextComponent,
	ButtonComponent,
	hover,
} = require('larana-js')

const { HeaderComponent } = require('../components')

class CounterPage extends Page {
	title = 'Counter'

	init() {
		this.state = {
			counter: 0,
		}
	}

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: [
				'body',
				{
					gap: 'var:u2',
					direction: 'column',
				},
			],
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: { size: 9, direction: 'column' },
					children: [
						new TextComponent({
							style: [
								'h2Text',
								{
									size: 9,
									fg: 'var:fg',
								},
							],
							text: `Counter: ${this.state.counter}`,
						}),
						new LayoutComponent({
							style: {
								direction: 'row',
								size: 1,
								gap: 'var:u2',
								padding: 'var:u2',
							},
							children: [
								new ButtonComponent({
									text: '+',
									onClick: () => {
										this.setState({ counter: this.state.counter + 1 })
									},
									events: [
										hover({
											style: { borderColor: 'var:accent' },
										}),
									],
								}),
								new ButtonComponent({
									text: '-',
									onClick: () => {
										this.setState({ counter: this.state.counter - 1 })
									},
									events: [
										hover({
											style: { borderColor: '#f00' },
										}),
									],
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
