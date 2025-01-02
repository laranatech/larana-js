const { BaseComponent, row, text } = require('larana-js')
const { TitleComponent } = require('./title.js')

class HeaderComponent extends BaseComponent {
	defaultStyle = {
		height: 80,
		gap: 'var:u2',
		bg: 'var:accent',
	}

	init() {
		const page = this.usePage()

		this.provide('title', page.title())
	}

	root() {
		return row({
			children: [
				text({ value: 'LaranaJS', style: 'h1' }),
				new TitleComponent({}),
			],
		})
	}
}

const header = (options) => {
	return new HeaderComponent(options)
}

module.exports = { HeaderComponent, header }
