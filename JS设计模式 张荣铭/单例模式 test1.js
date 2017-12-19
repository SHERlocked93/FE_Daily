const LazySingle = (function() {
  let _instance   // 单例的实例引用
  
  function Single() {     // 单例构造函数
    const desc = '单例'    // 私有属性和方法
    return {              // 暴露出来的对象
      publicMethod: function() {console.log(desc)},
      publickProperty: '1.0'
    }
  }
  
  return function() {
    return _instance || (_instance = Single())
  }
})()

console.log(LazySingle())
console.log(LazySingle().publickProperty)