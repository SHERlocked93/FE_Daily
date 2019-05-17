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

fs.readFile(resolve(`./mime.json`), (err, data) => {
    if (err) throw Error('找不到mime.json')
    MIME_TYPE = JSON.parse(data)
})

http
    .createServer((req, res) => {
        let { pathname } = url.parse(req.url)
        if (pathname === '/') pathname = 'index.html'
        if (!pathname.includes('.')) pathname = path.join(pathname, '/index.html')
        
        const extName = path.extname(pathname)
        const baseName = path.basename(pathname)
        const fullPath = resolve(`../files/` + pathname)
        
        console.log(fullPath)
        
        fs.access(fullPath, function(err) {
            if (err) res.end('notfount')
            res.writeHead(200, {
                'Content-Type': getMIME(extName),
                'Content-Disposition': `attachment;filename=${baseName}`,   // 自动保存文件
                'Access-Control-Allow-Origin': '*',
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
