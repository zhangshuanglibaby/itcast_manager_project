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
        <span>添加商品信息</span>
        <button @click="$router.push({name:'goods'})" style="position:relative;left:880px">
          返回上级
          <i class="el-icon-caret-top el-icon--right"></i>
        </button>
      </div>
      <el-form>
        <!-- 标签页 -->
        <el-tabs v-model="activeName2" tabPosition="left" :before-leave='beforeLeave' @tab-click='handleClick'>
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
              <el-cascader
                :options="cateList"
                change-on-select
                :props="cascaderProps"
                v-model="goodsForm.goods_cat"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-row v-for="item in attrValues" :key='item.attr_id' style="line-height:50px;">
  <el-col :span="2" style="font-size:14px">{{item.attr_name}}</el-col>
  <el-col :span="22">
    <el-checkbox-group v-model="item.attr_vals">
    <el-checkbox border :label="subitem" v-for="(subitem,index) in item.attr_vals" :key='index' style="margin:0px 3px 2px 0px" ></el-checkbox>
  </el-checkbox-group>
  </el-col>
</el-row>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
              <el-form-item :label="item.attr_name" v-for='item in staticAttr' :key='item.attr_id' label-width="80px" >
    <el-input v-model="item.attr_vals"></el-input>
  </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              :headers='setToken()'
              action="http://192.168.70.26:8888/api/private/v1/upload"
              :on-remove="handleRemove"
              :on-success="handelSucess"
              :file-list="fileList"
              :before-upload="beforeUpload"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="goodsForm.goods_introduce">
  </quill-editor>
          </el-tab-pane>
        </el-tabs>
        <!-- 按钮 -->
        <el-form-item style="margin-top:20px;margin-left:500px">
          <el-button @click="$router.push({name : 'goods'})">取 消</el-button>
          <el-button type="primary" @click="addGoods" v-show="sure === 0">确认</el-button>
          <el-button type="primary" v-show="sure === 1" @click="editGood">完成</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getAllCates } from '@/api/cate.js'
import { getAllParams } from '@/api/params.js'
import { addGoods, getGoodInfoById, editGood } from '@/api/goods.js'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
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
        pics: [],
        attrs: []
      },
      cateList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      fileList: [],
      attrValues: [],
      staticAttr: [],
      sure: 0

    }
  },
  components: {
    quillEditor
  },
  methods: {
    // 移出图片
    handleRemove (file) {
      if (!file.response) {
        return
      }
      // console.log(file)
      // let temp = file.response.data.tmp_path
      // for (let i = 0; i < this.goodsForm.pics.length; i++) {
      //   if (this.goodsForm.pics[i].pic === temp) {
      //     this.goodsForm.pics.splice(i, 1)
      //     break
      //   }
      // }
      let index = this.addForm.pics.findIndex(e => {
        return e.pic === file.response.data.tmp_path
      })
      this.addForm.pics.splice(index, 1)
    },
    // 设置token
    setToken () {
      let mytoken = localStorage.getItem('itcast_manger')
      return { Authorization: mytoken }
    },
    // 离开标签页时触发
    beforeLeave (activeName, oldActiveName) {
      // console.log(activeName, oldActiveName)
      // console.log(this.goodsForm.goods_cat)
      if (activeName === '1' || activeName === '2') {
        // 再检测是否有选择商品分类
        if (this.goodsForm.goods_cat.length !== 3) {
          this.$message.warning('请先选择商品分类')
          this.activeName2 = '0'
          // 阻止下一步操作
          return false
        }
      }
    },
    // 点击标签页触发
    async  handleClick () {
      if (this.activeName2 === '1') {
        let res = await getAllParams(this.goodsForm.goods_cat[2], 'many')
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.attrValues = res.data.data
        }
        // 将attrValues的attr_vals把字符串转成数组
        for (let i = 0; i < this.attrValues.length; i++) {
          this.attrValues[i].attr_vals = this.attrValues[i].attr_vals.split(',')
          // console.log(this.attrValues[i].attr_vals)
        }
      } else if (this.activeName2 === '2') {
        let res2 = await getAllParams(this.goodsForm.goods_cat[2], 'only')
        // console.log(res2)
        if (res2.data.meta.status === 200) {
          this.staticAttr = res2.data.data
        }
      }
    },
    // 图片上传成功触发
    handelSucess (res) {
      // console.log(res)
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
        this.goodsForm.pics.push({ pic: res.data.tmp_path })
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    // 上传图片先检测图片格式是否规范
    beforeUpload (file) {
      // console.log(file)
      if (!file.type.startsWith('image/')) {
        this.$message.warning('请选择满足要求格式的图片,如png, jpg, jpeg')
        // 取消当前操作,会触发handleremove
        return false
      }
    },
    // 添加商品
    async addGoods () {
      this.goodsForm.goods_cat = this.goodsForm.goods_cat.join(',')
      try {
        let res = await addGoods(this.goodsForm)
        console.log(this.goodsForm)
        // console.log(res)
        if (res.data.meta.status === 201) {
          this.$message.success(res.data.meta.msg)
          this.$router.push({ name: 'goods' })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑提交商品
    async editGood () {
      this.goodsForm.goods_cat = this.goodsForm.goods_cat.join(',')
      let res = await editGood(this.goodsForm.goods_id, this.goodsForm)
      // console.log(this.goodsForm)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success('编辑成功')
        this.$router.push({ name: 'goods' })
      } else {
        this.$message.error('编辑失败')
      }
    }
  },
  mounted () {
    // 获取商品分类列表数据
    getAllCates(3).then(res => {
      console.log(res)
      if (res.data.meta.status === 200) {
        this.cateList = res.data.data
      }
    })

    // 判断路由是否有带参数,有则是编辑
    // console.log(this.$route.params)
    this.goodsForm.id = this.$route.params.id
    if (this.goodsForm.id) {
      getGoodInfoById(this.goodsForm.id)
        .then(res => {
          this.sure = 1
          console.log(res)
          if (res.data.meta.status === 200) {
            // this.goodsForm.goods_id = res.data.data.goods_id
            // this.goodsForm.goods_name = res.data.data.goods_name
            // this.goodsForm.goods_price = res.data.data.goods_price
            // this.goodsForm.goods_number = res.data.data.goods_number
            // this.goodsForm.goods_weight = res.data.data.goods_weight
            // this.goodsForm.goods_introduce = res.data.data.goods_introduce
            this.goodsForm = res.data.data
            this.goodsForm.goods_cat = this.goodsForm.goods_cat.split(',').map(e => { return e - 0 })
          }
        })
        .catch(() => {
          this.$message.error('服务器异常')
        })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
