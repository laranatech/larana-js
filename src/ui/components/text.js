const { BaseComponent } = require('./base-component.js')

class TextComponent extends BaseComponent {
	model = null
	text = ''

	constructor(data) {
		super(data)

		const { model, text } = data
		if (model !== undefined) {
			this.model = model
		}

		if (text !== undefined) {
			this.text = text
		}
	}

	render(queue, data) {
		const text = this.model ? data.state[this.model] : this.text

		const d = this.computeDimensions(data)

		const cs = this.computeStyle(data)

		queue.add('text', {
			x: d.x + (d.w / 2),
			y: d.y + (d.h / 2),
			font: cs.font,
			text,
			align: cs.textAlign,
			baseline: cs.textBaseline,
			fg: cs.fg ?? '#000',
		})

		return queue
	}
}

module.exports = { TextComponent }
