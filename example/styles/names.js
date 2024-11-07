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
		h0: {
			...text,
			fontSize: 'var:h0FontSize',
		},
		h1: {
			...text,
			fontSize: 'var:h1FontSize',
		},
		h2: {
			...text,
			fontSize: 'var:h2FontSize',
		},
		h3: {
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

