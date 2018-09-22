var a = '全局对象啊！'      // 浏览器中会打印这个

function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  fn()
}

const obj = {
  a: 2,
  foo
}


doFoo(obj.foo)
