const { click } = require('../events/click.js')
const { BaseComponent } = require('./base')
const { layout } = require('./layout.js')
const { text } = require('./text.js')

class ButtonComponent extends BaseComponent {
	text = ''

	defaultStyle = {
		fg: 'var:fg',
		bg: 'var:componentBg',
		radius: 'var:radius',
		gap: 'var:u2',
		height: 'var:componentHeight',
	}

	defaultHoveredStyle = {
		borderColor: 'var:componentBorderColor',
	}

	onClick = null

	constructor(options) {
		super(options)
		const { text, onClick } = options

		this.text = text
		this.onClick = onClick

		this.events = [
			...this.events,
			click({
				handler: this.onClick,
			})(this),
		]
	}

	root() {
		const style = this.computeStyle()
		return layout({
			children: [
				text({
					value: this.text,
					style,
				}),
			],
		})
	}
}

const button = (options) => {
	return new ButtonComponent(options)
}

module.exports = { ButtonComponent, button }
