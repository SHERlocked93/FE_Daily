# vue-router 源码阅读 - 
[TOC]

前端路由是我们前端开发日常开发中经常碰到的概念，在下在日常使用中知其然也好奇着所以然，因此对 vue-router 的源码进行了一些阅读，也汲取了社区的一些文章优秀的思想，于本文记录总结作为自己思考的输出，本人水平有限，欢迎留言讨论~

目标 vue-rouer 版本：`3.0.2`

vue-router源码注释：[vue\-router\-analysis](https://github.com/SHERlocked93/vue-router-analysis)

声明：文章中源码的语法都使用 Flow，并且源码根据需要都有删节(为了不被迷糊 @_@)，如果要看完整版的请进入上面的 [github地址](https://github.com/SHERlocked93/vue-router-analysis) ~ 

本文是系列文章，链接见底部 ~

## 0. 前情回顾

上一篇文章主要介绍了 vue-router 的文件结构和注册机制，注册机制可以理解为有两个阶段，`Vue.use` 时执行的 `install`，和在 `new VueRouter()` 时执行 VueRouter 的构造函数 `constructor`

1. `install` 主要作用 （`/src/install.js` 中）
   1. 注册组件与公共 API
   2. 组件 `beforeCreate` 时执行 `registerInstance`，根组件 `beforeCreate` 时执行 router 实例的 `init` 方法，这个 `init` 会 `history.transitionTo` 手动触发一次路由跳转
2. `new VueRouter()` 主要作用 （`/src/index.js` 中）
   1. 创建 matcher 路由映射表
   2. 将路由操作类实例化出来，其中包含一系列路由操作的方法，比如路由跳转、路由更新、浏览器事件回调注册等

详细作用与代码解析可以看一下上一篇文章： [vue-router 源码阅读 - 文件结构与注册机制](https://juejin.im/post/5c7160d46fb9a049d236ae79) ~

## Matcher

在上面两个注册阶段的 `new VueRouter()` 阶段，也就是 `VueRouter` 的构造函数被执行时，有一段代码 `this.matcher = createMatcher(options.routes, this)`，来看看这个 `createMatcher` 函数的实现

```javascript
// /src/create-matcher.js

/* 根据传入的配置对象 创建路由映射表 */
export function createMatcher(
  routes: Array<RouteConfig>,
  router: VueRouter
): Matcher {
  const { pathList, pathMap, nameMap } = createRouteMap(routes)   // 根据传入的配置对象创建路由map
  
  /* 动态添加路由 */
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap)
  }
  
  /* 添加路由匹配（ ./history/base.js 文件 transitionTo 方法调用） */
  function match(
    raw: RawLocation,
    currentRoute?: Route,
    redirectedFrom?: Location
  ): Route {
    const location = normalizeLocation(raw, currentRoute, false, router)
    const { name } = location
    
    if (name) {
      const record = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        warn(record, `Route with name '${ name }' does not exist`)
      }
      if (!record) return _createRoute(null, location)
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)
      
      if (typeof location.params !== 'object') {
        location.params = {}
      }
      
      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }
      
      if (record) {
        location.path = fillParams(record.path, location.params, `named route "${ name }"`)
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }
  
  /* 路由映射表存在 redirect：重定向 */
  function redirect(
    record: RouteRecord,      // 路由映射表
    location: Location
  ): Route {
    const originalRedirect = record.redirect      // 路由映射表中最初的 redirect 重定向地址
    // 如果 originalRedirect 为 function 则创建路由对象
    let redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect
    
    if (typeof redirect === 'string') {
      redirect = { path: redirect }
    }
    
    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, `invalid redirect option: ${ JSON.stringify(redirect) }`
        )
      }
      return _createRoute(null, location)
    }
    
    const re: Object = redirect
    const { name, path } = re
    let { query, hash, params } = location
    query = re.hasOwnProperty('query') ? re.query : query
    hash = re.hasOwnProperty('hash') ? re.hash : hash
    params = re.hasOwnProperty('params') ? re.params : params
    
    if (name) {         // 路由 url.parse 对象中含有 name
      // resolved named direct
      const targetRecord = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, `redirect failed: named route "${ name }" not found.`)
      }
      return match({
        _normalized: true,
        name,
        query,
        hash,
        params
      }, undefined, location)
    } else if (path) {  // 路由 url.parse 对象中不含有 name，但是 path 存在
      // 1. resolve relative redirect
      const rawPath = resolveRecordPath(path, record)
      // 2. resolve params
      const resolvedPath = fillParams(rawPath, params, `redirect route with path "${ rawPath }"`)
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query,
        hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, `invalid redirect option: ${ JSON.stringify(redirect) }`)
      }
      return _createRoute(null, location)
    }
  }
  
  /* 路由映射表存在 matchAs：动态路由 */
  function alias(
    record: RouteRecord,
    location: Location,
    matchAs: string
  ): Route {
    const aliasedPath = fillParams(matchAs, location.params, `aliased route with path "${ matchAs }"`)
    const aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    })
    if (aliasedMatch) {
      const matched = aliasedMatch.matched
      const aliasedRecord = matched[matched.length - 1]
      location.params = aliasedMatch.params
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }
  
  /* 创建路由 */
  function _createRoute(
    record: ?RouteRecord,
    location: Location,
    redirectedFrom?: Location
  ): Route {
    if (record && record.redirect) {        // 存在重定向 redirect
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {         // 存在 matchAs 动态路由
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }
  
  return { match, addRoutes }
}

```











History 和 Hash 模式都执行了 `history.transitionTo` 方法，这个方法是定义于 `history/base.js` 里面的基类的方法，





## 路由细节



我们看看主要操作方法 `pushState` 与 `replaceState` 是如何被封装的：  

```javascript
// vue-router/src/util/push-state.js

/* 当前页面的 key 值 */
let _key: string = genKey()

/* 根据时间戳生成的唯一 key 值 */
function genKey(): string {
  return Time.now().toFixed(3)
}

export function pushState(url?: string, replace?: boolean) {
  saveScrollPosition()
  const history = window.history
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url)
    } else {
      _key = genKey()
      history.pushState({ key: _key }, '', url)
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url)
  }
}

export function replaceState(url?: string) {
  pushState(url, true)
}
```

首先将当前页面的滚动位置记录下来，以便在下次跳转回来的时候直接滚动到指定位置，如果配置了 vue-router 的[滚动行为](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA)的话，然后分别调用 `window.history` 上的 `replaceState` 与 `pushState` 来完成路由记录的操作，并且这里做了个 `try...catch` 的操作，如果刚刚的方法抛错，则使用 `window.location` 上的方法 `replace` 与 `assign` 来进行操作，它的弊端在于会直接刷新页面，比较暴力。

那么 `window.location` 上的方法 `replace` 和 `assign` 有什么区别呢：

- `replace` 方法：通过加载指定链接文档替换当前文档，不能通过浏览器后退到原文档；
- `assign` 方法：加载指定链接的文档，相当于链接跳转，还可以通过浏览器后退回到原文档；







---
本文是**系列文章**，随后会更新后面的部分，共同进步~
> 1. [vue-router 源码阅读 - 文件结构与注册机制](https://segmentfault.com/a/1190000018262346)

网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~

> 推介阅读：
>
>1. [前端路由跳转基本原理 \- 掘金](https://juejin.im/post/5c52da9ee51d45221f242804)
>
>参考：
>
>1. [Vue\.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/vue-router/router.html)