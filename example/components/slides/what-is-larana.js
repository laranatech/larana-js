const { BaseComponent, layout, text } = require('larana-js')

class WhatIsLaranaSlideComponent extends BaseComponent {
	static steps = 3
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Что такое LaranaJS',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({}),
						text({
							style: 'h2Text',
							value: 'Larana — философия',
						}),
						text({
							style: 'h2Text',
							value: 'LaranaJS — имплементация',
						}),
					].splice(0, this.step),
				}),
			],
		})
	}
}

module.exports = { WhatIsLaranaSlideComponent }
