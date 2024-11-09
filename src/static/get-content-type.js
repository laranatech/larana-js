const contentTypes = {
	'txt': 'text/plain',
	'png': 'image/png',
	'jpg': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'webp': 'image/webp',
	'svg': 'image/svg+xml',
	'ico': 'image/x-icon',
	// TODO: more types
}

const getContentType = (path) => {
	const ext = path.split('.').pop()

	const contentType = contentTypes[ext] ?? 'text/plain'

	return contentType
}

module.exports = {
	contentTypes,
	getContentType,
}
