function getUrl(method, url) {
  return new Promise((resolve, reject) => {
    ajax(method, url, function(res) {
      if (res.success) {
        resolve(res)
      } else reject(err => console.log(err))
    })
  })
}


(async function aResponse() {
  const a = await getUrl('get', 'url1', { success: true })
  const b = await getUrl('get', 'url2')
  const c = await getUrl('get', 'url3')
  setTimeout(() => handleResponse(a, b, c), 3000)
})()


function ajax(a, b, c) {
  // console.log(a, b, c)
  return c
}