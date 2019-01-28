class Routers {
  constructor() {
    this.routes = {}        // 记录路径标识符对应的cb
    this.currentUrl = ''    // 记录hash只为方便执行cb
    window.addEventListener('load', () => this.refresh())
    window.addEventListener('hashchange', () => this.refresh())
  }
  
  /**
   * 记录path对应cb
   * @param path
   * @param cb 回调
   */
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }
  
  /**
   * 记录当前hash，执行cb
   */
  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  }
}

window.Router = new Routers()
const content = document.querySelector('body')

/**
 * 改变背景色
 * @param color
 */
function changeBgColor(color) {
  content.style.backgroundColor = color
}

Router.route('/', () => changeBgColor('yellow'))
Router.route('/blue', () => changeBgColor('blue'))
Router.route('/green', () => changeBgColor('green'))
