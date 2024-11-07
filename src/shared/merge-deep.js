/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
const mergeDeep = (target, ...sources) => {
	if (!sources.length) {
		return target
	}
	const source = sources.shift()

	if (!isObject(target) || !isObject(source)) {
		return mergeDeep(target, ...sources)
	}

	for (const key in source) {
		if (!isObject(source[key])) {
			Object.assign(target, { [key]: source[key] })
			continue
		}
		if (!target[key]) {
			Object.assign(target, { [key]: {} })
		}
		mergeDeep(target[key], source[key])
	}

	return mergeDeep(target, ...sources)
}

module.exports = {
	mergeDeep,
}
