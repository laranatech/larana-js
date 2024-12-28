const { ProvidingComponent } = require('./provider.js')
const { rect, line, point } = require('../../shapes')

class DebuggedComponent extends ProvidingComponent {
	_outlineColor = 'rgba(255, 0, 0, 0.4)'
	_outlineWidth = 1
	_gapColor = 'rgba(255, 0, 255, 0.3)'
	_paddingColor = 'rgba(255, 255, 0, 0.3)'

	constructor(options) {
		super(options)

		const fields = [
			'outlineWidth',
			'outlineColor',
			'gapColor',
			'paddingColor',
		]

		fields.forEach((key) => {
			if (options[key] === undefined) {
				return
			}
			this[`_${key}`] = options[key]
		})
	}

	_renderOutline(queue) {
		const { x, y, w, h } = this.getRoot().computeDimensions()

		const borderColor = this._outlineColor
		const borderWidth = this._outlineWidth

		rect({
			borderColor,
			borderWidth,
			x, y, w, h,
		}).to(queue)

		if (this.getChildren().length === 0) {
			line({
				points: [
					point({ x: x + 1, y: y + 1 }),
					point({ x: x + w - 1, y: y + h - 1 }),
				],
				borderColor,
				borderWidth,
			}).to(queue)
			line({
				points: [
					point({ x: x + w - 1, y: y + 1 }),
					point({ x: x + 1, y: y + h - 1 }),
				],
				borderColor,
				borderWidth,
			}).to(queue)
		}

		return queue
	}

	_renderGaps(queue) {
		const root = this.getRoot()

		const { gapRects } = root.computeGaps()

		const bg = root._gapColor

		gapRects.forEach((r) => {
			rect({ ...r, bg }).to(queue)
		})
	}

	_renderPaddings(queue) {
		const root = this.getRoot()

		const bg = root._paddingColor

		const { padding } = root.preComputeStyle()
		const { x, y, w, h } = root.computeDimensions()

		const rects = [
			{ x, y, w, h: padding },
			{ x, y, w: padding, h },
			{ x, y: y + h - padding, w, h: padding },
			{ x: x + w - padding, y, w: padding, h },
		]

		rects.forEach((r) => {
			rect({ ...r, bg }).to(queue)
		})
	}

	_renderDebug(queue) {
		const config = this.useConfig()
		if (!config.debug) {
			return
		}

		const { renderOutline, renderGaps, renderPaddings } = config.debugOptions

		if (renderOutline) {
			this._renderOutline(queue)
		}

		if (renderGaps) {
			this._renderGaps(queue)
		}

		if (renderPaddings) {
			this._renderPaddings(queue)
		}
	}
}

module.exports = {
	DebuggedComponent,
}
