const {
	BaseComponent,
	text,
	layout,
	image,
	button,
	radio,
	checkbox,
	list,
} = require('larana-js')

class UIKitSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					value: 'Встроенный UIKit',
				}),
				layout({
					style: ['row', 'gap_2', 'size_5'],
					children: [
						layout({
							style: ['column', 'gap_2'],
							children: [
								button({ text: 'Button' }),
								button({ text: 'Select' }),
								button({ text: 'TextInput' }),
								button({ text: 'DatePicker' }),
							],
						}),
						list({
							style: ['column', 'gap_2'],
							value: [
								{ name: 'item_1', text: 'item_1', fg: '#ff0' },
								{ name: 'item_2', text: 'item_2', fg: '#f0f' },
								{ name: 'item_3', text: 'item_3', fg: '#00f' },
							],
							template: (item, i) => layout({
								style: 'gap_1',
								children: [
									radio({
										model: 'radioValue',
										name: item.name,
										style: { fg: item.fg },
									}),
									text({ value: item.text, style: 'h2Text' }),
								],
							}),
						}),
						list({
							style: ['column', 'gap_2'],
							value: ['checkboxValue1', 'checkboxValue2', 'checkboxValue3'],
							template: (item, i) => checkbox({ model: item }),
						}),
						image({ qr: 'Hello, world!' }),
						layout({
							style: 'column',
							children: [
								text({
									style: 'h2Text',
									value: 'Link',
								}),
								text({
									style: 'h2Text',
									value: 'List',
								}),
								list({
									value: ['ListItem1', 'ListItem2', 'ListItem3'],
								}),
								text({
									style: 'h2Text',
									value: 'Table',
								}),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { UIKitSlideComponent }
