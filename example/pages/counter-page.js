const {
	Page,
	Style,
	LayoutComponent,
	TextComponent,
	ButtonComponent,
	click,
	hover,
	useStyleVar,
} = require('larana-js')

const { styles } = require('../styles')
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
			style: new Style({
				...styles.get('body').json(),
				gap: 8,
				direction: 'column',
			}),
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: new Style({ size: 9, direction: 'column' }),
					children: [
						new TextComponent({
							style: new Style({ size: 9 }),
							text: `Counter: ${this.state.counter}`,
						}),
						new LayoutComponent({
							style: new Style({
								direction: 'row',
								size: 1,
								gap: 8,
								padding: 8,
							}),
							children: [
								new ButtonComponent({
									text: '+',
									style: new Style({ bg: useStyleVar('componentBg'), fg: useStyleVar('fg') }),
									events: [
										click({
											handler: () => {
												this.setState({ counter: this.state.counter + 1 })
											},
										}),
										hover({
											style: new Style({ bg: useStyleVar('accent') }),
										}),
									],
								}),
								new ButtonComponent({
									text: '-',
									style: new Style({ bg: useStyleVar('componentBg'), fg: useStyleVar('fg') }),
									events: [
										click({
											handler: () => {
												this.setState({ counter: this.state.counter - 1 })
											},
										}),
										hover({
											style: new Style({ bg: useStyleVar('accent') }),
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
