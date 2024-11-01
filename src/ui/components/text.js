const { BaseComponent } = require('./base')

class TextComponent extends BaseComponent {
	defaultStyle = {
		fg: 'var:fg',
	}

	constructor(options) {
		super(options)

		const { text = '' } = options
		this.text = text
	}

	clearText(text) {
		return String(text)
			.replaceAll('"', '\\"')
			.replaceAll("'", "\\'")
	}

	render(queue) {
		const { modelValue } = this.useModel()
		const d = this.computeDimensions()
		const style = this.computeStyle()

		queue.add('text', {
			// x: d.x,
			// y: d.y,
			x: d.x + (d.w / 2),
			y: d.y + (d.h / 2),
			font: style.font,
			text: this.clearText(modelValue),
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
