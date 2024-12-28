class HookedComponent {
	_page = null
	_route = null
	_session = null
	_storage = null
	_payload = null
	_request = null
	_event = null
	_mouse = null
	_config = null
	_state = null

	_model = ''
	_value = ''

	constructor(options) {
		const fields = [
			'session',
			'storage',
			'page',
			'route',
			'payload',
			'request',
			'event',
			'mouse',
			'config',
			'state',
			'model',
			'value',
		]

		fields.forEach((key) => {
			if (options[key] === undefined) {
				return
			}
			this[`_${key}`] = options[key]
		})
	}

	init() {}

	_setPayload(payload) {
		this._payload = payload

		this.init()
	}

	useResolution() {
		const { lastW, lastH } = this.usePage()

		return { w: lastW, h: lastH }
	}

	usePayload() {
		return Object.freeze(this._payload)
	}

	useSession() {
		if (this._session) {
			return this._session
		}

		this._session = this.usePayload().session

		return this._session
	}

	useRequest() {
		if (this._request) {
			return this._request
		}

		this._request = this.usePayload().request

		return this._request
	}

	useEvent() {
		if (this._event) {
			return this._event
		}

		this._event = this.useRequest().event

		return this._event
	}

	useMouse() {
		if (this._mouse) {
			return this._mouse
		}

		this._mouse = this.usePage().useMouse()

		return this._mouse
	}

	useRoute() {
		if (this._route) {
			return this._route
		}

		this._route = this.usePage().useRoute()

		return this._route
	}

	usePage() {
		if (this._page) {
			return this._page
		}

		this._page = this.useSession().page

		return this._page
	}

	useState() {
		if (this._state) {
			return this._state
		}
		this._state = this.usePage().useState()

		return this._state
	}

	useConfig() {
		if (this._config) {
			return this._config
		}

		this._config = this.usePage().config

		return this._config
	}

	useModel() {
		const { state, setState } = this.useState()

		const model = this._model
		const value = this._value

		const getModel = () => {
			return model ? state[model] : value
		}

		const setModel = (value) => {
			if (!model) {
				return
			}
			setState({ [model]: value })
		}

		return { model, modelValue: getModel(), value, getModel, setModel }
	}

	useStorage() {
		if (this._storage) {
			return this._storage
		}

		this._storage = this.usePage().useStorage()

		return this._storage
	}

	useTheme() {
		return this.usePage().useTheme()
	}

	_patch(root, payload) {
		root._setPayload(payload)

		root.children.forEach((child) => {
			root._patch(child, payload)
		})
	}
}

module.exports = {
	HookedComponent,
}
