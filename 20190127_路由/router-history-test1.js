class Routers {
  constructor(path) {
    this.routes = {}        // 记录路径标识符对应的cb
    history.replaceState({ path }, null, path)
    this.routes[path] && this.routes[path]()
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path
      this.routes[path] && this.routes[path]()
    })
  }
  
  /**
   * 记录path对应cb
   * @param path 路径
   * @param cb 回调
   */
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }
  
  /**
   * 触发路由对应回调
   * @param path
   */
  go(path) {
    history.pushState({ path }, null, path)
    this.routes[path] && this.routes[path]()
  }
}

window.Router = new Routers(location.pathname)
const content = document.querySelector('body')
const ul = document.querySelector('ul')

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

ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault()
    Router.go(e.target.getAttribute('href'))
  }
})
