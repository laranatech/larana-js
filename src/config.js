const { Schemer, common } = require('@laranatech/schemer')
const { mergeDeep } = require('./shared')


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
	staticDir: {
		type: 'string',
		nullable: true,
		required: false,
	},
	host: {
		type: 'string',
		required: false,
	},
})

const defaultConfig = {
	debug: false,
	debugOptions: {
		renderOutline: true,
		renderPaddings: true,
		renderGaps: true,
		renderCursor: true,
		logMessages: false,
	},
	port: 1610,
	wsPath: 'ws://localhost:1610/',
	maxFPS: 30,
	maxBandwidth: 10 * 1024, // TODO
	sessionLifetime: 5 * (60 * 1000), // TODO
	storePreviousRender: true, // TODO
	initialW: 512,
	initialH: 512,
	defaultTheme: 'dark',
	defaultLang: 'en',
	staticDir: null,
	host: 'http://localhost',
}

let config = { ...defaultConfig }

/**
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
 * staticDir: string|null;
 * }} config
 * @returns validated config
 */
const defineConfig = (newConfig) => {
	configSchemer.validate(newConfig)

	let config = mergeDeep(defaultConfig, newConfig)

	return Object.freeze(config)
}

module.exports = {
	config,
	defaultConfig,
	defineConfig,
}
