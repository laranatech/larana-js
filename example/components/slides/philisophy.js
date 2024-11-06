const { text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class PhylosophySlideComponent extends SlideComponent {
	static steps = 4

	root() {
		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Философия Larana',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						text({}),
						text({
							style: 'h2',
							value: 'Минимум кода на клиенте',
						}),
						text({
							style: 'h2',
							value: 'Минимум доверия клиенту',
						}),
						text({
							style: 'h2',
							value: 'Rebuild the web',
						}),
					].splice(0, this.step),
				}),
			],
		})
	}
}

module.exports = { PhylosophySlideComponent }
