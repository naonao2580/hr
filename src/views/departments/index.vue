<template>
    <div class="dashboard-container">
        <div class="app-container">
            <h1>组织架构</h1>
            <el-card class="tree-card">
                <TreeTools :treeNode="company" :isRoot="true" @onDepts="onDepts"></TreeTools>
                <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
                    <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
                    <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
                    <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
                    <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @editDepts="editDepts" @onDepts="onDepts" />
                </el-tree>
            </el-card>
            <AddDept :isAddShow.sync="isAddShow" :treeNode="node"  @addDepts="getDepartments()" ref="addDetp"></AddDept>
        </div>       
    </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue';
import { getDepartments } from '@/api/departments';
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue';

export default {
    components: { TreeTools, AddDept },
    data() {
        return {
            company: {},
            departs: [],
            defaultProps: {
                label: 'name' // 表示 从这个属性显示内容
            },
            isAddShow:false,
            node:null
        }
    },
    created() {
        this.getDepartments()
    },
    methods:{
        // 获取组织架构数据
        async getDepartments(){
            const res = await getDepartments()
            // console.log(res);
            this.company= {name : res.companyName , manager : '负责人' , id:''}  
            this.departs = tranListToTreeData(res.depts , '')
        },
        // 打开添加部门弹层
        onDepts(node){
            this.isAddShow = true
            this.node = node
        },
        // 打开编辑部门弹层
        editDepts(node){
            this.isAddShow = true
            this.node = node
            // 调用子组件方法，填充数据
            this.$refs.addDetp.getDepartDetail(node.id)
        }
    }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>