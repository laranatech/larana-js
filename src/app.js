const { WebSocketServer } = require('ws')
const { createServer } = require('http')
const { MemoryStateManager, Session } = require('./state')
const { ServerRenderer } = require('./ui/rendering')
const { defaultConfig } = require('./config.js')
const { Response, Request } = require('./network')
const { prepareTemplate } = require('./ui/client')
const { DefaultRouter } = require('./routing')
const { initDefaultStyleVars, initDefaultStyleNames } = require('./ui/style')
const { prepareStatic } = require('./static/read-static-file.js')
const { getContentType } = require('./static/get-content-type.js')
const { getFavicon } = require('./static/get-favicon.js')

class LaranaApp {
	config = { ...defaultConfig }
	router = new DefaultRouter({})
	renderer = new ServerRenderer({ debug: false })
	stateManager = new MemoryStateManager({})
	clients = new Set()

	onConnect = (data) => {}
	onServe = (data) => {}
	onMessage = (data) => {}
	onClose = (data) => {}
	readStaticFile = (url, callback) => {}

	constructor(options) {
		const config = options.config
		const {
			router,
			renderer,
			stateManager,
			onConnect = (data) => {
				if (!config.debug || !config.debugOptions.logMessages) {
					return
				}
				console.log('[onConnect]', Date.now())
			},
			onServe = (data) => {
				if (!config.debug || !config.debugOptions.logMessages) {
					return
				}
				console.log('[onServe]', Date.now())
			},
			onMessage = (data) => {
				if (!config.debug || !config.debugOptions.logMessages) {
					return
				}
				console.log('[onMessage]', Date.now())
			},
			onClose = (data) => {
				if (!config.debug || !config.debugOptions.logMessages) {
					return
				}
				console.log('[onClose]', Date.now())
			},
		} = options

		this.config = config

		this.router = router

		this.onConnect = onConnect
		this.onServe = onServe
		this.onMessage = onMessage
		this.onClose = onClose

		if (renderer) {
			this.renderer = renderer
		}
		if (stateManager) {
			this.stateManager = stateManager
		}

		initDefaultStyleVars()
		initDefaultStyleNames()

		this.readStaticFile = prepareStatic(this.config.staticDir)
	}

	_serveStatic(req, res) {
		this.readStaticFile(req.url, (err, data) => {
			if (err) {
				res.statusCode = 404
				res.end()
				return
			}

			const contentType = getContentType(req.url)
			res.setHeader('Content-type', contentType)
			res.statusCode = 200
			res.end(data)
		})
	}

	_serveFavicon(_, res) {
		this.readStaticFile('/static/favicon.ico', (err, data) => {
			if (err) {
				getFavicon(({ favicon }) => {
					res.statusCode = 200
					res.end(favicon)
				})
				return
			}

			res.statusCode = 200
			res.end(data)
		})
	}

	_server(req, res) {
		if (req.url === '/favicon.ico') {
			this._serveFavicon(req, res)
			return
		}
		if (this.config.staticDir && req.url.startsWith('/static/')) {
			this._serveStatic(req, res)
			return
		}
		const route = this.router.resolve(req.url)
		const sessionId = this.stateManager.generateSessionId()
		console.log(route)

		const PageClass = route.page

		res.setHeader('Content-type', 'text/html')

		if (!PageClass) {
			res.statusCode = 404
			res.end()
			this.onServe({ req, route, sessionId })
			return
		}

		const page = new PageClass({
			appConfig: this.config,
			config: {
				storePreviousRender: this.config.storePreviousRender,
				rerenderDelay: 1000 / this.config.maxFPS,
			},
		})

		const session = new Session({
			sessionId,
			page,
			route,
			storage: { lang: this.config.defaultLang, theme: this.config.defaultTheme },
		})
		this.stateManager.addSession(sessionId, session)
		page._setSession(session)
		page.init()

		const w = this.config.initialW
		const h = this.config.initialH

		// const request = new Request({ w, h, type: 'connect' })
		// const queue = page.renderInitialDraw({ w, h, request })
		// const image = this.renderer.render(queue, { w, h })

		res.statusCode = 200

		const clientCode = prepareTemplate({
			wsPath: this.config.wsPath,
			sessionId,
			lang: session.storage.lang,
			title: page.title(),
			meta: page.meta(),
			styles: page.styles(),
			scripts: page.scripts(),
			clientCode: this.renderer.clientCode,
			w,
			h,
			initialResponse: JSON.stringify({ 'queue': [], image: '' }),
			// initialResponse: JSON.stringify({
			// 	image: image ? image.toDataURL() : '',
			// 	queue: queue.json(),
			// }),
		})

		res.end(clientCode)
		this.onServe({ req, route, sessionId })
	}

	_socket(ws) {
		ws.send('Connecting')

		this.clients.add(ws)

		this.onConnect({ ws })

		ws.on('message', (message) => {
			const payload = JSON.parse(message.toString())
			const session = this.stateManager.getSession(payload.sessionId)
			session.update()

			const { w, h, data } = payload

			const request = new Request({
				w, h,
				type: data.event,
				value: data.value,
				x: data.x,
				y: data.y,
			})

			this.onMessage({ message })

			if (request.event.type === 'open') {
				this._onOpen({ ws, request, session })
				return
			}

			const updated = session.page.update(request)

			if (updated) {
				session.page.tick(request)
			}
		})

		this._onClose(ws)
	}

	_onOpen({ ws, request, session }) {
		const send = ({ image, queue, x, y }) => {
			const r = new Response({ image: image ? image.toDataURL() : '', queue: queue.json(), x, y })
			ws.send(r.jsonString())
		}

		session.page.tick = (request) => {
			const queue = session.page.render(request)
			const image = this.renderer.render(queue, request)

			if (image && session.page.previousRender) {
				const diff = this.renderer.diff(session.page.previousRender, image)
				const trimmed = this.renderer.trim(diff)
				send({ image: trimmed.canvas, queue, x: trimmed.x, y: trimmed.y })
				session.page.previousRender = image
				return
			}

			session.page.previousRender = image
			send({ image: image ? image.toDataURL() : '', queue, x: 0, y: 0 })
		}

		const queue = session.page.render(request)
		const image = this.renderer.render(queue, request)
		session.page.previousRender = image

		send({ image, queue, x: 0, y: 0 })
	}

	_onClose(ws) {
		ws.on('close', () => {
			this.clients.delete(ws)
			this.onClose({ ws })
		})
	}

	run() {
		const server = createServer((req, res) => this._server(req, res))

		const wss = new WebSocketServer({ server })

		wss.on('connection', (ws) => this._socket(ws))

		server.listen(this.config.port, () => {
			console.log(`Listening on port: ${this.config.port}`)
		})
	}
}

module.exports = { LaranaApp }
