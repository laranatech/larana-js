const { BaseComponent } = require('larana-js')

class SlideComponent extends BaseComponent {
	static steps = 1
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}
}

module.exports = { SlideComponent }
