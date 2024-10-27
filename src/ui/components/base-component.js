const crypto = require('crypto')

const { Style } = require('../style')

class BaseComponent {
	id = crypto.randomUUID()

	focusable = false
	disabled = false

	model = ''
	value = ''

	page = null
	parent = null
	children = []

	style = {}
	defaultStyle = {}
	computedStyle = null

	computedDimensions = null

	events = []
	eventStyles = new Map()
	activeEvents = []

	constructor({
		id,
		parent,
		page,
		children,
		style,
		model = '',
		events = [],
		focusable = false,
		disabled = false,
	}) {
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

		if (style !== undefined) {
			this.style = style
		}

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

		this.model = model
	}

	focus(data) {
		if (!this.focusable) {
			return
		}

		data.session.page.focus(this.id)
	}

	getModelValue(data) {
		return this.model ? data.state[this.model] : this.value
	}

	computeMaxRadius({ w, h }) {
		const side = w > h ? h : w
		let r = side / 2

		return r
	}

	updateModelValue(data, value) {
		if (this.disabled || !this.model) {
			return
		}

		data.session.page.setState({
			[this.model]: value,
		})
	}

	/**
	 * 
	 * @param {{ x: number; y: number; w: number; h: number; dimensions: Map }} data 
	 * @returns {{ x: number; y: number; w: number; h: number }}
	 */
	computeDimensions(data, withEvents) {
		if (this.computedDimensions) {
			return this.computedDimensions
		}

		const { x, y, w, h, state, dimensions, request, session } = data

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

		const parrentDimensions = this.parent.computeDimensions({...data, x, y, w, h })

		const parentStyle = this.parent.computeStyle(data, withEvents)

		const { padding, gap, direction } = parentStyle

		const workingDimensions = {
			x: parrentDimensions.x + padding,
			y: parrentDimensions.y + padding,
			w: parrentDimensions.w - padding * 2,
			h: parrentDimensions.h - padding * 2,
		}

		const siblings = this.parent.getChildren(data)

		if (siblings.length <= 1) {
			dimensions.set(this.id, workingDimensions)
			this.computedDimensions = workingDimensions
			return workingDimensions
		}

		const totalSize = siblings.reduce((acc, sibling) => acc + sibling.computeStyle(data, withEvents).size, 0)

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

			sizeOffset += sibling.computeStyle(data, withEvents).size
		})

		const totalGap = gap * (siblings.length - 1)
		const currentGap = currIndex === 0 ? 0 : gap * currIndex

		const { minWidth, maxWidth, minHeight, maxHeight, size } = this.computeStyle(data, withEvents)

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
			d.h = maxHeight
		}

		dimensions.set(this.id, d)

		this.computedDimensions = d

		return d
	}

	getChildren(data) {
		return this.children
	}

	setParent(parent) {
		this.parent = parent
	}

	setPage(page) {
		this.page = page
	}

	update(data) {
		this.activeEvents = this.events
			.map((e) => e(data, true))
			.filter((e) => e !== '')

		let updated = false

		this.getChildren(data).forEach((child) => {
			const childUpdated = child.update(data)

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

	computeStyle(data, withEvents = true) {
		if (this.computedStyle) {
			return this.computedStyle
		}

		const { request, session } = data

		const styles = [
			this.defaultStyle,
		]

		if (Array.isArray(this.style)) {
			styles.push(...this.style)
		} else {
			styles.push(this.style)
		}

		if (request.event && withEvents) {
			// TODO
			this.activeEvents = this.events
				.map((e) => e(data, false))
				.filter((e) => e !== '')

			this.activeEvents.forEach((e) => {
				const s = this.eventStyles.get(e)
				if (s) {
					styles.push(s)
				}
			})
		}

		const result = Style.compute(styles, request, session)

		this.computedStyle = new Style(result)

		return this.computedStyle
	}

	renderOutline(queue, data) {
		const d = this.computeDimensions(data)

		queue.add('rect', {
			strokeStyle: '#f00',
			lineWidth: 1,
			...d,
		})

		this.getChildren(data).forEach((child) => {
			child.renderOutline
			(queue, data)
		})

		return queue
	}

	render(queue, data) {
		const d = this.computeDimensions(data)

		const style = this.computeStyle(data)

		queue.add('rect', {
			fillStyle: style.bg,
			strokeStyle: style.borderColor,
			lineWidth: style.borderWidth,
			lineCap: style.borderCap,
			radius: style.radius,
			...d,
		})

		this.getChildren(data).forEach((child) => {
			child.render(queue, data)
		})

		return queue
	}
}

module.exports = { BaseComponent }
