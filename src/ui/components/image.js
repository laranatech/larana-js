const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')
const { resource, img, qrcode } = require('../../resources')

class ImageComponent extends BaseComponent {
	w = 0
	h = 0
	alt = ''
	src = null
	qr = null
	loaded = false
	onLoad = () => {}

	defaultStyle = {
		borderWidth: 2,
		fg: 'var:fg',
		bg: 'var:componentBg',
		radius: 'var:radius',
	}

	constructor(data) {
		super(data)

		const { src, qr, alt, w, h, onLoad } = data

		this.alt = alt
		this.w = w
		this.h = h

		if (onLoad) {
			this.onLoad = onLoad
		}

		if (qr) {
			this.qr = qr
			qrcode(qr, this.onLoad)
		} else {
			this.src = src
			img(src, this.onLoad)
		}
	}

	render(queue, data) {
		const d = this.computeDimensions(data)
		const style = this.computeStyle(data)

		const { x, y, w, h } = d

		const r = resource(this.qr ?? this.src)

		if (!r || r === 'pending') {
			queue.add('rect', {
				x, y, w, h,
				strokeStyle: style.fg,
				lineWidth: style.borderWidth,
				lineCap: style.borderCap,
				radius: style.radius,
				fillStyle: style.bg,
			})

			queue.add('line', {
				points: [
					{ x: x + 1, y: y + 1 },
					{ x: x + w - 1, y: y + h - 1 },
				],
				strokeStyle: style.fg,
				lineCap: style.borderCap,
				lineWidth: style.borderWidth,
			})
			queue.add('line', {
				points: [
					{ x: x + w - 1, y: y + 1 },
					{ x: x + 1, y: y + h - 1 },
				],
				strokeStyle: style.fg,
				lineCap: style.borderCap,
				lineWidth: style.borderWidth,
			})
			
			return queue
		}

		queue.add('image', {
			x: d.x,
			y: d.y,
			w: d.w,
			h: d.h,
			data: r,
			src: this.src,
		})

		return queue
	}
}

module.exports = { ImageComponent }
