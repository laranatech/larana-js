const { layout, code } = require('larana-js')
const { SlideComponent } = require('../slide.js')
const { header } = require('../header.js')

class ComponentsSlideComponent extends SlideComponent {
	root() {
		const headerCode = [
			`class HeaderComponent extends BaseComponent {`,
			`    defaultStyle = {`,
			`        height: 80,`,
			`        bg: "var:accent",`,
			`    }`,
			'',
			`    root() {`,
			`        const page = this.usePage()`,
			`        return layout({`,
			`            children: [`,
			`                text({ value: "LaranaJS", style: "h1" }),`,
			`                text({ value: page.title(), style: "h3" }),`,
			`            ],`,
			`        })`,
			`    }`,
			`}`,
		]

		return layout({
			children: [
				header({}),
				code({
					style: { size: 9 },
					value: headerCode,
				}),
			],
		})
	}
}

module.exports = { ComponentsSlideComponent }
