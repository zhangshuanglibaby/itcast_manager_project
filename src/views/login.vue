<template>
  <div class="login">
    <div class="container">
      <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
    >
    <img src="../assets/img1.png" alt="" class="avatar">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <i slot="prefix" class="myicon myicon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
          <i slot="prefix" class="myicon myicon-key"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="onlogin('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
// 引入登录验证的方法
import { login } from '@/api/login.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          // required：必须的 message：不满足规则的提示信息  tigger:什么时候触发
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onlogin (formName) {
      // console.log(this.$refs)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果是在正确填写信息后,要发送请求进行账户的检验
          // 要在本地储存一个token值,设置状态保持
          login(this.loginForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                // 设置状态保持
                localStorage.setItem('itcast_manger', res.data.data.token)
                // 在成功登录状态下跳转页面
                this.$router.push({ name: 'home' })
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(() => {
              this.$message.error('服务器异常,请稍后重试')
            })
        } else {
          this.$message({
            message: '请正确填写信息',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background :url('../assets/img2.png')
}
.container {
  position: absolute;
  left: 0;
  right: 0;
  width: 400px;
  margin: 200px auto;
  background-color: rgba(0, 0, 0, .1);
  padding: 0px 40px 15px 40px
}
.avatar {
  position: relative;
  left: 50%;
  border-radius: 50%;
  margin-left: -60px;
  margin-top: -60px;
  margin-bottom: 20px;
  width: 120px;
  height: 120px;
  border: 10px solid #fff;
  box-shadow: 0 1px 5px #ccc;
  overflow: hidden;
}
.login-btn {
  width: 100%;
}
</style>
