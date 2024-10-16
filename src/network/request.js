class Request {
	id = ''
	x = 0
	y = 0
	w = 0
	h = 0
	bot = false
	screenReader = false
	eventType = ''
	value = null

	constructor({ x, y, w, h, eventType, value, bot, screenReader }) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.bot = bot
		this.screenReader = screenReader
		this.eventType = eventType
		this.value = value
	}
}

module.exports = {
	Request,
}
