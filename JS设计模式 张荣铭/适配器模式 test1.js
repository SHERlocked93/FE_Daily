const arr = ['Javascript', 'book', '前端编程语言', '8月1日']

function arr2objAdapter(arr) {    // 转化成我们需要的数据结构
  return {
    name: arr[0],
    type: arr[1],
    title: arr[2],
    time: arr[3]
  }
}

const adapterData = arr2objAdapter(arr)