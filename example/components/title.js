const { BaseComponent, text } = require('larana-js')

class TitleComponent extends BaseComponent {
	root() {
		const title = this.inject('title', 'Nothing')
		// console.log(title)

		return text({ value: title, style: 'h3' })
	}
}

module.exports = { TitleComponent }
