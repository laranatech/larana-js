const { RenderQueue } = require('../ui/rendering')
const { LayoutComponent } = require('../ui/components')

class Page {
	sessionId = ''
	route = null

	state = {}
	meta = {}
	root = null
	initialRoot = null

	focused = ''

	lastW = 0
	lastH = 0
	lastRender = 0

	rerenderDelay = 1

	previousRender = null

	title = ''
	meta = ''
	scripts = '123'
	styles = ''

	rerenderTimeout = null

	constructor({ state, meta, config, sessionId, route }) {
		this.sessionId = sessionId
		this.route = route

		if (state !== undefined) {
			this.state = state
		}
		if (meta !== undefined) {
			this.meta = meta
		}

		this.rerenderDelay = config.rerenderDelay

		this.init()
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

	send() {}

	init() {
		this.root = new LayoutComponent({})
	}

	prepareRoot({ w, h }) {
		return this.root
	}

	prepareInitialRoot({ w, h }) {
		if (this.initialRoot) {
			return this.initialRoot
		}
		return this.prepareFirstRoot({ w, h })
	}

	prepareFirstRoot({ w, h }) {
		return this.prepareRoot({ w, h })
	}

	onUpdate(data) {}

	update(data) {
		const root = this.prepareRoot(data)

		const dimensions = new Map()
		return root.update({
			w: data.w,
			h: data.h,
			event: data.data,
			state: {
				...this.state,
				dimensions,
				x: 0,
				y: 0,
				w: data.w,
				h: data.h,
			},
		})
	}

	renderInitialDraw({ w = 128, h = 128 }) {
		return this.r({ w, h, root: this.prepareInitialRoot({ w, h }) })
	}

	renderFirstDraw({ w, h }) {
		return this.r({ w, h, root: this.prepareFirstRoot({ w, h })})
	}

	render({ w, h }) {
		return this.r({ w, h, root: this.prepareRoot({ w, h }) })
	}

	r({ w, h, root }) {
		this.lastW = w
		this.lastH = h
		this.lastRender = Date.now()

		const queue = new RenderQueue()

		const dimensions = new Map()

		root.render(queue, {
			state: {
				...this.state,
				dimensions,
			},
			x: 0,
			y: 0,
			w,
			h,
		})

		return queue
	}

	rerender() {
		if (!this.send) {
			return
		}

		clearTimeout(this.rerenderTimeout)

		this.rerenderTimeout = setTimeout(() => {
			this.send()
		}, this.rerenderDelay)

	}
}

module.exports = {
	Page,
}
