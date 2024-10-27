const { RenderQueue } = require('../ui/rendering')
const { LayoutComponent } = require('../ui/components')
const { Request } = require('../network')

class Page {
	session = null

	state = {}
	meta = ''
	root = null
	initialRoot = null

	focused = ''

	lastW = 0
	lastH = 0
	lastRender = 0

	rerenderDelay = 1
	rerenderTimeout = null

	previousRender = null
	previousRequest = {}

	title = ''
	meta = ''
	scripts = ''
	styles = ''

	constructor({ state, meta, config }) {
		if (state !== undefined) {
			this.state = state
		}
		if (meta !== undefined) {
			this.meta = meta
		}

		this.rerenderDelay = config.rerenderDelay
	}

	init() {
		this.root = new LayoutComponent({})
	}

	// State

	setSession(session) {
		this.session = session
	}

	setState(newState, options = { needsRerender: true }) {
		this.state = { ...this.state, ...newState }

		const { needsRerender } = options

		if (needsRerender) {
			this.rerender()
		}
	}

	get state() {
		return Object.freeze(structuredClone(this.state))
	}

	focus(id) {
		this.focused = id
	}

	rerender() {
		if (!this.send) {
			throw new Error('Page must have `send()` method')
		}

		clearTimeout(this.rerenderTimeout)

		this.rerenderTimeout = setTimeout(() => {
			this.send({ w: this.lastW, h: this.lastH })
		}, this.rerenderDelay)
	}

	// Meta info

	prepareTitle() {
		return this.title
	}

	prepareMeta() {
		return this.meta
	}

	prepareScripts() {
		return this.scripts
	}

	prepareStyles() {
		return this.styles
	}

	//

	send() {}

	// Markup

	prepareRoot({ w, h, request }) {
		return this.root
	}

	prepareInitialRoot({ w, h, request }) {
		if (this.initialRoot) {
			return this.initialRoot
		}
		return this.prepareFirstRoot({ w, h, request })
	}

	prepareFirstRoot({ w, h, request }) {
		return this.prepareRoot({ w, h, request })
	}

	// Rendering

	/**
	 * 
	 * @param {Request} request 
	 * @returns {RenderQueue}
	 */
	renderInitialDraw(request) {
		const { w, h } = request

		return this.r({
			w,
			h,
			request,
			root: this.prepareInitialRoot({ w, h, request }),
		})
	}

	/**
	 * 
	 * @param {Request} request 
	 * @returns {RenderQueue}
	 */
	renderFirstDraw(request) {
		const { w, h } = request

		return this.r({
			w,
			h,
			request,
			root: this.prepareFirstRoot({ w, h, request }),
		})
	}

	/**
	 * 
	 * @param {Request} request 
	 * @returns {RenderQueue}
	 */
	render(request) {
		const { w, h } = request

		return this.r({
			w,
			h,
			request,
			root: this.prepareRoot({ w, h, request }),
		})
	}

	r({ w, h, request, root }) {
		this.lastW = w
		this.lastH = h
		this.lastRender = Date.now()

		const queue = new RenderQueue()

		const dimensions = new Map()

		root.render(queue, {
			state: this.state,
			x: 0,
			y: 0,
			w,
			h,
			dimensions,
			request,
			session: this.session,
		})

		return queue
	}

	// Handling events

	update(request) {
		const { w, h } = request

		const root = this.prepareRoot({ w, h, request })

		const dimensions = new Map()

		return root.update({
			w,
			h,
			x: 0,
			y: 0,
			request,
			dimensions,
			state: this.state,
			session: this.session,
		})
	}
}

module.exports = {
	Page,
}
