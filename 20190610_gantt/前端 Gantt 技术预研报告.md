# 前端 Gantt 技术预研报告

[TOC]

## 1. 需求功能点分析

#### 需求明细

1. 计划、工序显示在同一个甘特图中，使用不同标识，支持展开收起；
2. 计划可向右延伸，整体可左右、上下拖动，时间轴根据拖动情况延伸；
3. 工序可向右延伸，整体可左右拖动；

#### 功能点分析

拖动、任务进度、popover、进度调整、时间线调整、任务长度调整、上下级关系、上下级拖动约束；

#### 未来可能需要的功能

下级流程自动约束、上下级随动、**节假日自动跳过**；

## 2. 收费方案


### ✘ [AnyChart](https://www.anychart.com/)

![](https://i.loli.net/2019/06/10/5cfdc3e7a926250200.png)

产品报价单 （139美元 / 1000人民币）：

![](https://i.loli.net/2019/06/10/5cfdf0ba76f0184558.png)


### ✘ [易度甘特图](http://www.edogantt.com/)

**优点：** 国内技术支持，沟通方便点

**缺点：** UI 老旧，基于 jQuery 1.8 开发，直接操作 DOM，获取数据、初始化数据、CRUD 节点不友好；


![](https://i.loli.net/2019/06/10/5cfde945509c128902.png)

产品报价单 （8000人民币每套）：

![](https://i.loli.net/2019/06/10/5cfdeb73417c226115.png)

### ✔︎ [BryntumGantt](https://www.bryntum.com/store/gantt/)

**优点：** 几乎有所有功能，另外还有**操作撤销**；

**缺点：** 贵

**DEMO：** [Gantt Advanced Vue demo](https://www.bryntum.com/examples/gantt/vue/javascript/advanced/dist/index.html)

![](https://i.loli.net/2019/06/10/5cfe0722560f650764.gif)



![](https://i.loli.net/2019/06/10/5cfe0859a0b7398964.gif)

产品报价单 （950美元每人 / 6586人民币每人）：

![](https://i.loli.net/2019/06/10/5cfdf632c93fd90340.png)


### ✔︎ [dhtmlxGantt](https://dhtmlx.com/docs/products/dhtmlxGantt/)

**优点：** 可以从 JSON 直接加载数据不需要数据引擎，有**操作撤销**、**国际化**功能，社区已经有一些联合 Vue 使用的实践了；

**缺点：** 有免费社区版本，不过社区版没有联动约束等一些高级功能；



![](https://i.loli.net/2019/06/10/5cfdc96c050d676471.png)

产品报价单 （699美元 / 4800人民币）：

![](https://i.loli.net/2019/06/10/5cfdf0feef5bf50101.png)



## 3. 开源方案

### ✘ [robicch/jQueryGantt](https://github.com/robicch/jQueryGantt)

基于 jQuery，技术老旧，上次有效 commit 是 2018 年初

![](https://i.loli.net/2019/06/10/5cfde78764aea91859.png)



### ✘ [jQuery\.Gantt](http://taitems.github.io/jQuery.Gantt/)

年久失修，有 popover 功能，只能用来看，没有拖拽、进度修改等功能，官网的例子都各种报错

![](https://i.loli.net/2019/06/10/5cfdfbfcd0bfa19294.gif)

### ✘ [JSGantt](http://jsgantt.com/)

10年前的项目，界面简陋可互动性差，早已**不再维护**

![](https://i.loli.net/2019/06/10/5cfdc1d117f5427180.png)



### ✔︎ [frappe/gantt](https://github.com/frappe/gantt)

**优点：** 原生支持拖动、任务进度、popover、进度调整、时间刻度调整、任务长度调整；

**缺点：** 没有上下级关系、上下级随动、节假日自动跳过；

如果只是用来简单看看或者只是拖拽、没有上下级关系的话，可以用这个，但是看来下一期应该会涉及到上下级关系...

![](https://i.loli.net/2019/06/10/5cfdf77ba54b790674.gif)



### ✔︎ [highcharts - gantt](https://api.highcharts.com.cn/en/gantt/global.html)

**优点：** 支持大多数功能要求、**计划删除、计划增加、获取选中计划**、下级流程自动约束、可以和导航器一起使用，国内用户算多，资料好找点；

**缺点：** 缺少上下级约束、节假日自动跳过，**不支持从 JSON 直接导入数据**，只支持 CSV、HTML Table，并且是通过 SVG 渲染，不方便样式自定义；

**demo：** [交互性甘特图](https://jshare.com.cn/gantt/KYJxL3)、[和 Highstock 的导航器一起使用](https://jshare.com.cn/gantt/dMFxcn)

![](https://i.loli.net/2019/06/10/5cfe321db40a212771.gif)

![](https://i.loli.net/2019/06/10/5cfe42dbaa89a12128.gif)

## 4. 结论

3. **Highcharts** 没有经费就选这个，不过有不少功能需要自己实现，比如缺少**上下级约束**、**节假日自动跳过**，需要自己写代码来实现；
3. **dhtmlxGantt** 这个最推介，有开源方案，使用人数众多，是老牌甘特图解决方案，如果不在意 GPL 协议，开源版应该可以满足基本需求；