const { BaseComponent, TextComponent, ImageComponent, LayoutComponent } = require('larana-js')

class ContactsSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				children: [
					new LayoutComponent({
						style: { size: 2, direction: 'column', alignment: 'start' },
						children: [
							new TextComponent({ text: 'Контакты', style: 'h1Text' }),
							new LayoutComponent({
								style: { size: 9, gap: 16 },
								children: [
									new LayoutComponent({
										style: { direction: 'column', gap: 8 },
										children: [
											new ImageComponent({
												style: { size: 9 },
												qr: 'https://t.me/+1aK0hJw21ShlMWVi',
												onLoad: () => {
													data.session.page.rerender()
												},
											}),
											new TextComponent({ style: 'h3Text', text: '@frontend_director' }),
										],
									}),
									new LayoutComponent({
										style: { direction: 'column', gap: 8 },
										children: [
											new ImageComponent({
												style: { size: 9 },
												qr: 'https://t.me/+oiDOgBndnZ5hYzIy',
												onLoad: () => {
													data.session.page.rerender()
												},
											}),
											new TextComponent({ style: 'h3Text', text: '@laranatech' }),
										],
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

module.exports = { ContactsSlideComponent }
