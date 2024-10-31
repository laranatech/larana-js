const { BaseComponent } = require('./base-component.js')

class TextComponent extends BaseComponent {
	text = ''

	defaultStyle = {
		fg: 'var:fg',
	}

	constructor(options) {
		super(options)

		const { text = '' } = options
		this.text = text
	}

	getModelValue() {
		const { state } = this.useState()

		return this.model ? state[this.model] : this.text
	}

	clearText(text) {
		return String(text)
			.replaceAll('"', '\\"')
			.replaceAll("'", "\\'")
	}

	render(queue) {
		const text = this.getModelValue()
		const d = this.computeDimensions()
		const style = this.computeStyle()

		queue.add('text', {
			// x: d.x,
			// y: d.y,
			x: d.x + (d.w / 2),
			y: d.y + (d.h / 2),
			font: style.font,
			text: this.clearText(text),
			align: style.textAlign,
			baseline: style.textBaseline,
			fg: style.fg ?? '#000',
		})

		return queue
	}
}

const text = (options) => {
	return new TextComponent(options)
}

module.exports = { TextComponent, text }
