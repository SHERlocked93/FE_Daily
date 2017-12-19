/**
 * 创建于 2017/12/19
 * 作者: Qianyu
 * 功能: http://www.cnblogs.com/TomXu/archive/2012/04/13/2436371.html
 */

// 抽象类
const CaffeineBeverage = function() {}
CaffeineBeverage.prototype.prepareRecipe = function() {
  this.boilWater()
  this.brew()
  this.pourOnCup()
  if (this.customerWantsCondiments()) {
    // 如果可以想加小料，就加上
    this.addCondiments()
  }
}
CaffeineBeverage.prototype.boilWater = function() { console.log("将水烧开!")}
CaffeineBeverage.prototype.pourOnCup = function() { console.log("将饮料到再杯子里!")}
CaffeineBeverage.prototype.brew = function() { throw new Error("该方法必须重写!")}
CaffeineBeverage.prototype.addCondiments = function() { throw new Error("该方法必须重写!")}
// 默认加上小料
CaffeineBeverage.prototype.customerWantsCondiments = function() { return true}


// 冲咖啡
const Coffee = function() { CaffeineBeverage.apply(this)}
Coffee.prototype = new CaffeineBeverage()
Coffee.prototype.brew = function() { console.log("从咖啡机想咖啡倒进去!")}
Coffee.prototype.addCondiments = function() { console.log("添加糖和牛奶")}
Coffee.prototype.customerWantsCondiments = function() { return confirm("你想添加糖和牛奶吗？")}


//冲茶叶
const Tea = function() { CaffeineBeverage.apply(this)}
Tea.prototype = new CaffeineBeverage()
Tea.prototype.brew = function() { console.log("泡茶叶!")}
Tea.prototype.addCondiments = function() { console.log("添加柠檬!")}
Tea.prototype.customerWantsCondiments = function() { return confirm("你想添加柠檬嘛？")}

const drink = new Coffee()
drink.prepareRecipe()