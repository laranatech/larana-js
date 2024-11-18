const { readFile } = require('./read-file.js')

const path = ['js', 'network.js']

const networkCode = readFile(path)

const prepareNetwork = ({ debug, sessionId }) => {
	const network = debug ? readFile(path) : networkCode

	return network
		.replace('%SESSION_ID%', sessionId)
}

module.exports = { prepareNetwork }
