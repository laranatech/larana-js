const {
	Page,
	LayoutComponent,
	TextComponent,
} = require('larana-js')

const { HeaderComponent, CircleComponent } = require('../components')

class HomePage extends Page {
	title = 'Home'

	prepareMeta() {
		return [
			'<meta name="description" content="Larana-js example home page"/>',
		].join('\n')
	}

	init() {
		this.state = {
			radius: 30,
			d: 1,
		}
	}

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: [
				'body',
				{
					gap: 8,
					direction: 'column',
				},
			],
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: { size: 9 },
					children: [
						new TextComponent({ text: 'Home' }),
						new CircleComponent({
							style: { size: 1, bg: 'var:accent', borderColor: '#f00' },
							radius: this.state.radius,
							onAnimate: () => {
								let d = this.state.d
								if (this.state.radius >= 100 || this.state.radius <= 3) {
									d *= -1
								}
								this.setState({
									radius: this.state.radius + 1 * d,
									d,
								})
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
