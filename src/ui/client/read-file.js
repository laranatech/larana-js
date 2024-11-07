const fs = require('node:fs')
const path = require('path')

const readFile = (fileName) => {
	// eslint-disable-next-line no-undef
	const dir = __dirname
	const clientPath = path.join(dir, ...fileName)
	return fs.readFileSync(clientPath, 'utf-8')
}

module.exports = { readFile }
