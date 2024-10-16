const { Point } = require('../shapes')

const hover = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('hover', style)
		}

		return (data, state) => {
			const { x, y, event } = data

			if (event !== 'mousemove') {
				return ''
			}

			const p = new Point({ x, y })
			const d = component.getDimensions(state)

			if (p.collide(d)) {
				if (handler) {
					handler(event, state)
				}
				return 'hover'
			}

			return ''
		}
	}
}

module.exports = { hover }
