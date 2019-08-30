<template>
  <div class="reports">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 折线图 -->
    <v-chart :options='reportsList'></v-chart>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import { getReports } from '@/api/reports.js'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      reportsList: {}
    }
  },
  mounted () {
    getReports(1)
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.reportsList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.reports {
  width: 100%;
  height: 100%;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>
