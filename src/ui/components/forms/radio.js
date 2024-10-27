const { BaseComponent } = require('../base-component.js')
const { click } = require('../../events/click.js')

class RadioComponent extends BaseComponent {
	name = ''

	onSelect = (name) => {}

	defaultStyle = {
		bg: 'var:componentBg',
		fg: 'var:accent',
		borderWidth: 2,
		borderCap: 'round',
		borderColor: 'var:componentBorderColor',
	}

	constructor(data) {
		super(data)

		const {
			name = '',
			onSelect = (name) => {},
		} = data

		this.name = name
		this.onSelect = onSelect

		this.events = [
			...this.events,
			click({ handler: (data) => {
				this.onClick(data)
			}})(this),
		]
	}

	getIsSelected(data) {
		const value = this.getModelValue(data)
		return value === this.name
	}

	onClick(data) {
		const selected = this.getIsSelected(data)

		if (this.disabled || selected) {
			return
		}

		this.onSelect(this.name)
		this.updateModelValue(data, this.name)
	}

	render(queue, data) {
		const { x, y, w, h } = this.computeDimensions(data)
		const style = this.computeStyle(data)

		const selected = this.getIsSelected(data)

		const r = this.computeMaxRadius({ w, h })

		queue.add('arc', {
			x: x + w / 2,
			y: y + h / 2,
			radius: r,
			fillStyle: style.bg,
			strokeStyle: style.borderColor,
			lineWidth: style.borderWidth,
		})

		if (selected) {
			queue.add('arc', {
				x: x + w / 2,
				y: y + h / 2,
				radius: r * 0.8,
				fillStyle: style.fg,
			})
		}

		return queue
	}
}

module.exports = { RadioComponent }
