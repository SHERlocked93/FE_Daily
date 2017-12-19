// https://www.imooc.com/video/8837

let http = require('http')
let querystring = require('querystring')

let postData = querystring.stringify({
  'content': '期待啊么么哒',
  'cid': 348
})

let options = {
  hostname: 'www.imooc.com',
  port: 80,
  path: '/course/docomment',
  method: 'POST',
  headers: {
    'Accept': 'application / json, text / javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'Connection': 'keep-alive',
    'Content-Length': postData.length,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'UM_distinctid=15f96172e1a633-08f26b2a937bce-7b1f3c-1fa400-15f96172e1b5e5; CNZZDATA1261110065=1602085131-1510048750-https%253A%252F%252Fwww.baidu.com%252F%7C1510048750; imooc_uuid=0c969ae9-c9c8-40cd-9634-f8283294a9c0; imooc_isnew_ct=1510051621; PHPSESSID=m9gc5al4p9otl6e653fu12qje3; loginstate=1; apsid=M1MzY3MDdhYmEzOGU1NGQ2MWYxNjA2MTQ4NGNlMDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDU0NjI0OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NDMwMzMwOTlAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGViM2FmOWJkYzYxNDI5NTg2MzQ4MzMxZTdjZDFmNzIyUb4sWlG%2BLFo%3DZm; last_login_username=443033099%40qq.com; mc_channel=L1; mc_marking=032475ea974e6e9bb1ee3f2caad1acb2; cninfo=L1-032475ea974e6e9bb1ee3f2caad1acb2; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1512537545,1512547104,1512621076,1512699644; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1512908324; imooc_isnew=2; cvde=5a29f6f833c96-142',
    'Host': 'www.imooc.com',
    'Origin': 'http://www.imooc.com',
    'Referer': 'http://www.imooc.com/course/comment/id/348?page=7',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

let req = http.request(options, function(res) {
  console.log('status: ' + res.statusCode)
  console.log('status: ' + JSON.stringify(res.headers))
  
  res.on('data', function(chunk) {
    console.log('bbbbbbbbbbbbbuffer:' + Buffer.isBuffer(chunk))
    console.log(typeof chunk)
  })
  
  res.on('end', function() {
    console.log('评论完毕')
  })
})

req.on('error', function(e) {
  console.log('error: ' + e)
})

req.write(postData)
req.end()