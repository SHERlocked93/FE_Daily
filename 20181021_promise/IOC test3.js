/**
 * 创建于 2018/10/21
 * 作者: QianYu
 * 功能: 控制反转 常规情况2
 */

// 类1
class loggerErr {
  constructor() { this.name = 'loggerErr' }

  write(content) {
    console.log(content + ' 出错了!')
  }
}

// 类2
class loggerSys {
  constructor() { this.name = 'loggerSys' }

  write(content) {
    console.log(content + ' 又错啦!')
  }
}

function myFuncFactory(loggerClass) {
  // 省略初始化过程
  const logger = new loggerClass()
  return () => {
    const info = (() => ' xx is not defined! ')()
    logger.write(info)
  }
}

const myLog1 = myFuncFactory(loggerErr)
myLog1()

const myLog2 = myFuncFactory(loggerSys)
myLog2()
