const { Page, text, layout, qr } = require('larana-js')

const { header } = require('../components')

class DonatePage extends Page {
	title() {
		return 'Donate'
	}

	root() {
		return layout({
			style: [
				'body',
				{ direction: 'column' },
			],
			children: [
				header({}),
				layout({
					style: {
						size: 9,
						padding: 'var:u5',
						direction: 'column',
						gap: 'var:u2',
					},
					children: [
						layout({
							style: 'hug',
							children: [
								layout({}),
								qr({
									value: 'https://boosty.to/kucheriavyi/donate',
									style: {
										width: 512,
										aspectRatio: 1,
									},
								}),
								layout({}),
							],
						}),
						
						text({
							value: 'https://boosty.to/kucheriavyi/donate',
						}),
					],
				}),
			],
		})
	}
}

module.exports = { DonatePage }
