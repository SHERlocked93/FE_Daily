/**
 * 创建于 2017/12/20
 * 作者: Qianyu
 * 功能: http://www.cnblogs.com/TomXu/archive/2012/03/09/2358903.html
 */
const agg = (function() {
  let index = 0
  const data = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
      length = data.length
  
  return {
    next: function() {
      let element
      if (!this.hasNext()) {
        return null
      }
      element = data[index]
      index = index + 1
      return element
    },
    hasNext: function() {
      return index < length
    },
    rewind: function() {
      index = 0
    },
    current: function() {
      return data[index]
    },
    dealEach(fn, ...args) {
      for (let i = 0; i < length; i++) {
        fn.apply(data[i], args)
      }
    }
  }
}())

agg.dealEach(function(T) {
  console.log(T + this.a)
}, '嘻嘻 ')