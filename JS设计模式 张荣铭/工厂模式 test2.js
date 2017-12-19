/**
 * 创建于 2017/12/14
 * 作者: Qianyu
 * 功能: 把实际对象的创建工作放到原型中
 */


const Factory = function(type, content) {
  return (this instanceof Factory)
      ? new this[type](content)
      : new Factory(type, content)
}

Factory.prototype.Compact = function(content) { this.doors = 4}
Factory.prototype.Convertible = function(content) { this.doors = 2}

Factory.prototype.Compact.prototype.drive = function() {
  return `I have ${this.doors} doors!`
}

const corolla = Factory('Compact')
corolla.drive()    // "I have 4 doors!"