/**
 * 创建于 2018/10/22
 * 作者: QianYu
 * 功能: Promise 使用示例1
 */



function request() {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve("success啦") }, 1000)
    // reject('error啦')
  })
}

request()
  .then(result => console.info(result))
  .catch(error => console.info(error))
