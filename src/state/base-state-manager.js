const crypto = require('crypto')


class BaseStateManager {
	generateSessionId() {
		return crypto.randomUUID()
	}

	addSession(id, session) {
		throw new Error('Not implemented')
	}

	getSession(id) {
		throw new Error('Not implemented')
	}
}


module.exports = { BaseStateManager }
