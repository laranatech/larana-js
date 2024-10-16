const { MemoryStateManager, ServerRenderer, LaranaApp, DefaultRouter } = require('larana-js')

const config = require('./config.js')

const { routes } = require('./routes.js')

const { initStyleVars, initStyles } = require('./styles')

initStyleVars()
initStyles()

const router = new DefaultRouter({
	debug: config.debug,
	routes,
})

const renderer = new ServerRenderer({
	debug: config.debug,
	DRM: false,
	maxFPS: config.maxFPS,
})

const stateManager = new MemoryStateManager({
	debug: config.debug,
})

const app = new LaranaApp({
	config,
	renderer,
	stateManager,
	router,
})

app.run()
