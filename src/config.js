const { Schemer, common } = require('@laranatech/schemer')


const configSchemer = new Schemer({
	debug: {
		type: 'bool',
		required: false,
	},
	debugOptions: {
		type: 'any',
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
	initialW: {
		...common.positiveInt,
		required: false,
	},
	initialH: {
		...common.positiveInt,
		required: false,
	},
	defaultTheme: {
		type: 'string',
		required: false,
	},
	defaultLang: {
		type: 'string',
		required: false,
	},
})

const defaultConfig = {
	debug: false,
	debugOptions: {
		renderOutline: true,
	},
	port: 1610,
	wsPath: 'ws://localhost:1610/',
	maxFPS: 30,
	maxBandwidth: 10 * 1024,
	sessionLifetime: 5 * (60 * 1000),
	storePreviousRender: true,
	initialW: 512,
	initialH: 512,
	defaultTheme: 'dark',
	defaultLang: 'en',
}

/**
 * 
 * @param {{
 * debug: boolean;
 * debugOptions: *;
 * port: number;
 * wsPath: string;
 * maxFPS: number;
 * maxBandwidth: number;
 * sessionLifetime: number;
 * storePreviousRender: boolean;
 * initialW: number;
 * initialH: number;
 * defaultTheme: string;
 * defaultLang: string;
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
