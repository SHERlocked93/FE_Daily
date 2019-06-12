# 前端甘特图 - 在 Vue 项目中使用 dhtmlxGantt

[TOC]

## 1. 搭建环境

使用 vue-cli2 搭建项目框架，模版使用 webpack-simple

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

这里引入了一个 `raw-loader`，用来动态引入 css 文件，将在下文用到

## 2. 开始

### 2.1 获取事件



### 2.2 动态时间线



### 2.3 动态皮肤

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





---

网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~


> 参考：
>
> 1. [dhtmlxGantt API Docs](https://docs.dhtmlx.com/gantt/api__refs__gantt.html)


PS：欢迎大家关注我的公众号【前端下午茶】，一起加油吧~

![](https://i.loli.net/2019/05/31/5cf08a479cd5d75372.jpg)