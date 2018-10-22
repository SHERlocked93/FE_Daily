/**
 * 创建于 2018/10/21
 * 作者: QianYu
 * 功能: 控制反转 常规情况
 */


class LoggerErr {
  write(content) {
    console.log(content + ' 出错了!')
  }
}

function myLog() {
  const loggerErr = new LoggerErr()
  const info = (() => 'Uncaught ReferenceError: xx is not defined!')()
  loggerErr.write(info)
}

myLog()
