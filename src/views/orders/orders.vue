<template>
  <div class="orders">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'goods'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'orders'}">订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索按钮 + 测试订单按钮 -->
    <el-input
      placeholder="请输入内容"
      v-model="ordersObj.query"
      class="input-with-select"
      style="width:300px;margin-right:10px"
      @keydown.native.enter='init'
    >
      <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
    </el-input>
    <el-button type="success" plain>测试订单</el-button>
    <!-- 表格 -->
    <el-table :data="ordersData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="260"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="80"></el-table-column>
      <el-table-column prop="user_id" label="下单用户" width="80"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="80">
        <template slot-scope="scope">
          {{scope.row.order_pay | payFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="80"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">
          {{scope.row.create_time | timeFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            plain
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="ordersObj.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="ordersObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getAllOrdersList } from '@/api/orders.js'
import { timeFormat, payFormat } from '@/tools/userFilters.js'
export default {
  data () {
    return {
      ordersData: [],
      ordersObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    }
  },
  methods: {
    // 获取订单数据列表
    async init () {
      let res = await getAllOrdersList(this.ordersObj)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.ordersData = res.data.data.goods
        this.total = res.data.data.total
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.ordersObj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.ordersObj.pagenum = val
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  // 注册过滤器
  filters: {
    payFormat, timeFormat
  }
}
</script>
<style lang="less" scoped>
</style>
