const { BaseComponent, TextComponent, LayoutComponent, ImageComponent } = require('larana-js')

class ToolingSlideComponent extends BaseComponent {
	static steps = 1

	getChildren(data) {
		return [
			new LayoutComponent({
				parent: this,
				style: 'col',
				children: [
					new TextComponent({
						style: 'h1Text',
						text: 'Tooling в LaranaJS',
					}),
					new LayoutComponent({
						style: ['col', 'gap_1', 'size_5'],
						children: [
							new TextComponent({
								style: 'h2Text',
								text: 'npm init larana-js',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'schemer',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'logger',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'testing',
							}),
							new TextComponent({
								style: 'h2Text',
								text: 'designer',
							}),
						],
					}),
				],
			}),
		]
	}
}

module.exports = { ToolingSlideComponent }
