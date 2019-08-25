<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索和添加 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入搜索内容"
        v-model="usersObj.query"
        style="width : 300px"
        @input.native="init()"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        style="margin-left:10px"
        @click="addDialogFormVisible=true"
      >添加用户</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="usersList" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 用户状区域 -->
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" inactive-color="#d7dce5" v-model="scope.row.mg_state" @change="userStatus(scope.row.id,scope.row.mg_state)"></el-switch>
        </template>
      </el-table-column>
      <!-- 操作区域 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" @click="showEditUserInfo(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button size="mini" plain type="warning" @click="showGrantRole(scope.row)">
            <i class="el-icon-check"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addUserForm" :label-width="'80px'" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :label-width="'80px'" :rules="rules" ref="editForm">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" auto-complete="off" style="width:100px" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
      <el-form :model="grantForm" :label-width="'80px'">
        <el-form-item label="用户名:">
          <el-input v-model="grantForm.username" auto-complete="off" style="width:100px" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="grantForm.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRole">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="usersObj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="usersObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getAllUsers, addUser, editUser, grantRole, changeUserStatus } from '@/api/users.js'
import { getAllRoles } from '@/api/roles.js'
export default {
  data () {
    return {
      total: 0,
      // status: true,
      usersList: [],
      usersObj: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      addDialogFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户的验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            required: true,
            message: '请输入正确的手机',
            trigger: 'blur'
          }
        ]
      },
      editDialogFormVisible: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      grantDialogFormVisible: false,
      rolesList: [],
      grantForm: {
        username: '',
        id: '',
        rid: ''
      }
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      // 当每页显示数量改变就会触发
      this.usersObj.pagesize = val
      // 重新调用获取数据的方法
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 当前页面触发就会触发
      this.usersObj.pagenum = val
      this.init()
    },
    // 获取用户数据列表方法
    init () {
      getAllUsers(this.usersObj)
        .then(res => {
          if (res.data.meta.status === 200) {
            // console.log(res)
            this.usersList = res.data.data.users
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 添加用户方法
    addUser (formName) {
      // 进行2次验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUser(this.addUserForm)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
                this.addDialogFormVisible = false
                // 清空表格
                this.$refs[formName].resetFields()
                // 刷新数据
                this.init()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(() => {
              this.$message.error('添加用户失败')
            })
        } else {
          this.$message.error('请填写所必须的信息')
        }
      })
    },
    // 编辑的数据默认展示
    showEditUserInfo (row) {
      this.editDialogFormVisible = true
      // console.log(row)
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      this.editForm.id = row.id
    },
    // 编辑用户提交
    editUser (formName) {
      // 进行二次验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          editUser(this.editForm).then(res => {
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.editDialogFormVisible = false
              // 刷新数据
              this.init()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
        } else {
          this.$message.error('请正确填写信息')
        }
      })
    },
    // 分配角色数据默认展示
    showGrantRole (row) {
      // console.log(row)
      this.grantDialogFormVisible = true
      this.grantForm.username = row.username
      this.grantForm.rid = row.rid
      this.grantForm.id = row.id
    },
    // 分配角色
    grantRole () {
      // 由于角色名不能为空,在确定前先检测角色名
      if (this.grantForm.rid) {
        grantRole(this.grantForm)
          .then(res => {
            // console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.grantDialogFormVisible = false
              // 刷新数据
              this.init()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
          .catch(() => {
            this.$message.error('分配角色失败')
          })
      } else {
        this.$message.error('请选择角色名')
      }
    },
    // 修改用户状态
    userStatus (id, type) {
      changeUserStatus(id, type)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            // 刷新
            this.init()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(() => {
          this.$message.error('修改用户状态失败')
        })
    }
  },
  // 使用mounted钩子函数,在组件加载完毕时就获取数据
  mounted () {
    this.init()
    // 一开始就加载完毕就获取角色列表数据
    getAllRoles()
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.rolesList = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
</style>
