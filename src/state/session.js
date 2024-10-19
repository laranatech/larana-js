class Session {
	sessionId = ''
	lastUpdate = 0
	page = null
	state = {}

	constructor({ sessionId, page, state }) {
		this.sessionId = sessionId
		this.page = page
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
