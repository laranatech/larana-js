const { BaseComponent } = require('./base')
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

const prepareOpts = (options, direction) => {
	const opts = { ...options }

	if (!opts.style) {
		opts.style = { direction }
	} else if(Array.isArray(opts.style)) {
		opts.style = [
			...opts.style,
			{ direction },
		]
	} else if (typeof opts.style === 'string') {
		opts.style = [
			opts.style,
			{ direction },
		]
	}

	return opts
}

const row = (options) => {
	const opts = prepareOpts(options, 'row')

	return layout(opts)
}

const column = (options) => {
	const opts = prepareOpts(options, 'column')

	return layout(opts)
}

module.exports = { LayoutComponent, layout, row, column }
