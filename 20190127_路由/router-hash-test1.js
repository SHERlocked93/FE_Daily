class RouterClass {
  constructor() {
    this.routes = {}        // 记录路径标识符对应的cb
    this.currentUrl = ''    // 记录hash只为方便执行cb
    window.addEventListener('load', () => this.render())
    window.addEventListener('hashchange', () => this.render())
  }
  
  /**
   * 初始化
   */
  static init() {
    window.Router = new RouterClass()
  }
  
  /**
   * 注册路由和回调
   * @param path
   * @param cb 回调
   */
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }
  
  /**
   * 记录当前hash，执行cb
   */
  render() {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  }
}

RouterClass.init()
const ContentDom = document.querySelector('.content-div')
const changeContent = content => ContentDom.innerHTML = content

Router.route('/', () => changeContent('默认页面'))
Router.route('/page1', () => changeContent('page1页面'))
Router.route('/page2', () => changeContent('page2页面'))
