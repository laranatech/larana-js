const { layout, text } = require('larana-js')
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
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({}),
						text({
							style: 'h2',
							value: 'Larana — философия',
						}),
						text({
							style: 'h2',
							value: 'LaranaJS — имплементация',
						}),
					].splice(0, this.step),
				}),
			],
		})
	}
}

module.exports = { WhatIsLaranaSlideComponent }
