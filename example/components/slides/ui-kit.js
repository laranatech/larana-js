const {
	BaseComponent,
	TextComponent,
	LayoutComponent,
	ImageComponent,
	ButtonComponent,
	RadioComponent,
	CheckboxComponent,
	qrcode,
} = require('larana-js')

class UIKitSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Встроенный UIKit',
					}),
					new LayoutComponent({
						style: ['row', 'gap_1', 'size_5'],
						children: [
							new LayoutComponent({
								style: ['col', 'gap_2'],
								children: [
									new ButtonComponent({ text: 'Button' }),
									new ButtonComponent({ text: 'Select' }),
									new ButtonComponent({ text: 'TextInput' }),
									new ButtonComponent({ text: 'DatePicker' }),
								],
							}),
							new LayoutComponent({
								style: ['col', 'gap_2'],
								children: [
									new LayoutComponent({
										style: 'gap_1',
										children: [
											new RadioComponent({
												model: 'radioValue',
												name: 'item_1',
												style: { fg: '#ff0' },
											}),
											new TextComponent({ text: 'item_1', style: 'h2Text' }),
										],
									}),
									new LayoutComponent({
										style: 'gap_1',
										children: [
											new RadioComponent({
												model: 'radioValue',
												name: 'item_2',
												style: { fg: '#f0f' },
											}),
											new TextComponent({ text: 'item_2', style: 'h2Text' }),
										],
									}),
									new LayoutComponent({
										style: 'gap_1',
										children: [
											new RadioComponent({
												model: 'radioValue',
												name: 'item_3',
												style: { fg: '#00f' },
											}),
											new TextComponent({ text: 'item_3', style: 'h2Text' }),
										],
									}),
								],
							}),
							new LayoutComponent({
								style: ['col', 'gap_2'],
								children: [
									new CheckboxComponent({ model: 'checkboxValue1' }),
									new CheckboxComponent({ model: 'checkboxValue2' }),
									new CheckboxComponent({ model: 'checkboxValue3' }),
								],
							}),
							new ImageComponent({ qr: 'Hello, world!' }),
							new LayoutComponent({
								style: 'col',
								children: [
									new TextComponent({
										style: 'h2Text',
										text: 'Link',
									}),
									new TextComponent({
										style: 'h2Text',
										text: 'List',
									}),
									new TextComponent({
										style: 'h2Text',
										text: 'Table',
									}),
								],
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { UIKitSlideComponent }
