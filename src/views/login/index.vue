<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <img src="@/assets/login/logo.png" class="login-logo">

      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="phone" />
        </span>
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="请输入用户名"
          name="loginName"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="lock" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="code">
        <el-row>
          <el-col :span="17">
            <span class="svg-container">
              <svg-icon icon-class="security, protection, shield" />
            </span>
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="请输入验证码"
              name="code"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-col>
          <el-col :span="7">
            <img
              :src="src"
              alt=""
              @click="getNewImgCode"
            >
          </el-col>
        </el-row>
      </el-form-item>

      <el-button
        :loading="loading"
        class="login-btn"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="login"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { getImgCode, login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: ''
      },
      loginRules: {
        loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      passwordType: 'password',
      clientToken: Math.random(),
      src: '',
      loading: false,
      codeRight: ''
    }
  },
  created() {
    this.getImgCode()
  },
  methods: {
    // 密码显示隐藏转换
    showPwd() {
      this.passwordType === 'password'
        ? (this.passwordType = '')
        : (this.passwordType = 'password')
      this.$refs.password.focus()
    },
    // 获取验证码
    async getImgCode() {
      const res = await getImgCode(this.clientToken)
      // console.log(res)
      this.src = res.config.url
    },
    // 登录
    async login() {
      try {
        this.$refs.loginForm.validate()
        this.loading = true
        const data = {
          loginName: this.loginForm.loginName,
          password: this.loginForm.password,
          code: this.loginForm.code,
          loginType: 0,
          clientToken: this.clientToken
        }
        const res = await login(data)
        console.log(res)
        this.$store.commit('user/setToken', res.data.token)
        this.codeRight = res.data.success
        if (this.codeRight) {
          // console.log(res)
          this.$message.success(res.data.msg)
          this.$router.push('/')
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 刷新验证码
    getNewImgCode() {
      this.clientToken = Math.random()
      this.getImgCode()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: url("~@/assets/login/background.png");
  background-repeat: no-repeat;
  background-size: cover;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    max-width: 100%;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    background-color: #fff;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .login-logo {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
  }

  .login-btn {
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg, #2e50e1, #6878f0);
    opacity: 0.91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
