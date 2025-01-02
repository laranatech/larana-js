const {
	Page,
	column,
	row,
	text,
	barChart,
} = require('larana-js')

const { header } = require('../components')

class BarPage extends Page {
	loadingTextTimeout = null

	title() {
		return 'Bar chart page'
	}

	init() {
		const { initState } = this.useState()

		initState({
			items: [],
			loaded: false,
			loadingTick: 0,
			loadingText: 'Loading',
		})

		this.initialRoot = row({
			children: [
				text({ value: 'Loading...', style: 'text' }),
			],
		})

		this.fetchData()
	}

	root() {
		const { state } = this.useState()

		return column({
			style: [
				'body',
				{ gap: 'var:u2' },
			],
			children: [
				header({}),
				row({
					children: [
						text({
							value: 'Loading data for chart',
							style: 'h1',
						}),
					],
				}),
				row({
					style: { size: 9 },
					children: [
						state.loaded
							? barChart({ model: 'items' })
							: text({
								value: `Loading: ${state.loadingTick}`,
								style: 'text',
							}),
					],
				}),
			],
		})
	}

	fetchData() {
		const { state, setState } = this.useState()

		clearTimeout(this.loadingTextTimeout)
		const tickLoading = () => {
			if (state.loaded) {
				return
			}
			setState({
				loadingTick: state.loadingTick + 1,
				loadingText: 'Loading',
			})

			this.loadingTextTimeout = setTimeout(tickLoading, 100)
		}

		this.loadingTextTimeout = setTimeout(tickLoading, 100)

		setTimeout(() => {
			setState({
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
