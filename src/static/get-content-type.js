const contentTypes = {
	'txt': 'text/plain',
	'js': 'text/javascript',
	'css': 'text/css',
	'html': 'text/html',
	'ics': 'text/calendar',
	'png': 'image/png',
	'jpg': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'webp': 'image/webp',
	'svg': 'image/svg+xml',
	'ico': 'image/x-icon',
	'ttf': 'font/ttf',
	'otf': 'font/otf',
	'woff': 'font/woff',
	'pdf': 'application/pdf',
	// TODO: more types
}

const getContentType = (path) => {
	const ext = String(path.split('.').pop()).toLowerCase()

	const contentType = contentTypes[ext] ?? 'text/plain'

	return contentType
}

module.exports = {
	contentTypes,
	getContentType,
}
