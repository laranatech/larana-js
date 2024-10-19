class CanvasRenderer {
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
			lineWidth = 1,
			fillStyle,
		} = options


		ctx.lineWidth = lineWidth

		ctx.beginPath()

		ctx.arc(x, y, radius, startAngle, endAngle)

		if (strokeStyle) {
			ctx.strokeStyle = strokeStyle
			ctx.stroke()
		}
		if (fillStyle) {
			ctx.fillStyle = fillStyle
			ctx.fill()
		}

		return canvas
	}

	image(canvas, options) {
		const ctx = canvas.getContext('2d')

		const { x, y, w, h, data } = options

		ctx.drawImage(data, x, y, w, h)

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

	rect(canvas, options) {
		const ctx = canvas.getContext('2d')

		const {
			x,
			y,
			w,
			h,
			strokeStyle,
			fillStyle,
		} = options

		if (fillStyle) {
			ctx.fillStyle = fillStyle
			ctx.fillRect(x, y, w, h)
		}
		if (strokeStyle) {
			ctx.strokeStyle = strokeStyle
			ctx.strokeRect(x, y, w, h)
		}

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
