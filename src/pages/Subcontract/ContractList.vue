<template>
  <div class="ContractList">
     <h2 v-if="userInfo.F_121 != 'True'" class="NoAuthor">对不起，您没有查看该模块的权限！</h2>
     <div v-else>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="项目编号" size="mini">
            <el-input v-model="filterProjectCode" size="mini" placeholder="请输入项目编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="施工队" size="mini">
            <el-input v-model="filterConstructionTeam" size="mini" placeholder="请输入施工队" clearable></el-input>
          </el-form-item>
          <el-form-item label="公司名称" size="mini">
            <el-input v-model="filterCompanyName" size="mini" placeholder="请输入公司名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="" size="mini">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="getData">搜 索</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-col :span="6" :offset="8">
          <el-input v-model="projectCode" size="mini" clearable placeholder="请输入要查询的项目编号"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getData">搜 索</el-button>
        </el-col> -->
      </el-row>
      <el-row style="margin-bottom: 20px;text-align: right;padding-right: 10px;">
        <el-button type="success" size="mini" icon="el-icon-printer" @click="exportExcel">导 出</el-button>
        <el-button type="danger" size="mini" icon="el-icon-plus" @click="addContract">新 增</el-button>
      </el-row>
      <el-table
        id="tableBlock"
        v-loading="loading"
        :data="tableData"
        :height="tableHieght - 180"
        @row-dblclick="toDetail"
        style="width: 100%">
        <el-table-column
          type="index"
          fixed
          width="50">
        </el-table-column>
        <el-table-column
          prop="合同日期"
          label="合同日期"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="合同号"
          label="合同号"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="项目编号"
          label="项目编号"
          width="300"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="施工队"
          label="施工队"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="安装费"
          label="安装金额"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="材料金额"
          label="材料金额"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="材料结算"
          label="材料结算"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="价税合计"
          label="合计"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="已付金额"
          label="已付金额"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="剩余应付"
          label="剩余应付"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="已付比例"
          label="已付比例"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column
          prop="剩余未付"
          label="剩余未付"
          width="120"
          show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          prop="合同名称"
          label="合同名称"
          width="250"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="所属公司"
          label="所属公司"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="部门"
          label="部门"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="业务员"
          label="业务员"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column
          prop="公司名称"
          label="公司名称"
          width="150"
          show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <!-- <el-button type="danger" size="mini" v-if="scope.row['合同号'] != '合计'" @click="del(scope.row.FInterID)">删 除</el-button> -->
            <el-button :disabled="userInfo.F_124 != 'True'" v-if="scope.row['审核状态'] == '未审核' && scope.row['合同号'] != '合计'" type="primary" size="mini" @click="examine(scope.row.FInterID, '审核')">审 核</el-button>
            <el-button v-if="scope.row['审核状态'] == '未审核' && scope.row['合同号'] != '合计'" type="danger" size="mini" @click="del(scope.row.FInterID)">删 除</el-button>
            <el-button :disabled="userInfo.F_125 != 'True'" v-if="scope.row['审核状态'] == '已审核' && scope.row['合同号'] != '合计'" type="warning" size="mini" @click="examine(scope.row.FInterID, '反审核')">反审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="tableData.length > 0" style="margin: 10px 0;"
        @current-change="getData"
        :current-page.sync="curPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="sum">
      </el-pagination>
     </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import $ from 'jquery'
