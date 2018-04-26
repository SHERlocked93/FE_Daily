function clone(value, isDeep = true) {
  if (value === null) return null
  if (typeof value !== 'object') return value
  if (Array.isArray(value)) {
    return isDeep
      ? value.map(item => clone(item, true))
      : [...value]
  } else {
    if (isDeep) {
      const obj = {}
      Object.keys(value).forEach(item => {
        obj[item] = clone(value[item], true)
      })
      return obj
    }
    return { ...value }
  }
}

const objects = { c: { 'a': 1, e: [1, { f: 2 }] }, d: { 'b': 2 } }
const shallow = clone(objects, true)
console.log(shallow.c.e[1]) // { f: 2 }
console.log(shallow.c === objects.c) // false
console.log(shallow.d === objects.d) // false
console.log(shallow === objects) // false
