class Routers {
  constructor() {
    this.routes = {}
    this.currentUrl = ''    // 记录hash只为方便执行cb
    window.addEventListener('load', () => this.refresh, false)
    window.addEventListener('hashchange', () => this.refresh, false)
  }
  
  /**
   * 导航到路径
   * @param path
   * @param cb 回调
   */
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }
  
  /**
   * 记录当前
   */
  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  }
}

window.Router = new Routers()
const content = document.querySelector('body')

// change Page anything
function changeBgColor(color) {
  content.style.backgroundColor = color
}

Router.route('/', () => changeBgColor('yellow'))
Router.route('/blue', () => changeBgColor('blue'))
Router.route('/green', () => changeBgColor('green'))
