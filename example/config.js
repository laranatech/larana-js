const path = require('path')
const { defineConfig } = require('larana-js')

module.exports = defineConfig({
	port: 1610,
	defaultTheme: 'dark',
	debug: false,
	debugOptions: {
		renderOutline: true,
		renderPaddings: true,
		renderGaps: true,
		renderCursor: false,
	},
	staticDir: path.join(__dirname, 'static'),
})
