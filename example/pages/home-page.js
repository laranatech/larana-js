const {
	Page,
	Style,
	LayoutComponent,
	TextComponent,
	LinkComponent,
} = require('larana-js')

const { styles } = require('../styles')
const { HeaderComponent } = require('../components')

class HomePage extends Page {
	title = 'Home'

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: new Style({
				...styles.get('body').json(),
				gap: 8,
				direction: 'column',
			}),
			children: [
				new HeaderComponent({
					style: new Style({ size: 1 }),
				}),
				new LayoutComponent({
					style: new Style({ size: 9 }),
					children: [
						new TextComponent({ text: 'Home' }),
					],
				}),
			],
		})
	}
}

module.exports = {
	HomePage,
}
