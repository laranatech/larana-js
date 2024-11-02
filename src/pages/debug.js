const { arc } = require('../ui')

class DebuggedPage {
	_renderCursor(queue) {
		const { x, y } = this.currMouse
		console.log(this.currMouse)
		console.log(this.currMouse.x, y)

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
