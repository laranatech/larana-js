const {
	Page,
	layout,
	text,
	barChart,
} = require('larana-js')

const { header } = require('../components')

class BarPage extends Page {
	loadingTextTimeout = null

	title = 'Bar chart page'

	init() {
		this.state = {
			items: [],
			loaded: false,
			loadingTick: 0,
			loadingText: 'Loading',
		}

		this.initialRoot = layout({
			children: [
				text({ value: 'Loading...', style: 'text' }),
			],
		})

		this.fetchData()
	}

	prepareRoot() {
		return layout({
			style: [
				'body',
				{
					gap: 'var:u2',
					direction: 'column',
				},
			],
			children: [
				header({}),
				layout({
					children: [
						text({
							value: 'Loading data for chart',
							style: 'h1Text',
						}),
					],
				}),
				layout({
					style: { size: 9 },
					children: [
						this.state.loaded
							? barChart({ model: 'items' })
							: text({
								value: `Loading: ${this.state.loadingTick}`,
								style: 'text',
							}),
					],
				}),
			],
		})
	}

	fetchData() {
		clearTimeout(this.loadingTextTimeout)
		const tickLoading = () => {
				if (this.state.loaded) {
					return
				}
				this.setState({
					loadingTick: this.state.loadingTick + 1,
					loadingText: 'Loading',
				})
	
				this.loadingTextTimeout = setTimeout(tickLoading, 100)
		}

		this.loadingTextTimeout = setTimeout(tickLoading, 100)

		setTimeout(() => {
			this.setState({
				items: [
					{ value: 100, label: '01' },
					{ value: 90, label: '02' },
					{ value: 60, label: '03' },
					{ value: 190, label: '04' },
					{ value: 60, label: '05' },
					{ value: 100, label: '06' },
					{ value: 120, label: '07' },
					{ value: 300, label: '08' },
					{ value: 500, label: '09' },
					{ value: 150, label: '10' },
					{ value: 100, label: '11' },
					{ value: 70, label: '12' },
				],
				loaded: true,
			})

			clearTimeout(this.loadingTextTimeout)
		}, 2000)
	}
}

module.exports = {
	BarPage,
}
