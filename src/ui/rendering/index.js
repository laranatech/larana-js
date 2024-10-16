module.exports = {
	...require('./base-renderer.js'),
	...require('./server-renderer.js'),
	...require('./client-renderer.js'),
	...require('./combined-renderer.js'),
	...require('./render-queue.js'),
}
