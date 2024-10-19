const { Schemer, rules, common } = require('@laranatech/schemer')

const responseSchemer = new Schemer({
	image: {
		type: 'string',
		required: false,
	},
	queue: {
		type: 'any',
		required: false,
	},
	x: common.positiveNumber,
	y: common.positiveNumber,
	w: {
		...common.positiveNumber,
		required: false,
	},
	h: {
		...common.positiveNumber,
		required: false,
	},
})

class Response {
	image = ''
	queue = []
	x = 0
	y = 0
	w = 0
	h = 0
	ts = 0

	constructor(data) {
		responseSchemer.validate(data)

		const { image = '', queue = [], x, y, w = 0, h = 0 } = data

		this.image = image
		this.queue = queue
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.ts = Date.now()
	}

	json() {
		return {
			image: this.image,
			queue: this.queue,
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h,
			ts: this.ts,
		}
	}

	jsonString() {
		return JSON.stringify(this.json())
	}
}

module.exports = {
	Response,
}
