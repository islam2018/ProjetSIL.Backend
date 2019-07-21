# group-by-object

Group an array by primitive values or objects using [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)s.

## Installation

```js
npm install group-by-object
```

## Usage

```js
import groupBy from 'group-by-object'

const array = [
  { a: 1, b: { c: 1, d: 4 } },
  { a: 2, b: { c: 1, d: 4 } },
  { a: 1, b: { c: 2, d: 4 } },
  { a: 1, b: { c: 1, d: 6 } }
]

const groups = groupBy(
  array,
  (item, index) => ({ // key selector
    a: item.a,
    c: item.b.c
  }),
  (item, index) => item // optional element selector
)

console.log(groups)

/*
Map {
  { a: 1, c: 1 } => [
    { a: 1, b: { c: 1, d: 4 } },
    { a: 1, b: { c: 1, d: 6 } }
  ],
  { a: 2, c: 1 } => [
    { a: 2, b: { c: 1, d: 4 } }
  ],
  { a: 1, c: 2 } => [
    { a: 1, b: { c: 2, d: 4 } }
  ]
}
*/
```

If you prefer a more fluent approach, you can automatically add the `groupBy` function to `Array.prototype` by doing the following:

```js
import groupBy from 'group-by-object'
groupBy.install()

...
const groups = array.groupBy(
  item => ({
    a: item.a,
    c: item.b.c
  })
) // returns a Map
```

Since this will still return a `Map` like the previous method, you can instead do `groupBy.install(true)` which will make `Array.prototype.groupBy` automatically convert the result to an array using `Array.from` internally.

So you can, for example, do:

```js
import groupBy from 'group-by-object'
groupBy.install(true)

...
const counted = array
  .groupBy(
    item => ({
      a: item.a,
      c: item.b.c
    })
  )
  .map(([key, items]) => [key, items.length])
```