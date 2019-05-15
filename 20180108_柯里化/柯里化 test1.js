var currying = function(fn) {
  // fn 指官员消化老婆的手段,args 指的是那个合法老婆
  var args = [].slice.call(arguments, 1)
  return function() {
    // 已经有的老婆和新搞定的老婆们合成一体，方便控制
    var newArgs = args.concat(...arguments)
    // 这些老婆们用 fn 这个手段消化利用，完成韦小宝前辈的壮举并返回
    return fn.apply(null, newArgs)
  }
}

var getWife = currying(function() {
  console.log([...arguments].join(';'))  // allwife 就是所有的老婆的，包括暗渡陈仓进来的老婆
}, '合法老婆', '呵呵老婆')

getWife('老婆1', '老婆2', '老婆3')  // 合法老婆;老婆1;老婆2;老婆3
getWife('超越韦小宝的老婆')   // 合法老婆;超越韦小宝的老婆
getWife('超级老婆')   // 合法老婆;超级老婆