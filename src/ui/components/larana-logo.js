const { BaseComponent } = require('./base')
const { figure } = require('./figure.js')
const { line, arc, rect, point, arcPoint } = require('../shapes')
const { useStyleVar } = require('../style')

class LaranaLogoComponent extends BaseComponent {
	defaultStyles = {
		aspectRatio: 16/9,
	}

	root() {
		const { w, h } = this.computeSize()
		const color = useStyleVar('accent')()
		const borderColor = '#308830'

		const eye = ({ x, y }) => {
			const a = arc({
				x,
				y,
				radius: w * 0.05,
				bg: '#000',
				borderColor,
				borderWidth: w * 0.02,
			})

			return {
				to: (queue) => { a.to(queue) },
			}
		}

		const nostril = ({ x, y }) => {
			const width = w * 0.03
			const height = h * 0.07
			const r = rect({
				x: x - width / 2,
				y: y - height / 2,
				w: width,
				h: height,
				radius: width,
				bg: borderColor,
			})

			return {
				to: (queue) => { r.to(queue) },
			}
		}

		const mouth = (s, e, r = 30) => {
			const l = line({
				points: [
					point({ ...s, moveTo: true }),
					arcPoint({
						x: 100,
						y: 200,
						start: 0,
						end: Math.PI,
						radius: r,
					}),
				],
				borderWidth: 16,
			})

			console.log(l)

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
