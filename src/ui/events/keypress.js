const keypress = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('keypress', style)
		}

		return (event, handle = false) => {
			const { value, type } = event

			if (type !== 'keypress') {
				return ''
			}

			if (handler && handle) {
				handler(value)
			}

			return 'keypress'
		}
	}
}

module.exports = { keypress }
