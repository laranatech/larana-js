const { Schemer, rules, common } = require('@laranatech/schemer')

const responseSchemer = new Schemer({
	image: 'string',
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
	x = 0
	y = 0
	w = 0
	h = 0
	ts = 0

	constructor(data) {
		responseSchemer.validate(data)

		const { image, x, y, w = 0, h = 0 } = data

		this.image = image
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.ts = Date.now()
	}

	json() {
		return {
			image: this.image,
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
