<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="primary" style="margin-bottom:10px" @click="showAddRoleDialog=addRoleDialogFormVisible=true">添加角色</el-button>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleDialogFormVisible">
      <el-form :model="addRoleform" :label-width="'80px'">
        <el-form-item label="角色名称" >
          <el-input v-model="addRoleform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" >
          <el-input v-model="addRoleform.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色表格 -->
    <el-table :data="rolesList" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row
            v-for="val1 in props.row.children"
            :key="val1.id"
            style="margin-bottom:15px;border-bottom:1px solid #eee"
          >
            <el-col :span="4">
              <el-tag
                closable
                type="success"
                @close="delRoleRight(props.row,val1.id)"
              >{{val1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="val2 in val1.children" :key="val2.id" style="margin-bottom:10px">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="info"
                    @close="delRoleRight(props.row,val2.id)"
                  >{{val2.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    v-for="val3 in val2.children"
                    :key="val3.id"
                    type="warning"
                    style="margin-right:8px;margin-bottom:5px"
                    @close="delRoleRight(props.row,val3.id)"
                  >{{val3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-show="props.row.children.length === 0">
            <el-col :span="24">该角色还没有分配权限呢！！！</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="350"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="350"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
            <i class="el-icon-setting"></i>
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRoles, delRoleRightbyId, addRole } from '@/api/roles.js'
export default {
  data () {
    return {
      rolesList: [],
      addRoleDialogFormVisible: false,
      addRoleform: {
        roleName: '',
        roleDesc: ''
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
    // 封装获取所有角色数据
    init () {
      getAllRoles()
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.rolesList = res.data.data
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(() => {
          this.$message.error('数据获取失败')
        })
    },
    // 删除角色指定权限
    delRoleRight (row, rightid) {
      delRoleRightbyId(row.id, rightid)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            // 需要重置roleList内容达到刷新
            row.children = res.data.data
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(() => {
          this.$message.error('删除失败')
        })
    },
    // 添加角色
    addRole () {
      addRole(this.addRoleform)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success(res.data.meta.msg)
            this.addRoleDialogFormVisible = false
            // 需要刷新
            this.init()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(() => {
          this.$message.error('添加角色失败')
        })
    }
  },
  mounted () {
    // 获取所有角色
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
