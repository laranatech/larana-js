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

	render(queue, { w, h }, initialCanvas = null) {
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
