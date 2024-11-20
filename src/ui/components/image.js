const { BaseComponent } = require('./base')
const { resource, img } = require('../../resources')
const { line, rect, point } = require('../shapes')
const { figure } = require('./figure')
const { config } = require('../../config.js')

class ImageComponent extends BaseComponent {
	w = 0
	h = 0
	alt = ''
	src = null
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

		const { src, alt, w, h, onLoad, rerenderOnLoad = true } = options

		this.alt = alt
		this.w = w
		this.h = h

		this.rerenderOnLoad = rerenderOnLoad

		if (onLoad) {
			this.onLoad = onLoad
		}

		let s = src

		if (s.startsWith('/static/')) {
			s = `${config.host}:${config.port}${s}`
		}

		this.src = s
		img(this.src, () => {
			if (this.rerenderOnLoad) {
				try {
					const page = this.usePage()
					page.rerender()
				} catch(_) {}
			}
			this.onLoad()
		})
	}

	root() {
		const style = this.computeStyle()
		const r = resource(this.src)

		return figure({
			template: (fig, queue) => {
				const d = fig.computeDimensions()
				const { x, y, w, h } = d

				const maxRadius = fig.computeMaxRadius()

				if (r && r !== 'pending') {
					queue.add('image', {
						...d,
						data: r,
						src: this.src,
						radius: style.radius > maxRadius ? maxRadius : style.radius,
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
