<template>
  <div class="Index">
    <p class="NoAuthor">欢 迎 您 登 陆 泽 天 项 目 工 程 系 统</p>
    <!-- <img src="../../static/image/zt.jpg" style="width: 100%;"/> -->
  </div>
  <!-- <div class="Module">
    <div class="Item" style="margin-top: 40px;" @click="goModule(0)">
      工程合同监控
    </div>
    <div class="Item" @click="goModule(1)">
      分包合同
    </div>
    <div class="Item" @click="goModule(2)">
      项目决算表
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'Module',
  data () {
    return {
    }
  },
  methods: {
    goModule (type) {
      switch (type) {
        case 0:
          this.$router.push({name: 'FilterTable'})
          break
        case 1:
          this.$router.push({name: 'ContractList'})
          break
        case 2:
          this.$router.push({name: 'Account'})
          break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .Index p{
    font-size: 32px;
    margin-top: 100px;
    // font-weight: bold;
  }
  .Module{
    width: 100%;
    text-align: center;
    .Item{
      width: 250px;
      height: 110px;
      background: #102B6A;
      margin: 30px auto;
      display: block;
      text-align: center;
      line-height: 110px;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      transition: all 0.3s ease-out;
      &:hover{
        transform: scale(1.1);
        -webkit-transition: all 0.3s ease-out;
        transition: all 0.3s ease-out;
      }
      // &:nth-of-type(1) {
      //   background: #75C2C5;
      // }
      // &:nth-of-type(2) {
      //   background: #D4D2D3;
      // }
      // &:nth-of-type(3) {
      //   background: #FED785;
      // }
    }
  }
</style>
