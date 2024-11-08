const { createCanvas } = require('canvas')
const { BaseComponent } = require('../base')
const { text } = require('./text.js')
const { layout } = require('../layout.js')
const { list } = require('../list.js')
const { useStyleVar } = require('../../style/style-variables.js')
const { parseJS } = require('./parse-js.js')
const { figure } = require('../figure.js')
const { t } = require('../../shapes')

class CodeComponent extends BaseComponent {
	defaultStyle = {
		padding: 'var:u5',
		bg: 'var:componentBg',
		radius: 'var:radius',
	}

	colors = {
		method: '#d2dfa7',
		keyword: '#d170c2',
		string: '#cd6b3a',
		comment: '#3caa3c',
		className: '#00d3b0',
		operator: '#fff',
		name: '#68caf8',
		value: '#fff',
		const: '#3a7cd3',
	}

	lineNumbers = true

	constructor(options) {
		super(options)

		const { lineNumbers = true } = options

		this.lineNumbers = lineNumbers
	}

	prepareTree() {
		const { modelValue } = this.useModel()

		const value = Array.isArray(modelValue) ? modelValue.join('\n') : modelValue

		const tree = parseJS(value)

		return tree
	}

	lineTemplate(line, i) {
		const { theme } = this.useTheme()

		const textStyle = [
			'h1',
			{
				textAlign: 'start',
				height: 'var:componentHeight',
			},
		]
		const children = []

		if (this.lineNumbers) {
			children.push(text({
				style: [
					...textStyle,
					{ width: useStyleVar('componentHeight')(theme) * 1.5 },
				],
				value: i + 1,
			}))
		}

		const canvas = createCanvas(1000, 1000)
		const ctx = canvas.getContext('2d')
		ctx.font = '32px medium monospace'

		const f = figure({
			style: { padding: 0, size: 1 },
			template: (fig, queue) => {
				const d = fig.computeDimensions()

				let offset = 0

				line.forEach((word) => {
					const tm = ctx.measureText(word.value)

					if (['.', '('].includes(word.value)) {
						offset += 2
					}

					t({
						// x: d.x + (d.w / 2),
						// y: d.y + (d.h / 2),
						...d,
						x: d.x + offset - 16,
						y: d.y + 20,
						text: word.value,
						// ...style,
						font: '32px meduim monospace',
						textAlign: 'start',
						fg: this.colors[word.type] ?? this.colors.operator,
						// w: tm.width,
					}).to(queue)

					offset += tm.width

					if (word.value === '.') {
						offset += 2
					}

					if (word.type === 'space') {
						offset += 16
					}
				})
			},
		})

		children.push(f)

		return layout({
			style: { height: 'var:componentHeight' },
			children,
		})
	}

	root() {
		return layout({
			children: [
				list({
					value: this.prepareTree(),
					template: (line, i) => this.lineTemplate(line, i),
				}),
			],
		})
	}
}

const code = (options) => {
	return new CodeComponent(options)
}

module.exports = {
	CodeComponent, code,
}
