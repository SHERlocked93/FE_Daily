/**
 * 创建于 2018/10/21
 * 作者: QianYu
 * 功能: 控制反转 常规情况2
 */


class loggerErr {
  write(content) {
    console.log(content + ' 出错了!')
  }
}

class loggerSys {
  write(content) {
    console.log(content + ' 又错啦!')
  }
}

function myLog(loggerClass) {
  const logger = new loggerClass()
  const info = (() => 'Uncaught ReferenceError: xx is not defined!')()
  logger.write(info)
}

myLog(loggerErr)
myLog(loggerSys)
