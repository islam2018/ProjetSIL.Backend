var assert = require('assert')
var groupByObject = require('.')

var testArray = [
  { a: 1, b: { c: 1, d: 4 } },
  { a: 2, b: { c: 1, d: 4 } },
  { a: 1, b: { c: 2, d: 4 } },
  { a: 1, b: { c: 1, d: 6 } }
]

describe('groupByObject()', function() {
  var groups = groupByObject(testArray, function(item) {
    return {
      a: item.a,
      c: item.b.c
    }
  })
  it('should create 3 groups', function() {
    assert.equal(Array.from(groups.keys()).length, 3)
  })
  describe('first group', function() {
    it('should have 2 items', function() {
      assert.equal(Array.from(groups.values())[0].length, 2)
    })
  })
  describe('second group', function() {
    it('should have 1 item', function() {
      assert.equal(Array.from(groups.values())[1].length, 1)
    })
  })
  describe('first group key', function() {
    var key = Array.from(groups.keys())[0]
    it('should have 2 keys', function() {
      assert.equal(Object.keys(key).length, 2)
    })
    it('should equal { a: 1, c: 1 }', function() {
      assert.deepEqual(key, { a: 1, c: 1 })
    })
  })
})