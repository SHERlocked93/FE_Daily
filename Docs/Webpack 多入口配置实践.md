# Webpack 多入口配置实践与实战

[TOC]

最近在做项目的时候遇到了一个场景：一个项目有多个入口，不同的入口，路由有重叠部分，也有各自不同的部分。由于不同入口下的路由页面有一些是重复的，因此我考虑使用 Webpack 多入口来解决这个需求。

## 1. 目标

1. 为了使得单文件下载时间不至于过长，单文件打包粒度控制在小于 500KB；
2. 尽可能利用浏览器缓存，加快加载速度，同时也避免更新文件的时候及时通知缓存失效；
3. 



## 2. 准备工作

原来的文件结构如下：

```bash
.
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── router
│   │   └── index.js
│   ├── App.vue
│   └── main.js 
├── static
├── README.md
├── index.html
├── package-lock.json
└── package.json
```

> 这里顺便介绍在不同系统下生成目录树的方法：
>
> 1. mac 系统命令行生成目录树的方法 `tree -I node_modules --dirsfirst` ，这个命令的意思是，不显示 `node_modules` 路径的文件，并且以文件夹在前的排序方式生成目录树。如果报没有找到 tree 命令的错，安装 tree 命令行 `brew install tree` 即可。
> 2. windows 系统在目标目录下使用 `tree /f 1.txt` 即可把当前目录树生成到一个新文件 `1.txt` 中。

首先我们简单介绍一下 Webpack 的相关配置项，这些配置项根据使用的 Webpack 模版不同，一般存放在 `webpack.config.js` 或 `webpack.base.conf.js` 中：

```javascript
const path = require('path')
module.exports = {
  entry: './src/main.js',
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'    // 只有一个入口时等价于上面的写法
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'output-file.js',
    publicPath: '/'
  },
  module: {},     // 文件的解析 loader 配置
  plugins: [],    // 插件，根据需要配置各种插件
  devServer: {}   // 配置 dev 服务功能
}
```

这个配置的意思是，进行 Webpack 后，会在命令的执行目录下新建 `dist` 目录（如果需要的话），并将打包 `src` 目录下的 `main.js` 和它的依赖，生成 `output-file.js` 放在 `dist` 目录中。

这里稍微解释一下相关配置项：

1. **entry：** 入口文件配置项，可以为字符串、对象、数组。
   以上面的对象形式为例，`app` 是入口名称，如果 `output.filename` 中有 `[name]` 的话，就会被替换成 `app`。
2. **context：** 是 webpack 编译时的基础目录，用于解析 `entry` 选项的基础目录(绝对路径)，`entry` 入口起点会相对于此目录查找，相当于公共目录，下面所有的目录都在这个公共目录下面。
3. **output：** 出口文件的配置项。
4. **output/path：** 打包文件输出的目录，比如上面的 `dist`，那么就会将输出的文件放在当前目录同级目录的 `dist` 文件夹下，没有这个文件夹就新建一个。
   可以配置为 `path.resolve(__dirname, './dist/${Date.now()}/')` （md 语法不方便改成模板字符串，请自行修改）方便做持续集成。
5. **output.filename：** 输出的文件名称，`[name]` 的意为根据入口文件的名称，打包成相同的名称，有几个入口，就可以打包出几个文件。
   比如入口的 `key` 为 `app`，打包出来就是 `app.js`，入口是 `my-entry`，打包出来就是 `my-entry.js`。
6. **output.publicPath：** 静态资源的公共路径，可以记住这个公式 `静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径`。
   举个例子，`publicPath` 配置为 `/dist/`，图片的 `url-loader` 配置项为 `name: 'img/[name].[ext]'` ，那么最终打包出来文件中图片的引用路径为 `output.publicPath + 'img/[name].[ext]' = '/dist/img/[name].[ext]'`。

本文由于是出口和入口相关的配置，所以内容主要围绕着 `entry` 和 `output` 两个配置项展开。 简单一点就是：

```javascript
module.exports = {
    entry:{
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    }
}
```

但实际上没这么简单，下面我们从头配置一个多入口项目，并且实践一下。

## 3. 开始配置



下面我们进行文件结构的改造，

## 4. 









---

网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~


> 参考：
>
> 1. [webpack解惑：多入口文件打包策略](https://www.cnblogs.com/lvdabao/p/5944420.html)
> 2. [webpack配置文件：入口和出口，多入口、多出口配置](https://www.cnblogs.com/hezihao/p/7928051.html)


PS：欢迎大家关注我的公众号【前端下午茶】，一起加油吧~

![](https://i.loli.net/2019/05/31/5cf08a479cd5d75372.jpg)

另外可以加入「前端下午茶交流群」微信群，长按识别下面二维码即可加我好友，备注**加群**，我拉你入群～

![](https://i.loli.net/2019/07/13/5d2986f77e9bc11533.jpg)