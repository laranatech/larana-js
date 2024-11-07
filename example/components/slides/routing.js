const { code, text, layout } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class RoutingSlideComponent extends SlideComponent {
	static steps = 3

	root() {
		const initCode = [
			'// Инициализация',
			'const router = new DefaultRouter({',
			'    routes: [',
			'        { path: "/todo", name: "todo", page: TodoPage },',
			'        { path: "/quiz", name: "quiz", page: QuizPage },',
			'        { path: "/article/:slug/", name: "article", page: ArticlePage },',
			'        { path: "404", name: "not-found", page: NotFoundPage },',
			'    ],',
			'})',
		]

		const exampleCode1 = [
			'// Получение текущего route',
			'const route = this.useRoute()',
			'',
			'>>> {',
			'    path: "/articles/:slug/",',
			'    name: "article",',
			'    page: [ class ArticlePage extends Page ],',
			'    url: "/articles/larana-js-howto?tab=comments",',
			'    params: { slug: "larana-js-howto" },',
			'    queryParams: { tab: "comments" },',
			'}',
			'',
		]

		const exampleCode2 = [
			'// Управление',
			'const router = this.useRouter()',
			'const { queryParams } = this.useRoute()',
			'',
			'const nextSlide = () => {',
			'    router.push({ step: queryParams.step + 1 })',
			'}',
			'',
		]

		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Routing в LaranaJS',
				}),
				layout({
					style: ['column', 'gap_1', { size: 9 }],
					children: [
						[
							code({
								value: initCode,
							}),
							code({ value: exampleCode1 }),
							code({ value: exampleCode2 }),
						][this.step-1],
					],
				}),
			],
		})
	}
}

module.exports = { RoutingSlideComponent }
