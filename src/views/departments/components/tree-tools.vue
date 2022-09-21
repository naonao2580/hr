<template>
    <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
        <el-col>
            <span>{{ treeNode.name }}</span>
        </el-col>
        <el-col :span="4">
            <el-row type="flex" justify="end">
                <el-col>{{ treeNode.manager }}</el-col>
                <el-col>
                    <!-- 下拉菜单 -->
                    <el-dropdown @command="operateDepts">
                        <span>
                            操作<i class="el-icon-arrow-down"></i>
                        </span>
                        <!-- 下拉菜单选项 -->
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                            <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
                            <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments';

export default {
    name:'TreeTools',
    props:{
        treeNode:{
            type:Object,
            required:true
        },
        isRoot:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        operateDepts(type){
            if (type === 'add') {
                // 增加部门
                this.$emit('onDepts', this.treeNode)
            }else if(type === 'edit'){
                // 编辑部门
                this.$emit('editDepts', this.treeNode)
            }else{
                // 删除部门
                this.$confirm('确定要删除该部门吗？').then(() => {
                    return delDepartments(this.treeNode.id)
                }).then( () => {
                    this.$emit('delDepts')
                    this.$message.success('删除部门成功！')
                })
            }
        }
    }
}
</script>

<style>

</style>