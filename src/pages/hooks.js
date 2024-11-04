const { point } = require('../ui')

class HookedPage {
	_state = {}
	_componentsState = new Map()

	_currMouse = point({ x: 0, y: 0 })
	_lastMouse = point({ x: 0, y: 0 })

	constructor(options) {
		if (options.state !== undefined) {
			this._state = options.state
		}
	}

	_setState(newState, options = { needsRerender: true }) {
		this._state = { ...this._state, ...newState }

		const { needsRerender } = options

		if (needsRerender) {
			this.rerender()
		}
	}

	_initState(state) {
		this._state = state
	}

	useState() {
		return {
			state: this._state,
			setState: (newState, options = { needsRerender: true }) => {
				this._setState(newState, options)
			},
			initState: (state) => {
				this._initState(state)
			},
		}
	}

	useRoute() {}

	useRouter() {
		const push = (options) => {}

		return {
			push,
		}
	}

	_setMouse(p) {
		this._lastMouse = this._currMouse
		this._currMouse = p
	}

	useMouse() {
		return {
			currMouse: this._currMouse,
			lastMouse: this._lastMouse,
			setMouse: (p) => {
				this._setMouse(p)
			},
		}
	}
}

module.exports = { HookedPage }
