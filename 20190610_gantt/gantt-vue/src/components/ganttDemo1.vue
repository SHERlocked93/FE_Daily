<template>
  <div class="gantt-container">
    <div ref="gantt" class="gantt-instance"></div>
  </div>
</template>

<script>
  import gantt from 'dhtmlx-gantt'
  
  import terrace from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_terrace.css'
  import skyblue from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_skyblue.css'
  import meadow from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css'
  import broadway from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_broadway.css'
  import material from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css'
  import contrast_white from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_contrast_white.css'
  import contrast_black from '!!raw-loader!dhtmlx-gantt/codebase/skins/dhtmlxgantt_contrast_black.css'
  
  export default {
    name: 'GanttDemo1',
    props: {
      tasks: {                  // 传入的数据
        type: Object,
        default() {return { data: [], links: [] }}
      }
    },
    data() {
      return {
        skins: { terrace, skyblue, meadow, broadway, material, contrast_white, contrast_black }
      }
    },
    methods: {
      /**
       * 更改皮肤
       * @param skinType
       */
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
      },
      
      /**
       * 初始化甘特图事件
       */
      initGanttEvents() {
        if (gantt.$_eventsInitialized) return
        
        gantt.attachEvent('onTaskSelected', id => {
          let task = gantt.getTask(id)
          this.$emit('task-selected', id, task)
        })
        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
          this.$emit('task-updated', id, 'inserted', task)
          task.progress = task.progress || 0
          if (gantt.getSelectedId() === id) {
            this.$emit('task-updated', id, 'inserted', task)
          }
        })
        gantt.attachEvent('onAfterTaskUpdate', (id, task) => this.$emit('task-updated', id, 'updated', task))
        gantt.attachEvent('onAfterTaskDelete', id => {
          this.$emit('task-updated', id, 'deleted')
          if (!gantt.getSelectedId()) {
            this.$emit('task-selected', null)
          }
        })
        gantt.attachEvent('onAfterLinkAdd', (id, link) => this.$emit('link-updated', id, 'inserted', link))
        gantt.attachEvent('onAfterLinkUpdate', (id, link) => this.$emit('link-updated', id, 'updated', link))
        gantt.attachEvent('onAfterLinkDelete', (id, link) => this.$emit('link-updated', id, 'deleted'))
        gantt.$_eventsInitialized = true
      },
      
      addMessage(message) {
        this.messages.unshift(message)
        if (this.messages.length > 40) {
          this.messages.pop()
        }
      },
      
      logTaskUpdate(id, mode, task) {
        let text = (task && task.text ? ' (${task.text})' : '')
        let message = 'Task ${mode}: ${id} ${text}'
        this.addMessage(message)
      },
      
      logLinkUpdate(id, mode, link) {
        let message = 'Link ${mode}: ${id}'
        if (link) {
          message += ' ( source: ${link.source}, target: ${link.target} )'
        }
        this.addMessage(message)
      }
    },
    mounted() {
      this.initGanttEvents()
      
      gantt.config.subscales = [
        {
          unit: 'year',
          step: 1,
          date: '%Y'
        }
      ]
      
      gantt.init(this.$refs.gantt)    // 初始化
      gantt.parse(this.tasks)         // 加载数据
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .gantt-container {
    .gantt-instance {
      height: 800px;
    }
  }
</style>
