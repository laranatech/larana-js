const { BaseComponent } = require('./base-component.js')
const { LayoutComponent } = require('./layout.js')
const { Style } = require('../style')

class ImageComponent extends BaseComponent {
	w = 0
	h = 0
	alt = ''
	url = ''
	img = null
	loaded = false
	onload = () => {}

	constructor(data) {
		super(data)

		const { url, alt, w, h, onload } = data

		this.url = url
		this.alt = alt
		this.w = w
		this.h = h

		if (onload) {
			this.onload = onload
		}

		this.loadImage()
	}

	async loadImage() {
		console.log(this.url)
		const r = await fetch(this.url)
		const b = Buffer.from(await r.arrayBuffer())

		console.log(b)

		setTimeout(() => {
			this.img = b
			this.loaded = true
			this.onload()
		}, 3000)
	}

	render(queue, state) {
		if (!this.loaded) {
			const root = new LayoutComponent({
				parent: this.parent,
				style: new Style({ bg: '#ccc' }),
			})

			root.render(queue, state)

			return queue
		}

		const d = this.getDimensions(state)

		queue.add('image', {
			x: d.x,
			y: d.y,
			w: d.w,
			h: d.h,
			data: this.img,
		})

		return this.img
	}
}

module.exports = { ImageComponent }
