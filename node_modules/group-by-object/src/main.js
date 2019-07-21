const sortKeys = require('sort-keys')

function groupBy (array, keySelector, elementSelector = null) {
  const keys = {}
  const map = new Map()
  array.forEach((item, index) => {
    let key = keySelector(item, index)
    if (typeof key === 'object') {
      key = sortKeys(key, {deep: true})
    }
    const str = JSON.stringify(key)
    if (typeof keys[str] === 'undefined') {
      keys[str] = key
      map.set(key, [])
    }
    map.get(keys[str]).push(elementSelector !== null ? elementSelector(item, index) : item)
  })
  return map
}

groupBy.install = function (returnArray) {
  Array.prototype.groupBy = function () {
    let result = groupBy(this, ...arguments)
    if (returnArray) {
      result = Array.from(result)
    }
    return result
  }
}

module.exports = groupBy