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
		const ctx = canvas.getContext('2d')

		const { x, y, w, h, data, src } = options

		const i = this.images.get(src)

		if (i) {
			ctx.drawImage(i, x, y, w, h)
			return canvas
		}

		const img = new Image()

		img.onload = () => {
			ctx.drawImage(img, x, y, w, h)
			this.images.set(src, img)
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

		points.forEach(({ x, y }, i) => {
			if (i === 0) {
				ctx.moveTo(x, y)
				return
			}

			ctx.lineTo(x, y)
		})

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
