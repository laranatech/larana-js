const QRCode = require('qrcode')


const resources = new Map()

const resource = (name, value = null) => {
	if (value) {
		resources.set(name, value)
		return value
	}

	const r = resources.get(name)

	if (!r) {
		throw new Error(`Resource not found: ${name}`)
	}

	return r
}

const loadImage = async (src, onFirstLoad, retries = 3) => {
	if (retries <= 0) {
		return
	}
	try {
		const r = await fetch(src)
		const b = Buffer.from(await r.arrayBuffer())
		const value = `data:image/png;base64,${b.toString('base64')}`

		resource(src, value)
		onFirstLoad(value)
	} catch(_) {
		return loadImage(src, onFirstLoad, retries - 1)
	}
}

const img = (src, onFirstLoad = (value) => {}) => {
	try {
		const image = resource(src)
		return image
	} catch(_) {}

	loadImage(src, onFirstLoad)

	return resource(src, 'pending')
}

const generateQR = async (text, onFirstLoad) => {
	try {
		const result = await QRCode.toDataURL(text)

		resource(text, result)
		onFirstLoad(result)
	} catch (err) {
		console.error(err)
	}
}

const qrcode = (value, onFirstLoad) => {
	try {
		const image = resource(value)
		return image
	} catch(_) {}

	generateQR(value, onFirstLoad)

	return resource(value, 'pending')
}

module.exports = {
	resource,
	img,
	qrcode,
}
