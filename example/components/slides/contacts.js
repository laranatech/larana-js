const { BaseComponent, text, image, layout } = require('larana-js')

class ContactsSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		return layout({
			children: [
				text({ value: 'Контакты', style: 'h1Text' }),
				layout({
					style: { size: 9, gap: 16 },
					children: [
						layout({
							style: { direction: 'column', gap: 8 },
							children: [
								image({
									style: { size: 9 },
									qr: 'https://t.me/+1aK0hJw21ShlMWVi',
								}),
								text({ style: 'h3Text', value: '@frontend_director' }),
							],
						}),
						layout({
							style: { direction: 'column', gap: 8 },
							children: [
								image({
									style: { size: 9 },
									qr: 'https://t.me/+oiDOgBndnZ5hYzIy',
								}),
								text({ style: 'h3Text', value: '@laranatech' }),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ContactsSlideComponent }
