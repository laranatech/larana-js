const { point } = require('../shapes')

const click = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('click', style)
		}

		return (event, handle = false) => {
			if (event.type !== 'click') {
				return ''
			}

			const { x, y } = event

			const p = point({ x, y })
			const d = component.computeDimensions()

			if (p.collide(d)) {
				if (handler && handle) {
					handler()
				}
				return 'click'
			}

			return ''
		}
	}
}

module.exports = { click }
