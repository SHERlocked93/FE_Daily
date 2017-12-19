// 寄生式继承
function inheritPrototype(subClass, superClass) {
  function F() { }
  
  F.prototype = superClass.prototype
  subClass.prototype = new F()
  subClass.constructor = subClass
}

// 首先声明一个虚拟父类News
const News = function() {
  this.children = []
  this.element = null
}
News.prototype = {
  init() {
    throw new Error('请重写你的方法')
  },
  add() {
    throw new Error('请重写你的方法')
  },
  getElement() {
    throw new Error('请重写你的方法')
  }
}

// 容器类构造函数
const Container = function(id, parent) {
  News.call(this)
  this.id = id
  this.parent = parent
  this.init()
}
inheritPrototype(Container, News)

Container.prototype.init = function() {
  this.element = document.createElement('ul')
  this.element.id = this.id
  this.element.className = 'new-container'
}
Container.prototype.add = function(child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this
}

Container.prototype.getElement = function() {
  return this.element
}

Container.prototype.show = function() {
  this.parent.appendChild(this.element)
}

// 行成员集合类
const Item = function(className) {
  News.call(this)
  this.className = className || ''
  this.init()
}

inheritPrototype(Item, News)

Item.prototype.init = function() {
  this.element = document.createElement('li')
  this.element.id = this.id
  this.element.className = 'new-container'
}
Item.prototype.add = function(child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this
}

Item.prototype.getElement = function() {
  return this.element
}

Item.prototype.show = function() {
  this.parent.appendChild(this.element)
}


// 新闻组合体
const NewsGroup = function(className) {
  News.call(this)
  this.className = className || 'news-group'
  this.init()
}

inheritPrototype(NewsGroup, News)

NewsGroup.prototype.init = function() {
  this.element = document.createElement('div')
  this.element.id = this.id
  this.element.className = 'new-container'
}
NewsGroup.prototype.add = function(child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this
}

NewsGroup.prototype.getElement = function() {
  return this.element
}

NewsGroup.prototype.show = function() {
  this.parent.appendChild(this.element)
}

// 不同种类的新闻
// 图片新闻类
const ImageNews = function(url, href, className) {
  News.call(this)
  this.url = url || ''
  this.href = href || '#'
  this.className = className || 'normal'
  this.init()
}
inheritPrototype(ImageNews, News)
ImageNews.prototype.init = function() {
  this.element = document.createElement('a')
  const img = new Image()
  img.src = this.url
  this.element.appendChild(img)
  this.element.className = 'image-news ' + this.className
  this.element.href = this.href
}
ImageNews.prototype.add = function() {}
ImageNews.prototype.getElement = function() {
  return this.element
}


// 具有Icon的新闻类
const IconNews = function(text, href, type) {
  News.call(this)
  this.text = text || ''
  this.href = href || '#'
  this.type = type || 'vidio'
  this.init()
  
}
inheritPrototype(IconNews, News)
IconNews.prototype.init = function() {
  this.element = document.createElement('a')
  this.element.innerHTML = this.text
  this.element.href = this.href
  this.element.className = 'icon ' + this.type
}
IconNews.prototype.add = function() {}
IconNews.prototype.getElement = function() {
  return this.element
}


// 简单新闻类
const EasyNews = function(text, href) {
  News.call(this)
  this.text = text || ''
  this.href = href || '#'
  this.init()
}

inheritPrototype(EasyNews, News)
EasyNews.prototype.init = function() {
  this.element = document.createElement('a')
  this.element.innerHTML = this.text
  this.element.href = this.href
  this.element.className = 'text'
}

EasyNews.prototype.add = function() {}
EasyNews.prototype.getElement = function() {
  return this.element
}


// 类型新闻，新闻前有 [NBA] 这种标签的
const TypeNews = function(text, href, type, pos) {
  News.call(this)
  this.text = text || ''
  this.href = href || '#'
  this.type = type || ''
  this.pos = pos || 'left'
  this.init()
}
TypeNews.prototype.init = function() {
  this.element = document.createElement('a')
  this.element.href = this.href
  this.element.className = 'text'
  if (this.pos === 'left') {
    this.element.innerHTML = `[${this.type}] ${this.text}`
  } else {
    this.element.innerHTML = `${this.text} [${this.type}]`
  }
}
TypeNews.prototype.add = function() {}
TypeNews.prototype.getElement = function() {
  return this.element
}