<template>
  <div class="params">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path : 'goods'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path : 'params'}">商品参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 级联选择器 -->
    <el-cascader
      :options="cateList"
      :props="cascaderProps"
      :show-all-levels="false"
      v-model="catId"
      @change="handleChange"
    ></el-cascader>
    <!-- 标签页 -->
    <el-tabs type="border-card">
      <el-tab-pane label="动态参数">
        <!-- 添加按钮 -->
        <el-button type="success" plain size="small" @click="addParamsDialogFormVisible=true">添加参数名称</el-button>
      </el-tab-pane>
      <el-table :data="cateData" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-tag
                :key="item.cat_id"
                v-for="item in props.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{item}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                style="width:100px"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(props.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="attr_name" label="商品参数" width="350"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showEditParamsDialog(scope.row)"
              icon="el-icon-edit"
              type="primary"
              plain
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delParams(scope.row)"
              icon="el-icon-delete"
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-tab-pane label="静态参数">配置管理</el-tab-pane>
    </el-tabs>
    <!-- 编辑参数对话框 -->
    <el-dialog title="编辑参数名称" :visible.sync="editParamsDialogFormVisible">
      <el-form :model="editForm" :label-width="'80px'" :rules="rules">
        <el-form-item label="参数名称" prop="editParamsName">
          <el-input v-model="editForm.editParamsName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editParamsDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加参数名称对话窗 -->
    <el-dialog title="添加参数名称" :visible.sync="addParamsDialogFormVisible">
      <el-form :model="addParamsObj" :label-width="'80px'" :rules="rules">
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="addParamsObj.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addParamsDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { getAllCates } from '@/api/cate.js'
import {
  getAllParams,
  addParams,
  editParams,
  delParams
} from '@/api/params.js'
export default {
  data () {
    return {
      cateList: [],
      cascaderProps: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      catId: [1, 4, 24],
      cateData: [],
      inputVisible: false,
      inputValue: '',
      editForm: {
        editParamsName: '',
        id: '', // 分类id
        attr_id: '' // 属性id
      },
      rules: {
        editParamsName: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ],
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      editParamsDialogFormVisible: false,
      addParamsObj: {
        attr_name: '',
        attr_sel: 'only',
        attr_vals: ''
      },
      addParamsDialogFormVisible: false
    }
  },
  methods: {
    async handleChange (obj) {
      let res = await getAllParams(obj[2], 'many')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.cateData = res.data.data
        this.cateData.forEach(e => {
          e.attr_vals = e.attr_vals.split(',')
        })
      } else {
        this.$message.error(res.data.meta.msg)
      }
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm (row) {
      // console.log(this.cateData)
      // console.log(row)
      let inputValue = this.inputValue
      if (inputValue) {
        row.attr_vals.push(inputValue)
        // let res = await editParams(row.cat_id, row.attr_id)
        // console.log(res)
        this.cateData.forEach(e => {
          e.attr_vals = row.attr_vals
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 编辑参数名的默认数据展示
    showEditParamsDialog (row) {
      this.editParamsDialogFormVisible = true
      console.log(row)
      this.editForm.editParamsName = row.attr_name
      this.editForm.id = row.cat_id
      this.editForm.attr_id = row.attr_id
    },
    // 编辑参数名的提交
    async editParams () {
      let res = await editParams(this.editForm.id, this.editForm.attr_id)
      console.log(res)
      this.editParamsDialogFormVisible = false
    },
    // 删除参数名
    async delParams (row) {
      console.log(row)
      let res = await delParams(row.cat_id, row.attr_id)
      console.log(res)
    },
    // 添加参数名
    async  addParams () {
      let res = await addParams(this.catId[2], this.addParamsObj)
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message.success(res.data.meta.msg)
        this.addParamsDialogFormVisible = false
        this.cateData.push(res.data.data)
      }
    }
  },
  mounted () {
    this.$axios({
      url: 'categories',
      params: { type: 3 }
    }).then(res => {
      console.log(res)
      if (res.data.meta.status === 200) {
        this.cateList = res.data.data
      } else {
        this.$message.error(res.data.meta.msg)
      }
    })
    // getAllParams(this.catId[2], 'many').then(res => {
    //   console.log(res)
    //   if (res.data.meta.status === 200) {
    //     this.cateData = res.data.data
    //     this.cateData.forEach(e => {
    //       e.attr_vals = e.attr_vals.split(',')
    //     })
    //   } else {
    //     this.$message.error(res.data.meta.msg)
    //   }
    // })
    this.handleChange(this.catId)
  }
}
</script>
<style lang="less" scoped>
</style>
