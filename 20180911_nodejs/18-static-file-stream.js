/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能: 静态资源 通过流的方式返回，前端blob接受
 */

const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
let MIME_TYPE

const resolve = dir => path.resolve(__dirname, dir)

fs.readFile(resolve(`./test/mime.json`), (err, data) => {
    if (err) throw Error('找不到mime.json')
    MIME_TYPE = JSON.parse(data)
})

http
    .createServer((req, res) => {
        let { pathname } = url.parse(req.url)
        if (pathname === '/') pathname = 'index.html'
        if (!pathname.includes('.')) pathname = path.join(pathname, '/index.html')
        
        const extName = path.extname(pathname)
        const fullPath = resolve(`../files/` + pathname)
        
        fs.access(fullPath, function(err) {
            debugger
            if (err) {
                fs.readFile(resolve(`./test/404.html`), (err, notfount) => {
                    if (err) throw err
                    res.writeHead(404, { 'Content-Type': 'text/html;charset=UTF8' })
                    res.end(notfount)
                })
            }
            res.writeHead(200, {
                'Content-Type': getMIME(extName)
                // 'Content-Disposition': 'attachment'
            })
            fs.createReadStream(fullPath).pipe(res)
        })
    })
    .listen(3002)

/**
 * 获取content-type
 * @param extName
 * @returns {string}
 */
function getMIME(extName) {
    return MIME_TYPE[extName] || 'text/plain'
}
