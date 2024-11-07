const { point } = require('../shapes')

const hover = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('hover', style)
		}

		return (payload, handle = false) => {
			const { x, y, type } = payload.request.event

			if (type !== 'mousemove') {
				return ''
			}

			const p = point({ x, y })
			const d = component.computeDimensions()

			if (p.collide(d)) {
				if (handler && handle) {
					handler(payload)
				}
				return 'hover'
			}

			return ''
		}
	}
}

module.exports = { hover }
