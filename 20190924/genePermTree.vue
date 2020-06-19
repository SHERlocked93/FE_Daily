/**
* 创建于 2019/9/23
* 作者: SHERlocked93
* 功能: 生成权限树
*/

<template>
  <div class='gene-perm-tree'>
    <div class='tree-option'>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="ID起点">
          <el-input v-model="formInline.idStart" placeholder='8位数字，不以0开头'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="treeGene">生成</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class='tree-panel'>
      
      <div class='tree-left'>
        <el-tree :data="treeData"
                 node-key="id"
                 default-expand-all
                 show-checkbox
                 :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <span>
              <el-button type="text" size="mini">
                <el-popover placement="right"
                            width="400"
                            trigger="click">
                  <div style='display: flex;justify-content: center'>
                    <el-input v-model="appendName" placeholder=""></el-input>
                    <!--                    <el-radio-group v-model="appendType">-->
                    <!--                      <el-radio-button label="路由"></el-radio-button>-->
                    <!--                      <el-radio-button label="按钮"></el-radio-button>-->
                    <!--                    </el-radio-group>-->
                    <el-button type="primary"
                               size='small'
                               @click="append(node, data)">确认
                    </el-button>
                  </div>
                  <span slot="reference">Append</span>
                </el-popover>
              </el-button>
              
              <el-button type="text"
                         size="mini"
                         style='color: #b40000'
                         @click="remove(node, data)">
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      
      <div class='tree-right'>
        From:
        <el-input type="textarea" placeholder="" v-model="permFrom"></el-input>
        Result:
        <el-input type="textarea" placeholder="" v-model="jsonResult"></el-input>
        PermArray:
        <el-input type="textarea" placeholder="" v-model="permResult"></el-input>
      </div>
    </div>
  </div>
</template>

<script type='text/javascript'>
const dataList = [
  {
    path: '/',
    redirect: 'homepage',
    name: 'Home',
    noDropdown: true,
    children: [{ name: '首页', path: 'homepage' }]
  },
  {
    path: '/MapManage',
    redirect: 'MapManage',
    name: '地图管理',
    noDropdown: true,
    children: [{ name: '地图管理', path: 'MapManage' }]
  },
  {
    path: '/TaskManage',
    redirect: 'TaskList',
    name: '任务管理',
    children: [
      { name: '任务设置', path: 'TaskList' },
      { name: '机器人任务列表', path: 'RobotTaskList' }
    ]
  },
  {
    path: '/LearnManage',
    redirect: 'LearnList',
    name: '学习管理',
    children: [
      { name: '企业问答库', path: 'LearnList' },
      { name: '异常问题列表', path: 'QuestionList' }
    ]
  },
  {
    path: '/DataStatistic',
    redirect: 'TaskDetail',
    name: '数据统计',
    children: [
      { name: '任务详情', path: 'TaskDetail' },
      { name: '巡逻详情', path: 'PatrolDetail' },
      { name: '对话记录', path: 'TalkLog' },
      { name: '警报列表', path: 'AlarmList' },
      { name: '通知日志', path: 'NotifyLog' }
    ]
  },
  {
    path: '/OperationMaintenance',
    redirect: 'NotifyCustomization',
    name: '运营维护',
    children: [
      { name: '通知定制', path: 'NotifyCustomization' }
    ]
  },
  {
    path: '/ClienteleManage',
    redirect: 'CustomerManage',
    name: '客户管理',
    children: [
      { name: '员工管理', path: 'CustomerManage' },
      { name: 'VIP管理', path: 'VipManage' }
    ]
  },
  {
    path: '/SystemManage',
    redirect: 'UserManage',
    name: '系统管理',
    children: [
      { name: '用户管理', path: 'UserManage' },
      { name: '角色管理', path: 'RoleManage' },
      { name: '操作日志', path: 'LogManage' }
    ]
  }
]

export default {
  name: 'genePermTree',
  data() {
    return {
      treeData: JSON.parse(JSON.stringify(dataList)),
      jsonResult: '{}',      // 生成的json
      permResult: '[]',      // 权限数组
      formInline: {
        idStart: 10000000,  // id起点，默认 10000000
        region: ''
      },
      permFrom: '',          // 来源
      appendName: ''         // name
    }
  },
  
  methods: {
    append(node, data) {
      const newChild = { label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.name === data.name)
      children.splice(index, 1)
    },
    
    treeGene() {
      console.log(
        this.permFrom.replace(/[\s\r\t\v\f\n]/g, '').replace(/,component:_import\('[\w|\/]+'\)/g, '').replace(/,(component|redirect|noDropdown):'?[\w|\/]+'?/g, '')
      )
      // eslint-disable-next-line
      eval(`this.permFrom = this.permFrom.replace(/[\\s\\r\\t\\v\\f\\n]/g, '').replace(/,component:_import\\('[\\w|\\/]+'\\)/g, '').replace(/,(component|redirect|noDropdown):'?[\\w|\\/]+'?/g, '')`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .gene-perm-tree {
    .tree-panel {
      display: flex;
      
      .tree-left {
        flex-grow: 1;
        margin-right: 20px;
        
        .custom-tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          padding-right: 8px;
          
          .el-input {
            width: 120px;
            height: 28px;
          }
        }
      }
      
      .tree-right {
        flex-grow: 1;
        text-align: left;
      }
    }
  }
</style>
