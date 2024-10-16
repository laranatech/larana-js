class BaseRenderer {
	debug = false
	trimOffset = 10

	constructor({ debug, trimOffset = 10 }) {
		this.debug = debug
		this.trimOffset = trimOffset
	}

	get clientCode() {
		return ''
	}

	rect(canvas, { rect, color, border = null, radius = 0 }) {
		throw new Error('not implemented')
	}

	text(canvas, { rect, color, text, size }) {
		throw new Error('not implemented')
	}

	circle(canvas, { x, y, r, color, border = null }) {
		throw new Error('not implemented')
	}

	image(canvas, { rect, image }) {
		throw new Error('not implemented')
	}

	diff(a, b) {
		throw new Error('not implemented')
	}

	trim(canvas) {
		throw new Error('not implemented')
	}
}

module.exports = { BaseRenderer }
