<template>
  <div class="wrap" id="WrapBlock">
    <div class="LoginBlock">
      <p class="TextAlignL">您好！欢迎来到泽天项目工程系统</p>
      <span class="Line"></span>
      <div class="InputBlock">
        <div class="InputItem">
          <el-input
            placeholder="工号/手机号"
            prefix-icon="if-icons if-iconuser"
            v-model="Form.accountName">
          </el-input>
        </div>
        <div class="InputItem">
          <el-input
            placeholder="密码"
            type="password"
            prefix-icon="if-icons if-iconpsd"
            v-model="Form.accountPsd">
          </el-input>
        </div>
        <button type="primary" :loading="btLoading" clasS="BtButton CursorPointer" @click="Login('Form')">登 陆</button>
      </div>
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
    return {
      btLoading: false,
      realCode: '', // 随机验证码
      Form: {
        accountName: '',
        accountPsd: ''
      }
    }
  },
  computed: {
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
    Login () {
      if (!this.Form.accountName || !this.Form.accountPsd) {
        this.$message({
          message: '请将信息填写完整!',
          type: 'warning'
        })
      } else {
        this.sureLogin()
      }
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
  overflow: hidden;
  background: #102b6a;
  background: url('../../static/image/loginBg.jpg') no-repeat center/cover;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  .LoginBlock{
    width: 27%;
    min-width: 320px;
    padding: 50px 30px;
    background: #fff;
    position: absolute;
    left: 55%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 15px;
    p{
      font-size: 18px;
      font-weight: bold;
    }
    .Line{
      width: 50px;
      height: 2px;
      background: #028bff;
      float: left;
      margin-top: 10px;
    }
    .InputBlock{
      margin-top: 40px;
      .InputItem{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #f7f7f7;
        margin-top: 20px;
      }
      .BtButton{
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        border-radius: 50px;
        margin-top: 40px;
        background: url('../../static/image/loginBt.png') no-repeat center/cover;
        box-shadow: 0px 7px 10px 0px rgba(185,223,255,1);
        border: 0px solid red;
        overflow: hidden;
      }
    }
  }
}
@media screen and (max-width: 1423px) {
  .LoginBlock{
    width: 27%;
    padding: 45px 25px !important;
    p{
      font-size: 16px !important;
    }
    .InputItem{
        height: 45px !important;
        line-height: 45px !important;
      }
      .BtButton{
        height: 45px !important;
        line-height: 45px !important;
        margin-top: 30px !important;
      }
  }
}
@media screen and (max-width: 1366px) {
  .LoginBlock{
    width: 27%;
    padding: 40px 20px !important;
    p{
      font-size: 15px !important;
    }
    .InputItem{
        height: 40px !important;
        line-height: 40px !important;
      }
      .BtButton{
        height: 40px !important;
        line-height: 40px !important;
        margin-top: 30px !important;
      }
  }
}
</style>
