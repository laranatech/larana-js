class Session {
	sessionId = ''
	lastUpdate = 0
	page = null
	route = null
	state = {}

	constructor({ sessionId, page, route, state }) {
		this.sessionId = sessionId
		this.page = page
		this.route = route
		this.state = state

		this.lastUpdate = Date.now()
	}

	update() {
		this.lastUpdate = Date.now()
	}

	json() {
		return {
			sessionId: this.sessionId,
			page: this.page,
			state: this.state,
		}
	}
}

module.exports = { Session }
