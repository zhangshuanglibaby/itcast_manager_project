<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button
      type="primary"
      style="margin-bottom:10px"
      @click="showAddRoleDialog=addRoleDialogFormVisible=true"
    >添加角色</el-button>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleDialogFormVisible">
      <el-form :model="addRoleform" :label-width="'80px'" :rules="rules" ref="addRoleform">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
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
                    @close="cnt=0;delRoleRight(props.row,val3.id)"
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
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-setting"
            @click="showGrantdDialog(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色授权对话框 -->
    <el-dialog title="角色授权" :visible.sync="grantRoleRightDialogVisible" width="40%">
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="grantRoleRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRoleRight(roleId)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllRoles,
  delRoleRightbyId,
  addRole,
  grantRoleRightById
} from '@/api/roles.js'
import { getAllrights } from '@/api/rights.js'
export default {
  data () {
    return {
      // 先用一个变量保存需要用到的角色id
      roleId: '',
      cnt: 0,
      rolesList: [],
      addRoleDialogFormVisible: false,
      addRoleform: {
        roleName: '',
        roleDesc: ''
      },
      grantRoleRightDialogVisible: false,
      rightsList: [],
      // 默认选中的节点
      checkedArr: [],
      defaultProps: {
        label: 'authName', // 节点展示的文本属性
        children: 'children' // 节点的下级数据
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
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
            // console.log(this.rolesList)
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
      // console.log(row)
      delRoleRightbyId(row.id, rightid)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            if (this.cnt === 0) {
              this.$message.success(res.data.meta.msg)
              this.cnt++
            }
            // 需要重置roleList内容达到刷新
            row.children = res.data.data
            row.children.forEach(e1 => {
              if (e1.children.length === 0) {
                this.delRoleRight(row, e1.id)
              } else {
                // 继续遍历第二层
                e1.children.forEach(e2 => {
                  if (e2.children.length === 0) {
                    this.delRoleRight(row, e2.id)
                  }
                })
              }
            })
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
      this.$refs.addRoleform.validate(valid => {
        if (valid) {
          addRole(this.addRoleform)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
                this.addRoleDialogFormVisible = false
                // 需要刷新
                this.init()
                // 需清空表单
                this.$refs.addRoleform.resetFields()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(() => {
              this.$message.error('添加角色失败')
            })
        } else {
          return false
        }
      })
    },
    // 获取角色默认权限
    showGrantdDialog (row) {
      this.grantRoleRightDialogVisible = true
      // console.log(row)
      // 这里进行给角色id赋值,后期需要使用
      this.roleId = row.id
      this.rightsList = [...this.rightsList]
      this.checkedArr.length = 0
      // 获取最下级的权限id,最好先检测
      row.children.forEach(e1 => {
        if (e1.children.length > 0) {
          e1.children.forEach(e2 => {
            if (e2.children.length > 0) {
              // console.log(e2.children)
              e2.children.forEach(e3 => {
                this.checkedArr.push(e3.id)
              })
            }
          })
        }
      })
    },
    // 实现给指定的角色授权
    async grantRoleRight (roleId) {
      // 需要获取权限的id,由于展示的权限是基于上一层的,所以需要获取1、2、3共3层的权限id
      // console.log(this.$refs.tree.getCheckedKeys())
      // console.log(this.$refs.tree.getCheckedNodes()) //[{id:131,pid:"110,125"},{id:132,pid:"110,125"}]
      // let arr = this.$refs.tree.getCheckedNodes()
      // let temp = []
      // 遍历数组进行拼接
      // arr.forEach(e => {
      //   temp.push(e.id + ',' + e.pid)
      // })
      // console.log(temp) // ["131,110,125","132,110,125"]
      // 把temp数组的每个元素独立分开后,又转成数组
      // temp = temp.join(',').split(',')
      // console.log(temp) //131,110,125,132,110,125  =>  ["131","110","125","132","110","125"]
      // 利用数组的去重方法
      // temp = [...new Set(temp)]
      // console.log(temp) //["131","110","125","132"]
      // 传参需要传递temp用join分割的字符串
      // let res = await grantRoleRightById(roleId, temp.join(','))
      // console.log(res)
      // if (res.data.meta.status === 200) {
      //   this.grantRoleRightDialogVisible = false
      //   this.$message.success(res.data.meta.msg)
      //   // 需要刷新
      //   this.init()
      // } else {
      //   this.$message.success(res.data.meta.msg)
      // }

      /** **************************************** */
      // 这是另一种方法
      // console.log(this.$refs.tree.getHalfCheckedKeys())  //获取1，2层的权限id
      // console.log(this.$refs.tree.getCheckedKeys()) //获取第3层的权限id
      let arr = [
        ...this.$refs.tree.getHalfCheckedKeys(),
        ...this.$refs.tree.getCheckedKeys()
      ]
      let res = await grantRoleRightById(roleId, arr.join(','))
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.grantRoleRightDialogVisible = false
        this.$message.success(res.data.meta.msg)
        this.init()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    }
  },
  mounted () {
    // 获取所有角色
    this.init()
    // 获取所有权限
    getAllrights('tree')
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.rightsList = res.data.data
          // console.log(this.rightsList)
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(() => {
        this.$message.error('服务器异常')
      })
  }
}
</script>
<style lang="less" scoped>
</style>
