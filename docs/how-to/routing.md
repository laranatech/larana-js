# Routing

Routing is used to access your pages via network and pass some params.

## Adding route to a page

If you initialized your project with `npm init larana-js` command, you should have `src/routes.js` file. Your custom routes can be added there:

```js
const {
	HomePage,
	ArticlePage,
	NotFoundPage,
} = require('./pages')

const routes = [
	{
		path: '/',
		name: 'home',
		page: HomePage,
	},
	{
		path: '/article/:slug/',
		name: 'article',
		page: ArticlePage,
	},
	{
		path: '404',
		name: 'not-found',
		page: NotFoundPage,
	},
]

module.export = { routes }

```

### Route params

- `path` — the path by which your page will be accessed. It can be an exact url like `/about` or with custom parameters, that start with color (`:`).
	- `/article/:slug/` — `/article` part is static and `:slug` is a dynamic parameter. E. g. `/article/larana-routing/`
	- `404` — shorthand for not found page. It will be generated automatically, you just need to adjust the page.
- `name` — name, by which you can access routes in code.
- `page` — some class extended from `Page`.

## Accessing current route

You can access current route inside of [hooked](./hooks.md) components and pages:

```js
class MyComponent extends BaseComponent {
	root() {
		const route = this.useRoute()

		return text({ value: `Current url: ${route.url}` })
	}
}
```

Here is an example of route:

```js
const route = {
	path: '/articles/:slug/',
	name: 'article',
	page: [class ArticlePage extends Page],
	url: '/articles/how-to/?section=comments',
	params: { slug: 'how-to' },
	queryParams: { section: 'comments' },
}
```

## Manipulating the router

> In development.

## Next steps

Now that you added your page to routes, it's time to [config your app](./config.md).
