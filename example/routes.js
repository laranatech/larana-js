const {
	HomePage,
	BarPage,
	TodoPage,
	TabsPage,
	GamePage,
	CounterPage,
	ShapesPage,
	NotFoundPage,
	SizesPage,
	TablePage,
	QuizPage,
} = require('./pages')

module.exports = {
	routes: [
		{ path: '/', name: 'home', page: HomePage },
		{ path: '/bar', name: 'bar-chart', page: BarPage },
		{ path: '/todo', name: 'todo-list', page: TodoPage },
		{ path: '/tabs', name: 'tabs-example', page: TabsPage },
		{ path: '/game', name: 'game-example', page: GamePage },
		{ path: '/shapes', name: 'shapes', page: ShapesPage },
		{ path: '/counter', name: 'counter', page: CounterPage },
		{ path: '/sizes', name: 'sizes', page: SizesPage },
		{ path: '/table', name: 'table', page: TablePage },
		{ path: '/quiz', name: 'quiz', page: QuizPage },

		{ path: '404', name: 'not-found', page: NotFoundPage },
	],
}
