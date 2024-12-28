# 0.2.13

- **fix:** tabs height
- **feat:** provide/inject
- **feat:** `row` and `column` components
- **feat:** removed `lastW` and `lastH`, added `useResolution()`

# 0.2.12

- **fix:** removed duplicate client code

# 0.2.11

- **fix:** fixed `move-point`
- **feat:** protocol detection

# 0.2.10

- **feat:** ws/wss

# 0.2.9

- **feat:** change wsPath to `ws://%HOST%/ws`

# 0.2.8

- **fix:** circle images

# 0.2.7

- **feat:** rerender on fullscreen
- **feat:** `setState()` is now deboucing rerenders
- **feat:** border radius for images
- **feat:** `npm init larana-js`
- **docs:** pages, routing, config, quickstart and many more docs

# 0.2.6

- **fix:** host and wsPath

# 0.2.5

- **feat:** image bufferization

# 0.2.4

- **fix:** crossorigin images

# 0.2.3

- **feat:** read static images
- **feat:** default favicon
- **refactor:** static files moved to dedicated dir

# 0.2.2

- **feat:** static files

# 0.2.1

- **fix:** defaultStyles
- **fix:** reduced rerenders on mousemove
- **feat:** more default `styleNames`
- **feat:** better `qr`
- **feat:** `PieChart`
- **feat:** `DonutChart`
- **feat:** `textAlign`
- **refactor:** removed slides from example

# 0.2.0

- **fix:** reduced animation freezing
- **fix:** `queryParams` bug
- **fix:** min/max dimensions now don't break layout
- **feat:** `list` offset and limit
- **feat:** `CodeComponent`
- **feat:** `size`: `hug`
- **feat:** `TableComponent`
- **feat:** `aspectRatio`
- **feat:** `width` and `height` style properties
- **feat:** auto rerender when image is loaded
- **feat:** `renderPadding` debug option
- **feat:** `renderGaps` debug option
- **feat:** `renderCursor` debug option
- **feat:** hooks: `useState()`, `useRoute()`, `usePage()`, `useSession()`, `useMouse()`, `useModel()` etc.
- **feat:** `hoveredStyle`
- **feat:** `focusedStyle`
- **feat:** `disabledStyle`
- **feat:** more importing options
- **feat:** `arc` shape
- **feat:** `arrow` shape
- **feat:** `t` shape for text
- **feat:** `rect` shape
- **feat:** `line` shape
- **feat:** `FigureComponent`
- **feat:** `LineChartComponent`
- **feat:** component shorthands
- **feat:** `ListComponent`
- **feat:** `ThrobberComponent`
- **feat:** `renderOutline` debug option
- **feat:** two way reactivity
- **feat:** `CheckboxComponent`
- **feat:** `ToggleComponent`
- **feat:** `RadioComponent`
- **feat:** client-side resize
- **feat:** `TabsComponent`
- **feat:** `ProgressBarComponent`
- **feat:** `onClick` arg for `ButtonComponent`
- **feat:** `styleName`, themes, and a better way to work with styles
- **feat:** `defaultStyleVars`
- **feat:** default stylenames
- **feat:** `roundedRect`
- **feat:** `TextInput` placeholder
- **feat:** `TextInputComponent`
- **feat:** `onEnter` event for `TextInputComponent`
- **feat:** `hover` event
- **feat:** `keypress` event
- **feat:** `ImageComponent`
- **feat:** qrcodes
- **feat:** rendering line on `CanvasRenderer`
- **refactor:** `page.send()` -> `page.tick()`
- **refactor:** inner framework methods are now with underscore, eg `_setState()`
- **refactor:** `Session.state` -> `Session.storage`
- **refactor:** hooks moved to another class
- **refactor:** `TextComponent.text` -> `TextComponent.value`
- **refactor:** `getChildren()` -> `root()`. A lot of stuff was optimized
- **refactor:** `getStyle()` -> `computeStyle()`
- **refactor:** `getDimensions()` -> `computeDimensions()`
- **refactor:** put form components to `form` folder
- **refactor:** put navigational components to `navigation` folder
- **refactor:** eslint
- **demo:** `/tabs` page
- **demo:** `/todo` page
- **demo:** `/slides` page
- **demo:** `/quiz` page

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
