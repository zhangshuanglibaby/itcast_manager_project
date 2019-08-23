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
      <el-input placeholder="请输入搜索内容" v-model="usersObj.query" style="width : 300px" @input.native="init()">
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain style="margin-left:10px">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="usersList" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 用户状态 -->
      <template>
        <el-table-column prop="mg_state" label="用户状态">
          <el-switch active-color="#13ce66" inactive-color="#d7dce5" v-model="status"></el-switch>
        </el-table-column>
      </template>
      <!-- 操作 -->
      <template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button
              size="mini"
              plain
              type="warning"
              @click="handleCheck(scope.$index, scope.row)"
            >
              <i class="el-icon-check"></i>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
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
import { getAllUsers } from '@/api/users.js'
export default {
  data () {
    return {
      total: 0,
      status: true,
      usersList: [],
      usersObj: {
        query: '',
        pagenum: 1,
        pagesize: 3
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleCheck (index, row) {
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
    init () {
      getAllUsers(this.usersObj)
        .then(res => {
          if (res.data.meta.status === 200) {
            console.log(res)
            this.usersList = res.data.data.users
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  // 使用mounted钩子函数,在组件加载完毕时就获取数据
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
