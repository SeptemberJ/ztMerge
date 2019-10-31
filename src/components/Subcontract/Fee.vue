<template>
  <div class="Outlay"><el-button style="float:right;margin: 10px;" type="primary" size="small" @click="exportExcel">导 出</el-button>
    <el-table
      ref="OutlayTable"
      :data="outlayList"
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
        property="F15"
        label="施工队"
        width="120"
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
import { Loading } from 'element-ui'
// import $ from 'jquery'
export default {
  name: 'Outlay',
  props: ['projectCode', 'constructionTeam'],
  data () {
    return {
      outlayList: []
    }
  },
  created () {
    this.getOutlayList()
  },
  methods: {
    // 返回
    back () {
      this.$router.push({name: 'InfoDynamicTable'})
    },
    getOutlayList () {
      let loadingInstance = Loading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading'
      })
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select * from zz_fee where f11='" + this.projectCode + "' and F15='" + this.constructionTeam + "']]></FSQL>"
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
              this.outlayList = Info.concat(sumLine)
              loadingInstance.close()
            }
          })
        } else {
          this.outlayList = Info
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
        const tHeader = ['单据编号', '申请日期', '事由', '申请人', '申请部门', '收款单位', '施工队', '发生日期', '费用项目', '申请费用金额', '核算项目', '项目编号', '摘要', '备注']
        const filterVal = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F15', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13']
        const data = this.formatJson(filterVal, this.outlayList)
        exportJsonToExcel(tHeader, data, '施工费用')
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
