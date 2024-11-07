const { layout, text, list } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class WhatIsLaranaSlideComponent extends SlideComponent {
	static steps = 3

	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Что такое LaranaJS',
				}),
				list({
					style: { size: 9 },
					value: [
						'Larana — философия',
						'LaranaJS — имплементация',
					],
					offset: 0,
					limit: this.step -1,
					template: (line) => text({ value: line, style: 'h0' }),
				}),
			],
		})
	}
}

module.exports = { WhatIsLaranaSlideComponent }
