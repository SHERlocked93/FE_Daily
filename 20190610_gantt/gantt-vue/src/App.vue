<template>
  <div id="app">
    <img src="./assets/logo.png">
    
    <!-- 动态换肤 -->
    <div class='btns'>
      <span class='btns-desc'>
        修改皮肤：
      </span>
      <button @click="changeSkin('terrace')">Terrace</button>
      <button @click="changeSkin('skyblue')">Skyblue</button>
      <button @click="changeSkin('meadow')">Meadow</button>
      <button @click="changeSkin('broadway')">Broadway</button>
      <button @click="changeSkin('material')">Material</button>
      <button @click="changeSkin('contrast_white')">High contrast light</button>
      <button @click="changeSkin('contrast_black')">High contrast dark</button>
    </div>
    
    <!-- 动态时间尺度 -->
    <div class='btns'>
      <span class='btns-desc'>
        修改时间尺度：
      </span>
      <button @click="changeTimeScale('day')">Day</button>
      <button @click="changeTimeScale('week')">Week</button>
      <button @click="changeTimeScale('month')">Month</button>
      <button @click="changeTimeScale('quarter')">Quarter</button>
      <button @click="changeTimeScale('year')">Year</button>
    </div>
    
    <!-- 周末自动跳过 -->
    <div class='btns'>
      <span class='btns-desc'>
        是否考虑周末：
      </span>
      <button @click="weekendTask(true)">考虑</button>
      <button @click="weekendTask(false)">不考虑</button>
    </div>
    
    <gantt-demo1 ref='ganttDemo1'
                 :tasks="tasks"
                 @task-updated="taskUpdated"
                 @link-updated="linkUpdated"
                 @task-selected="taskSelected"></gantt-demo1>
  </div>
</template>

<script>
  import GanttDemo1 from './components/ganttDemo1'
  import gantt from 'dhtmlx-gantt'

  export default {
    name: 'app',
    components: { GanttDemo1 },
    data() {
      return {
        tasks: {
          data: [
            { id: 4, text: 'Project #1', start_date: '15-04-2019', type: gantt.config.types.project, open: true },
            { id: 1, text: 'Task #1', start_date: '15-04-2019', personName: '张三', duration: 3, progress: 0.6, parent: 4},
            { id: 2, text: 'Task #2', start_date: '18-04-2019', personName: '李四', duration: 3, progress: 0.2, parent: 4 },
            { id: 3, text: 'Task #2-1', start_date: '20-04-2019', personName: '王五', duration: 3, progress: 0.1, parent: 2 }
          ],
          links: [
            { id: 1, source: 1, target: 2, type: '1' }
          ]
        }
      }
    },
    methods: {
      /**
       * 动态换肤
       * @param skinType
       */
      changeSkin(skinType) {
        this.$refs.ganttDemo1.changeSkin(skinType)
      },
      
      /**
       * 动态时间尺度
       * @param scaleType
       */
      changeTimeScale(scaleType) {
        this.$refs.ganttDemo1.changeTimeScale(scaleType)
      },
      
      /**
       * 任务已选
       */
      taskSelected(id, task) {
        console.log('任务已选： ', { id, task })
      },
      
      /**
       * 任务更新
       */
      taskUpdated(id, type, task) {
        console.log('任务更新： ', { id, type, task })
      },
      
      /**
       * 任务链接更新
       */
      linkUpdated(id, type, task) {
        console.log('任务链接更新： ', { id, type, task })
      },
      
      /**
       * 是否考虑周末
       * @param flag
       */
      weekendTask(flag) {
        this.$refs.ganttDemo1.weekendTask(flag)
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    
    .btns {
      text-align: left;
      
      .btns-desc {
        width: 200px;
        display: inline-block;
        font-weight: 600;
      }
      
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
