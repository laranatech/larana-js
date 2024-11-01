const { BaseComponent } = require('../base')

class SelectComponent extends BaseComponent {}

const select = (options) => {
	defaultStyle = {
		height: 'var:componentHeight',
	}

	return new SelectComponent(options)
}

module.exports = { SelectComponent, select }
