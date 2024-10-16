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

	render(queue, state) {
		const text = this.model ? state.state[this.model] : this.text

		const d = this.getDimensions(state)

		queue.add('text', {
			x: d.x + (d.w / 2),
			y: d.y + (d.h / 2),
			font: this.getStyle().font,
			text,
			align: this.getStyle().textAlign,
			baseline: this.getStyle().textBaseline,
			fg: this.getStyle().fg ?? '#000',
		})

		return queue
	}
}

module.exports = { TextComponent }
