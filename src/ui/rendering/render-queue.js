const { Schemer, common, rules } = require('@laranatech/schemer')

const schemes = {
	line: (options) => {
		
	},
	rect: (options) => {
		// validate schema
		/*
			x: int
			y: int
			w: int
			h: int
			strokeStyle: Color
			fillStyle: Color
			lineWidth?: int
			lineStyle?: LineStyles
			
		*/
	},
	arc: (options) => {

	},
	text: {
		value: 'string',
		x: 'int',
		y: 'int',
		w: {
			...common.positiveInt,
			required: false,
		},
		h: {
			...common.positiveInt,
			required: false,
		},
		font: {
			type: 'string',
			required: false,
		},
		fg: {
			type: 'string',
			required: false,
		},
		align: {
			type: 'string',
			required: false,
			rules: [
				rules.allowlist([
					'left',
					'right',
					'center',
					'start',
					'end',
				])
			],
		},
		baseline: {
			type: 'string',
			required: false,
			rules: [
				rules.allowlist([
					'top',
					'hanging',
					'middle',
					'alphabetic',
					'ideographic',
					'bottom',
				]),
			],
		},
		maxWidth: {
			...common.positiveInt,
			required: false,
		},
	},
}


class RenderQueue {
	commands = []

	/**
	 * 
	 * @param {string} command
	 * @param {*} options 
	 */
	add(command, options) {
		const s = new Schemer(schemes[command])

		// s.validate(options)

		this.commands.push({
			command,
			options,
		})
	}

	json() {
		return this.commands
	}
}

module.exports = { RenderQueue }
