const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class WhatIsLaranaSlideComponent extends BaseComponent {
	static steps = 3
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
						text: 'Что такое LaranaJS',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new TextComponent({}),
							new TextComponent({
								style: 'h2Text',
								text: 'Larana — философия',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'LaranaJS — имплементация',
							}),
						].splice(0, this.step),
					}),
				],
			}),
		]
	}
}

module.exports = { WhatIsLaranaSlideComponent }
