const { BaseComponent, text, image, layout } = require('larana-js')

class ContactsSlideComponent extends BaseComponent {
	static steps = 1

	defaultStyle = {
		direction: 'column',
	}

	root() {
		const page = this.usePage()
		
		return layout({
			children: [
				text({ text: 'Контакты', style: 'h1Text' }),
				layout({
					style: { size: 9, gap: 16 },
					children: [
						layout({
							style: { direction: 'column', gap: 8 },
							children: [
								image({
									style: { size: 9 },
									qr: 'https://t.me/+1aK0hJw21ShlMWVi',
									onLoad: () => {
										page.rerender()
									},
								}),
								text({ style: 'h3Text', text: '@frontend_director' }),
							],
						}),
						layout({
							style: { direction: 'column', gap: 8 },
							children: [
								image({
									style: { size: 9 },
									qr: 'https://t.me/+oiDOgBndnZ5hYzIy',
									onLoad: () => {
										page.rerender()
									},
								}),
								text({ style: 'h3Text', text: '@laranatech' }),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ContactsSlideComponent }
