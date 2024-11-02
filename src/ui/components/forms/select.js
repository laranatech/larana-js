const { BaseComponent } = require('../base')

class SelectComponent extends BaseComponent {
	defaultStyle = {
		height: 'var:componentHeight',
	}
}

const select = (options) => {
	return new SelectComponent(options)
}

module.exports = { SelectComponent, select }
