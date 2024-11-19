const { point } = require('../ui')

class HookedPage {
	_state = {}
	_session = null
	_storage = null
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

	_setSession(session) {
		this._session = session
	}

	useSession() {
		return this._session
	}

	useStorage() {
		if (this._storage) {
			return this._storage
		}

		this._storage = this.useSession().useStorage()

		return this._storage
	}

	useTheme() {
		const { storage, setStorage } = this.useStorage()

		const theme = storage.theme ?? 'dark'

		const setTheme = (newTheme) => {
			setStorage({ theme: newTheme })
		}

		return {
			theme,
			toggleTheme: () => {
				setTheme(theme === 'dark' ? 'main' : 'dark')
			},
			setTheme,
		}
	}

	useRoute() {
		const session = this.useSession()

		return session.route
	}

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
