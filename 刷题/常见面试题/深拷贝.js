/**
 * 这里只能做到基础的类型
 * 首先判断类型，只对对象、数组、一些基础类型做判断，对象和数组分别循环处理，基础类型直接返回自己
 * @param value
 * @returns {{}|null|*}
 */
function clone(value) {
    if (value === null) return null
    if (typeof value !== 'object') return value

    if (Array.isArray(value)) {
        return value.map(item => clone(item))
    } else {
        const obj = {}
        Object.keys(value).forEach(key => {
            obj[key] = clone(value[key])
        })
        return obj
    }
}

/**************************/

const objects = { c: { 'a': 1, e: [1, { f: 2 }] }, d: { 'b': 2 } }
const shallow = clone(objects)
console.log(shallow)

console.log(shallow.c.e[1]) // { f: 2 }
console.log(shallow.c === objects.c) // false
console.log(shallow.d === objects.d) // false
console.log(shallow === objects) // false
