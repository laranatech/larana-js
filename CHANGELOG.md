# 0.2.0

- **fix:** reduced animation freezing
- **fix:** queryParams bug
- **feat:** two way reactivity
- **feat:** `CheckboxComponent`
- **feat:** `RadioComponent`
- **feat:** client-side resize
- **feat:** `TabsComponent`
- **feat:** `ProgressBarComponent`
- **feat:** `onClick` arg for `ButtonComponent`
- **feat:** `styleName`, themes, and a better way to work with styles
- **feat:** `defaultStyleVars`
- **feat:** default stylenames
- **feat:** `roundedRect`
- **feat:** `TextInputComponent`
- **feat:** `hover` event
- **feat:** `keypress` event
- **feat:** `ImageComponent`
- **feat:** qrcodes
- **feat:** rendering line on `CanvasRenderer`
- **refactor:** `getStyle()` -> `computeStyle()`
- **refactor:** `getDimensions()` -> `computeDimensions()`
- **refactor:** put form components to `form` folder
- **refactor:** put navigational components to `navigation` folder
- **demo:** `/tabs` page
- **demo:** `/todo` page

## TODO

- fix: `hover` doesn't work right
- fix: min/max dimensions break layout
- fix: client fonts
- feat: `renderOutline` debug option
- feat: `renderPadding` debug option
- feat: `renderGaps` debug option
- feat: `FormConstructor`
- feat: filters
- feat: opacity
- feat: width, height
- feat: aspect ratio
- feat: `alignment`
- feat: style validation
- feat: `hoveredStyle`
- feat: `focusedStyle`
- feat: `scroll`
- feat: circle shape
- feat: rect shape
- feat: polygon shape
- feat: text decoration
- feat: `FigureComponent`
- feat: `LineChartComponent`
- feat: `router.push()`
- refactor: eslint
- docs: styleguide
- docs: howto
- demo: `/test` page
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
