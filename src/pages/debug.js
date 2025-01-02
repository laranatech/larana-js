const { arc, t } = require('../ui')
const { ProvidingPage } = require('./provider.js')

class DebuggedPage extends ProvidingPage {
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
		const { w, h } = this.useResolution()

		t({
			text: 'DEBUG',
			font: '256px bold monospace',
			x: 0,
			y: 0,
			w,
			h,
			textAlign: 'center',
			textBaseline: 'middle',
			fg: '#ff000022'
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
