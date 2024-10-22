const { styleNames } = require('larana-js')

const initStyleNames = () => {
	const text = {
		fontWeight: 'var:fontWeight',
		fg: 'var:fg',
		fontSize: 'var:fontSize',
		fontFamily: 'var:fontFamily',
	}

	const button = {
		...text,
		bg: 'var:componentBg',
		radius: 'var:radius',
		gap: 8,
	}

	styleNames({
		text,

		h1Text: {
			...text,
			fontSize: 'var:h1FontSize',
		},

		h2Text: {
			...text,
			fontSize: 'var:h2FontSize',
		},

		body: { bg: 'var:bg' },

		link: {
			...text,
			fg: 'var:accent',
		},

		button,

		input: {
			...button,
			borderColor: 'var:fg',
		}
	})
}

module.exports = {
	initStyleNames,
}

