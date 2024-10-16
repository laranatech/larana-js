const { Page, LayoutComponent, TextComponent, Style } = require('larana-js')

const { styles } = require('../styles')

class NotFoundPage extends Page {
	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: new Style({
				...styles.get('body').json(),
				direction: w > 1028 ? 'row' : 'column',
			}),
			children: [
				new TextComponent({
					text: '404',
					style: styles.get('h1Text'),
				}),
				new TextComponent({
					text: 'Go back to home',
					style: styles.get('text'),
				})
			],
		})
	}
}

module.exports = { NotFoundPage }
