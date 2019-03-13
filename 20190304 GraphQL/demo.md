---
title: GraphQL
separator: <!--s-->
verticalSeparator: <!--v-->
theme: league
revealOptions:
    transition: slide
---

## 不一样的 API 风格 GraphQL

<div class=fragment><span class='highlight'>面向数据</span>的 API 查询风格</div>

<div class="window faux-graphiql" aria-hidden="true"><div class="query"><pre class="prism">{
  hero {
    name<span id="ch0" class="ch" style="display: none;"><br></span><span id="ch1" class="ch" style="display: none;"> </span><span id="ch2" class="ch" style="display: none;"> </span><span id="ch3" class="ch" style="display: none;"> </span><span id="ch4" class="ch" style="display: none;"> </span><span id="ch5" class="ch" style="display: none;">h</span><span id="ch6" class="ch" style="display: none;">e</span><span id="ch7" class="ch" style="display: none;">i</span><span id="ch8" class="ch" style="display: none;">g</span><span id="ch9" class="ch" style="display: none;">h</span><span id="ch10" class="ch" style="display: none;">t</span><span id="ch11" class="ch" style="display: none;"><br></span><span id="ch12" class="ch" style="display: none;"> </span><span id="ch13" class="ch" style="display: none;"> </span><span id="ch14" class="ch" style="display: none;"> </span><span id="ch15" class="ch" style="display: none;"> </span><span id="ch16" class="ch" style="display: none;">m</span><span id="ch17" class="ch" style="display: none;">a</span><span id="ch18" class="ch" style="display: none;">s</span><span id="ch19" class="ch" style="display: none;">s</span><span class="cursor"></span>
  }
}</pre></div><div class="response"><div id="r1" style="display: block;"><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">"hero"</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">"name"</span><span class="punctuation">:</span> <span class="string">"Luke Skywalker"</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre></div><div id="r2" style="display: none;"><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">"hero"</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">"name"</span><span class="punctuation">:</span> <span class="string">"Luke Skywalker"</span><span class="punctuation">,</span>
    <span class="attr-name">"height"</span><span class="punctuation">:</span> <span class="number">1.72</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre></div><div id="r3" style="display: none;"><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">"hero"</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">"name"</span><span class="punctuation">:</span> <span class="string">"Luke Skywalker"</span><span class="punctuation">,</span>
    <span class="attr-name">"height"</span><span class="punctuation">:</span> <span class="number">1.72</span><span class="punctuation">,</span>
    <span class="attr-name">"mass"</span><span class="punctuation">:</span> <span class="number">77</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre></div></div></div>

Note: reveal-md demo.md  --scripts demo.js,https://www.google-analytics.com/analytics.js  --css demo.css

<!--s-->

### 摘要

1. 概念
2. 语法
3. 使用
4. 应用现状
5. Util、DAO、Resolver

<!--v-->

### 声明

1. CRUD 不关注特别细节的问题
2. 面向前端组人员扩展视野
3. 并不一定在本团队落地
4. 服务端轻喷

<!--v-->

### 举个 🌰

1. 找到 ID 为 233 的用户的年龄和性别 <!-- .element: class="fragment" data-fragment-index="1"-->
2. 这个用户前十个雇员的名字和 Email <!-- .element: class="fragment" data-fragment-index="2"-->
3. 这个用户父亲的电话 <!-- .element: class="fragment" data-fragment-index="3"-->
4. 这个用户父亲的黄色的狗的名字 <!-- .element: class="fragment" data-fragment-index="4"-->

<!--v-->
1. 找到 ID 为 233 的用户的年龄和性别
2. 这个用户前十个雇员的名字和 Email
3. 这个用户父亲的电话
4. 这个用户父亲的黄色的狗的名字

---

```javascript
query {
  user (id : "233") {
    age
    gender
    employee (first: 10) {
      name
      email
    }
    father {
      telephone
      dog (color: "yellow") {
          name
      }
    }
  }
}
```

<!--s-->

## 一些概念

<!--v-->

### 模式 Schema

<span class="highlight">一个简单的强类型模式语法，称为模式描述语言（Schema Definition Language, SDL）</span>

定义字段的类型、数据的结构，描述接口数据请求的规则，当客户端进行一些错误的查询的时候 GraphQL 引擎会负责告诉我们哪里有问题，和详细的错误信息，对开发调试十分友好。 <!-- .element: class="fragment" data-fragment-index="1"-->

