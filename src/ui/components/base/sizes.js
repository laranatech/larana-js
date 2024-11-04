const { StyledComponent } = require('./styles.js')

class SizedComponent extends StyledComponent {
	_isRoot = false

	_computedDimensions = null
	_computedRadius = null
	_computedSize = null
	_computedGaps = null

	computeWH() {
		const style = this.preComputeStyle()

		let w = style.width
		let h = style.height
		const aspectRatio = style.aspectRatio ?? null

		if (style.height) {
			h = style.height

			if (style.maxHeight && h > style.maxHeight) {
				h = style.maxHeight
			}
			if (style.minHeight && h < style.minHeight) {
				sH = style.minHeight
			}

			if (aspectRatio && !w) {
				w = h * aspectRatio
			}
		}
		if (style.width) {
			w = style.width

			if (style.maxWidth && w > style.maxWidth) {
				w = style.maxWidth
			}
			if (style.minWidth && w < style.minWidth) {
				w = style.minWidth
			}

			if (aspectRatio && !h) {
				h = w / aspectRatio
			}
		}

		return { w, h }
	}

	computeFitContentSize({ direction, padding }) {
		const children = this.getChildren()

		const key = direction === 'row' ? 'h' : 'w'

		let side = null

		children.forEach((child) => {
			const style = child.preComputeStyle()

			let d = { w: null, h: null }

			if (style.size === 'hug') {
				d = child.computeFitContentSize({
					direction: style.direction,
					padding: style.padding,
				})
			} else if (style.width || style.height) {
				d = child.computeWH()
			}

			if (d[key] && d[key] > side) {
				side = d[key] + padding * 2
			}
		})

		return side
	}

	computeSize() {
		if (this._computedSize) {
			return this._computedSize
		}

		const style = this.preComputeStyle()

		let size = style.size ?? 1
		let d = { w: 0, h: 0 }

		if (size === 'hug') {
			const side = this.computeFitContentSize({
				direction: style.direction,
				padding: style.padding,
			})

			if (style.direction === 'column') {
				d.w = side
				d.h = null
			} else {
				d.w = null
				d.h = side
			}
		} else {
			d = this.computeWH()
		}

		this._computedSize = { size, ...d }

		return this._computedSize
	}

	computeDimensions() {
		if (this._computedDimensions) {
			return this._computedDimensions
		}

		const { x, y, w, h, dimensions } = this.usePayload()

		if (!this.parent) {
			const d = { x, y, w, h }
			dimensions.set(this.id, d)
			return d
		}

		const stateDimensions = dimensions.get(this.id)

		if (stateDimensions) {
			this._computedDimensions = stateDimensions
			return stateDimensions
		}

		const { gap, padding, direction, size } = this.parent.preComputeStyle()
		const pd = this.parent.computeDimensions()

		if (this._isRoot) {
			this._computedDimensions = pd
			dimensions.set(this.id, pd)
			return this._computedDimensions
		}

		const wd = {
			x: pd.x + padding,
			y: pd.y + padding,
			w: pd.w - padding * 2,
			h: pd.h - padding * 2,
		}

		const siblings = this.parent.getChildren()
		const totalGap = (siblings.length - 1) * gap

		const compSize = this.computeSize()

		const totalSize = siblings.reduce((acc, s) => {
			const sSize = s.computeSize()

			if (
				sSize.size === 'hug'
				|| (direction === 'row' && sSize.w)
				|| (direction === 'column' && sSize.h)
			) {
				return acc
			}
			return acc + sSize.size
		}, 0)

		let d = { ...wd }

		const computeOffset = (side, key) => {
			let offset = 0
			let currId = -1

			const oneSize = side / totalSize

			siblings.forEach((sibling, i) => {
				if (currId !== -1) {
					return
				}
				if (sibling.id === this.id) {
					currId = i
					return
				}

				const sibSize = sibling.computeSize()

				let p = 0

				if (sibSize[key]) {
					p = sibSize[key]
				} else if (sibSize.size !== 'hug') {
					p = sibSize.size * oneSize
				}

				offset += p + gap
			})

			return offset
		}

		const computeSide = (side, key) => {
			return side - siblings.reduce((acc, sibling) => {
				const sibSize = sibling.computeSize()

				if (sibSize[key]) {
					return acc + sibSize[key]
				}
				return acc
			}, 0) - totalGap
		}

		if (direction === 'column') {
			const side = computeSide(wd.h, 'h')
			const oneSize = side / totalSize

			const offset = computeOffset(side, 'h')

			let ch = 0

			if (compSize.h) {
				ch = compSize.h
			} else if (compSize.size !== 'hug') {
				ch = compSize.size * oneSize
			}

			const cw = compSize.w ?? wd.w

			d = { ...wd, w: cw, y: wd.y + offset, h: ch }
		} else if (direction === 'row') {
			const side = computeSide(wd.w, 'w')
			const oneSize = side / totalSize

			const offset = computeOffset(side, 'w')

			let cw = 0

			if (compSize.w) {
				cw = compSize.w
			} else if (compSize.size !== 'hug') {
				cw = compSize.size * oneSize
			} else {
				cw = oneSize
			}

			const ch = compSize.h ?? wd.h

			d = { ...wd, x: wd.x + offset, w: cw, h: ch }
		}

		this._computedDimensions = d
		dimensions.set(this.id, d)

		return d
	}

	computeGaps() {
		if (this._computedGaps) {
			return this._computedGaps
		}

		const root = this.getRoot()
		const children = this.getChildren()

		const { gap, direction } = root.preComputeStyle()

		if (!gap || children.length === 0) {
			this._computedGaps = {
				totalGaps: 0,
				gapRects: [],
			}
			return this._computedGaps
		}

		const gapRects = []

		children.forEach((child, i) => {
			if (i === children.length - 1) {
				return
			}

			const { x, y, w, h } = child.computeDimensions()

			if (direction === 'row') {
				gapRects.push({ x: x + w, y: y, w: gap, h })
				return
			}

			gapRects.push({ x, y: y + h, w, h: gap })
		})

		this._computedGaps = {
			totalGaps: children.length * gap,
			gapRects,
		}

		return this._computedGaps
	}

	computeMaxRadius() {
		if (this._computedRadius) {
			return this._computedRadius
		}

		const { w, h } = this.computeDimensions()

		const side = w > h ? h : w
		this._computedRadius = side / 2

		return this._computedRadius
	}
}

module.exports = { SizedComponent }
