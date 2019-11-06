<template>
  <div class="BudgetList">
    <h2 v-if="userInfo.F_120 != 'True'" class="NoAuthor">对不起，您没有查看该模块的权限！</h2>
    <div v-else>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="公司名称" size="mini">
            <el-input v-model="filterCompanyName_budget" size="mini" placeholder="请输入公司名称" clearable style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="事业部" size="mini">
            <el-input v-model="filterDepartment_budget" size="mini" placeholder="请输入事业部" clearable style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="预算月" size="mini">
            <el-select v-model="filterMonth_budget" size="mini" placeholder="请选择" style="width: 100px;">
              <el-option
                v-for="item in monthOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务员" size="mini">
            <el-input v-model="filterSalesMan_budget" size="mini" placeholder="请输入业务员" clearable style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" size="mini">
            <el-input v-model="filterProjectName_budget" size="mini" placeholder="请输入项目名称" clearable style="width: 140px;"></el-input>
          </el-form-item>
          <el-form-item label="" size="mini">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜 索</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="margin-bottom: 20px;text-align: right;padding-right: 10px;">
        <el-button type="success" size="mini" icon="el-icon-printer" @click="exportExcel">导 出</el-button>
        <el-button type="danger" size="mini" icon="el-icon-plus" @click="addBudget">新 增</el-button>
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
          width="45">
        </el-table-column>
        <el-table-column
          prop="客户名称"
          label="客户名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="项目名称"
          label="项目名称"
          width="220">
        </el-table-column>
        <el-table-column
          prop="项目合同总价"
          label="项目合同总价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="预算毛利"
          label="预算毛利"
          width="120">
        </el-table-column>
        <el-table-column
          prop="预算毛利率"
          label="预算毛利率"
          width="120">
        </el-table-column>
        <el-table-column
          prop="决算金额"
          label="决算金额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="决算毛利"
          label="决算毛利"
          width="120">
        </el-table-column>
        <el-table-column
          prop="决算毛利率"
          label="决算毛利率"
          width="120">
        </el-table-column>
        <el-table-column
          prop="项目类别"
          label="项目类别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="销售员"
          label="销售员"
          width="120">
        </el-table-column>
        <el-table-column
          prop="部门"
          label="部门"
          width="120">
        </el-table-column>
        <el-table-column
          prop="公司名称"
          label="公司名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="预算设备及材料"
          label="预算设备及材料"
          width="140">
        </el-table-column>
        <el-table-column
          prop="预算安装"
          label="预算安装"
          width="120">
        </el-table-column>
        <el-table-column
          prop="预算费用"
          label="预算费用"
          width="120">
        </el-table-column>
        <el-table-column
          prop="决算设备及材料"
          label="决算设备及材料"
          width="140">
        </el-table-column>
        <el-table-column
          prop="决算安装"
          label="决算安装"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="left"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <!-- <el-button type="danger" size="mini" v-if="scope.row['合同号'] != '合计'" @click="del(scope.row.finterid)">删 除</el-button> -->
            <el-button :disabled="userInfo.F_122 != 'True'" v-if="scope.row['审核状态'] == '未审核' && scope.row['合同号'] != '合计'" type="primary" size="mini" @click="examine(scope.row.finterid, '审核')">审 核</el-button>
            <el-button v-if="scope.row['审核状态'] == '未审核' && scope.row['合同号'] != '合计'" type="danger" size="mini" @click="del(scope.row.finterid)">删 除</el-button>
            <el-button :disabled="userInfo.F_123 != 'True'" v-if="scope.row['审核状态'] == '已审核' && scope.row['合同号'] != '合计'" type="warning" size="mini" @click="examine(scope.row.finterid, '反审核')">反审核</el-button>
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
  name: 'BudgetList',
  data () {
    return {
      loading: false,
      tableHieght: 0,
      tableData: [],
      pageSize: 20,
      sum: 0,
      monthOptions: [
        {'label': '全部', 'value': ''},
        {'label': '1月', 'value': '01'},
        {'label': '2月', 'value': '02'},
        {'label': '3月', 'value': '03'},
        {'label': '4月', 'value': '04'},
        {'label': '5月', 'value': '05'},
        {'label': '6月', 'value': '06'},
        {'label': '7月', 'value': '07'},
        {'label': '8月', 'value': '08'},
        {'label': '9月', 'value': '09'},
        {'label': '10月', 'value': '10'},
        {'label': '11月', 'value': '11'},
        {'label': '12月', 'value': '12'}
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    filterCompanyName_budget: {
      get: function () {
        return this.$store.state.filterCompanyName_budget
      },
      set: function (newValue) {
        this.$store.state.filterCompanyName_budget = newValue
      }
    },
    filterDepartment_budget: {
      get: function () {
        return this.$store.state.filterDepartment_budget
      },
      set: function (newValue) {
        this.$store.state.filterDepartment_budget = newValue
      }
    },
    filterMonth_budget: {
      get: function () {
        return this.$store.state.filterMonth_budget
      },
      set: function (newValue) {
        this.$store.state.filterMonth_budget = newValue
      }
    },
    filterSalesMan_budget: {
      get: function () {
        return this.$store.state.filterSalesMan_budget
      },
      set: function (newValue) {
        this.$store.state.filterSalesMan_budget = newValue
      }
    },
    filterProjectName_budget: {
      get: function () {
        return this.$store.state.filterProjectName_budget
      },
      set: function (newValue) {
        this.$store.state.filterProjectName_budget = newValue
      }
    },
    curPage: {
      get: function () {
        return this.$store.state.curPage_budget
      },
      set: function (newValue) {
        this.$store.state.curPage_budget = newValue
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
      'updateBudgetId'
    ]),
    search () {
      this.curPage = 1
      this.getData()
    },
    addBudget () {
      this.$router.push({name: 'BudgetAdd'})
    },
    toDetail (row) {
      this.updateBudgetId(row.finterid)
      this.$router.push({name: 'BudgetDetail'})
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
        tmpData += '<Final_DEL xmlns="http://tempuri.org/">'
        tmpData += '<ID>' + FInterID + '</ID>'
        tmpData += '</Final_DEL>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('Final_DEL', tmpData
        ).then(res => {
          // let xml = res.data
          // let parser = new DOMParser()
          // let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // // 提取数据
          // let Result = xmlDoc.getElementsByTagName('Final_DELResponse')[0].getElementsByTagName('Final_DELResult')[0]
          // let HtmlStr = $(Result).html()
          // let Info = (JSON.parse(HtmlStr))[0]
          // 解析
          let xmlData = this.$x2js.xml2js(res.data)
          let Result = xmlData.Envelope.Body.Final_DELResponse.Final_DELResult
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
        tmpData += '<Final_Check xmlns="http://tempuri.org/">'
        tmpData += '<ID>' + FInterID + '</ID>'
        tmpData += '<Type>' + Type + '</Type>'
        tmpData += '</Final_Check>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('Final_Check', tmpData
        ).then(res => {
          // let xml = res.data
          // let parser = new DOMParser()
          // let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // // 提取数据
          // let Result = xmlDoc.getElementsByTagName('Final_CheckResponse')[0].getElementsByTagName('Final_CheckResult')[0]
          // let HtmlStr = $(Result).html()
          // let Info = (JSON.parse(HtmlStr))[0]
          let xmlData = this.$x2js.xml2js(res.data)
          let Result = xmlData.Envelope.Body.Final_CheckResponse.Final_CheckResult
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
        const tHeader = ['公司名称', '项目名称', '项目合同总价', '预算毛利', '预算毛利率', '决算金额', '决算毛利', '决算毛利率', '项目类别', '销售员', '部门', '公司名称', '预算设备及材料', '预算安装', '预算费用', '决算设备及材料', '决算安装']
        const filterVal = ['公司名称', '项目名称', '项目合同总价', '预算毛利', '预算毛利率', '决算金额', '决算毛利', '决算毛利率', '项目类别', '销售员', '部门', '公司名称', '预算设备及材料', '预算安装', '预算费用', '决算设备及材料', '决算安装']
        const data = this.formatJson(filterVal, dataAll)
        exportJsonToExcel(tHeader, data, '工程项目与决算表')
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
        tmpData += "<FSQL><![CDATA[exec [Z_FinalReport] '" + this.filterProjectName_budget + "','" + this.filterCompanyName_budget + "','" + this.filterDepartment_budget + "','" + this.filterSalesMan_budget + "','" + this.filterMonth_budget + "'," + this.userInfo.fempid + ']]></FSQL>'
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
      tmpData += "<FSQL><![CDATA[exec [Z_FinalList] '" + this.filterProjectName_budget + "','" + this.filterCompanyName_budget + "','" + this.filterDepartment_budget + "','" + this.filterSalesMan_budget + "','" + this.filterMonth_budget + "'," + Number((this.curPage - 1) * this.pageSize + 1) + ',' + this.curPage * this.pageSize + ',' + this.userInfo.fempid + ']]></FSQL>'
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
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = JSON.parse(Result)
        // console.log(Info)
        if (Info.length > 0) {
          this.tableData = Info
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
.BudgetList{
  background: #fff;
  padding: 20px;
}
</style>
