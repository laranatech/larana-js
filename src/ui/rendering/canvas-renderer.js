var buffers = new Map()
var images = new Map()

class CanvasRenderer {
	images = new Map()

	render(queue, { w, h }, initialCanvas) {
		let canvas = initialCanvas

		queue.forEach(({command, options}) => {
			canvas = this[command](canvas, options)
		})

		return canvas
	}

	arc(canvas, options) {
		const ctx = canvas.getContext('2d')

		const {
			x,
			y,
			radius,
			startAngle = 0,
			endAngle = Math.PI*2,
			strokeStyle,
			fillStyle,
		} = options

		this.applyLineParams(ctx, options)

		ctx.beginPath()

		ctx.arc(x, y, radius, startAngle, endAngle)

		if (fillStyle) {
			ctx.fillStyle = fillStyle
			ctx.fill()
		}
		if (strokeStyle) {
			ctx.strokeStyle = strokeStyle
			ctx.stroke()
		}

		return canvas
	}

	image(canvas, options) {
		const isOnClient = window && document && false

		const ctx = canvas.getContext('2d')

		const { x, y, w, h, data, src } = options

		const i = isOnClient ? buffers.get(src) : images.get(src)

		if (i) {
			ctx.drawImage(i, x, y, w, h)
			return canvas
		}

		const img = new Image()

		img.crossOrigin = 'anonymous'

		img.onload = () => {
			if (isOnClient) {
				ctx.drawImage(img, x, y, w, h)
				const buffer = document.createElement('canvas')
				buffer.width = w
				buffer.height = h
				const bufferCtx = buffer.getContext('2d')
				bufferCtx.drawImage(img, 0, 0, w, h)
				buffers.set(src, buffer)
				return
			}

			ctx.drawImage(img, x, y, w, h)
			images.set(src, img)
		}

		img.src = src ?? data

		return canvas
	}

	text(canvas, options) {
		const ctx = canvas.getContext('2d')

		const {
			text,
			x,
			y,
			font,
			fg,
			align,
			baseline,
			maxWidth,
		} = options

		if (font) {
			ctx.font = font
		}

		if (fg) {
			ctx.fillStyle = fg
		}

		if (align) {
			ctx.textAlign = align
			ctx.textAlign = ''
		}

		if (baseline) {
			ctx.textBaseline = baseline
		}

		ctx.fillText(text, x, y, maxWidth)

		return canvas
	}

	applyLineParams(ctx, options) {
		const {
			lineWidth,
			lineCap,
			lineColor,
			strokeStyle,
			borderColor,
			borderWidth,
			borderCap,
		} = options

		if (borderColor) {
			ctx.strokeStyle = borderColor
		}

		if (lineColor) {
			ctx.strokeStyle = lineColor
		}

		if (strokeStyle) {
			ctx.strokeStyle = strokeStyle
		}

		if (borderWidth) {
			ctx.lineWidth = borderWidth
		}

		if (lineWidth) {
			ctx.lineWidth = lineWidth
		}

		if (borderCap) {
			ctx.lineCap = borderCap
		}

		if (lineCap) {
			ctx.lineCap = lineCap
		}
	}

	rect(canvas, options) {
		const ctx = canvas.getContext('2d')

		const {
			x,
			y,
			w,
			h,
			strokeStyle,
			fillStyle,
			radius,
		} = options

		this.applyLineParams(ctx, options)

		if (radius) {
			ctx.beginPath()

			if (fillStyle) {
				ctx.fillStyle = fillStyle
				ctx.roundRect(x, y, w, h, radius)
				ctx.fill()
			}

			if (strokeStyle) {
				ctx.strokeStyle = strokeStyle
				ctx.roundRect(x, y, w, h, radius)
				ctx.stroke()
			}
		} else {
			if (fillStyle) {
				ctx.fillStyle = fillStyle
				ctx.fillRect(x, y, w, h)
			}
			if (strokeStyle) {
				ctx.strokeStyle = strokeStyle
				ctx.strokeRect(x, y, w, h)
			}
		}

		return canvas
	}

	line(canvas, options) {
		const ctx = canvas.getContext('2d')
		const { points } = options
		this.applyLineParams(ctx, options)

		ctx.beginPath()

		points.forEach((p, i) => {
			if (i === 0 || p.name === 'move-point') {
				ctx.moveTo(p.x, p.y)
				return
			}

			if (p.name === 'point') {
				ctx.lineTo(p.x, p.y)
				return
			}

			if (p.name === 'arc-point') {
				ctx.arc(p.x, p.y, p.radius, p.start, p.end)
			}
		})

		if (options.fillStyle) {
			ctx.fillStyle = options.fillStyle
			ctx.fill()
		}

		ctx.stroke()

		return canvas
	}

	diff(a, b) {
		return b
	}

	trim(canvas) {
		return { x: 0, y: 0, canvas }
	}
}

module.exports = { CanvasRenderer }
