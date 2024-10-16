const { readonlyProperty } = require('../../shared/readonly-property.js')

const { Schemer, common } = require('@laranatech/schemer')

const rectSchemer = new Schemer({
	x: common.positiveInt,
	y: common.positiveInt,
	w: common.positiveInt,
	h: common.positiveInt,
})

class Rect {
	x = 0
	y = 0
	w = 0
	h = 0

	/**
	 * Creating a rect
	 * @param {{ x: number, y: number, w: number, h: number}} rect coords and dimensions of a rect
	 */
	constructor(rect) {
		rectSchemer.validate(rect)

		const { x, y, w, h } = rect

		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}

	collideRect({ x, y, w, h }) {
		// if (this.collidePoint(x, y) || this.collidePoint(w, h)) {
		// 	return true
		// }
		// return false
		throw new Error('not implemented')
	}

	/**
	 * @param {any} value
	 */
	set x(value) {
		readonlyProperty('x', value)
	}

	/**
	 * @param {any} value
	 */
	set y(value) {
		readonlyProperty('y', value)
	}

	/**
	 * @param {any} value
	 */
	set w(value) {
		readonlyProperty('w', value)
	}

	/**
	 * @param {any} value
	 */
	set h(value) {
		readonlyProperty('h', value)
	}

	get position() {
		return Object.freeze({ x: this.x, y: this.y })
	}

	get dimensions() {
		return Object.freeze({ w: this.w, h: this.h })
	}

	get rect() {
		return Object.freeze({ x: this.x, y: this.y, w: this.w, h: this.h })
	}
}

module.exports = { Rect }
