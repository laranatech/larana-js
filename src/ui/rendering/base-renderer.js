class BaseRenderer {
	debug = false

	constructor({ debug }) {
		this.debug = debug
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
}

module.exports = { BaseRenderer }
