const { HookedComponent } = require('./hooks.js')

const { Style } = require('../../style')

class StyledComponent extends HookedComponent {
	style = {}
	defaultStyle = {}
	focusedStyle = {}
	defaultFocusedStyle = {}
	hoveredStyle = {}
	defaultHoveredStyle = {}
	disabledStyle = {}
	defaultDisabledStyle = {}

	// defaultStyle = {
	// 	_disabled: {},
	// 	_focused: {},
	// 	_hovered: {},
	// }

	// style = {
	// 	_disabled: {},
	// 	_focused: {},
	// 	_hovered: {},
	// }

	preComputedStyle = null
	computedStyle = null

	constructor(options) {
		super(options)

		const {
			style = {},
			focusedStyle = {},
			hoveredStyle = {},
			disabledStyle = {},
		} = options

		this.style = style
		this.focusedStyle = focusedStyle
		this.hoveredStyle = hoveredStyle
		this.disabledStyle = disabledStyle
	}

	preComputeStyle() {
		if (this.preComputedStyle) {
			return this.preComputedStyle
		}

		const styles = [
			this.defaultStyle,
		]

		if (Array.isArray(this.style)) {
			styles.push(...this.style)
		} else {
			styles.push(this.style)
		}

		if (this.focusable && this.isFocused()) {
			styles.push(this.defaultFocusedStyle)
			styles.push(this.focusedStyle)
		}

		if (this.disabled) {
			styles.push(this.defaultDisabledStyle)
			styles.push(this.disabledStyle)
		}

		const { request, session } = this.usePayload()

		const result = Style.compute(styles, request, session)

		this.preComputedStyle = new Style(result)

		return this.preComputedStyle
	}

	computeStyle() {
		const styles = [this.preComputeStyle()]

		const { request, session } = this.usePayload()

		const d = this.computeDimensions()
		const { currMouse } = this.useMouse()

		const hovered = currMouse.collide(d)

		if (hovered) {
			styles.push(this.defaultHoveredStyle)
			styles.push(this.hoveredStyle)
		}

		const result = Style.compute(styles, request, session)

		this.computedStyle = new Style(result)

		return this.computedStyle
	}
}

module.exports = { StyledComponent }
