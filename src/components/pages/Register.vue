<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" :error-message="usernameErrorMsg" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required :error-message="passwordErrorMsg" />
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'

export default {
  data() {
    return {
      username: '',
      password: '',
      openLoading: false, //是否开启注册loading
      usernameErrorMsg: '', //用户名错误时的提示信息
      passwordErrorMsg: '', //密码错误时的提示信息
    }
  },
  methods: {
    registerAction() {
      this.checkForm() && this.axiosRegisterUser()
    },
    axiosRegisterUser() {
      this.openLoading = true

      this.$http({
          url: url.registerUser,
          method: 'post',
          data: {
            username: this.username,
            password: this.password,
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 200) {
            Toast.success(res.data.message)
            this.$router.push('/')
          } else {
            console.log(res.data.message)
            this.openLoading = false
            Toast.fail('注册失败')
          }
        })
        .catch(error => {
          console.log(error)
          Toast.fail('注册失败')
        })
    },
    // 表单验证
    checkForm() {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位"
        isOk = false;
      } else {
        this.usernameErrorMsg = ""
      }

      if (this.password.length < 6) {
        this.passwordErrorMsg = "用户名不能小于5位"
        isOk = false;
      } else {
        this.passwordErrorMsg = ""
      }

      return isOk
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}

</script>
<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}

.register-button {
  padding-top: 10px;
}

</style>
