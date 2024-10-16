const { HomePage } = require('./pages/home-page.js')
const { BarPage } = require('./pages/bar-page.js')
const { TodoPage } = require('./pages/todo-page.js')

const { NotFoundPage } = require('./pages/404-page.js')

module.exports = {
	routes: [
		{ path: '/', name: 'home', page: HomePage },
		{ path: '/bar', name: 'bar-chart', page: BarPage },
		{ path: '/todo', name: 'todo-list', page: TodoPage },

		{ path: '404', name: 'not-found', page: NotFoundPage },
	],
}
