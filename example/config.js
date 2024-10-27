const { createConfig } = require('larana-js')

module.exports = createConfig({
	defaultTheme: 'dark',
	debug: false,
	debugOptions: {
		renderOutline: true,
	},
})
