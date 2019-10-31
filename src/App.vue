<template>
  <div id="app">
    <router-view v-if="pathName == 'Login'"/>
    <el-container v-else>
      <el-header height="42px" style="width: 100%;background: #4396CA;position:fixed;top:0;zIndex: 999;">
        <span @click="goIndex" style="height:42px;display:block;line-height: 42px;color:#fff;float:left;"><i class="el-icon-menu" style="padding-right: 5px;"></i>泽天工程项目系统{{pathName}}</span>
        <span @click="logout" style="height:42px;display:block;float:right;font-size: 14px;line-height: 42px;color:#fff;cursor: pointer;padding-right: 10px;">退出登陆 <i class="fa fa-sign-out" style="margin-left: 10px;color:#fff;font-size: 18px;"></i></span>
      </el-header>
      <el-container>
        <el-aside id="sider" width="100px" style="background: #4396CA;position:fixed;top: 42px;">
          <el-menu
            :default-active="siderIdx"
            background-color="#4396CA"
            text-color="#fff"
            active-text-color="#4396CA"
            @select="changeSideMenu"
            class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <span slot="title">合同监控</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">分包合同</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">预决算表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="width: calc(100% - 100px);position: absolute;top: 42px;left: 100px;"><router-view/></el-main>
      </el-container>
    </el-container>
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
      pathName: state => state.pathName
    })
  },
  watch: {
    pathName: function () {
      setTimeout(() => {
        let height = document.documentElement.clientHeight - 42
        document.getElementById('sider').style.height = height + 'px'
      }, 0)
    }
  },
  created () {
    setTimeout(() => {
      let height = document.documentElement.clientHeight - 42
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
          this.$router.push({name: 'BudgetList'})
          // this.$router.push({name: 'FilterTable'})
          break
        case '2':
          this.$router.push({name: 'ContractList'})
          break
        case '3':
          this.$router.push({name: 'BudgetList'})
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
