const { Point } = require('../shapes')

const click = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('click', style)
		}

		return (data, handle = false) => {
			const { x, y, type } = data.request.event

			if (type !== 'click') {
				return ''
			}

			const p = new Point({ x, y })
			const d = component.computeDimensions(data, false)

			if (p.collide(d)) {
				if (handler && handle) {
					handler(data)
				}
				return 'click'
			}

			return ''
		}
	}
}

module.exports = { click }
