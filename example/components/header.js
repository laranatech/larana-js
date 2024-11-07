const { BaseComponent, layout, text } = require('larana-js')

class HeaderComponent extends BaseComponent {
	defaultStyle = {
		height: 80,
		gap: 'var:u2',
		bg: 'var:accent',
	}
	root() {
		const page = this.usePage()
		return layout({
			children: [
				text({ value: 'LaranaJS', style: 'h1' }),
				text({ value: page.title(), style: 'h3' }),
			],
		})
	}
}

const header = (options) => {
	return new HeaderComponent(options)
}

module.exports = { HeaderComponent, header }
