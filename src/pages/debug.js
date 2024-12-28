const { arc, t } = require('../ui')
const { ProvidablePage } = require('./provider.js')

class DebuggedPage extends ProvidablePage {
	_renderCursor(queue) {
		const { x, y } = this.currMouse

		arc({
			x,
			y,
			radius: 10,
			bg: 'rgba(255, 255, 0, 0.3)',
		}).to(queue)

		return queue
	}

	_renderStamp(queue) {
		t({
			text: 'DEBUG',
			font: '256px bold monospace',
			x: 512,
			y: 512,
			w: 1024,
			h: 1024,
			textAlign: 'center',
			textBaseline: 'middle',
		}).to(queue)
	}

	_renderDebug(queue) {
		const config = this.config

		if (!config.debug) {
			return queue
		}

		if (config.debugOptions.renderCursor) {
			this._renderCursor(queue)
		}

		this._renderStamp(queue)

		return queue
	}
}

module.exports = { DebuggedPage }
