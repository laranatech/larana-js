const {
	Page,
	Style,
	LayoutComponent,
	TextComponent,
	LinkComponent,
} = require('larana-js')

const { styles } = require('../styles')
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
					style: new Style({ size: 9 }),
					children: [
						new TextComponent({ text: 'Home' }),
						new CircleComponent({
							style: new Style({ size: 1 }),
							radius: this.state.radius,
							onAnimate: (radius) => {
								this.setState({ radius })
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
