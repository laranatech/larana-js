class Response {
	data = ''
	x = 0
	y = 0
	w = 0
	h = 0
	timestamp = 0

	constructor({ data, x, y, w, h }) {
		this.data = data
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.timestamp = Date.now()
	}
}

module.exports = {
	Response,
}
