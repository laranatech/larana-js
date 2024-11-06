const { text, image, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ContactsSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({ value: 'Контакты', style: 'h1' }),
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
								text({ style: 'h3', value: '@frontend_director' }),
							],
						}),
						layout({
							style: { direction: 'column', gap: 8 },
							children: [
								image({
									style: { size: 9 },
									qr: 'https://t.me/+oiDOgBndnZ5hYzIy',
								}),
								text({ style: 'h3', value: '@laranatech' }),
							],
						}),
					],
				}),
			],
		})
	}
}

module.exports = { ContactsSlideComponent }
