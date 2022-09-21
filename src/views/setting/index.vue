<template>
    <div>
        <div class="dashboard-container">
            <div class="app-container">
                <el-card>
                    <el-tabs>
                        <el-tab-pane label="角色管理">
                             <!-- 新增角色按钮 -->
                             <el-row style="height: 60px;">
                                <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增角色</el-button>
                             </el-row>
                             <!-- 表格 -->
                             <el-table border="" :data="list">
                                <el-table-column type="index" label="序号" width="120"></el-table-column>
                                <el-table-column prop="name" label="角色名称" width="240"></el-table-column>
                                <el-table-column prop="description" label="描述"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="{ row }"> 
                                        <el-button size="small" type="success">分配权限</el-button>
                                        <el-button size="small" type="primary" @click="editRoleShow(row.id)">编辑</el-button>
                                        <el-button size="small" type="danger" @click="delBtn(row.id)">删除</el-button>
                                    </template>
                                </el-table-column>
                             </el-table>
                             <el-row type="flex" justify="center" align="middle" style="height:60px ;">
                                <el-pagination 
                                    layout="prev, pager, next" 
                                    :total="page.total" 
                                    :page-size="page.pagesize" 
                                    :current-page="page.page"
                                    @current-change="changePage"
                                />
                             </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="公司信息">
                            <el-alert
                                title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
                                type="info"
                                show-icon
                                :closable="false"
                            />
                            <el-form label-width="120px" style="margin-top:50px">
                                <el-form-item label="公司名称">
                                    <el-input disabled style="width:400px" v-model="companyInfo.name" />
                                </el-form-item >
                                <el-form-item label="公司地址">
                                    <el-input disabled style="width:400px" v-model="companyInfo.companyAddress"/>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <el-input disabled style="width:400px" v-model="companyInfo.mailbox"/>
                                </el-form-item>
                                <el-form-item label="备注">
                                    <el-input type="textarea" disabled style="width:400px" v-model="companyInfo.remarks"/>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </div>
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                @close="handleClose"
            >
                <el-form label-width="120px" :model="roleForm" :rules="rules" ref="roleForm">
                    <el-form-item label="角色名称" style="width: 600px;" prop="name">
                        <el-input v-model="roleForm.name"/>
                    </el-form-item>
                    <el-form-item label="角色描述" style="width: 600px;">
                        <el-input v-model="roleForm.description"/>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-row type="flex" justify="center">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="btnok">确 定</el-button>
                    </el-row>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getRoleList ,getCompanyInfo ,delRole ,getRole , editRole ,addRole } from '@/api/setting'
import store from '@/store'
export default {
    data(){
        return{
            list:[],
            page:{
                page:1,
                pagesize:10,
                total:0
            },
            // 公司信息
            companyInfo:{
                name:'',
                companyAddress:'',
                mailbox:'',
                remarks:''
            },
            dialogVisible:false,
            // 表单数据
            roleForm:{
                name:'',
                description:''
            },
            rules:{
                name:[
                    { required : true , trigger: 'blur' , message : '角色名称不能为空'}
                ]
            }
        }
    },
    computed:{
        dialogTitle() {
            return this.roleForm.id ? '编辑部门' : '新增部门'
        }
    },
    created(){
        this.getRoleList()
        this.getCompanyInfo()
    },
    methods:{
        // 获取角色数据
        async getRoleList(){
            const { total , rows } = await getRoleList(this.page)
            this.page.total = total
            this.list = rows
        },
        // 分页器方法
        changePage(newpage){
            this.page.page = newpage
            // 重新拉取数据
            this.getRoleList()
        },
        // 获取公司信息
        async getCompanyInfo(){
            this.companyInfo = await getCompanyInfo(store.getters.companyId)
        },
        // 删除按钮
        async delBtn(id){
            try {
                await this.$confirm('确认删除该角色吗')
                await delRole(id) // 调接口删除
                this.getRoleList() // 重新拉取数据
                this.$message.success('删除部门成功！')
            } catch (error) {
                console.log(error);   
            }
        },
        // 编辑按钮
        async editRoleShow(id){
            this.roleForm = await getRole(id) // 填充数据
            this.dialogVisible = true // 打开弹层

        },
        handleClose(){
            this.roleForm = {
                name: '',
                description: ''
            }
            // 移除校验
            this.$refs.roleForm.resetFields()
            this.dialogVisible = false // 关闭弹层
        },
        // 点击确定按钮
        async btnok(){
            try {
                // 手动表单验证
                await this.$refs.roleForm.validate()
                // 判断是否有id
                if(this.roleForm.id){
                    // 执行更新操作
                    await editRole(this.roleForm)
                    this.$message.success('更新数据成功')
                }else{
                    // 执行新增操作
                    await addRole(this.roleForm)
                    this.$message.success('新增数据成功')
                }
                this.getRoleList() // 重新拉取数据
                this.dialogVisible = false // 关闭弹层
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>