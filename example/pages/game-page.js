const { Page, LayoutComponent, TextComponent } = require('larana-js')

const { HeaderComponent } = require('../components')

class GamePage extends Page {
	title = 'Game'

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: [
				'body',
				{ direction: 'column' },
			],
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: {
						direction: w > 1028 ? 'row' : 'column',
						size: 9,
					},
					children: [
						new TextComponent({
							text: 'Game page',
							style: 'h1Text',
						}),
						new TextComponent({
							text: 'Soon here will be demo',
							style: 'text',
						}),
					],
				})
			],
		})
	}
}

module.exports = { GamePage }
