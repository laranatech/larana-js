const { prepareEvents } = require('./prepare-events.js')
const { prepareNetwork } = require('./prepare-network.js')
const { prepareRendering } = require('./prepare-rendering.js')

const prepareScripts = (options) => {
	const eventsCode = prepareEvents(options)
	const networkCode = prepareNetwork(options)
	const renderingCode = prepareRendering(options)

	return [
		'<script>',
		networkCode,
		eventsCode,
		renderingCode,
		'</script>',
	].join('\n').replace('%INITIAL_RESPONSE%', options.initialResponse)
}

module.exports = { prepareScripts }
