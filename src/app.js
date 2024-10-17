const { WebSocketServer } = require('ws')
const { createServer } = require('http')
const { MemoryStateManager } = require('./state')
const { ServerRenderer } = require('./ui/rendering')
const { defaultConfig } = require('./config.js')
const { Response, Request } = require('./network')

class LaranaApp {
	config = { ...defaultConfig }
	router = null
	renderer = new ServerRenderer({ debug: false })
	stateManager = new MemoryStateManager()
	clients = new Set()

	onConnect = (data) => {}
	onServe = (data) => {}
	onMessage = (data) => {}
	onClose = (data) => {}

	constructor(options) {
		const {
			config,
			router,
			renderer,
			stateManager,
			onConnect = (data) => {
				console.log('[onConnect]', Date.now())
			},
			onServe = (data) => {
				console.log('[onServe]', Date.now())
			},
			onMessage = (data) => {
				console.log('[onMessage]', Date.now())
			},
			onClose = (data) => {
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
	}

	/**
	 * 
	 */
	server(req, res) {
		const route = this.router.resolve(req.url)
		const sessionId = this.stateManager.generateSessionId()
		console.log(route)

		const PageClass = route.page

		if (!PageClass) {
			res.statusCode = 404
			res.end()
			this.onServe({ req, route, sessionId })
			return
		}

		const page = new PageClass({
			config: {
				storePreviousRender: this.config.storePreviousRender,
				rerenderDelay: 1000 / this.config.maxFPS,
			},
			route,
		})

		const session = { page, lang: 'en', url: req.url, theme: 'main' }
		this.stateManager.addSession(sessionId, session)

		const w = 512
		const h = 512

		const queue = page.renderInitialDraw({ w, h })

		const image = this.renderer.render(queue, { w, h })

		res.statusCode = 200
		res.setHeader('Content-type', 'text/html')

		const clientCode = this.renderer.clientCode
			.replace('%WS_PATH%', this.config.wsPath)
			.replace('%TITLE%', page.getTitle())
			.replace('%LANG%', session.lang)
			.replace('%META%', page.getMeta())
			.replace('%SCRIPTS%', page.getScripts())
			.replace('%INITIAL_DRAW%', image.toDataURL())
			.replace('%INITIAL_W%', w)
			.replace('%INITIAL_H%', h)
			.replace('%SESSION_ID%', sessionId)

		res.end(clientCode)
		this.onServe({ req, route, sessionId })
	}

	socket(ws) {
		ws.send('Connecting')

		this.clients.add(ws)

		this.onConnect({ ws })

		const send = (image, x, y) => {
			const r = new Response({ image: image.toDataURL(), x, y })
			ws.send(r.jsonString())
		}

		const onOpen = (payload, session) => {
			session.page.send = () => {
				const queue = session.page.render(payload)
				const image = this.renderer.render(queue, payload)
				if (session.page.previousRender) {
					const diff = this.renderer.diff(session.page.previousRender, image)
					const trimmed = this.renderer.trim(diff)
					send(trimmed.canvas, trimmed.x, trimmed.y)
					session.page.previousRender = image
					return
				}
				session.page.previousRender = image
				send(image, 0, 0)
			}

			const queue = session.page.render(payload)
			const image = this.renderer.render(queue, payload)
			session.page.previousRender = image

			send(image, 0, 0)
		}

		ws.on('message', (message) => {
			const payload = JSON.parse(message.toString())
			const session = this.stateManager.getSession(payload.sessionId)

			this.onMessage({ message })

			if (payload.data.event === 'open') {
				onOpen(payload, session)
				return
			}

			const updated = session.page.update(payload)

			if (updated) {
				console.log('updated!')
				session.page.send()
			}
		})

		ws.on('close', () => {
			this.clients.delete(ws)
			this.onClose({ ws })
		})
	}

	run() {
		const server = createServer((req, res) => this.server(req, res))

		const wss = new WebSocketServer({ server })

		wss.on('connection', (ws) => this.socket(ws))

		server.listen(this.config.port, () => {
			console.log(`Listening on port: ${this.config.port}`)
		})
	}
}

module.exports = { LaranaApp }
