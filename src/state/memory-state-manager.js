const { BaseStateManager } = require('./base-state-manager.js')

class MemoryStateManager extends BaseStateManager {
	sessions = new Map()

	addSession(id, session) {
		return this.sessions.set(id, session)
	}

	getSession(id) {
		const session = this.sessions.get(id)
		if (!session) {
			throw new Error(`Session ${id} not found`)
		}
		return session
	}
}

module.exports = { MemoryStateManager }
