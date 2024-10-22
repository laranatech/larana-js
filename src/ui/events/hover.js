const { Point } = require('../shapes')

const hover = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('hover', style)
		}

		return (data, handle = false) => {
			const { x, y, type } = data.request.event

			if (type !== 'mousemove') {
				return ''
			}

			const p = new Point({ x, y })
			const d = component.computeDimensions(data, false)

			if (p.collide(d)) {
				if (handler && handle) {
					handler(data)
				}
				return 'hover'
			}

			return ''
		}
	}
}

module.exports = { hover }