export default {
  name: 'ContractList',
  data () {
    return {
      loading: false,
      tableHieght: 0,
      tableData: [],
      tableDataAll: [],
      pageSize: 20,
      sum: 0
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    curPage: {
      get: function () {
        return this.$store.state.curPage_subcontract
      },
      set: function (newValue) {
        this.$store.state.curPage_subcontract = newValue
      }
    },
    filterProjectCode: {
      get: function () {
        return this.$store.state.filterProjectCode_subcontract
      },
      set: function (newValue) {
        this.$store.state.filterProjectCode_subcontract = newValue
      }
    },
    filterConstructionTeam: {
      get: function () {
        return this.$store.state.filterConstructionTeam_subcontract
      },
      set: function (newValue) {
        this.$store.state.filterConstructionTeam_subcontract = newValue
      }
    },
    filterCompanyName: {
      get: function () {
        return this.$store.state.filterCompanyName_subcontract
      },
      set: function (newValue) {
        this.$store.state.filterCompanyName_subcontract = newValue
      }
    }
  },
  created () {
    setTimeout(() => {
      let height = document.documentElement.clientHeight
      document.getElementById('tableBlock').style.height = height - 42 + 'px'
      this.tableHieght = height
    }, 0)
    this.getData()
  },
  methods: {
    ...mapActions([
      'updateContractId'
    ]),
    addContract () {
      this.$router.push({name: 'ContractAdd'})
    },
    toDetail (row) {
      this.updateContractId(row.FInterID)
      this.$router.push({name: 'ContractDetail'})
    },
    del (FInterID) {
      this.$confirm('此操作将该单据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<PayContract_DEL xmlns="http://tempuri.org/">'
        tmpData += '<ID>' + FInterID + '</ID>'
        tmpData += '</PayContract_DEL>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('PayContract_DEL', tmpData
        ).then(res => {
          // let xml = res.data
          // let parser = new DOMParser()
          // let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // // 提取数据
          // let Result = xmlDoc.getElementsByTagName('PayContract_DELResponse')[0].getElementsByTagName('PayContract_DELResult')[0]
          // let HtmlStr = $(Result).html()
          // let Info = (JSON.parse(HtmlStr))[0]
          // 解析
          let xmlData = this.$x2js.xml2js(res.data)
          let Result = xmlData.Envelope.Body.PayContract_DELResponse.PayContract_DELResult
          let Info = (JSON.parse(Result))[0]
          if (Info.code === '1') {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.getData()
          } else {
            this.$message({
              message: '删除失败!',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    examine (FInterID, Type) {
      this.$confirm('确认' + Type + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<PayContract_Check xmlns="http://tempuri.org/">'
        tmpData += '<ID>' + FInterID + '</ID>'
        tmpData += '<Type>' + Type + '</Type>'
        tmpData += '</PayContract_Check>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('PayContract_Check', tmpData
        ).then(res => {
          // let xml = res.data
          // let parser = new DOMParser()
          // let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // // 提取数据
          // let Result = xmlDoc.getElementsByTagName('PayContract_CheckResponse')[0].getElementsByTagName('PayContract_CheckResult')[0]
          // let HtmlStr = $(Result).html()
          // let Info = (JSON.parse(HtmlStr))[0]
          // 解析
          let xmlData = this.$x2js.xml2js(res.data)
          let Result = xmlData.Envelope.Body.PayContract_CheckResponse.PayContract_CheckResult
          let Info = (JSON.parse(Result))[0]
          if (Info.code === '1') {
            this.$message({
              message: Type + '成功!',
              type: 'success'
            })
            this.getData()
          } else {
            this.$message({
              message: Type + '失败!',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    async exportExcel () {
      let dataAll = await this.getListAll()
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../vendor/Export2Excel.js')
        const tHeader = ['合同日期', '合同号', '项目编号', '施工队', '安装金额', '材料金额', '材料结算', '合计', '已付金额', '剩余应付', '已付比例', '合同名称', '所属公司', '部门', '业务员']
        const filterVal = ['合同日期', '合同号', '项目编号', '施工队', '安装费', '材料金额', '材料结算', '合计', '已付金额', '剩余应付', '已付比例', '合同名称', '所属公司', '部门', '业务员']
        const data = this.formatJson(filterVal, dataAll)
        exportJsonToExcel(tHeader, data, '分包合同')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getListAll () {
      return new Promise((resolve, reject) => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[exec [Z_PAYReport] '" + this.filterProjectCode + "','" + this.filterConstructionTeam + "','" + this.filterCompanyName + "'," + this.userInfo.fempid + ']]></FSQL>'
        tmpData += '</JA_LIST>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('JA_LIST', tmpData
        ).then(res => {
          // let xml = res.data
          // let parser = new DOMParser()
          // let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // // 提取数据
          // let Result = xmlDoc.getElementsByTagName('JA_LISTResponse')[0].getElementsByTagName('JA_LISTResult')[0]
          // let HtmlStr = $(Result).html()
          // let Info = JSON.parse(HtmlStr)
          // 解析
          let xmlData = this.$x2js.xml2js(res.data)
          let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
          let Info = JSON.parse(Result)
          resolve(Info)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getData () {
      this.loading = true
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[exec [Z_PAYList] '" + this.filterProjectCode + "','" + this.filterConstructionTeam + "','" + this.filterCompanyName + "'," + Number((this.curPage - 1) * this.pageSize + 1) + ',' + this.curPage * this.pageSize + ',' + this.userInfo.fempid + ']]></FSQL>'
      tmpData += '</JA_LIST>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('JA_LIST', tmpData
      ).then(res => {
        // let xml = res.data
        // let parser = new DOMParser()
        // let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // // 提取数据
        // let Result = xmlDoc.getElementsByTagName('JA_LISTResponse')[0].getElementsByTagName('JA_LISTResult')[0]
        // let HtmlStr = $(Result).html()
        // let Info = JSON.parse(HtmlStr)
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = JSON.parse(Result)
        // console.log(Info)
        if (Info.length > 0) {
          this.tableData = Info.map(item => {
            item['合同名称'] = item['合同名称'] === '0' ? '' : item['合同名称']
            return item
          })
          this.sum = Info[0].fcount
          this.loading = false
        } else {
          this.tableData = []
          this.sum = []
          this.loading = false
        }
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.ContractList{
  background: #fff;
  padding: 20px;
}
</style>
