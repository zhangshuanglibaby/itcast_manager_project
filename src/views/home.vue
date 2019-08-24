<template>
  <div class="home">
    <el-container >
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened ="true"
          default-active="2"
          class="el-menu-vertical-demo"
          text-color="#0e141a"
          active-text-color="#6d96be"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <i class="el-icon-menu"></i>用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>选项3
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>选项3
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>选项3
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <p>电商后台管理系统</p>
          <a href="javascript">退出</a>
        </el-header>
        <el-main>
          <!-- 添加路由展示区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
 background-color:rgb(235, 235, 235);
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color:#fff;
    border-right: 1px solid #eee;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:rgb(214, 235, 238);
    border-bottom: 1px solid #eee;
    p {
      font-size: 36px;
      color: #4d5053
    }
    a {
      color: orange;
      text-decoration: underline;
    }
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color:#fff;
    border-bottom: 1px solid #eee;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color:whitesmoke;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color:gray;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: white;
  }
}
</style>
