<template>
  <div class="Cost">
    <el-button style="float:right;margin: 10px;" type="primary" size="small" @click="exportExcel">导 出</el-button>
    <el-table
      ref="dataTable"
      :data="dataList"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="F1"
        label="类别"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F2"
        label="含税金额"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F3"
        label="日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F4"
        label="单据编号"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F5"
        label="购货单位"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F6"
        label="产品长代码"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F7"
        label="产品名称"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F8"
        label="规格型号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F9"
        label="单位"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F10"
        label="实发数量"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F11"
        label="含税成本"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F12"
        label="价税合计"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F13"
        label="单位成本"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F14"
        label="成本"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F15"
        label="项目编号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F16"
        label="订单单号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F17"
        label="源单单号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F18"
        label="合同单号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F19"
        label="部门"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F20"
        label="业务员"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="F21"
        label="源单类型"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
// import $ from 'jquery'
export default {
  name: 'Cost',
  props: ['projectName', 'parameter', 'timeStamp'],
  data () {
    return {
      dataList: []
    }
  },
  created () {
    this.getList()
  },
  watch: {
    timeStamp: function () {
      this.getList()
    }
  },
  methods: {
    getList () {
      this.dataList = []
      let loadingInstance = Loading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading'
      })
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select * from ZZ_COST where F15='" + this.projectName + "' and F1='" + this.parameter + "']]></FSQL>"
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
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = JSON.parse(Result)
        console.log('InfoCost', Info)
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
            F9: '',
            F10: 0,
            F11: '',
            F12: 0,
            F13: '',
            F14: 0,
            F15: '',
            F16: '',
            F17: '',
            F18: '',
            F19: '',
            F20: '',
            F21: '',
            F22: '',
            F23: ''
          }
          Info.map((item, idx) => {
            sumLine.F10 = (Number(sumLine.F10) + Number(item.F10)).toFixed(2)
            sumLine.F12 = (Number(sumLine.F12) + Number(item.F12)).toFixed(2)
            sumLine.F14 = (Number(sumLine.F14) + Number(item.F14)).toFixed(2)
            if (idx === Info.length - 1) {
              this.dataList = Info.concat(sumLine)
              loadingInstance.close()
            }
          })
        } else {
          this.dataList = Info
          loadingInstance.close()
        }
      }).catch((error) => {
        loadingInstance.close()
        console.log(error)
      })
    },
    // 导出
    exportExcel () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../vendor/Export2Excel.js')
        const tHeader = ['类别', '含税金额', '日期', '单据编号', '购货单位', '产品长代码', '产品名称', '规格型号', '单位', '实发数量', '含税成本', '价税合计', '单位成本', '成本', '项目编号', '订单单号', '源单单号', '合同单号', '部门', '业务员', '源单类型']
        const filterVal = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23']
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
