const { BaseComponent } = require('./base-component.js')

class FigureComponent extends BaseComponent {
	template = (fig, queue) => {}

	constructor(options) {
		super(options)

		if (options.template) {
			this.template = options.template
		}
	}

	render(queue) {
		this.template(this, queue)

		return queue
	}
}

const figure = (options) => {
	return new FigureComponent(options)
}

module.exports = { FigureComponent, figure }
