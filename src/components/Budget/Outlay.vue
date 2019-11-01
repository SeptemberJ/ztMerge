<template>
  <div class="Outlay">
    <el-button id="excelBt" style="float:right;margin: 10px;" type="primary" size="small" @click="exportExcel">导 出</el-button>
    <el-table id="tableBlock"
      ref="dataTable"
      :data="dataList"
      :height="tableHieght"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="F1"
        label="单据编号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F2"
        label="申请日期"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F3"
        label="事由"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F4"
        label="申请人"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F5"
        label="申请部门"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F6"
        label="收款单位"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F7"
        label="发生日期"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F8"
        label="费用项目"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F9"
        label="申请费用金额"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F10"
        label="核算项目"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F11"
        label="项目编号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F12"
        label="摘要"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F13"
        label="备注"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { Loading } from 'element-ui'
export default {
  name: 'Outlay',
  props: ['projectName', 'parameter', 'timeStamp'],
  data () {
    return {
      loading: false,
      tableHieght: 300,
      dataList: []
    }
  },
  computed: {},
  created () {
    if (this.parameter === '140106') {
      this.getList1()
    } else if (this.parameter === '130104') {
      this.getList2()
    } else {
      this.getList()
    }
    setTimeout(() => {
      let height = document.documentElement.clientHeight
      let btHeight = document.getElementById('excelBt').offsetHeight
      this.tableHieght = height - btHeight - 200
    }, 0)
  },
  watch: {
    timeStamp: function () {
      if (this.parameter === '140106') {
        this.getList1()
      } else if (this.parameter === '130104') {
        this.getList2()
      } else {
        this.getList()
      }
    }
  },
  methods: {
    getList () {
      this.dataList = []
      this.loading = true
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select * from ZZ_FEE where f11='" + this.projectName + "' and f8='" + this.parameter + "']]></FSQL>"
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
        // let Info = (JSON.parse(HtmlStr))
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = JSON.parse(Result)
        console.log(Info)
        if (Info.length > 0) {
          let sumLine = {
            F1: '合计',
            F2: '',
            F3: '',
            F4: '',
            F5: '',
            F6: '',
            F7: '',
            F8: '',
            F9: 0,
            F10: '',
            F11: '',
            F12: '',
            F13: ''
          }
          Info.map((item, idx) => {
            sumLine.F9 = (Number(sumLine.F9) + Number(item.F9)).toFixed(2)
            if (idx === Info.length - 1) {
              this.dataList = Info.concat(sumLine)
              this.loading = false
            }
          })
        } else {
          this.dataList = Info
          this.loading = false
        }
      }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    getList1 () {
      this.dataList = []
      this.loading = true
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select * from ZZ_FEE where f11='" + this.projectName + "' and F8 <> '差旅费' AND F8 <> '招待费' AND F8 <> '总包配合费' AND F8 <> '投标费' AND F8 <> '劳务费' AND F8 <> '安装费' AND F8 <> '维护费'" + ']]></FSQL>'
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
        // let Info = (JSON.parse(HtmlStr))
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = JSON.parse(Result)
        console.log(Info)
        if (Info.length > 0) {
          let sumLine = {
            F1: '合计',
            F2: '',
            F3: '',
            F4: '',
            F5: '',
            F6: '',
            F7: '',
            F8: '',
            F9: 0,
            F10: '',
            F11: '',
            F12: '',
            F13: ''
          }
          Info.map((item, idx) => {
            sumLine.F9 = (Number(sumLine.F9) + Number(item.F9)).toFixed(2)
            if (idx === Info.length - 1) {
              this.dataList = Info.concat(sumLine)
              this.loading = false
            }
          })
        } else {
          this.dataList = Info
          this.loading = false
        }
      }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    getList2 () {
      this.dataList = []
      this.loading = true
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select * from ZZ_FEE where f11='" + this.projectName + "' and (f8 = '安装费' OR f8 = '维护费')" + ']]></FSQL>'
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
        // let Info = (JSON.parse(HtmlStr))
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = JSON.parse(Result)
        console.log(Info)
        if (Info.length > 0) {
          let sumLine = {
            F1: '合计',
            F2: '',
            F3: '',
            F4: '',
            F5: '',
            F6: '',
            F7: '',
            F8: '',
            F9: 0,
            F10: '',
            F11: '',
            F12: '',
            F13: ''
          }
          Info.map((item, idx) => {
            sumLine.F9 = (Number(sumLine.F9) + Number(item.F9)).toFixed(2)
            if (idx === Info.length - 1) {
              this.dataList = Info.concat(sumLine)
              this.loading = false
            }
          })
        } else {
          this.dataList = Info
          this.loading = false
        }
      }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    // 导出
    exportExcel () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../vendor/Export2Excel.js')
        const tHeader = ['单据编号', '申请日期', '事由', '申请人', '申请部门', '收款单位', '发生日期', '费用项目', '申请费用金额', '核算项目', '项目编号', '摘要', '备注']
        const filterVal = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13']
        const data = this.formatJson(filterVal, this.dataList)
        exportJsonToExcel(tHeader, data, '金额来源及明细')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="less" scoped>
</style>
