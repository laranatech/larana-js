const { createConfig } = require('larana-js')

module.exports = createConfig({
	debug: true,
	port: 3000,
	wsPath: 'ws://localhost:3000/',
	maxFPS: 60,
	maxBandwidth: 10 * 1024, // 10 kb TODO
	sessionLifetime: 5 * (60 * 1000), // 5 minutes
	storePreviousRender: true, 
})
