# 前端甘特图 - 在 Vue 项目中使用 dhtmlxGantt

[TOC]

## 1. 搭建环境

使用 `vue-cli2` 搭建项目框架，模版使用 `webpack-simple`，如果你使用 `vue-cli3`，也是一样使用。

```bash
# 搭建
vue init webpack-simple gantt-vue
npm i dhtmlx-gantt raw-loader -S

# 运行起来
cd gantt-vue
npm install
npm run dev
```

如果 `npm run dev` 的时候报 `node-sass` 版本不对应，则需要先运行 `npm rebuild node-sass` 

这里引入了一个 `raw-loader`，用来动态引入 css 文件，将在下文用到。

## 2. 基本用法

### 2.1 先跑起来



### 2.2 获取事件



### 2.3 动态时间尺度



时间格式对照表

| 格式 | 含义（范围）-（中文范围）                                    |
| ---- | ------------------------------------------------------------ |
| %y   | 两位数**年份**（00 - 99）                                    |
| %Y   | 四位数**年份**（1900 - 9999）                                |
| %m   | 两位数**月份**，有前导零（01 - 12）                          |
| %n   | **月份**，没有前导零（1 - 12）                               |
| %M   | **月份**缩写（Jan - Dec）-（1月 - 12月）                     |
| %F   | **月份**全名（January - December）-（一月 - 十二月）         |
| %W   | 一年中，按 ISO-8601 计算的**周数**，星期一开始计算           |
| %w   | 从星期一或星期日开始计算的**周数**，具体取决于 `start_on_monday` 属性的配置 |
| %d   | 两位数**日期**，有前导零（01 - 31）                          |
| %j   | **日期**，没有前导零（1 - 31）                               |
| %D   | **星期数**缩写（Sun - Sat）-（日 - 六）                      |
| %l   | **星期数**全称（Sunday - Saturday）-（星期日 - 星期六）      |
| %h   | 12 小时制**小时**，有前导零（00 - 11）                       |
| %H   | 24 小时制**小时**，有前导零（00 - 23）                       |
| %g   | 12 小时制**小时**，没有前导零（1 - 12）                      |
| %G   | 24 小时制**小时**，没有前导零（0 - 23）                      |
| %i   | 有前导零的**分钟**（00 - 59）                                |
| %s   | 有前导零的**秒**（00 - 59）                                  |
| %a   | 显示 am 或 pm                                                |
| %A   | 显示 AM 或 PM                                                |

或者可以参考官方： [Date Format Specification Gantt Docs](https://docs.dhtmlx.com/gantt/desktop__date_format.html)





### 2.4 动态皮肤

```javascript
<script>
  import terrace from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_terrace.css'
  import skyblue from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_skyblue.css'
  import meadow from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css'
  import broadway from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_broadway.css'
  import material from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css'
  import contrast_white from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_contrast_white.css'
  import contrast_black from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_contrast_black.css'
  
  export default {
    name: 'GanttDemo1',
    data() {
      return {
        skins: { terrace, skyblue, meadow, broadway, material, contrast_white, contrast_black }
      }
    },
    methods: {
      /* 动态换肤 */
      changeSkin(skinType) {
        gantt.skin = skinType
        const style = document.createElement('style')
        const currStyle = document.querySelector('#skin')
        
        style.onload = () => {
          gantt.resetSkin()
          gantt.render()
        }
        
        style.rel = 'stylesheet'
        style.type = 'text/css'
        style.id = 'skin'
        style.innerText = this.skins[skinType]
        currStyle
          ? document.head.replaceChild(style, document.querySelector('#skin'))
          : document.head.appendChild(style)
      }
    }
  }
</script>
```



### 2.5 周末自动跳过



### 2.6 Tooltip



---

网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~


> 参考：
>
> 1. [dhtmlxGantt API Docs](https://docs.dhtmlx.com/gantt/api__refs__gantt.html)


PS：欢迎大家关注我的公众号【前端下午茶】，一起加油吧~

![](https://i.loli.net/2019/05/31/5cf08a479cd5d75372.jpg)