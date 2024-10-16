class Session {
	sessionId = ''
	userId = ''
	page = ''
	lastUpdate = 0
	state = {}

	constructor({ sessionId, userId, page, state }) {
		this.sessionId = sessionId
		this.userId = userId
		this.page = page
		this.state = state

		this.lastUpdate = Date.now()
	}

	json() {
		return {
			sessionId: this.sessionId,
			userId: this.userId,
			page: this.page,
			state: this.state,
		}
	}
}

module.exports = { Session }
