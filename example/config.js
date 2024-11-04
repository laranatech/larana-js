const { createConfig } = require('larana-js')

module.exports = createConfig({
	defaultTheme: 'dark',
	debug: true,
	debugOptions: {
		renderOutline: true,
		renderPaddings: true,
		renderGaps: true,
		renderCursor: false,
	},
})
