import Vue from 'vue'
import App from './App.vue'

import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'    // 全局样式
import 'dhtmlx-gantt/codebase/locale/locale_cn'   // 本地化

new Vue({
  el: '#app',
  render: h => h(App)
})
