/**
 * location.search 转换
 */

/**
 * @param {string} str
 * @returns {Object}
 * @example
 * parse('?a=1&b=2&c=xx&d') 输出 { a: '1', b: '2', c: 'xx', d: '' }
 */
function parse(str) {
    if (!str.startsWith('?')) {console.error('Error: 格式问题 ', err)}
    const result = {}
    str.slice(1).split('&')
      .map(T => T.split('='))
      .forEach(arr => {
          (arr.length > 1)
            ? result[arr[0]] = arr[1]
            : result[arr[0]] = ''
      })
    return result
}

// console.log(
//   parse('?a=1&b=2&c=xx&d')
// )

// { a: '1', b: '2', c: 'xx', d: '' }

/**
 * @param {Object} obj
 * @returns {string}
 * @example
 * stringify({ a: '1', b: '2', c: 'xx', d: '' }) 输出 a=1&b=2&c=xx
 */
function stringify(obj) {
    const result = []
    Object.entries(obj)
      .forEach(([key, val]) => {
          if (val === '') return
          result.push(key + '=' + val)
      })
    return result.join('&')
}

// console.log(
// stringify({ a: '1', b: '2', c: 'xx', d: '' })    // a=1&b=2&c=xx
// )


/**
 * 实现 setInterval
 * 1. 利用 setTimeout 实现 setInterval
 * 2. 利用 clearTimeout 实现 clearInterval
 */

/**
 * @param {Function} callback
 * @param {number} duration
 * @returns {number}
 * @example
 * mySetInterval(()=> {
 *   console.log('xxx');
 * }, 200);
 */
function mySetInterval(callback, duration) {
    return setTimeout(() => {
        callback()
        setTimeout(callback, duration)
    }, duration)
}

const timer = mySetInterval(() => {
    console.log('xxx')
}, 100)

/**
 * @param {number} timer
 * @returns {void}
 * @example
 * const timer = mySetInterval(()=> {
 *   console.log('xxx');
 * }, 200);
 * setTimeout(() => {
 *   myClearInterval(timer);
 * }, 1000);
 */
function myClearInterval(timer) {
    clearInterval(timer)
}

setTimeout(() => {
    myClearInterval(timer)
}, 1000)

/**
 * 深拷贝
 * 仅考虑 Array、Object、Set、Function 和基本类型
 * @param {Array|Object|Set|Function|string|number} value
 * @returns {Array|Object|Set|Function|string|number}
 * @example
 * const obj = {
 *   a: 1,
 *   b: 'xxx',
 *   c: new Set([1, 2, 3]),
 *   d: { e: 'eee' },
 *   f: () => {},
 *   g: [1, 2, 3],
 * };
 */
function deepClone(value) {
    if (value === null) return null
    if (value instanceof Function) return value

    if (Array.isArray(value)) {
        return [...value].map(T => deepClone(T))
    } else if (value instanceof Set) {
        return new Set([...value].map(T => deepClone(T)))
    } else if (typeof value === 'object') {
        const result = {}
        Object.entries(value).forEach(([key, value]) => {
            result[key] = deepClone(value)
        })
        return result
    } else return value
}

// const obj = {
//     a: 1,
//     b: 'xxx',
//     c: new Set([1, 2, 3]),
//     d: { e: 'eee' },
//     f: () => {},
//     g: [1, 2, 3]
// }
//
// console.log(
//   deepClone(obj)
// )
