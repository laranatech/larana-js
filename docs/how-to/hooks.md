# Hooks

Hooks allow you to use some session related features.

> Hooks are only available inside classes extended from `Page` and `BaseComponent`.

## useRoute

useRoute is used to gather information about current route:

```js
const route = this.useRoute()

route === {
    path: '/articles/:slug/',
    name: 'article',
    page: [class ArticlePage extends Page],
    url: '/articles/how-to/?section=comments',
    params: { slug: 'how-to' },
    queryParams: { section: 'comments' },
}
```

> More details are in the [routing](./routing.md) manual.

## useRouter

> In development

## useResolution

`useResolution` hook returns current client resolution:

```js
const { w, h } = this.useResolution()
```

> This hook is only available in components.

## useMouse

`useMouse` hook returns current and previous positions of the mouse.

```js
const { currMouse, lastMouse } = this.useMouse()

currMouse === {
    x: 100,
    y: 200,
}
```

## useEvent

TODO

## useRequest

TODO

## usePayload

TODO

## useConfig

TODO

## useModel

> Available only in components

```js
const {
    model, // Model name, e.g. 'checkboxValue'
    modelValue, // Model
    value,
    getModel,
    setModel,
} = this.useModel()
```

## useTheme

> In development

## useState

```js
const { state, setState, initState } = this.useState()


```
TODO

## usePage

TODO

## useSession

TODO

## useStorage

TODO
