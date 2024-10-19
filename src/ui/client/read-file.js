const fs = require('node:fs')
const path = require('path')

const readFile = (fileName) => {
	const clientPath = path.join(__dirname, ...fileName)
	return fs.readFileSync(clientPath, 'utf-8')
}

module.exports = { readFile }
