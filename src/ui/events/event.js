class Event {
	type = ''
	x = 0
	y = 0
	value = null

	constructor({ type, x, y, value }) {
		this.type = type
		this.x = x
		this.y = y
		this.value = value
	}
}

module.exports = { Event }
