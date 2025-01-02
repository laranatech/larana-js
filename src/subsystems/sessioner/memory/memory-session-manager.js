const { Subsystem } = require("../../base/base");

class MemorySessionManager extends Subsystem {
	get clientCode() {
		__dirname + '/client.js'
	}
}

module.exports = { MemorySessionManager }
