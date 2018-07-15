/**
 * 创建于 2017/12/31
 * 作者: Qianyu
 * 功能: 面试中常用js算法 https://blog.ijason.cc/article/javascript-algorithm
 *
 * 实现：每次新建新的数组
 */

const arr = [-4, 5, 2, 8, 23, 0, 9, 3, 5]

function quickSort(arr) {
  if (arr.length <= 1) {return arr}
  const left = []
  const right = []
  const middleIndex = ~~(arr.length / 2 - 1)
  const middle = arr.splice(middleIndex, 1)
  arr.forEach(T => T > middle ? right.push(T) : left.push(T))
  
  return quickSort(left).concat(middle, quickSort(right))
}

quickSort(arr)