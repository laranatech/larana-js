const { readFile } = require('./read-file.js')

const path = ['html', 'head.html']

const headCode = readFile(path)

const prepareHead = ({ title, meta = '', styles = '', debug = false }) => {
	const head = debug ? readFile(path) : headCode

	return head
		.replace('%TITLE%', title)
		.replace('%META%', meta)
		.replace('%STYLES%', styles)
}

module.exports = { prepareHead }
