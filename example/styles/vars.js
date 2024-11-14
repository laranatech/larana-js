const { setStyleVars, hex } = require('larana-js')

const initStyleVars = () => {
	setStyleVars({
		fg: hex('#000'),
		bg: hex('#eee'),
		accent: hex('#3caa3c'),
		componentBg: hex('#fff'),
		fontWeight: 'medium',
		fontFamily: 'monospace',
		h0FontSize: 64,
		h1FontSize: 32,
		h2FontSize: 28,
		h3FontSize: 24,
		fontSize: 16,
		radius: 4,
	}, 'main')

	setStyleVars({
		fg: hex('#fff'),
		bg: hex('#444'),
		componentBg: hex('#333'),
	}, 'dark')
}

module.exports = { initStyleVars }
