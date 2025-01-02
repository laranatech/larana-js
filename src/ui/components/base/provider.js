const { SizedComponent } = require('./sizes.js')

class ProvidingComponent extends SizedComponent {
	_provided = new Map()

	provide(name, value) {
		this._provided.set(name, value)
	}

	inject(name, fallback = null) {
		const value = this._provided.get(name)

		if (value) {
			return value
		}

		if (!this.parent) {
			return fallback
		}

		return this.parent.inject(name, fallback)
	}
}

module.exports = { ProvidingComponent }
