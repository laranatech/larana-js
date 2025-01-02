class Message {
	sessionId = ''
	timestamp = 0
	target = ''
	payload = null

	constructor(options) {
		const { sessionId, target, payload } = options

		this.sessionId = sessionId
		this.target = target
		this.payload = payload
	}

	json() {
		return {
			timestamp: this.timestamp,
			sessionId: this.sessionId,
			target: this.target,
			payload: this.payload?.json() ?? this.payload,
		}
	}

	jsonString() {
		return JSON.stringify(this.json())
	}
}

module.exports = { Message }
