const { BaseComponent } = require('../base-component.js')

class SelectComponent extends BaseComponent {}

const select = (options) => {
	defaultStyle = {
		height: 'var:componentHeight',
	}

	return new SelectComponent(options)
}

module.exports = { SelectComponent, select }
