# Pages

All pages in LaranaJS must extend the `Page` class.

```js
const { Page } = require('larana-js')

class ArticlePage extends Page {}

module.exports = { ArticlePage }

```

## Adding meta info

```js
class ArticlePage extends Page {
	// ...
	title() {
		return 'Article title'
	}

	meta() {
		// will be pasted inside of <head>
		return [
			'<meta name="keywords" content="larana, article, something"/>',
		].join('\n')
	}

	styles() {
		// will be pasted inside of <head>
		return [
			'<link rel="stylesheet" href="/static/style.css"/>',
			'<style>body { background-color: #333; }</style>',
		].join('\n')
	}

	content() {
		// will be pasted in the <body>
		return '<div>My HTML content</div>'
	}

	scripts() {
		// will be pasted at the end of <body>
		return '<script>alert("Hello, world!")</script>'
	}
	// ...
}
```

## Initializing the page

When the page is mounted, the LaranaJS will call it's `init()` method. So it is the best place to add your initializing scripts:

```js
class ArticlePage extends Page {
	// ...
	init() {
		const route = this.useRoute()
		const { setState, initState } = this.useState()

		initState({
			article: null,
			throbber: 0,
		})

		myAPI.fetchArticle(route.params.slug).then((r) => {
			setState({ article: r.data })
		})
	}
	// ...
}

```

## Adding the markup

Now we need to add markup to out page. Note that LaranaJS doesn't support HTML and CSS. Insted it provides it's own [UIKit](./ui-kit.md).

To add your markup use the `root()` method:

```js
const { layout, text, throbber } = require('larana-js')

class ArticlePage extends Page {
	// ...
	root({ w, h }) {
		const { state } = this.useState()

		return layout({
			style: {
				direction: w < 1280 ? 'column' : 'row',
			},
			children: [
				state.article ? text({ value: article.title }) : throbber({ model: 'throbber' }),
			],
		})
	}
	// ...
}
```

### `initialRoot()` and `firstRoot()`

Sometimes your projects may take some time to init, but you already need to show something to your user. In this case you can use `initialRoot()` and `firstRoot()` methods.

They work exactly the same as the `root()` method, but are call at different times:

- `initialRoot()` — when user requests the page.
- `firstRoot()` — when client opens WebSocket-connection.

If you don't provide anything, these methods will use your `root()` method.

## Next step

Now that your page is ready, you need to add it to your [routes](./routing.md).
