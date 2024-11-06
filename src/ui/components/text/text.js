const { t } = require('../../shapes')
const { BaseComponent } = require('../base')
const { figure } = require('../figure')
const { createCanvas } = require('canvas')

class TextComponent extends BaseComponent {
	defaultStyle = {
		fg: 'var:fg',
	}

	constructor(options) {
		super(options)
	}

	root() {
		const { modelValue } = this.useModel()

		const style = this.computeStyle()

		return figure({
			template: (fig, queue) => {
				const d = fig.computeDimensions()

				const r = t({
					// x: d.x + (d.w / 2),
					// y: d.y + (d.h / 2),
					...d,
					text: modelValue,
					...style,
					font: style.font,
					fg: style.fg,
					w: this.defaultStyle.width ?? d.w,
				})

				r.to(queue)
			},
		})
	}
}

const text = (options) => {
	return new TextComponent(options)
}

module.exports = { TextComponent, text }
