const { initStyleNames } = require('./names.js')
const { initStyleVars } = require('./vars.js')

const initStyles = () => {
	initStyleVars()
	initStyleNames()
}

module.exports = { initStyles }
