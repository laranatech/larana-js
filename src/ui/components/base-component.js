const crypto = require('crypto')

const { Style } = require('../style')

class BaseComponent {
	id = crypto.randomUUID()

	focusable = false

	page = null
	parent = null
	children = []

	style = null
	defaultStyle = new Style({})

	events = []
	eventStyles = new Map()
	activeEvents = []

	constructor({
		id,
		parent,
		page,
		children,
		style,
		events = [],
		focusable = false,
	}) {
		if (id) {
			this.id = id
		}

		if (parent !== undefined) {
			this.parent = parent
		}

		if (style !== undefined) {
			this.style = new Style({
				...this.defaultStyle.json(),
				...style.json(),
			})
		} else {
			this.style = this.defaultStyle
		}

		this.focusable = focusable

		this.events = events.map((e) => e(this))

		if (page !== undefined) {
			this.page = page
		}

		if (children !== undefined) {
			this.children = children

			children.forEach((child) => {
				child.setParent(this)
			})
		}
	}

	/**
	 * 
	 * @param {{ x: number; y: number; w: number; h: number; dimensions: Map }} data 
	 * @returns {{ x: number; y: number; w: number; h: number }}
	 */
	getDimensions(data) {
		const { x, y, w, h, state } = data

		if (!this.parent) {
			const d = { x, y, w, h }
			state.dimensions.set(this.id, d)
			return d
		}

		const stateDimensions = state.dimensions.get(this.id)

		if (stateDimensions) {
			return stateDimensions
		}

		const parrentDimensions = this.parent.getDimensions({ x, y, w, h, state })

		const padding = this.parent.getStyle().padding
		const gap = this.parent.getStyle().gap

		const workingDimensions = {
			x: parrentDimensions.x + padding,
			y: parrentDimensions.y + padding,
			w: parrentDimensions.w - padding * 2,
			h: parrentDimensions.h - padding * 2,
		}

		const siblings = this.parent.getChildren(data)

		if (siblings.length <= 1) {
			state.dimensions.set(this.id, workingDimensions)
			return workingDimensions
		}

		const totalSize = siblings.reduce((acc, sibling) => acc + sibling.getStyle().size, 0)

		const d = { x: 0, y: 0, w: 0, h: 0 }

		const direction = this.parent.getStyle().direction

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

			sizeOffset += sibling.getStyle().size
		})

		const totalGap = gap * (siblings.length - 1)
		const currentGap = currIndex === 0 ? 0 : gap * currIndex

		if (direction === 'row') {
			d.x = workingDimensions.x + (sizeOffset / totalSize) * (workingDimensions.w - totalGap) + currentGap
			d.y = workingDimensions.y
			d.w = (this.getStyle().size / totalSize) * (workingDimensions.w - totalGap)
			d.h = workingDimensions.h
		} else {
			d.x = workingDimensions.x
			d.y = workingDimensions.y + (sizeOffset / totalSize) * (workingDimensions.h - totalGap) + currentGap
			d.w = workingDimensions.w
			d.h = (this.getStyle().size / totalSize) * (workingDimensions.h - totalGap)
		}

		const { minWidth, maxWidth, minHeight, maxHeight } = this.getStyle()

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
			d.h = maxHeight
		}

		state.dimensions.set(this.id, d)

		return d
	}

	getChildren(state) {
		return this.children
	}

	setParent(parent) {
		this.parent = parent
	}

	update({ event, state }) {
		this.activeEvents = [
			...this.events
			.map((e) => e(event, { ...state, state }))
			.filter((e) => e !== '')
		]

		let updated = false

		this.getChildren(state).forEach((child) => {
			const childUpdated = child.update({ event, state })

			if (childUpdated) {
				updated = true
			}
		})

		if (this.activeEvents.length > 0) {
			updated = true
		}

		return updated
	}

	getStyle() {
		let styles = {
			...this.style.json(),
		}

		this.activeEvents.forEach((e) => {
			const s = this.eventStyles.get(e)

			if (!s) {
				return
			}

			styles = {
				...styles,
				...s.json(),
			}
		})

		return new Style({ ...styles })
	}

	render(queue, state) {
		const d = this.getDimensions(state)

		const style = this.getStyle()

		queue.add('rect', {
			fillStyle: style.bg,
			strokeStyle: style.borderColor,
			lineWidth: style.borderWidth,
			lineCap: style.borderCap,
			...d,
		})

		this.getChildren(state).forEach((child) => {
			child.render(queue, state)
		})

		return queue
	}
}

module.exports = { BaseComponent }
