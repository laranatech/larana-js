const { readFile } = require('./read-file.js')

const path = ['js', 'network.js']

const networkCode = readFile(path)

const prepareNetwork = ({ debug, sessionId, wsPath }) => {
	const network = debug ? readFile(path) : networkCode

	return network
		.replace('%SESSION_ID%', sessionId)
		.replace('%WS_PATH%', wsPath)
}

module.exports = { prepareNetwork }
