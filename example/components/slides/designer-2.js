const { text, layout, image } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class DesignerSlideComponent extends SlideComponent {
	root() {
		const { h } = this.useResolution()

		return layout({
			children: [
				text({
					style: 'h1',
					value: 'UIDesigner',
				}),
				layout({
					style: { size: 9 },
					children: [
						layout({}),
						image({
							style: { height: h * 0.85, aspectRatio: 1280 / 720 },
							src: 'https://kucheriavyi.ru/images/slides/designer.png',
						}),
						layout({}),
					],
				}),
			],
		})
	}
}

module.exports = { DesignerSlideComponent }
