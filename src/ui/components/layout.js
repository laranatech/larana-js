const { BaseComponent } = require('./base-component.js')
const { rect } = require('../shapes')

class LayoutComponent extends BaseComponent {
	render(queue) {
		const root = this.getRoot()

		const d = root.computeDimensions()
		const style = root.computeStyle()

		rect({
			...style,
			...d,
		}).to(queue)

		return queue
	}
}

const layout = (options) => {
	return new LayoutComponent(options)
}

module.exports = { LayoutComponent, layout }
