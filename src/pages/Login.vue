<template>
  <div class="wrap">
    <div class="Login">
      <div class="MarginB_20"><h2 class="ColorWhite" style="letter-spacing: .34em;">用户登陆</h2></div>
      <el-form :model="Form" :rules="rules" ref="Form" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="accountName">
          <el-input v-model="Form.accountName" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="accountPsd">
          <el-input v-model="Form.accountPsd" type="password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-button type="primary" :loading="btLoading" class="bt" @click="Login('Form')">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import {setCookie} from '../util/utils'
import CryptoJS from 'crypto-js'
export default {
  name: 'Login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePsd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      btLoading: false,
      realCode: '', // 随机验证码
      Form: {
        accountName: '', // 高健 test
        accountPsd: '' // 1 123
      },
      rules: {
        accountName: [
          { validator: validateName, trigger: 'change' }
        ],
        accountPsd: [
          { validator: validatePsd, trigger: 'change' }
        ]
      }

    }
  },
  computed: {
    // ...mapState({
    //   // btLoading: state => state.btLoading
    // })
  },
  created () {
    this.changeSiderIdx('0')
    this.changePath('Login')
  },
  methods: {
    ...mapActions([
      'updateUserInfo',
      'changeSiderIdx',
      'changePath'
    ]),
    Login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureLogin()
        } else {
          this.$message({
            message: '请将信息填写完整!',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 登陆
    sureLogin () {
      this.btLoading = true
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<ja_login xmlns="http://tempuri.org/">'
      tmpData += '<fuserno>' + this.Form.accountName + '</fuserno>'
      tmpData += '<fuserpsw>' + this.Form.accountPsd + '</fuserpsw>'
      tmpData += '</ja_login>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('ja_login', tmpData
      ).then(res => {
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.ja_loginResponse.ja_loginResult
        let Info = JSON.parse(Result)
        console.log(Info)
        switch (Info.status) {
          case '1':
            let cookieStr = CryptoJS.HmacSHA256((this.Form.accountName + this.Form.accountPsd).toString(), '18a808c40bba58c2c')
            setCookie('ZT_18a808c40bba58c2c', cookieStr, 6)
            this.updateUserInfo(Info)
            this.$router.push({name: 'Index'})
            this.btLoading = false
            break
          default:
            this.$message({
              message: Info.message + '!',
              type: 'error'
            })
            this.btLoading = false
        }
      }).catch((error) => {
        console.log(error)
        this.btLoading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
  width: 100vw;
  height: 100vh;
  background: #102b6a;
  // background: url('../../static/images/bg.jpg') no-repeat center/cover;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  .Login{
    max-width: 388px;
    width: 70%;
    margin: 0 auto;
    background: transparent;
    padding: 16px 32px 32px 32px;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    .bt{
      width: 100%;
      font-weight: 400;
      letter-spacing: .34em;
    }
    .codeBlock{
      width: 100px;
      height: 35px !important;
      line-height: 35px;
      float: right;
      border: 1px solid #eee;
      font-family:Arial,宋体;
      font-style:italic;
      color:#fff;
      padding:2px 3px;
      letter-spacing:3px;
      font-weight:bolder;
      cursor: pointer;
    }
  }
}
</style>
