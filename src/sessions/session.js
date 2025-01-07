class Session {
	sessionId = ''
	lastUpdate = 0
	page = null
	route = null
	_storage = {}

	constructor({ sessionId, page, route, storage }) {
		this.sessionId = sessionId
		this.page = page
		this.route = route
		this._storage = storage

		this.lastUpdate = Date.now()
	}

	get storage() {
		return Object.freeze(structuredClone(this._storage))
	}

	update() {
		this.lastUpdate = Date.now()
	}

	setStorage(newStorage) {
		this._storage = {
			...this._storage,
			...newStorage,
		}
	}

	useStorage() {
		return {
			storage: this.storage,
			setStorage: (newStorage) => {
				this.setStorage(newStorage)
			},
		}
	}

	json() {
		return {
			sessionId: this.sessionId,
			page: this.page,
			storage: this.storage,
		}
	}
}

module.exports = { Session }
