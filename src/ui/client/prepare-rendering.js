const { readFile } = require('./read-file.js')

const path = ['js', 'rendering.js']

const renderingCode = readFile(path)

const prepareRendering = ({ debug, w, h, initialResponse, clientCode }) => {
	const rendering = debug ? readFile(path) : renderingCode

	return [
		rendering
			.replace('%INITIAL_W%', w)
			.replace('%INITIAL_W%', h),
		clientCode,
	].join('\n')
}

module.exports = { prepareRendering }
