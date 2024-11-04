const { arc } = require('../ui')
const { HookedPage } = require('./hooks.js')

class DebuggedPage extends HookedPage {
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

	_renderDebug(queue) {
		const config = this.config

		if (config.debug && config.debugOptions.renderCursor) {
			this._renderCursor(queue)
		}

		return queue
	}
}

module.exports = { DebuggedPage }
