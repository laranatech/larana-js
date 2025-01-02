const { RenderQueue } = require('../ui/rendering')
const { layout } = require('../ui/components')
const { Request } = require('../network')
const { point } = require('../ui/shapes')
const { DebuggedPage } = require('./debug.js')

class Page extends DebuggedPage {
	_session = null
	config = {}

	_root = null
	_initialRoot = null

	focused = ''
	lastRender = 0

	rerenderDelay = 1
	rerenderTimeout = null

	previousRender = null
	previousRequest = {}

	constructor(options) {
		super(options)

		const { config, appConfig } = options

		this.config = appConfig
		this.rerenderDelay = config.rerenderDelay
	}

	init() {
		this._root = layout({})
	}

	focus(id) {
		this.focused = id
	}

	rerender() {
		if (!this.tick) {
			throw new Error('Page must have `tick()` method')
		}

		clearTimeout(this.rerenderTimeout)

		this.rerenderTimeout = setTimeout(() => {
			this.tick(this.useResolution())
		}, this.rerenderDelay)
	}

	// Meta info

	title() {
		return this._title
	}

	meta() {
		return this._meta
	}

	scripts() {
		return this._scripts
	}

	styles() {
		return this._styles
	}

	content() {
		return this._content
	}

	//

	tick() {}

	// Markup

	root({ w, h, request }) {
		return this._root
	}

	initialRoot({ w, h, request }) {
		if (this._initialRoot) {
			return this._initialRoot
		}
		return this.firstRoot({ w, h, request })
	}

	firstRoot({ w, h, request }) {
		return this.root({ w, h, request })
	}

	_patchRoot(root, payload) {
		root._setPayload(payload)
	}

	// Rendering

	/**
	 * @param {Request} request
	 * @returns {RenderQueue}
	 */
	renderInitialDraw(request) {
		const { w, h } = request
		this.setResolution({ w, h })

		return this._r({
			w,
			h,
			request,
			root: this.prepareInitialRoot({ w, h, request }),
		})
	}

	/**
	 * @param {Request} request
	 * @returns {RenderQueue}
	 */
	renderFirstDraw(request) {
		const { w, h } = request
		this.setResolution({ w, h })

		return this._r({
			w,
			h,
			request,
			root: this.prepareFirstRoot({ w, h, request }),
		})
	}

	/**
	 * @param {Request} request
	 * @returns {RenderQueue}
	 */
	render(request) {
		const { w, h } = request
		this.setResolution({ w, h })

		return this._r({
			w,
			h,
			request,
			root: this.root({ w, h, request }),
		})
	}

	_r({ w, h, request, root }) {
		this.lastRender = Date.now()

		const queue = new RenderQueue()

		const dimensions = new Map()

		const payload = {
			state: this._state,
			x: 0,
			y: 0,
			w,
			h,
			dimensions,
			request,
			session: this.useSession(),
		}

		this._patchRoot(root, payload)

		root._render(queue)

		this._renderDebug(queue)

		return queue
	}

	// Handling events

	/**
	 * @param {Request} request
	 * @returns
	 */
	update(request) {
		const { w, h } = request

		const { setMouse } = this.useMouse()
		const { state } = this.useState()

		if (request.event.type === 'mousemove') {
			setMouse(point({
				x: request.event.x,
				y: request.event.y,
			}))
		}

		const root = this.root({ w, h, request })

		const dimensions = new Map()

		const payload = {
			w,
			h,
			x: 0,
			y: 0,
			request,
			dimensions,
			state,
			session: this.useSession(),
		}

		this._patchRoot(root, payload)

		return root.update(payload)
	}
}

module.exports = {
	Page,
}
