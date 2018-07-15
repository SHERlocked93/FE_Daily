/**
 * 创建于 2017/12/31
 * 作者: Qianyu
 * 功能: 面试中常用js算法 https://blog.ijason.cc/article/javascript-algorithm
 */

const arr = [-4, 5, 2, 8, 23, 0, 9, 3, 5]

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1])
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
}

bubbleSort(arr)