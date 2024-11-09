const fs = require('node:fs')

const prepareStatic = (staticDir) => {
	return (url, callback) => {
		const path = staticDir + url.replace('/static', '')

		fs.readFile(path, (err, data) => {
			callback(err, data)
		})
	}
}

module.exports = {
	prepareStatic,
}
