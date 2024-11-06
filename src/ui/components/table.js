const { BaseComponent } = require('./base')
const { layout } = require('./layout.js')
const { list } = require('./list.js')
const { text } = require('./text/text.js')

class TableComponent extends BaseComponent {
	defaultStyle = {
		direction: 'column',
		gap: 'var:u2',
	}

	columns = []

	striped = true
	stylizeRows = (row, i) => {}

	template = (item, i) => {
		return layout({
			style: {
				gap: 'var:u2',
				bg: this.striped && i % 2 === 0 ? 'var:bg' : 'var:disabledComponentBg',
				borderColor: 'var:componentBorderColor',
			},
			children: this.columns.map((col) => {
				return layout({
					style: {
						size: col.size,
					},
					children: [
						text({ value: item[col.name] }),
					],
				})
			}),
		})
	}

	constructor(options) {
		super(options)

		const  {
			template,
			columns = [],
			stylizeRows,
			striped = true,
		} = options

		this.striped = striped

		if (columns) {
			if (Array.isArray(columns)) {
				this.columns = columns
			}

			// this.columns =
		}

		if (template) {
			this.template = template
		}

		if (stylizeRows) {
			this.stylizeRows = stylizeRows
		}
	}

	root() {
		const { modelValue } = this.useModel()

		return layout({
			children: [
				list({
					style: {
						size: 1,
						direction: 'row',
						gap: 'var:u2',
						bg: 'var:componentBg',
						borderColor: 'var:componentBorderColor',
					},
					value: this.columns,
					template: this.columnsTemplate,
				}),
				list({
					style: {
						size: 9,
					},
					value: modelValue,
					template: this.template,
				}),
			],
		})
	}

	columnsTemplate = (col, i) => {
		return text({
			value: col.label,
			style: [
				'h3',
				{
					size: col.size ?? 1,
				},
			],
		})
	}
}

const table = (options) => {
	return new TableComponent(options)
}

module.exports = { TableComponent, table }
