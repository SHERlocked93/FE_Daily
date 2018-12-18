/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能:当用户访问/student/1234567890 的查询此学号的学生信息。
 * 当用户方位/teacher/645433 的时候，查询此老师的信息
 * 其他的，提示错误。如果位数不对，也是提示位数不对
 */

const http = require('http')

const studentIdReg = /\/(\d{10})$/
const tearcherIdReg = /\/(\d{6})$/

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    
    // student
    if (req.url.startsWith('/student/')) {
      if (studentIdReg.test(req.url)) {
        const match = req.url.match(studentIdReg)
        if (match) {
          const studentId = match[1]
          res.end(`你所要查找的student-id为： ${studentId}`)
        }
      } else res.end('学生学号位数不对')
    }
    
    // teacher
    else if (req.url.startsWith('/teacher/')) {
      if (tearcherIdReg.test(req.url)) {
        const match = req.url.match(tearcherIdReg)
        if (match) {
          const studentId = match[1]
          res.end(`你所要查找的teacher-id为： ${studentId}`)
        }
      } else res.end('教师工号位数不对')
    }
    
    // other
    else res.end('请检查url')
    
  })
  .listen(3002)
