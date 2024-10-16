const { Schemer, common } = require('@laranatech/schemer')


const configSchemer = new Schemer({
	debug: {
		type: 'bool',
		required: false,
	},
	port: {
		...common.positiveInt,
		required: false,
	},
	wsPath: {
		type: 'string',
		required: false,
	},
	maxFPS: {
		...common.positiveInt,
		required: false,
	},
	maxBandwidth: {
		...common.positiveInt,
		required: false,
	},
	sessionLifetime: {
		...common.positiveInt,
		required: false,
	},
	storePreviousRender: {
		type: 'bool',
		required: false,
	},
})

const defaultConfig = {
	debug: false,
	port: 1610,
	wsPath: 'ws://localhost:1610/',
	maxFPS: 30,
	maxBandwidth: 10 * 1024,
	sessionLifetime: 5 * (60 * 1000),
	storePreviousRender: true,
}

/**
 * 
 * @param {{
 * debug: boolean;
 * port: number;
 * wsPath: string;
 * maxFPS: number;
 * maxBandwidth: number;
 * sessionLifetime: number;
 * storePreviousRender: boolean;
 * }} config 
 * @returns validated config
 */
const createConfig = (config) => {
	configSchemer.validate(config)

	return { ...defaultConfig, ...config }
}

module.exports = {
	defaultConfig,
	createConfig,
}
