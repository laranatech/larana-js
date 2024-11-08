const QRCode = require('qrcode')
const { figure } = require('./figure')
const { rect } = require('../shapes')
const { useStyleVar } = require('../style')

const qr = (options) => {
	const { value, style } = options

	const r = QRCode.create(value)
	const { size, data } = r.modules

	return figure({
		style,
		template: (fig, queue) => {
			const { theme } = fig.useTheme()

			const { x, y } = fig.computeDimensions()
			const radius = fig.computeMaxRadius()

			const side = Math.floor((radius * 2) * (1 / size))

			let curr = 0

			for (let r = 0; r < size; r++) {
				for (let c = 0; c < size; c++) {

					if (data[curr] === 1) {
						rect({
							x: x + side * c - 1,
							y: y + side * r - 1,
							w: side + 1,
							h: side + 1,
							bg: useStyleVar('fg')(theme),
							// radius: 4,
						}).to(queue)
					}

					curr += 1
				}
			}
		},
	})
}

module.exports = {
	qr,
}
