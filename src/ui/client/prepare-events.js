const { readFile } = require('./read-file.js')

const path = ['js', 'events.js']

const eventsCode = readFile(path)

const prepareEvents = ({ debug, throttleTime }) => {
	const events = debug ? readFile(path) : eventsCode

	return events
		.replace('%THROTTLE_TIME%', throttleTime)
}

module.exports = { prepareEvents }
