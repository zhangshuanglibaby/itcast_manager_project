<template>
  <div class="rights">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限表格明细 -->
    <el-table :data="rightsList" border style="width: 100%" align="center">
      <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="250" align="center"></el-table-column>
      <el-table-column prop="path" label="路径" width="250" align="center"></el-table-column>
      <el-table-column prop="level" label="层级" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.level | levelFormat}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 引入请求接口
import { getAllrights } from '@/api/rights.js'

export default {
  data () {
    return {
      rightsList: []
    }
  },
  mounted () {
    // 一开始就获取所有权限数据
    getAllrights('list')
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.rightsList = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(() => {
        this.$message.error('获取数据失败')
      })
  },
  // 添加过滤器
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
