/* 抽象类 */
const MenuComponent = function() {
}
MenuComponent.prototype.getName = function() {
  throw new Error("该方法必须重写!")
}
MenuComponent.prototype.getDescription = function() {
  throw new Error("该方法必须重写!")
}
MenuComponent.prototype.getPrice = function() {
  throw new Error("该方法必须重写!")
}
MenuComponent.prototype.isVegetarian = function() {
  throw new Error("该方法必须重写!")
}
MenuComponent.prototype.print = function() {
  throw new Error("该方法必须重写!")
}
MenuComponent.prototype.add = function() {
  throw new Error("该方法必须重写!")
}
MenuComponent.prototype.remove = function() {
  throw new Error("该方法必须重写!")
}
MenuComponent.prototype.getChild = function() {
  throw new Error("该方法必须重写!")
}


/* 基本菜品类 */
const MenuItem = function(sName, sDescription, bVegetarian, nPrice) {
  MenuComponent.apply(this)
  this.sName = sName
  this.sDescription = sDescription
  this.bVegetarian = bVegetarian
  this.nPrice = nPrice
}
MenuItem.prototype = new MenuComponent()
MenuItem.prototype.getName = function() {
  return this.sName
}
MenuItem.prototype.getDescription = function() {
  return this.sDescription
}
MenuItem.prototype.getPrice = function() {
  return this.nPrice
}
MenuItem.prototype.isVegetarian = function() {
  return this.bVegetarian
}
MenuItem.prototype.print = function() {
  console.log(this.getName() + ": " + this.getDescription() + ", " + this.getPrice() + "euros")
}

/* 菜单类 */
const Menu = function(sName, sDescription) {
  MenuComponent.apply(this)
  this.aMenuComponents = []
  this.sName = sName
  this.sDescription = sDescription
  this.createIterator = function() {
    throw new Error("This method must be overwritten!")
  }
}
Menu.prototype = new MenuComponent()
Menu.prototype.add = function(oMenuComponent) {        // 添加子菜品
  this.aMenuComponents.push(oMenuComponent)
}
Menu.prototype.remove = function(oMenuComponent) {  // 删除子菜品
  const aMenuItems = []
  let nMenuItem = 0
  const nLenMenuItems = this.aMenuComponents.length
  let oItem = null
  
  for (; nMenuItem < nLenMenuItems;) {
    oItem = this.aMenuComponents[nMenuItem]
    if (oItem !== oMenuComponent) {
      aMenuItems.push(oItem)
    }
    nMenuItem = nMenuItem + 1
  }
  this.aMenuComponents = aMenuItems
}
Menu.prototype.getChild = function(nIndex) {          //获取指定的子菜品
  return this.aMenuComponents[nIndex]
}
Menu.prototype.getName = function() {
  return this.sName
}
Menu.prototype.getDescription = function() {
  return this.sDescription
}
Menu.prototype.print = function() {                // 打印当前菜品以及所有的子菜品
  console.log(this.getName() + ": " + this.getDescription())
  console.log("--------------------------------------------")
  let nMenuComponent = 0
  const nLenMenuComponents = this.aMenuComponents.length
  let oMenuComponent = null
  
  for (; nMenuComponent < nLenMenuComponents;) {
    oMenuComponent = this.aMenuComponents[nMenuComponent]
    oMenuComponent.print()
    nMenuComponent = nMenuComponent + 1
  }
}

/* 创建指定系列菜品 */
const DinnerMenu = function() {
  Menu.apply(this)
}
DinnerMenu.prototype = new Menu()

const CafeMenu = function() {
  Menu.apply(this)
}
CafeMenu.prototype = new Menu()

const PancakeHouseMenu = function() {
  Menu.apply(this)
}
PancakeHouseMenu.prototype = new Menu()


/* 顶级容器：菜单本 */
const Mattress = function(aMenus) {
  this.aMenus = aMenus
}
Mattress.prototype.printMenu = function() {
  this.aMenus.print()
}

/* 调用 */
const oPanCakeHouseMenu = new Menu("Pancake House Menu", "Breakfast")
const oDinnerMenu = new Menu("Dinner Menu", "Lunch")
const oCoffeeMenu = new Menu("Cafe Menu", "Dinner")
const oAllMenus = new Menu("ALL MENUS", "All menus combined")

oAllMenus.add(oPanCakeHouseMenu)
oAllMenus.add(oDinnerMenu)

oDinnerMenu.add(new MenuItem("Pasta", "Spaghetti with Marinara Sauce, and a slice of sourdough bread", true, 3.89))
oDinnerMenu.add(oCoffeeMenu)

oCoffeeMenu.add(new MenuItem("Express", "Coffee from machine", false, 0.99))

const oMattress = new Mattress(oAllMenus)
console.log("---------------------------------------------")
oMattress.printMenu()
console.log("---------------------------------------------")