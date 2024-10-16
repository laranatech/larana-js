const crypto = require('crypto')


class BaseStateManager {
	sessions = new Map()

	generateSessionId() {
		return crypto.randomUUID()
	}

	addSession(id, page) {
		return this.sessions.set(id, page)
	}

	getSession(id) {
		const session = this.sessions.get(id)
		if (!session) {
			throw new Error(`Session ${id} not found`)
		}
		return session
	}
}


module.exports = { BaseStateManager }
