<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <div class="login-panel">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" :error-message="usernameErrorMsg" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required :error-message="passwordErrorMsg" />
      <div class="login-button">
        <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">马上登录</van-button>
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
      openLoading: false, //是否开启登录loading
      usernameErrorMsg: '', //用户名错误时的提示信息
      passwordErrorMsg: '', //密码错误时的提示信息
    }
  },
  created(){
  	if(localStorage.userInfo){
  		Toast.success('已登录')
  		this.$router.push('/')
  	}
  },
  methods: {
    loginAction() {
      this.checkForm() && this.axiosloginUser()
    },
    axiosloginUser() {
      this.openLoading = true

      this.$http({
          url: url.loginUser,
          method: 'post',
          data: {
            username: this.username,
            password: this.password,
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code = 200 && res.data.message) {
            // Toast.success('登录成功')
            // this.$router.push('/')
            new Promise((resolve,reject)=>{
            	localStorage.userInfo = {username:this.username}
            	setTimeout(()=>{
            		resolve()
            	},500)
            }).then(()=>{
            	Toast.success('登录成功')
            	this.$router.push('/')
            }).catch(err=>{
            	Toast.fail('登录状态保存失败')
            	console.log(err)
            })
          } else {
            Toast.fail('登录失败')
            this.openLoading = false
          }
        })
        .catch(error => {
          console.log(error)
          Toast.fail('登录失败')
          this.openLoading = false
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
.login-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}

.login-button {
  padding-top: 10px;
}

</style>
