const fs = require('node:fs')
const path = require('path')

const { BaseRenderer } = require('./base-renderer.js')

const readClientCode = () => {
	const clientPath = path.join(__dirname, 'static', 'client-renderer-client.js')
	const canvasPath = path.join(__dirname, 'canvas-renderer.js')

	const client = fs.readFileSync(clientPath, 'utf-8')
	const classCode = fs.readFileSync(canvasPath, 'utf-8')

	return client
		.replace('"%RENDERER_CLASS%"', classCode.replace('module.exports = { CanvasRenderer }', ''))
}

let clientCode = readClientCode()

class ClientRenderer extends BaseRenderer {
	get clientCode() {
		return this.debug ? readClientCode() : clientCode
	}

	render(queue, { w, h }, initialCanvas = null) {
		return ''
	}
}

module.exports = { ClientRenderer }
