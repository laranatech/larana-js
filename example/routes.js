const {
	HomePage,
	BarPage,
	TodoPage,
	TabsPage,
	GamePage,
	CounterPage,
	SlidesPage,
	ShapesPage,
	NotFoundPage,
	SizesPage,
} = require('./pages')

module.exports = {
	routes: [
		{ path: '/', name: 'home', page: HomePage },
		{ path: '/bar', name: 'bar-chart', page: BarPage },
		{ path: '/todo', name: 'todo-list', page: TodoPage },
		{ path: '/tabs', name: 'tabs-example', page: TabsPage },
		{ path: '/game', name: 'game-example', page: GamePage },
		{ path: '/slides', name: 'holy-slides', page: SlidesPage },
		{ path: '/shapes', name: 'shapes', page: ShapesPage },
		{ path: '/counter', name: 'counter', page: CounterPage },
		{ path: '/sizes', name: 'sizes', page: SizesPage },

		{ path: '404', name: 'not-found', page: NotFoundPage },
	],
}
