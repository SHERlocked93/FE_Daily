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
      
      /**
       * 更改时间尺度
       */
      changeTimeScale(scaleType) {
        switch (scaleType) {
          case 'day':
            gantt.config.date_scale = '%F%j日'
            gantt.config.subscales = [{ unit: 'year', step: 1, date: '%Y年' }]
            gantt.config.scale_unit = 'day'
            gantt.config.step = 1
            gantt.templates.date_scale = null
            break
          case 'week':
            const weekScaleTemplate = function(date) {
              const dateToStr = gantt.date.date_to_str('%F%j日')
              const startDate = gantt.date.week_start(new Date(date))
              const endDate = gantt.date.add(gantt.date.add(startDate, 1, 'week'), -1, 'day')
              return dateToStr(startDate) + ' - ' + dateToStr(endDate)
            }
            
            gantt.config.scale_unit = 'week'
            gantt.config.step = 1
            gantt.templates.date_scale = weekScaleTemplate
            gantt.config.subscales = [{ unit: 'day', step: 1, date: '%l' }]
            break
          case 'month':
            gantt.config.scale_unit = 'month'
            gantt.config.date_scale = '%Y年%F'
            gantt.config.subscales = [{ unit: 'day', step: 1, date: '%j日, %l' }]
            gantt.templates.date_scale = null
            break
          case 'quarter':
            gantt.config.scale_unit = 'year'
            gantt.config.step = 1
            gantt.config.date_scale = '%Y年'
            gantt.templates.date_scale = null
            gantt.config.subscales = [
              {
                unit: 'quarter', step: 1, template: function(date) {
                  const dateToStr = gantt.date.date_to_str('%F')
                  const endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day')
                  return dateToStr(date) + ' - ' + dateToStr(endDate)
                }
              }
            ]
            break
          case 'year':
            gantt.config.scale_unit = 'year'
            gantt.config.step = 1
            gantt.config.date_scale = '%Y年'
            gantt.templates.date_scale = null
            gantt.config.subscales = [{ unit: 'month', step: 1, date: '%F' }]
            break
        }
        gantt.render()
      }
    },
    mounted() {
      gantt.config.work_time = true
      gantt.templates.task_cell_class = function(task, date) {
        if (!gantt.isWorkTime(date))
          return 'week_end'
        return ''
      }
      
      gantt.config.order_branch = true        // 可以拖动换行
      gantt.config.order_branch_free = true
      
      this.initGanttEvents()          // 注册事件
      gantt.init(this.$refs.gantt)    // 初始化
      gantt.parse(this.tasks)         // 加载数据
      this.changeTimeScale('day')     // 时间尺度
      
      
      const weekScaleTemplate = function(date) {
        const dateToStr = gantt.date.date_to_str('%d %M')
        const weekNum = gantt.date.date_to_str('(week %W)')
        const endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day')
        return dateToStr(date) + ' - ' + dateToStr(endDate) + ' ' + weekNum(date)
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .gantt-container {
    .gantt-instance {
      height: 800px;
      
      .gantt_task_cell.week_end {
        background-color: #eff5fd !important;
      }
      
      .gantt_task_row.gantt_selected .gantt_task_cell.week_end {
        background-color: #f8ec9c;
      }
    }
  }
</style>
