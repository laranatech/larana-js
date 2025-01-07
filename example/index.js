const {
	MemorySessionManager,
	// ServerRenderer,
	ClientRenderer,
	LaranaApp,
	DefaultRouter,
} = require('larana-js')

const config = require('./config.js')

const { routes } = require('./routes.js')

const { initStyles } = require('./styles')

initStyles()

const router = new DefaultRouter({
	debug: config.debug,
	routes,
})

const renderer = new ClientRenderer({
	debug: config.debug,
	DRM: false,
	maxFPS: config.maxFPS,
	fonts: [
		'/static/monospace.ttf',
	],
})

const sessionManager = new MemorySessionManager({
	debug: config.debug,
})

const app = new LaranaApp({
	config,
	renderer,
	sessionManager,
	router,
})

app.run()
