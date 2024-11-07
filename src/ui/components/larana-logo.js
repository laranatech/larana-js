const { BaseComponent } = require('./base')
const { figure } = require('./figure.js')
const { line, arc, rect, point, arcPoint } = require('../shapes')
const { useStyleVar } = require('../style')

class LaranaLogoComponent extends BaseComponent {
	defaultStyles = {
		aspectRatio: 16/9,
	}

	root() {
		const color = useStyleVar('accent')()
		const borderColor = '#308830'

		const eye = ({ x, y }) => {
			const a = arc({
				x,
				y,
				radius: 60,
				bg: '#000',
				borderColor,
				borderWidth: 32,
			})

			return {
				to: (queue) => { a.to(queue) },
			}
		}

		const nostril = ({ x, y }) => {
			const r = rect({
				x: x - 12,
				y: y - 16,
				w: 24,
				h: 32,
				radius: 16,
				bg: borderColor,
			})

			return {
				to: (queue) => { r.to(queue) },
			}
		}

		const mouth = (s, e, r = 30) => {
			const l = line({
				points: [
					point(s),
					arcPoint(
						point({ x: (e.x - s.x) / 2, y: s.y }),
						point(e),
						r,
					),
				],
				borderWidth: 16,
			})

			return {
				to: (queue) => { l.to(queue) },
			}
		}

		return figure({
			template: (fig, queue) => {
				const { x, y, w, h } = fig.computeDimensions()

				line({
					points: [
						point({ x: x + w * 0.5, y }),
						point({ x: x + w * 0.5, y: y + h }),
					],
				}).to(queue)

				line({
					points: [
						point({ x: x, y: y + h * 0.5 }),
						point({ x: x + w, y: y + h * 0.5 }),
					],
				}).to(queue)

				eye({
					x: x + w * 0.2,
					y: y + h * 0.3,
				}).to(queue)

				eye({
					x: x + w * 0.8,
					y: y + h * 0.3,
				}).to(queue)

				nostril({
					x: x + w * 0.45,
					y: y + h * 0.45,
				}).to(queue)

				nostril({
					x: x + w * 0.55,
					y: y + h * 0.45,
				}).to(queue)

				mouth(
					{ x: x + w * 0.1, y: y + h * 0.8 },
					{ x: x + w, y: y + h * 0.8 },
					64,
				).to(queue)

				rect({}).to(queue)
			},
		})
	}

}

const laranaLogo = (options) => {
	return new LaranaLogoComponent(options)
}

module.exports = { LaranaLogoComponent, laranaLogo }
