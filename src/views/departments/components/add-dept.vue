<template>
    <el-dialog :title="showTitle" :visible="isAddShow" @close="closeAddShow">
        <el-form label-width="120px" :model="deptForm" :rules="deptRules" ref="deptForm"> 
            <el-form-item label="部门名称" prop="name">
                <el-input style="width:80%" placeholder="1-50个字符" v-model="deptForm.name"/>
            </el-form-item>
            <el-form-item label="部门编码" prop="code">
                <el-input style="width:80%" placeholder="1-50个字符" v-model="deptForm.code"/>
            </el-form-item>
            <el-form-item label="部门负责人" prop="manager">
                <el-select v-model="deptForm.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
                    <!-- 需要循环生成选项   这里做一下简单的处理 显示的是用户名 存的也是用户名-->
                    <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.username" />
                </el-select>
            </el-form-item>
            <el-form-item label="部门介绍" prop="introduce">
                <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" v-model="deptForm.introduce"/>
            </el-form-item>
        </el-form>
        <el-row type="flex" justify="center" slot="footer">
            <el-clo :spawn="6">
                <el-button @click="closeAddShow">取 消</el-button>
                <el-button type="primary" @click="addDept">确 定</el-button>
            </el-clo>
        </el-row>
        
    </el-dialog>
</template>

<script>
import { getDepartments ,addDepartments ,getDepartDetail ,editDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
    name:'AddDept',
    data(){
        // 部门名称校验规则
        const checkNameRepeat = async(rule , value , callback) => {
            // 获取组织架构数据
            const { depts } = await getDepartments()
            let isRepeat = false
            // 判断是编辑状态还是新增状态
            if(this.deptForm.id){
                // 有id编辑状态
                // 1.先筛查到同级部门  item.pid === this.treeNode.pid
                // 2.排除自身   item.id !== this.treeNode.id
                // 3.检查是否有相同的name
                isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
            }else{
                // 无id新增状态
                // 筛选组织架构中pid = 当前id的，即当前部门的子部门 ，some判断中是否有name值一样的
                isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
            }
            
            isRepeat ? callback(new Error('同级部门下已有该部门')) : callback()
        }
        // 部门编码校验规则
        const checkCodeRepeat = async (rule , value , callback) => {
            // 获取组织架构数据
            const { depts } = await getDepartments()
            let isRepeat = false
            // 判断是编辑状态还是新增状态
            if(this.deptForm.id){
                // 有id编辑状态
                // 1.筛查所有数据，排除自身
                // 2.检查是否以相同的code
                isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
            }else{
                // 无id新增状态
                // 筛选组织架构中pid = 当前id的，即当前部门的子部门 ，some判断中是否有name值一样的
                isRepeat = depts.some(item => item.code === value && value)
            }
            isRepeat ? callback(new Error('组织架构中已有该编码')) : callback()
        }
        return{
            deptForm:{
                name: '', // 部门名称
                code: '', // 部门编码
                manager: '', // 部门管理者
                introduce: '' // 部门介绍
            },
            deptRules:{
                name:[
                    {required : true , trigger : 'blur' , message : '部门名称不能为空'},
                    {min : 1 , max : 50 , trigger : 'blur' , message : '部门名称长度在1-50个字符'},
                    {trigger : 'blur' , validator : checkNameRepeat }
                ],
                code:[
                    {required : true , trigger : 'blur' , message : '部门编码不能为空'},
                    {min : 1 , max : 50 , trigger : 'blur' , message : '部门编码长度在1-50个字符'},
                    {trigger : 'blur' , validator : checkCodeRepeat }
                ],
                manager:[
                    {required : true , trigger : 'blur' , message : '部门管理者不能为空'}
                ],
                introduce:[
                    {required : true , trigger : 'blur' , message : '部门介绍不能为空'},
                    {min : 1 , max : 50 , trigger : 'blur' , message : '部门介绍长度在1-300个字符'}
                ]
            },
            managerList:[]
        }
    },
    props:{
        isAddShow:{
            type:Boolean,
            required:true
        },
        treeNode:{
            type:Object,
            default:null
        }
    },
    computed:{
        showTitle(){
            return this.deptForm.id ? "编辑部门" : '新增子部门'
        }
    },
    methods: {
        // 关闭弹层
        closeAddShow(){
            // 重置数据
            this.deptForm= {
                name: '', 
                code: '', 
                manager: '', 
                introduce: ''
            }
            this.$emit('update:isAddShow',false) // 关闭弹层
            this.$refs.deptForm.resetFields()// 重置校验字段
        },
        // 点击确定事件
        addDept(){
            // 手动校验
            this.$refs.deptForm.validate(async (isOK) => {
                if(isOK){
                    if(this.deptForm.id){
                        // 有id，编辑部门，调修改接口
                        await editDepartments(this.deptForm)
                    }else{
                        // deptForm中没有id，新增子部门，调接口添加部门，给数据添加pid
                        await addDepartments({...this.deptForm,pid:this.treeNode.id})
                    }
                    
                    this.$emit('addDepts')//重新渲染
                    this.$emit('update:isAddShow',false) //关闭弹层
                }
            })
        },
        // 获取员工简单列表
        async getEmployeeSimple(){
            const res = await getEmployeeSimple()
            this.managerList = res
        },
        // 根据ID查询部门详情
        async getDepartDetail(id){
            this.deptForm = await getDepartDetail(id)
        }
    },
}
</script>

<style>

</style>