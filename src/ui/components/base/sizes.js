const { StyledComponent } = require('./styles.js')

class SizedComponent extends StyledComponent {
	_computedDimensions = null
	_computedRadius = null

	_computedGaps = null

	computeMaxRadius({ w, h }) {
		if (this._computedRadius) {
			return this._computedRadius
		}

		const side = w > h ? h : w
		this._computedRadius = side / 2

		return this._computedRadius
	}

	computeSizeOld({ w, h, direction, alignment }) {
		console.log(w, h, direction, alignment )
		const s = this.preComputeStyle()
		let size = s.size

		if (direction === 'row' && s.width) {
			size = s.width / w
		}
		if (direction === 'column' && s.height) {
			console.log(s.height, h)
			size = s.height / h
			console.log(size)
		}

		return size
	}

	/**
	 * 
	 * @returns {{ x: number; y: number; w: number; h: number }}
	 */
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

		const parrentDimensions = this.parent.computeDimensions()

		const parentStyle = this.parent.preComputeStyle()

		const { padding, gap, direction, alignment } = parentStyle

		const workingDimensions = {
			x: parrentDimensions.x + padding,
			y: parrentDimensions.y + padding,
			w: parrentDimensions.w - padding * 2,
			h: parrentDimensions.h - padding * 2,
		}

		const siblings = this.parent.children

		if (siblings.length <= 1) {
			if (alignment === 'stretch') {
				dimensions.set(this.id, workingDimensions)
				this._computedDimensions = workingDimensions
				return workingDimensions
			}

			const d = this.computeSizeOld({ ...workingDimensions, direction, alignment })

			dimensions.set(this.id, d)
			this._computedDimensions = d
			return d
		}

		let totalSize = siblings.reduce((acc, sibling) => {
			return acc + sibling.computeSizeOld({ ...workingDimensions, direction, alignment })
		}, 0)

		if (alignment === 'start' || alignment === 'end') {
			totalSize += 1
		} else if (alignment === 'center') {
			totalSize += 2
		}

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

			sizeOffset += sibling.computeSizeOld({ ...workingDimensions, direction, alignment })
		})

		const totalGap = gap * (siblings.length - 1)
		const currentGap = currIndex === 0 ? 0 : gap * currIndex

		const { minWidth, maxWidth, minHeight, maxHeight } = this.preComputeStyle()

		const size = this.computeSizeOld({ ...workingDimensions, direction, alignment })

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

		this._computedDimensions = d

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
				gapRects.push({
					x: x + w,
					y: y,
					w: gap,
					h,
				})
				return
			}

			gapRects.push({
				x,
				y: y + h,
				w,
				h: gap,
			})
		})

		this._computedGaps = {
			totalGaps: children.length * gap,
			gapRects,
		}

		return this._computedGaps
	}

	computeDimensionsNew() {
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

		const { gap, padding, direction, alignment } = this.parent.preComputeStyle()
		const pd = this.parent.computeDimensions()
		const wd = {
			x: pd.x + padding,
			y: pd.y + padding,
			w: pd.w - padding * 2,
			h: pd.h - padding * 2,
		}

		// gaps
		// paddings
		// sizes
		// alignment
		// direction
		// absolute w/h
		// min/max w/h

		// alignment === stretch
		// has height -> height
		// else -> size
		// if no sized, then like start

		// alignment === start
		// has height -> height
		// if size -> size
		// if no size -> fit-content

		// alignment === end
		// like start, but aligned to end

		// alignment === center
		// like center, but aligned to center

		const d = wd

		return d
	}
}

module.exports = { SizedComponent }
