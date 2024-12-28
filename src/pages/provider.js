const { HookedPage } = require('./hooks.js')

class ProvidablePage extends HookedPage {
	_provided = new Map()

	provide(name, value) {
		this._provided.set(name, value)
	}

	inject(name, fallback = null) {
		const value = this._provided.get(name)

		if (value) {
			return value
		}

		return fallback
	}
}

module.exports = { ProvidablePage }
