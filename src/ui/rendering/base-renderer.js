class BaseRenderer {
	debug = false
	trimOffset = 10
	fonts = []

	constructor({ debug, trimOffset = 10, fonts = [] }) {
		this.debug = debug
		this.trimOffset = trimOffset
		this.fonts = fonts
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
