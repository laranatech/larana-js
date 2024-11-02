const { BaseComponent } = require('./base')
const { resource, img, qrcode } = require('../../resources')
const { line, rect, point } = require('../shapes')
const { figure } = require('./figure')

class ImageComponent extends BaseComponent {
	w = 0
	h = 0
	alt = ''
	src = null
	qr = null
	loaded = false
	rerenderOnLoad = true
	onLoad = () => {}

	defaultStyle = {
		borderWidth: 2,
		fg: 'var:fg',
		bg: 'var:componentBg',
		radius: 'var:radius',
	}

	constructor(options) {
		super(options)

		const { src, qr, alt, w, h, onLoad, rerenderOnLoad = true } = options

		this.alt = alt
		this.w = w
		this.h = h

		if (onLoad) {
			this.onLoad = onLoad
		}

		if (qr) {
			this.qr = qr
			qrcode(qr, () => {
				if (this.rerenderOnLoad) {
					try {
						const page = this.usePage()
						page.rerender()
					} catch(_) {}
				}
				this.onLoad()
			})
		} else {
			this.src = src
			img(src, () => {
				if (this.rerenderOnLoad) {
					try {
						const page = this.usePage()
						page.rerender()
					} catch(_) {}
				}
				this.onLoad()
			})
		}
	}

	root() {
		const style = this.computeStyle()
		const r = resource(this.qr ?? this.src)

		return figure({
			template: (fig, queue) => {
				const d = fig.computeDimensions()
				const { x, y, w, h } = d

				if (r && r !== 'pending') {
					queue.add('image', {
						...d,
						data: r,
						src: this.src,
					})
					return queue
				}

				rect({
					x, y, w, h,
					...style,
					borderColor: style.fg,
				}).to(queue)

				line({
					points: [
						point({ x: x + 1, y: y + 1 }),
						point({ x: x + w - 1, y: y + h - 1 }),
					],
					...style,
				}).to(queue)

				line({
					points: [
						point({ x: x + w - 1, y: y + 1 }),
						point({ x: x + 1, y: y + h - 1 }),
					],
					...style,
				}).to(queue)
			},
		})
	}
}

const image = (options) => {
	return new ImageComponent(options)
}

module.exports = { ImageComponent, image }
