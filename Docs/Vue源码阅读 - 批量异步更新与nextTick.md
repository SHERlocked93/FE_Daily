# Vue源码阅读 - 批量异步更新与nextTick原理

[TOC]

 

vue已是目前国内前端web端三分天下之一，同时也作为本人主要技术栈之一，在日常使用中知其然也好奇着所以然，另外最近的社区涌现了一大票vue源码阅读类的文章，在下借这个机会从大家的文章和讨论中汲取了一些营养，同时对一些阅读源码时的想法进行总结，出产一些文章，作为自己思考的总结，本人水平有限，欢迎留言讨论~

目标Vue版本：`2.5.17-beta.0`

vue源码注释：[https://github.com/SHERlocked93/vue-analysis](https://github.com/SHERlocked93/vue-analysis)

声明：文章中源码的语法都使用 Flow，并且源码根据需要都有删节(为了不被迷糊 @_@)，如果要看完整版的请进入上面的[github地址](https://github.com/SHERlocked93/vue-analysis)，本文是系列文章，文章地址见底部~



## 1. 异步更新 

[上一篇文章](https://juejin.im/post/5b38830de51d455888216675)我们在依赖收集原理的响应式化方法 `defineReactive` 中的 `setter` 访问器中有派发更新 `dep.notify()` 方法，这个方法会挨个通知在 `dep` 的 `subs` 中收集的订阅自己变动的watchers执行update。一起来看看 `update` 方法的实现：

```js
// src/core/observer/watcher.js

/* Subscriber接口，当依赖发生改变的时候进行回调 */
update() {
  if (this.computed) {
    // 一个computed watcher有两种模式：activated lazy(默认)
    // 只有当它被至少一个订阅者依赖时才置activated，这通常是另一个计算属性或组件的render function
    if (this.dep.subs.length === 0) {       // 如果没人订阅这个计算属性的变化
      // lazy时，我们希望它只在必要时执行计算，所以我们只是简单地将观察者标记为dirty
      // 当计算属性被访问时，实际的计算在this.evaluate()中执行
      this.dirty = true
    } else {
      // activated模式下，我们希望主动执行计算，但只有当值确实发生变化时才通知我们的订阅者
      this.getAndInvoke(() => {
        this.dep.notify()     // 通知渲染watcher重新渲染，通知依赖自己的所有watcher执行update
      })
    }
  } else if (this.sync) {	  // 同步
    this.run()
  } else {
    queueWatcher(this)        // 异步推送到调度者观察者队列中，下一个tick时调用
  }
}
```

如果不是  `computed watcher` 也非 `sync` 会把调用update的当前watcher推送到调度者观察者队列中，下一个tick时调用，看看 `queueWatcher` ：

```js
// src/core/observer/scheduler.js

/* 将一个观察者对象push进观察者队列，在队列中已经存在相同的id则
 * 该watcher将被跳过，除非它是在队列正被flush时推送
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {     // 检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验
    has[id] = true
    queue.push(watcher)      // 如果没有正在flush，直接push到队列中
    
    if (!waiting) {          // 标记是否已传给nextTick
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}

/* 重置调度者状态 */
function resetSchedulerState () {
  queue.length = 0
  has = {}
  waiting = false
}
```

这里使用了一个 `has` 的哈希map用来检查是否当前watcher的id是否存在，不存在就push到 `queue` 队列中，若已存在则跳过，不存在则标记哈希表has，用于下次检验。这就是一个去重的过程，这样就不会重复添加，比每次查重都要去queue中找要文明，保证在 `patch` 的时候不会重复 `patch` 相同watcher的变化，这样就算同步修改了一百次视图中用到的data，异步 `patch` 的时候也只会更新最后一次修改。

这里的 `waiting` 方法是用来标记 `flushSchedulerQueue` 是否已经传递给 `nextTick` 的标记位，如果已经传递则只push到队列中不传递 `flushSchedulerQueue` 给 `nextTick`，等到 `resetSchedulerState` 重置调度者状态的时候 `waiting` 会被置 `false` 允许 `flushSchedulerQueue` 被传递给下一个tick的回调，总之保证了 `flushSchedulerQueue` 回调一个tick内只允许被传入一次。来看看被传递给 `nextTick` 的回调 `flushSchedulerQueue` 做了什么：

```js
// src/core/observer/scheduler.js

/* nextTick的回调函数，在下一个tick时flush掉两个队列同时运行watchers */
function flushSchedulerQueue () {
  flushing = true
  let watcher, id

  queue.sort((a, b) => a.id - b.id)					// 排序

  for (index = 0; index < queue.length; index++) {	 // 不要将length进行缓存
    watcher = queue[index]
    if (watcher.before) {         // 如果watcher有before则执行
      watcher.before()
    }
    id = watcher.id
    has[id] = null                // 将has的标记删除
    watcher.run()                 // 执行watcher
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {  // 在dev环境下检查是否进入死循环
      circular[id] = (circular[id] || 0) + 1     // 比如user watcher订阅自己的情况
      if (circular[id] > MAX_UPDATE_COUNT) {     // 持续执行了一百次watch代表可能存在死循环
        warn()								  // 进入死循环的警告
        break
      }
    }
  }
  resetSchedulerState()           // 重置调度者状态
  callActivatedHooks()            // 使子组件状态都置成active同时调用activated钩子
  callUpdatedHooks()              // 调用updated钩子
}
```

在 `nextTick` 方法中执行 `flushSchedulerQueue` 方法，这个方法是 `flush` 之前push进的队列 `queue`，挨个执行 `queue` 中的watcher的 `run` 方法。我们看到在首先有个 `queue.sort()` 方法把队列中的watcher按id从小到大排了个序，这样做可以保证：

1. 组件更新的顺序是从父组件到子组件的顺序，因为父组件总是比子组件先创建。
2. 一个组件的user watchers(侦听器watcher)比render watcher先运行，因为user watchers往往比render watcher更早创建
3. 如果一个组件在父组件watcher运行期间被销毁，它的watcher执行将被跳过

在挨个执行队列中的for循环中，`index < queue.length` 不要将length进行缓存，因为在执行处理现有watcher对象期间，更多的watcher对象可能会被push进queue。



## 2. nextTick原理

这里就来看看包含着每个watcher执行的方法被作为回调传入 `nextTick` 之后，`nextTick` 对这个方法做了什么，不过首先要了解一下浏览器中的 `EventLoop`、`macro task`、`micro task`几个概念，不了解可以参考一下 [JS与Node.js中的事件循环](https://segmentfault.com/a/1190000012362096#articleHeader6) 这篇文章，这里就用一张图来表明一下后两者在主线程中的执行关系

![clipboard.png](https://segmentfault.com/img/bV3EIf?w=547&h=261) 

解释一下，当主线程执行完同步任务后：

1. 引擎首先从macrotask queue中取出第一个任务，执行完毕后，将microtask queue中的所有任务取出，按顺序全部执行；
2. 然后再从macrotask queue中取下一个，执行完毕后，再次将microtask queue中的全部取出；
3. 循环往复，直到两个queue中的任务都取完。

浏览器环境中常见的异步任务种类

- `macro task` ：`setTimeout`、`setInterval`、`MessageChannel`、`postMessage`、`setImmediate`
- `micro task`：`MutationObserver`、`Promise.then`

有的文章把 `micro task` 叫微任务，`macro task` 叫宏任务，因为这两个单词拼写太像了 -。- ，所以后面的注释多用中文表示~

先来看看源码中对 `micro task ` 与 `macro task` 的实现： `macroTimerFunc`、`microTimerFunc`

```js
// src/core/util/next-tick.js

const callbacks = []     // 存放异步执行的回调
let pending = false      // 一个标记位，如果已经有timerFunc被推送到任务队列中去则不需要重复推送

/* 执行异步回调 */
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let microTimerFunc        // 微任务执行方法
let macroTimerFunc        // 宏任务执行方法
let useMacroTask = false  // 是否强制为宏任务，默认使用微任务

// 宏任务
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  MessageChannel.toString() === '[object MessageChannelConstructor]'  // PhantomJS
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 微任务
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
  }
} else {
  microTimerFunc = macroTimerFunc      // fallback to macro
}

/* 强制使用macrotask的方法 */
export function withMacroTask(fn: Function): Function {
  return fn._withTask || (fn._withTask = function() {
    useMacroTask = true
    const res = fn.apply(null, arguments)
    useMacroTask = false
    return res
  })
}
```



这里的 `macroTimerFunc` 与 `microTimerFunc` 进行了在不同兼容性下的平稳退化：

1. `macroTimerFunc` ：`setImmediate -> MessageChannel -> setTimeout `。首先检测是否原生支持 `setImmediate `，这个方法只在 IE、Edge 浏览器中原生实现，然后检测是否支持 [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)，如果对 `MessageChannel` 不了解可以参考一下[这篇文章](https://zhuanlan.zhihu.com/p/37589777)，还  不支持的话最后使用 `setTimeout `；
   为什么优先使用 `setImmediate ` 与 `MessageChannel` 而不直接使用 `setTimeout ` 呢，是因为HTML5规定[setTimeout执行的最小延时为4ms](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)，为了尽可能快的让回调执行，没有最小延时限制的前两者显然要优于 `setTimeout`。
2. `microTimerFunc`：`Promise.then -> macroTimerFunc` 。首先检查是否支持 `Promise`，如果支持的话通过 `Promise.then` 来调用 `flushCallbacks` 方法，否则退化为 `macroTimerFunc` ；
   vue2.5之后 `nextTick` 中因为兼容性原因删除了微任务平稳退化的 `MutationObserver` 的方式。

在vue2.5之前的版本中，nextTick基本上基于 `micro task` 来实现的，但是在某些情况下 `micro task` 具有太高的优先级，并且可能在连续顺序事件（例如[＃4521](https://github.com/vuejs/vue/issues/4521)，[＃6690](https://github.com/vuejs/vue/issues/6690)）之间或者甚至在同一事件的事件冒泡过程中（[＃6566](https://github.com/vuejs/vue/issues/6566)）之间触发。但是如果全部都改成macrotask，对一些有重绘和动画的场景也会有性能影响，如 issue [#6813](https://github.com/vuejs/vue/issues/6813)。vue2.5之后版本提供的解决办法是默认使用 `micro task`，但在需要时（例如在v-on附加的事件处理程序中）强制使用 `macro task`。

这里强制方法的实现是在绑定 DOM 事件的时候，默认会给回调的 handler 函数调用 `withMacroTask` 方法做一层包装 `handler = withMacroTask(handler)`，它保证整个回调函数执行过程中，遇到数据状态的改变，这些改变都会被推到 `macro task` 中。以上实现在 [src/platforms/web/runtime/modules/events.js](https://github.com/SHERlocked93/vue-analysis/blob/12343b07f468bd4b6c2e7c078312b882cd7885ee/vue/src/platforms/web/runtime/modules/events.js#L48) 的 `add` 方法中，可以自己看一看具体代码。

最后来看看我们平常用到的 `nextTick` 方法到底是如何实现的：

```js
// src/core/util/next-tick.js

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```











刚好在写这篇文章的时候思否上有人问了个问题 [vue 2.4 和2.5 版本的@input事件不一样](https://segmentfault.com/q/1010000015663316?_ea=4018873) ，这个问题的原因也是因为2.5之前版本的DOM事件采用 `micro task`，而 `micro task` 在当前tick的 `macro task` 执行之后 `patch` 之前执行，所以我猜测是因为 `micro task` 高优先级的原因没等当前tick的变动 `patch` 渲染到真实DOM上就已经更改了数据，所以 `diff` 的时候已经是更改之后的数据了，因此当然不会渲染到真实DOM上。而2.5之后的 `nextTick` 使用 `macro task` ，是肯定在下个tick之后执行的回调，所以在这个回调执行之前input进去的内容自然会被渲染到真实dom上，所以看到的就是更改的数据一闪而过~













---

**本文是系列文章，随后会更新后面的部分，共同进步~**
> 1. [Vue源码阅读 - 文件结构与运行机制](https://juejin.im/post/5b38830de51d455888216675)
> 2. [Vue源码阅读 - 依赖收集原理](https://juejin.im/post/5b40c8495188251af3632dfa)
> 3. [Vue源码阅读 - 批量异步更新与nextTick原理]()

网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~

> 参考：
>    1. [Vue2.1.7源码学习](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)
>    2. [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis)
>    3. [剖析 Vue.js 内部运行机制](https://juejin.im/book/5a36661851882538e2259c0f/)
>    4. [Vue.js 文档](https://cn.vuejs.org/)
>    5. [记录：window.MessageChannel那些事](https://zhuanlan.zhihu.com/p/37589777)
>    6. [MDN - MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)
>    7. [JS与Node.js中的事件循环](https://segmentfault.com/a/1190000012362096#articleHeader6)
>    8. [黄轶 - Vue.js 升级踩坑小记](https://juejin.im/post/5a1af88f5188254a701ec230)

