const crypto = require('crypto')

const { Style } = require('../../style')
const { rect, line, point } = require('../../shapes')
const { Hooks } = require('./hooks')

class BaseComponent extends Hooks {
	id = crypto.randomUUID()

	focusable = false
	disabled = false

	parent = null

	_root = null

	children = []
	computedChildren = []

	style = {}
	defaultStyle = {}
	focusedStyle = {}
	defaultFocusedStyle = {}
	hoveredStyle = {}
	defaultHoveredStyle = {}
	disabledStyle = {}
	defaultDisabledStyle = {}

	defaultStyle = {
		_disabled: {},
		_focused: {},
		_hovered: {},
	}

	style = {
		_disabled: {},
		_focused: {},
		_hovered: {},
	}

	preComputedStyle = null
	computedStyle = null

	computedDimensions = null

	events = []
	eventStyles = new Map()
	activeEvents = []

	outlineColor = '#f00'

	constructor(options) {
		super(options)

		const {
			id,
			parent,
			children,
			style = {},
			focusedStyle = {},
			hoveredStyle = {},
			disabledStyle = {},
			outlineColor = '#f00',
			events = [],
			focusable = false,
			disabled = false,
		} = options

		if (id) {
			this.id = id
		}

		this.outlineColor = outlineColor

		this.focusable = focusable
		this.disabled = disabled

		if (this.focusable && !id) {
			throw new Error('Focusable components must have an ID')
		}

		if (parent !== undefined) {
			this.parent = parent
		}

		this.style = style
		this.focusedStyle = focusedStyle
		this.hoveredStyle = hoveredStyle
		this.disabledStyle = disabledStyle

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

	computeMaxRadius({ w, h }) {
		const side = w > h ? h : w
		let r = side / 2

		return r
	}

	preComputeStyle() {
		if (this.preComputedStyle) {
			return this.preComputedStyle
		}

		const styles = [
			this.defaultStyle,
		]

		if (Array.isArray(this.style)) {
			styles.push(...this.style)
		} else {
			styles.push(this.style)
		}

		if (this.focusable && this.isFocused()) {
			styles.push(this.defaultFocusedStyle)
			styles.push(this.focusedStyle)
		}

		if (this.disabled) {
			styles.push(this.defaultDisabledStyle)
			styles.push(this.disabledStyle)
		}

		const { request, session } = this.usePayload()

		const result = Style.compute(styles, request, session)

		this.preComputedStyle = new Style(result)

		return this.preComputedStyle
	}

	/**
	 * 
	 * @returns {{ x: number; y: number; w: number; h: number }}
	 */
	computeDimensions() {
		if (this.computedDimensions) {
			return this.computedDimensions
		}

		const { x, y, w, h, state, dimensions, request, session } = this.usePayload()

		if (!this.parent) {
			const d = { x, y, w, h }
			dimensions.set(this.id, d)
			return d
		}

		const stateDimensions = dimensions.get(this.id)

		if (stateDimensions) {
			this.computedDimensions = stateDimensions
			return stateDimensions
		}

		const parrentDimensions = this.parent.computeDimensions()

		const parentStyle = this.parent.preComputeStyle()

		const { padding, gap, direction } = parentStyle

		const workingDimensions = {
			x: parrentDimensions.x + padding,
			y: parrentDimensions.y + padding,
			w: parrentDimensions.w - padding * 2,
			h: parrentDimensions.h - padding * 2,
		}

		const siblings = this.parent.children

		if (siblings.length <= 1) {
			dimensions.set(this.id, workingDimensions)
			this.computedDimensions = workingDimensions
			return workingDimensions
		}

		const totalSize = siblings.reduce((acc, sibling) => acc + sibling.preComputeStyle().size, 0)

		const d = { x: 0, y: 0, w: 0, h: 0 }

		let sizeOffset = 0
		let currIndex = -1

		siblings.forEach((sibling, i) => {
			if (currIndex !== -1) {
				return
			}
			if (sibling.id === this.id) {
				currIndex = i
				return
			}

			sizeOffset += sibling.preComputeStyle().size
		})

		const totalGap = gap * (siblings.length - 1)
		const currentGap = currIndex === 0 ? 0 : gap * currIndex

		const { minWidth, maxWidth, minHeight, maxHeight, size } = this.preComputeStyle()

		if (direction === 'row') {
			d.x = workingDimensions.x + (sizeOffset / totalSize) * (workingDimensions.w - totalGap) + currentGap
			d.y = workingDimensions.y
			d.w = (size / totalSize) * (workingDimensions.w - totalGap)
			d.h = workingDimensions.h
		} else {
			d.x = workingDimensions.x
			d.y = workingDimensions.y + (sizeOffset / totalSize) * (workingDimensions.h - totalGap) + currentGap
			d.w = workingDimensions.w
			d.h = (size / totalSize) * (workingDimensions.h - totalGap)
		}

		if (minWidth && minWidth > d.w) {
			d.w = minWidth
		}

		if (maxWidth && maxWidth < d.w) {
			d.w = maxWidth
		}

		if (minHeight && minHeight > d.h) {
			d.h = minHeight
		}

		if (maxHeight && maxHeight < d.h) {
			console.log(maxHeight)
			d.h = maxHeight
		}

		dimensions.set(this.id, d)

		this.computedDimensions = d

		return d
	}

	computeStyle() {
		const styles = [this.preComputeStyle()]

		const { request, session } = this.usePayload()

		const d = this.computeDimensions()
		const { currMouse } = this.useMouse()

		const hovered = currMouse.collide(d)

		if (hovered) {
			styles.push(this.defaultHoveredStyle)
			styles.push(this.hoveredStyle)
		}

		const result = Style.compute(styles, request, session)

		this.computedStyle = new Style(result)

		return this.computedStyle
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

		// TODO
		// return true
		return updated
	}

	_renderOutline(queue) {
		const config = this.useConfig()
		if (!config.debug || !config.debugOptions.renderOutline) {
			return
		}

		const { x, y, w, h } = this.computeDimensions()

		const borderColor = this.outlineColor
		const borderWidth = 1

		rect({
			borderColor,
			borderWidth,
			x, y, w, h,
		}).to(queue)

		if (this.children.length === 0) {
			line({
				points: [
					point({ x: x + 1, y: y + 1 }),
					point({ x: x + w - 1, y: y + h - 1 }),
				],
				borderColor,
				borderWidth,
			}).to(queue)
			line({
				points: [
					point({ x: x + w - 1, y: y + 1 }),
						point({ x: x + 1, y: y + h - 1 }),
				],
				borderColor,
				borderWidth,
			}).to(queue)
		}

		return queue
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

		root._renderOutline(queue)
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

		root.style = this.computeStyle()

		this._patch(root, payload)

		this._root = root

		return root
	}

	root() {
		return this
	}
}

module.exports = { BaseComponent }
