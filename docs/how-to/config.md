# Config

By default app config lies in `src/config.js`. Here is the minimal example:

```js
const { defineConfig } = require('larana-js')

const config = defineConfig({})

module.exports = { config }

```

[In the next step](./app-modules.md) we will discuss including this config to your app, but now let's take a look at options.

## options

### `debug`

**Type:** `boolean`  
**Default:** `false`

Is your app in debug mode. Enables `debugOptions` and also add a `DEBUG` overlay to your screen, so you don't forget to disable it before deploying.

Also client files are hot reloaded only when debug is enabled.

### `debugOptions`

**Type:** `object`

It is an object with debug options:

#### `renderOutline`

**Type:** `boolean`  
**Default:** `false`

If `true`, components will have an outline — a `1px` border with default color set to `rgba(255, 0, 0, 0.4)`. 

> [Components](./components.md) can have custom outline. All you need is to pass `outlineColor` and `outlineWidth` options to a constructor.

#### `renderPaddings`

**Type:** `boolean`  
**Default:** `false`

If `true`, app will render paddings with `rgba(255, 255, 0, 0.3)` color.

> [Components](./components.md) can have custom padding color. All you need is to pass `paddingColor` option to a constructor.

#### `renderGaps`

**Type:** `boolean`  
**Default:** `false`

If `true`, app will render gaps with `rgba(255, 0, 255, 0.3)` color.

> [Components](./components.md) can have custom gap color. All you need is to pass `gapColor` option to a constructor.

#### `renderCursor`

**Type:** `boolean`  
**Default:** `false`

Should the app render a circle on the current mouse position.

#### `logMessages`

**Type:** `boolean`  
**Default:** `false`

Should the app log every message to console.

### `port`

**Type:** `number`  
**Default:** `1610`

Port on which your app will be served.

### `host`

**Type:** `string`  
**Default:** `http://localhost`

Host on which 

### `wsPath`

**Type:** `string`|`null`  
**Default:** `null`

WebSocket endpoint. If not set, will use app's default.

### `maxFPS`

**Type:** `number`  
**Default:** `30`

> In development

### `maxBandwidth`

**Type:** `number`  
**Default:** `10 * 1024` (10 KB)

> In development

### `sessionLifetime`

**Type:** `number`  
**Default:** `5 * 60 * 1000` (5 minutes)

> In development

### `storePreviousRender`

**Type:** `boolean`  
**Default:** `true`

Wheter the app should store previous rendered image or not. It is used to compute diff image and reduce package size.

If `true`, the app will use more memory.

If `false`, the app will use more CPU power.

> `ServerRenderer` specific option.  
> More info here: [Renderer](../app-modules/renderer.md)

### `initialW`

**Type:** `number`  
**Default:** `512`

Width of initialRoot.

> More info here: [Life cycle](./life-cycle.md)

### `initialH`

**Type:** `number`  
**Default:** `512`

Height of initialRoot.

> More info here: [Life cycle](./life-cycle.md)

### `defaultTheme`

**Type:** `string`  
**Default:** `'dark'`

Default UI theme.

> More info here: [Styles](./styles.md)

### `defaultLang`

**Type:** `string`  
**Default:** `'en'`

Default session language.

### `staticDir`

**Type:** `string`|`null`  
**Default:** `null`

Directory with static files.

> More info here: [Static files](./static.md).

## Next step

Now we are ready for the [subsystems](./subsystems.md).
