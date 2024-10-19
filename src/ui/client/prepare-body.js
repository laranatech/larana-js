const { readFile } = require('./read-file.js')

const path = ['html', 'body.html']

const bodyCode = readFile(path)

const prepareBody = ({ debug, content = '' }) => {
	const body = debug ? readFile(path) : bodyCode

	return body
		.replace('%CONTENT%', content)
}

module.exports = { prepareBody }
