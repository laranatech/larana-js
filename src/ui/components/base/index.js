const crypto = require('crypto')

const { DebuggedComponent } = require('./debug.js')

class BaseComponent extends DebuggedComponent {
	id = crypto.randomUUID()

	focusable = false
	disabled = false

	parent = null

	_root = null

	children = []
	computedChildren = []

	events = []
	eventStyles = new Map()
	activeEvents = []

	constructor(options) {
		super(options)

		const {
			id,
			parent,
			children,
			events = [],
			focusable = false,
			disabled = false,
		} = options

		if (id) {
			this.id = id
		}

		this.focusable = focusable
		this.disabled = disabled

		if (this.focusable && !id) {
			throw new Error('Focusable components must have an ID')
		}

		if (parent !== undefined) {
			this.parent = parent
		}

		this.events = events.map((e) => e(this))

		if (children !== undefined) {
			this.children = children

			children.forEach((child) => {
				child.setParent(this)
			})
		}
	}

	focus() {
		if (!this.focusable) {
			return
		}

		const page = this.usePage()

		page.focus(this.id)
	}

	isFocused() {
		return this.usePage().focused === this.id
	}

	getChildren() {
		const root = this.getRoot()
		return root.children
	}

	setParent(parent) {
		this.parent = parent
	}

	update() {
		const event = this.useEvent()

		this.activeEvents = this.events
			.map((e) => e(event, true))
			.filter((e) => e !== '')

		let updated = false

		this.getChildren().forEach((child) => {
			const childUpdated = child.update()

			if (childUpdated) {
				updated = true
			}
		})

		if (this.activeEvents.length > 0) {
			updated = true
		}

		const d = this.computeDimensions()

		const { lastMouse, currMouse } = this.useMouse()

		const wasHovered = lastMouse.collide(d)
		const isHovered = currMouse.collide(d)

		const hoverChanged = (wasHovered && !isHovered) || (!wasHovered && isHovered)

		if (hoverChanged) {
			updated = true
		}

		return updated
	}

	onRender(queue) {}

	render(queue) {
		return queue
	}

	_render(queue) {
		this.onRender(queue)

		const root = this.getRoot()

		root.render(queue)

		root.children.forEach((child) => {
			child._render(queue)
		})

		this._renderDebug(queue)
		return queue
	}

	getRoot() {
		if (this._root) {
			return this._root
		}
		const payload = this.usePayload()
		const root = this.root()

		if (root !== this) {
			root.setParent(this)
		}

		root.style = this.computeStyle([root.style, root.defaultStyle])
		root._computedDimensions = this.computeDimensions()

		this._patch(root, payload)

		this._root = root

		return root
	}

	root() {
		return this
	}
}

module.exports = { BaseComponent }
