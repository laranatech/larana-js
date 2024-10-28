const { BaseComponent } = require('./base-component.js')

class TextComponent extends BaseComponent {
	text = ''

	defaultStyle = {
		fg: 'var:fg',
	}

	constructor(data) {
		super(data)

		const { text = '' } = data
		this.text = text
	}

	getModelValue(data) {
		return this.model ? data.state[this.model] : this.text
	}

	clearText(text) {
		return String(text)
			.replaceAll('"', '\\"')
			.replaceAll("'", "\\'")
	}

	render(queue, data) {
		const text = this.getModelValue(data)

		const d = this.computeDimensions(data)

		const cs = this.computeStyle(data)

		queue.add('text', {
			x: d.x + (d.w / 2),
			y: d.y + (d.h / 2),
			font: cs.font,
			text: this.clearText(text),
			align: cs.textAlign,
			baseline: cs.textBaseline,
			fg: cs.fg ?? '#000',
		})

		return queue
	}
}

module.exports = { TextComponent }
