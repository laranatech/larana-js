const keypress = ({ handler, style }) => {
	return (component) => {
		if (style) {
			component.eventStyles.set('keypress', style)
		}

		return (data, handle = false) => {
			const { value, type } = data.request.event

			if (type !== 'keypress') {
				return ''
			}

			if (handler && handle) {
				handler(data, value)
			}

			return 'keypress'
		}
	}
}

module.exports = { keypress }
