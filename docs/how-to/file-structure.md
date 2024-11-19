# File structure

Your initial file structure will be something like this:

- `src` — root directory.
	- `components` — a directory for your [components](./components.md).
		- `header.js` — an example component.
		- `index.js` — a list with your components for easier importing.
	- `pages` — a directory for your [pages](./pages.md)
		- `home-page.js`
		- `404-page.js`
		- `index.js`
	- `static` — a directory for [static files](./static.md)
		- `larana.svg`
	- `styles` — a directory for [styles](./styles.md)
		- `vars.js`
		- `style-names.js`
		- `index.js`
	- `config.js` — [config](./config.md) of your app
	- `routes.js` — available [routes](./routing.md)
	- `index.js` — entry point

You can alter it as you wish, but this is the recomended structure.

## Working on bigger projects

If your project is bigger than a few files, it is recomended to separete your components and pages into [modules](../architecture/modules.md):

- `src`
	- `modules`
		- `account`
			- `components`
			- `pages`
			- `routes.js`
			- `index.js`
		- `auth`
			- `components`
			- `pages`
			- `routes.js`
			- `index.js`
		- `cart`
			- `components`
			- `pages`
			- `routes.js`
			- `index.js`
	- `routes.js`
	- `config.js`
	- `index.js`

In future you will be able to move this modules to different apps and [microservices](../architecture/microservices.md).

## Next step

Now you are ready to [create your first page](./pages.md).
