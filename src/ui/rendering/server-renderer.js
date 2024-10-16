const fs = require('node:fs')
const path = require('path')
const { createCanvas, ImageData } = require('canvas')

const { BaseRenderer } = require('./base-renderer.js')

const readStaticCode = () => {
	const clientPath = path.join(__dirname, 'static', 'server-renderer-static.html')
	return fs.readFileSync(clientPath, 'utf-8')
}

let clientCode = readStaticCode()

class ServerRenderer extends BaseRenderer {
	get clientCode() {
		if (this.debug) {
			return readStaticCode()
		}
		return clientCode
	}

	render(queue, { w, h }) {
		let canvas = createCanvas(w, h)

		queue.commands.forEach(({command, options}) => {
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

		// console.log(options)

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
			maxWidth,
		} = options

		// console.log(options)

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
		const w = a.width
		const h = a.height
		const aCtx = a.getContext('2d')
		const aData = aCtx.getImageData(0, 0, w, h)
		const bCtx = b.getContext('2d')
		const bData = bCtx.getImageData(0, 0, w, h)

		const diffData = new Uint8ClampedArray(w * h * 4)

		const combinePixel = (i, data) => {
			return [
				data[i + 0],
				data[i + 1],
				data[i + 2],
				data[i + 3],
			].join('.')
		}

		for (let i = 0; i < diffData.length; i += 4) {
			const aVal = combinePixel(i, aData.data)
			const bVal = combinePixel(i, bData.data)

			if (aVal === bVal) {
				continue
			}

			const rI = i + 0
			const gI = i + 1
			const bI = i + 2
			const aI = i + 3

			diffData[rI] = bData.data[rI]
			diffData[gI] = bData.data[gI]
			diffData[bI] = bData.data[bI]
			diffData[aI] = bData.data[aI]
		}

		const diffCanvas = createCanvas(w, h)
		const diffCtx = diffCanvas.getContext('2d')
		diffCtx.putImageData(new ImageData(diffData, w, h), 0, 0)
		return diffCanvas
	}

	trim(canvas) {
		const w = canvas.width
		const h = canvas.height

		const ctx = canvas.getContext('2d')

		let firstX = w
		let firstY = h
		let lastX = 0
		let lastY = 0

		for (let x = 0; x < w; x++) {
			let hasY = false
			for (let y = 0; y < h; y++) {
				const imgData = ctx.getImageData(x, y, 1, 1)

				if (imgData.data[3] === 0) {
					continue
				}

				hasY = true

				if (y > lastY) {
					lastY = y
				}

				if (y < firstY) {
					firstY = y
				}
			}

			if (!hasY) {
				continue
			}

			if (x > lastX) {
				lastX = x
			}

			if (x < firstX) {
				firstX = x
			}
		}

		firstX -= this.trimOffset
		if (firstX < 0) {
			firstX = 0
		}

		firstY -= this.trimOffset
		if (firstY < 0) {
			firstY = 0
		}

		lastX += this.trimOffset
		if (lastX > w) {
			lastX = w
		}

		lastY += this.trimOffset
		if (lastY > h) {
			lastY = h
		}

		const newW = Math.abs(lastX - firstX)
		const newH = Math.abs(lastY - firstY)

		const newCanvas = createCanvas(newW, newH)
		const newCtx = newCanvas.getContext('2d')

		newCtx.putImageData(
			ctx.getImageData(firstX, firstY, newW, newH),
			0,
			0,
		)

		return { canvas: newCanvas, x: firstX, y: firstY }
	}
}

module.exports = { ServerRenderer }
