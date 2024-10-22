const { Event } = require('../ui/events')

class Request {
	sessionId = ''
	w = 0
	h = 0

	event = null

	constructor({ x, y, w, h, type, value }) {
		this.sessionId = this.sessionId
		this.w = w
		this.h = h

		this.event = new Event({
			type,
			x,
			y,
			value,
		})
	}
}

module.exports = {
	Request,
}
