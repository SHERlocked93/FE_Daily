/**
 * 创建于 2017/12/14
 * 作者: Qianyu
 * 功能: 对象的创建在属性中
 */

function CarMaker() {}

CarMaker.prototype.drive = function() {
  return `I have ${this.doors} doors!`
}

CarMaker.factory = function(type) {
  const constr = type
  if (typeof CarMaker[constr] !== 'function') {
    throw new Error(`${constr} doesnot exist`)
  }
  // 原型继承的方式使得原型继承父类
  if (typeof CarMaker[constr].prototype.drive !== 'function') {
    CarMaker[constr].prototype = new CarMaker()
  }
  return new CarMaker[constr]()
}

CarMaker.Compact = function() { this.doors = 4}
CarMaker.Convertible = function() { this.doors = 2}

const corolla = CarMaker.factory('Compact')
corolla.drive()    // "I have 4 doors!"