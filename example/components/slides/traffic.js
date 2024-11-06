const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide')

class TrafficSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Трафик',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({
							style: 'h1',
							value: 'Сколько трафика потребляет ларана?',
						}),
						// text({
						// 	style: 'h2',
						// 	value: 'ссылка на сайт',
						// }),
					],
				}),
			],
		})
	}
}

module.exports = { TrafficSlideComponent }
