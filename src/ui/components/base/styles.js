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

	_preComputedStyle = null
	_computedStyle = null

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
		if (this._preComputedStyle) {
			return this._preComputedStyle
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

		this._preComputedStyle = new Style(result)

		return this._preComputedStyle
	}

	computeStyle(s = []) {
		if (this._computedStyle) {
			return this._computedStyle
		}

		const styles = [this.preComputeStyle(), ...s]

		const { request, session } = this.usePayload()

		const d = this.computeDimensions()
		const { currMouse } = this.useMouse()

		const hovered = currMouse.collide(d)

		if (hovered) {
			styles.push(this.defaultHoveredStyle)
			styles.push(this.hoveredStyle)
		}

		const result = Style.compute(styles, request, session)

		this._computedStyle = new Style(result)

		return this._computedStyle
	}
}

module.exports = { StyledComponent }
