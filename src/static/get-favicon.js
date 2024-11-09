const fs = require('node:fs')
const { getContentType } = require('./get-content-type.js')

getContentType

const getFavicon = (callback) => {
	const faviconPath = __dirname + '/default/favicon.ico'

	fs.readFile(faviconPath, (_, data) => {
		callback({ favicon: data, contentType: getContentType(faviconPath) })
	})
}

module.exports = { getFavicon }
