const { styleNames } = require('larana-js')

const initStyleNames = () => {
	const text = {
		fontWeight: 'var:fontWeight',
		fg: 'var:fg',
		fontSize: 'var:fontSize',
		fontFamily: 'var:fontFamily',
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
		h3Text: {
			...text,
			fontSize: 'var:h3FontSize',
		},
		body: { bg: 'var:bg' },
		link: {
			...text,
			fg: 'var:accent',
		},
	})
}

module.exports = {
	initStyleNames,
}

