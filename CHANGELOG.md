# 0.2.0

- **fix:** queryParams bug
- **feat:** `TabsComponent`
- **feat:** `ProgressBarComponent`
- **feat:** `onClick` arg for `ButtonComponent`
- **feat:** `styleName`, themes, and a better way to work with styles
- **feat:** roundedRect
- **feat:** `TextInputComponent`
- **feat:** `hover` event
- **feat:** `keypress` event
- **refactor:** changed some names:
	- `getStyle()` -> `computeStyle()`
	- `getDimensions()` -> `computeDimensions()`
- **demo:** `/tabs` page
- **demo:** `/todo` page

## TODO

- fix: animations freeze on event
- fix: min/max dimensions break layout
- feat: `scroll`
- feat: `ImageComponent`
- feat: circle shape
- feat: rect shape
- feat: polygon shape
- feat: text decoration
- feat: `FigureComponent`
- feat: `LineChartComponent`
- feat: `router.push()`
- demo: `/slides` page
- demo: `/game` page

# 0.1.1

- **feat:** `click` event
- **feat:** `defaultStyle`
- **demo:** `/counter` page

# 0.1.0

- **fix:** removed unnecessary `events` spread
- **feat:** client rendering
- **feat:** flexible template settings
- **refactor:** moved memory specific code to `MemoryStateManager`
- **refactor:** `needsRerender` flag of `Page.setState()` moved to `options` arg

known bugs:
- max height breaks layout

# 0.0.4

- **feat:** added route info to pages
- **feat:** added `minWidth`, `maxWidth`, `minHeight`, `maxHeight`

# 0.0.3

- **fix:** fixed `%LANG%` undefined
- **fix:** added `trimOffset`, to fix cropping
- **feat:** default port changed to `1610`
- **feat:** added breakpoint example to `NotFoundPage` example
- **feat:** added color settings to `BarChartComponent`
- **feat:** Added `arc` command to `ServerRenderer`
- **feat:** used `Response` class
