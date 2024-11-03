const { StyledComponent } = require('./styles.js')

class SizedComponent extends StyledComponent {
	_computedDimensions = null
	_computedRadius = null
	_computedSize = null
	_computedGaps = null

	computeSize({ w, h, totalGap }) {
		if (this._computedSize) {
			return this._computedSize
		}

		const style = this.preComputeStyle()

		let sH = style.height
		let sW = style.width
		let size = style.size ?? 1
		const aspectRatio = style.aspectRatio ?? null

		if (!style.height && style.minHeight) {}

		if (style.height) {
			sH = style.height

			if (style.maxHeight && sH > style.maxHeight) {
				sH = style.maxHeight
			}
			if (style.minHeight && sH < style.minHeight) {
				sH = style.minHeight
			}
		}
		if (style.width) {
			sW = style.width

			if (style.maxWidth && sW > style.maxWidth) {
				sW = style.maxWidth
			}
			if (style.minWidth && sW < style.minWidth) {
				sW = style.minWidth
			}
		}

		this._computedSize = { size, w: sW, h: sH }
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

		const { gap, padding, direction } = this.parent.preComputeStyle()
		const pd = this.parent.computeDimensions()
		const wd = {
			x: pd.x + padding,
			y: pd.y + padding,
			w: pd.w - padding * 2,
			h: pd.h - padding * 2,
		}

		const siblings = this.parent.getChildren()
		const totalGap = (siblings.length - 1) * gap

		const compSize = this.computeSize({ ...wd, totalGap })

		const totalSize = siblings.reduce((acc, s) => {
			const sSize = s.computeSize({ ...wd, totalGap })

			if ((direction === 'row' && sSize.w) || (direction === 'column' && sSize.h)) {
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

				const sibSize = sibling.computeSize({ ...wd, totalGap })

				let p = 0

				if (sibSize[key]) {
					p = sibSize[key]
				} else if (sibSize.size) {
					p = sibSize.size * oneSize
				} else {
					p = oneSize
				}

				offset += p + gap
			})

			return offset
		}

		const computeSide = (side, key) => {
			return side - siblings.reduce((acc, sibling) => {
				const sibSize = sibling.computeSize({ ...wd, totalGap })

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
			} else if (compSize.size) {
				ch = compSize.size * oneSize
			} else {
				ch = oneSize
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
			} else if (compSize.size) {
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
