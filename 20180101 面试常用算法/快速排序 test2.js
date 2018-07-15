/**
 * 创建于 2017/12/31
 * 作者: Qianyu
 * 功能: 面试中常用js算法 https://blog.ijason.cc/article/javascript-algorithm
 *
 * 实现：按照传统的方法
 */

const arr = [8, -4, 5, 2, 23, 0, 9, 3, 5]

function quickSort(arr, left, right) {
  if (left === right) return
  let key = left
  while (left < right) {
    while (arr[right] > arr[key] && left < right) right--
    [arr[left], arr[right]] = [arr[right], arr[left]]
    key = right
    while (arr[left] < arr[key] && left < right) left++
    [arr[left], arr[right]] = [arr[right], arr[left]]
    key = left
  }
}

quickSort(arr, 0, arr.length - 1)