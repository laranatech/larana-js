const { BaseComponent, text, layout } = require('larana-js')

class TitleComponent extends BaseComponent {
	root() {
		const title = this.inject('title', 'Nothing')

		return layout({
			children: [
				text({ value: title, style: 'h2' }),
			],
		})
	}
}

module.exports = { TitleComponent }
