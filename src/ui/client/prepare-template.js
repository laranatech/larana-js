const { readFile } = require('./read-file.js')
const { prepareHead } = require('./prepare-head.js')
const { prepareBody } = require('./prepare-body.js')
const { prepareScripts } = require('./prepare-scripts.js')

const path = ['html', 'template.html']

const templateCode = readFile(path)

const prepareTemplate = (options) => {
	const { debug, lang } = options

	const template = debug ? readFile(path) : templateCode

	const headCode = prepareHead(options)
	const bodyCode = prepareBody(options)
	const scriptsCode = prepareScripts(options)

	return template
		.replace('%LANG%', lang)
		.replace('%HEAD%', headCode)
		.replace('%BODY%', bodyCode)
		.replace('%SCRIPTS%', scriptsCode)
}

module.exports = {
	prepareTemplate,
}
