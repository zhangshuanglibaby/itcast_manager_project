<template>
  <div class="addGood">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="activeName2 - 0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 为了能进行二次验证,添加表单为大盒子 -->
    <el-card class="box-card" style="margin-top:5px;background:#ebebeb">
      <div slot="header" class="clearfix">
        <span>添加商品信息</span><button @click="$router.push({name:'goods'})" style="position:relative;left:880px">返回上级<i class="el-icon-caret-top el-icon--right"></i></button>
      </div>
      <el-form>
        <!-- 标签页 -->
        <el-tabs v-model="activeName2" tabPosition="left">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" label-width="80px">
              <el-input v-model="goodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" label-width="80px">
              <el-input v-model="goodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" label-width="80px">
              <el-input v-model="goodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" label-width="80px">
              <el-input v-model="goodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" label-width="80px">
              <el-cascader :options="cateList" change-on-select :props="cascaderProps" v-model="goodsForm.goods_cat"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">定时任务补偿</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
        <!-- 按钮 -->
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getAllCates } from '@/api/cate.js'
export default {
  data () {
    return {
      activeName2: '0',
      goodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      cateList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  mounted () {
    getAllCates()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.cateList = res.data.data
        }
      })
  }
}
</script>
<style lang="less" scoped>
</style>
