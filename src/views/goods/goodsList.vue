<template>
  <div class="goodList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框+按钮 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入搜索内容"
        v-model="goodsObj.query"
        class="input-with-select"
        style="width:300px;margin-right:10px"
        @input.native="init()"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain>添加商品</el-button>
    </div>
    <!-- 表格明细 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" label="编号" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="450"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="80"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="200">
        <template slot-scope="scope">
          {{scope.row.add_time | timeFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
            type="primary"
            plain
          ></el-button>
          <el-button size="mini" icon="el-icon-check" type="warning" plain></el-button>
          <el-button
            size="mini"
            type="danger"
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
      :current-page="goodsObj.pagenum"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="goodsObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { getAllGoods } from '@/api/goods.js'
import { timeFormat } from '@/tools/userFilters.js'
export default {
  data () {
    return {
      goodsObj: {
        query: '',
        pagenum: 1,
        pagesize: 50
      },
      goodsList: [],
      total: 0
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      this.goodsObj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.goodsObj.pagenum = val
      this.init()
    },
    // 获取商品管理的所有商品列表数据
    init () {
      getAllGoods(this.goodsObj).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.goodsList = res.data.data.goods
          this.total = res.data.data.total
        } else {
          console.log(res.data.meta.msg)
        }
      })
    }
  },
  filters: {
    timeFormat
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
