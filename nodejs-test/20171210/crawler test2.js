const http = require('http')
const url = 'http://www.imooc.com/learn/348'
const cheerio = require('cheerio')

http.get(url, function(res) {
  let html = ''
  res.on('data', function(data) {
    html += data
  })
  
  res.on('end', function() {
    filterCharpters(html)
  })
}).on('error', function() {
  console.log('获取出错')
})


function filterCharpters(html) {
  let $ = cheerio.load(html)
  let chapters = $('.chapter')
  let courseData = [], i = 0
  chapters.each(function(item) {
    let chapter = $(this)
    let chapterTitle = chapter.find('strong').text()
    console.log(chapterTitle, i++)
  })
}