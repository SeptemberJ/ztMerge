<template>
  <div id="app">
    <router-view v-if="pathName == 'Login'"/>
    <el-container v-else direction="vertical" style="background:red;height:100%;">
      <el-header height="65px" style="width: 100%;background: #1965f6;position:fixed;top:0;zIndex: 999;">
        <span @click="goIndex" style="height:65px;display:block;line-height: 65px;color:#fff;float:left;font-size: 22px;"><img src="../static/image/logo.png" style="height:65px;float:left;margin-right:20px;"/>泽 天 项 目 工 程 系 统</span>
        <span title="退出" @click="logout" style="height:65px;display:block;float:right;font-size: 14px;line-height: 65px;color:#fff;cursor: pointer;padding-right: 10px;">退出登陆 <i class="if-icons if-iconlogout" style="margin-left: 10px;color:#fff;font-size: 18px;"></i></span>
      </el-header>
      <el-container direction="vertical">
        <el-aside id="sider" width="150px" style="position:fixed;top: 65px;">
          <el-menu
            :default-active="siderIdx"
            text-color="#000"
            active-text-color="#fff"
            @select="changeSideMenu"
            class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <span slot="title" style="">• 项目进度管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">• 预决算管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">• 分包合同管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="width: calc(100% - 150px);position: absolute;top: 65px;left: 150px;"><router-view/></el-main>
      </el-container>
    </el-container>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {clearCookie} from './util/utils'
export default {
  name: 'App',
  computed: {
    ...mapState({
      siderIdx: state => state.siderIdx,
      pathName: state => state.pathName,
      userInfo: state => state.userInfo
    })
  },
  watch: {
    pathName: function () {
      setTimeout(() => {
        let height = document.documentElement.clientHeight - 65
        document.getElementById('sider').style.height = height + 'px'
      }, 0)
    }
  },
  created () {
    setTimeout(() => {
      let height = document.documentElement.clientHeight - 65
      document.getElementById('sider').style.height = height + 'px'
    }, 0)
  },
  methods: {
    ...mapActions([
      'changeSiderIdx',
      'changePath'
    ]),
    changeSideMenu (index, keyPath) {
      this.changeSiderIdx(index)
      switch (index) {
        case '1':
          this.$router.push({name: 'FilterTable'})
          break
        case '2':
          this.$router.push({name: 'BudgetList'})
          break
        case '3':
          this.$router.push({name: 'ContractList'})
          break
      }
    },
    goIndex () {
      this.changeSiderIdx('0')
      this.changePath('Index')
      this.$router.push({name: 'Index'})
    },
    logout () {
      this.$confirm('确认退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.clear('vuex-along')
        this.changeSiderIdx('0')
        this.changePath('Login')
        this.$router.push({name: 'Login'})
        clearCookie('ZT_18a808c40bba58c2c')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
.topLine{
  width: 100%;
  height: 43px;
  background: #102B6A;
  color: #fff;
  line-height: 43px;
}
.LogoutBlock{
  float: right;
  padding-right: 20px;
  font-size: 12px;
}
</style>
