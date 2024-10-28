const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class PhylosophySlideComponent extends BaseComponent {
	static steps = 4
	step = 1

	constructor(data) {
		super(data)
		this.step = data.step
	}

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Философия Larana',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new TextComponent({}),
							new TextComponent({
								style: 'h2Text',
								text: 'Минимум кода на клиенте',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'Не доверять стейт клиенту',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'Break the web',
							}),
						].splice(0, this.step),
					}),
				],
			}),
		]
	}
}

module.exports = { PhylosophySlideComponent }
