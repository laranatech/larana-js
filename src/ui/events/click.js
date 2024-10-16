const { Point } = require('../shapes')

const click = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('click', style)
		}

		return (data, state) => {
			const { x, y, event } = data

			if (event !== 'click') {
				return ''
			}

			const p = new Point({ x, y })
			const d = component.getDimensions(state)

			if (p.collide(d)) {
				if (handler) {
					handler(event, state)
				}
				return 'click'
			}

			return ''
		}
	}
}

module.exports = { click }
