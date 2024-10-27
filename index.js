module.exports = {
	...require('./src/app.js'),
	...require('./src/config.js'),
	...require('./src/state'),
	...require('./src/routing'),
	...require('./src/ui'),
	...require('./src/pages'),
	...require('./src/shared'),
	...require('./src/resources'),
}