<!--v-->
### 对象类型和标量类型 
Object Type & Scalar Type

<div>
1. 对象类型：Schema 中定义的 type
2. 标量类型：String、Int、Float、Boolean、ID，也可自定义
</div><!-- .element: class="fragment" data-fragment-index="1"-->

<!--v-->

### 解析函数 Resolver

```javascript
query operationName {
  hello
}
```
<!-- .element: class="fragment" data-fragment-index="1"-->

```javascript
Query: {
  hello (parent, args, context, info) {
    return ...
  }
}
```
<!-- .element: class="fragment" data-fragment-index="1"-->

Note: 前端请求信息到达后端之后，需要由解析函数Resolver 来提供数据 
1. `parent`：当前上一个解析函数的返回值
2. `args`：查询中传入的参数
3. `context`：提供给所有解析器的上下文信息
4. `info`：一个保存与当前查询相关的字段特定信息以及 schema 详细信息的值

一些常用的解决方案如 Apollo 可以帮省略一些简单的解析函数，比如一个字段没有提供对应的解析函数时，会从上层返回对象中读取和返回与这个字段同名的属性。

<!--v-->

### 请求格式 HTTP Request

```javascript
query {
  user {
    name
  }
}
```

http://myapi/graphql?query={user{name}}
<!-- .element: class="fragment" data-fragment-index="1"-->

```json
{
  "query": "...",
  "operationName": "...",
  "variables": { "myVariable": "someValue", ... }
}
```
<!-- .element: class="fragment" data-fragment-index="2"-->

<!--s-->

## 语法

<span class="highlight fragment" data-fragment-index="1">略</span>




<!--s-->

## 使用

<span class="highlight fragment" data-fragment-index="1">如何 CRUD 和数据订阅</span>



<!--s-->

## 应用现状

Twitter、IBM、Coursera、Airbnb、Facebook、Github、携程 <!-- .element: class="fragment" data-fragment-index="1"-->

Note: 内部或外部 API 从 RESTful 转为了 GraphQL 风格，特别是 Github，它的 v4 版外部 API 只使用 GraphQL

<!--v-->

> 1. GraphQL 每一个 field 都对数据库直接跑一个 query，会产生大量冗余 query，虽然网络层面的请求数被优化了，但数据库查询可能会成为<span class="highlight">性能瓶颈</span>，这里面有很大的优化空间，但并不是那么容易做
> 2. GraphQL 的利好主要在于前端的开发效率，落地却需要服务端的全力配合。在很多<span class="highlight">前后端分工</span>比较明确的团队里，要推动 GraphQL 还是会遇到各种协作上的阻力。
>
> --- Vue作者 尤雨溪 2016.1.3

Note: 大约可以概括为性能瓶颈和团队分工的原因，随着社区的发展，基础设施的完善，渐渐有完善的解决方案提出

<!--v-->

> 硅谷不少一线二线的公司都在想办法转到 GraphQL 上，但是同时 GraphQL 还需要时间发展，因为将它使用到生产环境需要前后端大量的重构，这无疑需要高层的推动和决心。
>
> --- Twitter工程师 北南 2019.1.31

<!--v-->

经过几年一线开发者的填坑，已经有一些不错的[工具链](https://github.com/chentsulin/awesome-graphql)可以使用于开发与生产，很多语言也提供了对 GraphQL 的支持，比如 JavaScript/Nodejs、Java、PHP、Ruby、Python、Go、C# 等。

<!--s-->

## 总结

<!--v-->

![](https://i.loli.net/2019/03/08/5c82222d15d80.png)

Note: 后端通过 DAO 层与数据库连接实现数据持久化，服务于处理业务逻辑的 Service 层，Controller 层接受 API 请求调用 Service 层处理并返回; 
前端通过浏览器 URL 进行路由命中获取目标视图状态，而页面视图是由组件嵌套组成，每个组件维护着各自的组件级状态，一些稍微复杂的应用还会使用集中式状态管理的工具，比如 Vuex、Redux、Mobx 等。前后端只通过 API 来交流，这也是现在前后端分离开发的基础。

<!--v-->

后端不再产出 API，而是和前端约定一套 Schema 维护对应的 Resolver，Schema 可以生成接口文档，前端直接通过 Schema 或生成的接口文档来灵活地进行自己期望的请求

<!--s-->

<!-- .slide: data-background="https://i.loli.net/2019/03/12/5c87a1cfe83e9.jpg" -->

THX ~
