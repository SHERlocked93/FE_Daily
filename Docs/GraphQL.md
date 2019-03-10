# GraphQL 从入门到实践
[TOC]

## 1. 概述

现在前端的开发随着 SPA 框架的全面普及，组件化开发也随之成为大势所趋，各个组件分别管理着各自的状态。如果 API 粒度比较粗犷，组件需要把异步请求的状态分发给子组件或通知给父组件，这个过程中，由组件间通信带来的结构复杂度、来源不明的数据源、不知从何订阅的数据响应会使得数据流变得杂乱无章，也使得代码可读性变差，以及可维护性的降低，为以后项目的迭代带来极大困难。

试想一下你都开发完了，产品告诉你要大改一番，从接口到组件结构都得改，后端也骂骂咧咧不愿配合让你从好几个 API 里取数据自己组合，这酸爽 🤪

在一些产品链复杂的场景，后端需要提供对应 WebApp、WebPC、APP、小程序、快应用等各端 API，此时 API 的粒度大小就显得格外重要，粗粒度会导致移动端不必要的流量损耗，细粒度则会造成函数爆炸 (Function Explosion)；在此情景下 Facebook 的工程师于 2015 年开源了 **GraphQL** 规范，让客户端自己描述自己希望的数据形式，服务端则返回客户端所描述的数据结构。

简单使用可以参照下面这个图：

![](https://i.loli.net/2019/03/10/5c84b1dca1c5f.gif)

比如前端希望返回一个 ID 为 `233` 的用户的名称和性别，并查找这个用户的前十个雇员的名字和 Email，再找到这个人父亲的电话，和这个父亲的狗的名字（别问我为什么有这么奇怪的例子 🤪），那么我们可以通过一次 query 拿到全部信息，而不需从好几个异步 API 里面来回找：

```graphql
query {
  user (id : "233") {
    name
    gender
    employee (first: 10) {
      name
      email
    }
    father {
      telephone
      dog {
          name
      }
    }
  }
}
```

经过了几年一线开发者的填坑，已经有一些不错的[工具链](https://github.com/chentsulin/awesome-graphql)可以使用于开发，很多语言也提供了对 GraphQL 的支持，比如 JavaScript/Nodejs、Java、PHP、Ruby、Python、Go、C# 等。

一些比较有名的公司比如 Twitter、IBM、Coursera、Facebook、Github、携程等，内部甚至是外部 API 也从 RESTful 转为了 GraphQL 风格，特别是 Github，它的 v4 版外部 API 只使用 GraphQL。

## 2. 语法

更详细的内容参考一下 [GraphQL](http://graphql.cn/learn/queries/#directives) 官网文档，这里介绍几个对理解 GraphQL 比较重要的概念

### 2.1 几个重要概念

#### 1. 操作类型 Operation Type

GraphQL 的操作类型可以是 `query`、`mutation` 或 `subscription`，描述了客户端希望进行什么样的操作

1. query 查询：获取数据，比如查找，CRUD 中的 R
2. mutation 变更：对数据进行变更，比如增加、删除、修改，CRUD 中的 CUD
3. substription 订阅：当数据发生更改，进行消息推送

这些操作类型都将在后文的用到

#### 2. 对象类型和标量类型 Object Type & Scalar Type

如果一个 GraphQL 服务接受到了一个 `query`，那么这个 `query` 将从 `Root Query` 开始查找，找到对象类型（Object Type）时则使用它的解析函数 (Resolver) 来获取内容，如果返回的是对象类型则继续使用解析函数获取内容，如果返回的是标量类型（Scalar Type）则结束获取，直到找到最后一个标量类型。

1. 对象类型：用户在 schema 中定义的 `type`
2. 标量类型：GraphQL 中内置有一些标量类型 `String`、`Int`、`Float`、`Boolean`、`ID`，用户也可以定义自己的标量类型

比如在 Schema 中声明

```graphql
type User {
  name: String!
  age: Int
}
```

这个 `User` 对象类型有两个字段，name 字段是一个为 `String` 的非空标量，age 字段为一个 `Int` 的可空标量。

#### 3. 模式 Schema

如果你用过 MongoOSE，那你应该对 schema 这个概念很熟悉，





## 实战

目前前后端的结构大概如下图。后端通过 DAO 层与数据库连接，服务于主要处理业务逻辑的 Service 层，为 Controller 层提供数据源并产出 API；前端通过浏览器 URL 进行路由命中获取目标视图状态，而页面视图是由组件嵌套组成，每个组件维护着各自的组件级状态，一些稍微复杂的应用还会使用集中式状态管理的工具，比如 Vuex、Redux、Mobx 等。前后端只通过 API 来交流，这也是现在前后端分离开发的基础。

![](https://i.loli.net/2019/03/08/5c82222d15d80.png)











---
网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~



> 参考：
>
> 1. [GraphQL \| 一种为你的 API 而生的查询语言](http://graphql.cn/)
> 2. [JSON\-RPC 2\.0 规范 \- wiki \. leozvc](http://wiki.geekdream.com/Specification/json-rpc_2.0.html)
> 3. [GraphQL 为何没有火起来? - 尤雨溪的回答 - 知乎](https://www.zhihu.com/question/38596306/answer/79714979)
> 4. [GraphQL什么鬼 \| kazaff's blog](https://blog.kazaff.me/2016/01/01/GraphQL%E4%BB%80%E4%B9%88%E9%AC%BC/)
