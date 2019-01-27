class Routers {
  constructor() {
    this.isBack = false
    this.routes = {}        // 记录路径标识符对应的cb
    this.currentUrl = ''    // 记录hash只为方便执行cb
    this.historyStack = []  // hash栈
    window.addEventListener('load', () => this.refresh())
    window.addEventListener('hashchange', () => this.refresh())
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
   * 入栈当前hash，执行cb
   */
  refresh() {
    if (this.isBack) {      // 如果是因为回退进入，则置false之后return
      this.isBack = false   // 其他操作在回退时已经做了
      return
    }
    this.currentUrl = location.hash.slice(1) || '/'
    this.historyStack.push(this.currentUrl)
    this.routes[this.currentUrl]()
    console.log('refresh事件   Stack：', this.historyStack, '   currentUrl:', this.currentUrl)
  }
  
  /**
   * 路由后退
   */
  backOff() {
    this.isBack = true
    this.historyStack.pop()         // 移除当前hash，回退到上一个
    const { length } = this.historyStack
    if (!length) return
    let prev = this.historyStack[length - 1]
    location.hash = `#${ prev }`
    this.currentUrl = prev
    this.routes[prev]()             // 执行对应cb
    // console.log('点击后退，当前stack：', this.historyStack, '   currentUrl:', this.currentUrl)
  }
}


window.Router = new Routers()
const content = document.querySelector('body')
const button = document.querySelector('button')

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

button.addEventListener('click', Router.backOff.bind(Router), false)
