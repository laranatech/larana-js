const { BaseComponent, text, layout } = require('larana-js')

class PhylosophySlideComponent extends BaseComponent {
	static steps = 4
	step = 1

	defaultStyle = {
		direction: 'column',
	}

	constructor(options) {
		super(options)
		this.step = options.step
	}

	root() {
		return layout({
			children: [
				text({
					style: 'h1Text',
					text: 'Философия Larana',
				}),
				layout({
					style: ['col', 'gap_1', 'size_5'],
					children: [
						text({}),
						text({
							style: 'h2Text',
							text: 'Минимум кода на клиенте',
						}),
						text({
							style: 'h2Text',
							text: 'Минимум доверия клиенту',
						}),
						text({
							style: 'h2Text',
							text: 'Rebuild the web',
						}),
					].splice(0, this.step),
				}),
			],
		})
	}
}

module.exports = { PhylosophySlideComponent }
