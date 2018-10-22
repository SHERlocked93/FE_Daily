function request() {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve("success啦") }, 1000)
    // reject('error啦')
  })
}

request()
  .then(result => console.info(result))
  .catch(error => console.info(error))
