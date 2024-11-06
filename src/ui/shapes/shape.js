class Shape {
	name = 'shape'

	style = {}
	rawOptions = {}

	constructor(options) {
		this.rawOptions = options
		this.extractStyles(options)
	}

	extractStyles(options) {
		const keysMap = {
			fg: 'fillStyle',
			bg: 'fillStyle',
			borderCap: 'lineCap',
			borderWidth: 'lineWidth',
			borderColor: 'strokeStyle',
			font: 'font',
			textBaseline: 'textBaseline',
			textAlign: 'textAlign',
			w: 'w',
			h: 'h',
			striked: 'striked',
			underline: 'underlined',
		}

		const keys = Object.keys(keysMap)

		const style = {}

		Object.keys(options).forEach((key) => {
			if (!keys.includes(key)) {
				return
			}

			style[keysMap[key]] = options[key]
		})

		this.style = style
	}

	command() {
		throw new Error('Not implemented')
	}

	to(queue) {
		queue.add(this.name, this.command())
	}
}

const shape = (options) => {
	return new Shape(options)
}

module.exports = { Shape, shape }
