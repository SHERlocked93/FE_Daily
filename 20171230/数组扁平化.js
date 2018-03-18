/**
 * 数组扁平化
 * @param arr 要扁平化的数组
 * @param depth 数组深度
 * @example arrayDelayering([1, [2, [3, [4]], 5], [[[6], 7], 8]], 2)
 * @returns {Array} [ 1, 2, 3, [ 4 ], 5, [ 6 ], 7, 8]
 */
function arrayDelayering(arr, depth = 1) {
  const result = []
  arr.forEach(item => {
    let d = depth
    if (Array.isArray(item) && d > 0) {
      result.push(...(arrayDelayering(item, --d)))
    } else {
      result.push(item)
    }
  })
  return result
}

console.log(arrayDelayering([1, [2, [3, [4]], 5], [[[6], 7], 8]])) // [ 1, 2, [ 3, [ 4 ] ], 5 ,[ [ 6 ] , 7 ], 8]
console.log(arrayDelayering([1, [2, [3, [4]], 5], [[[6], 7], 8]], 2)) // [ 1, 2, 3, [ 4 ], 5, [ 6 ], 7, 8]
console.log(arrayDelayering([1, [2, [3, [4]], 5], [[[6], 7], 8]], 3)) // [1, 2, 3, 4, 5, 6, 7, 8]
