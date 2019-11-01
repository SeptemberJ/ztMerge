<template>
  <div class="FilterTable">
    <h2 v-if="userInfo.F_119 != 'True'" class="NoAuthor">对不起，您没有查看该模块的权限！</h2>
    <el-row v-else>
      <el-col :span="10" id="FilterBlock" class="FilterBlock">
        <section>
          <el-row>
            <el-col :span="24" class="MarginB_20">
              <el-button type="primary" size="small" icon="el-icon-search" style="width:100%;" @click="changeFilter">搜 索</el-button>
            </el-col>
            <el-form ref="formFilter" :model="formFilter" label-width="90px" label-position="left" size="mini">
              <el-col :span="8">
                <el-form-item label="所属公司" label-width="70px">
                  <!-- <el-input v-model="formFilter.affiliatedCompany" clearable size="mini"></el-input> -->
                  <el-select class="WidthFull" v-model="formFilter.affiliatedCompany" placeholder="请选择">
                    <el-option
                      v-for="item in CompanyOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约部门" label-width="70px">
                  <!--  @change="changeFilter"  -->
                  <el-select class="WidthFull" v-model="formFilter.signDepartment" placeholder="请选择">
                    <el-option
                      v-for="item in signDepartmentList"
                      :key="item.FName"
                      :label="item.FName"
                      :value="item.FName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约年份" label-width="70px">
                  <el-select class="WidthFull" v-model="formFilter.signYear" placeholder="请选择">
                    <el-option
                      v-for="item in signYearList"
                      :key="item.FName"
                      :label="item.FName"
                      :value="item.FName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="合同金额">
                  <el-input-number style="width: 100px" v-model="formFilter.contractSumS" :controls="false" placeholder="起始金额"></el-input-number>
                    <span style="width: 80px;text-align:center;display:inline-block;">——</span>
                  <el-input-number style="width: 100px" v-model="formFilter.contractSumE" :controls="false" placeholder="截止金额"></el-input-number>
                  <!-- <el-select v-model="formFilter.contractPrice" placeholder="请选择">
                    <el-option
                      v-for="item in contractPriceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="报警与提示" label-width="90px">
                  <el-select v-model="formFilter.warnTip" placeholder="请选择">
                    <el-option
                      v-for="item in warnTipList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="签约与竣工" label-width="90px">
                  <el-select v-model="formFilter.signAndFinish" placeholder="请选择">
                    <el-option
                      v-for="item in signAndFinishList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归档情况">
                  <el-select v-model="formFilter.fileConditionn" placeholder="请选择">
                    <el-option
                      v-for="item in fileConditionnList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类管控">
                  <el-select v-model="formFilter.classCondition" placeholder="请选择">
                    <el-option
                      v-for="item in classConditionList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-row>
                  <el-col :span="14" class="TextAlignL">
                    <el-form-item label="行业类型" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.industryType" placeholder="请选择">
                        <el-option
                          v-for="item in industryTypeOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="项目类型" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.projectType" placeholder="请选择">
                        <el-option
                          v-for="item in projectTypeOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="具有报警项目" label-width="110px">
                      <el-select class="WidthFull" v-model="formFilter.warnTip" placeholder="请选择">
                        <el-option
                          v-for="item in warnTipOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="开具保函" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.makeLetter" placeholder="请选择">
                        <el-option
                          v-for="item in makeLetterOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="分包项目" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.subcontractItem" placeholder="请选择">
                        <el-option
                          v-for="item in subcontractItemOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="收款情况">
                      <el-select class="WidthFull" v-model="formFilter.receivablesContion" placeholder="请选择">
                        <el-option
                          v-for="item in receivablesContionOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="竣工项目">
                      <el-select class="WidthFull" v-model="formFilter.completionProject" placeholder="请选择">
                        <el-option
                          v-for="item in completionProjectOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="垫资情况">
                      <el-select class="WidthFull" v-model="formFilter.advances" placeholder="请选择">
                        <el-option
                          v-for="item in advancesOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="进入质保期项目" label-width="110px">
                      <el-select class="WidthFull" v-model="formFilter.inQuality" placeholder="请选择">
                        <el-option
                          v-for="item in inQualityOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="报警与提示" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.warnTip" placeholder="请选择">
                        <el-option
                          v-for="item in warnTipList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="签约与竣工" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.signAndFinish" placeholder="请选择">
                        <el-option
                          v-for="item in signAndFinishList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="归档情况">
                      <el-select class="WidthFull" v-model="formFilter.fileConditionn" placeholder="请选择">
                        <el-option
                          v-for="item in fileConditionnList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="分类管控">
                      <el-select class="WidthFull" v-model="formFilter.classCondition" placeholder="请选择">
                        <el-option
                          v-for="item in classConditionList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="履约保证金" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.performBond" placeholder="请选择">
                        <el-option
                          v-for="item in performBondList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="质量保证金" label-width="90px">
                      <el-select class="WidthFull" v-model="formFilter.qualityBond" placeholder="请选择">
                        <el-option
                          v-for="item in qualityBondList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="出货率(大于输入数的)" label-width="150px">
                      <el-input class="WidthFull" v-model="formFilter.shipmentRate"></el-input>
                    </el-form-item>
                    <el-form-item label="收款率(小于输入数的)" label-width="150px">
                      <el-input class="WidthFull" v-model="formFilter.receivablesRate"></el-input>
                    </el-form-item>
                    <el-form-item label="分包项目情况" label-width="100px">
                      <el-select class="WidthFull" v-model="formFilter.subItems" placeholder="请选择">
                        <el-option
                          v-for="item in subItemsList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item> -->
                  </el-col>
                  <el-col :span="9" :offset="1">
                    <section>
                      <p style="text-align: left;margin-bottom: 5px;">排序</p>
                      <div class="sortBlock">
                        <el-menu
                          default-active="按签约价"
                          class="el-menu-vertical-demo">
                          <el-menu-item v-for="(item, idx) in sortList" :key="idx" :index="item">
                            <span slot="title">{{item}}</span>
                          </el-menu-item>
                        </el-menu>
                      </div>
                    </section>
                    <section>
                      <p class="MarginT_10" style="text-align: left;padding-bottom: 5px;">项目名称</p>
                      <div class="vagueSearchBlock">
                        <!-- @blur="changeFilter" @keyup.enter.native='enterEvent' -->
                        <el-input v-model="formFilter.xmmc" clearable size="mini"></el-input>
                      </div>
                    </section>
                    <section>
                      <p class="" style="text-align: left;padding-bottom: 5px;">项目编号</p>
                      <div class="vagueSearchBlock">
                        <el-input v-model="formFilter.projectNumber" clearable size="mini"></el-input>
                      </div>
                    </section>
                    <section>
                      <p class="" style="text-align: left;padding-bottom: 5px;">客户名称</p>
                      <div class="vagueSearchBlock">
                        <el-input v-model="formFilter.customer" clearable size="mini"></el-input>
                      </div>
                    </section>
                  </el-col>
                </el-row>
              </el-col>
            </el-form>
          </el-row>
        </section>
      </el-col>
      <!-- :height="tableHieght" BgGray -->
      <el-col :span="14" id="ResultBlock" class="ResultBloc">
        <el-table id="resultTable"
          v-loading="loading"
          :data="resultData"
          :height="tableHieght - 50"
          border
          @row-dblclick="goDetail"
          style="width: 100%">
          <el-table-column
            fixed
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="签约日期"
            label="签约日期"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="客户"
            label="客户"
            width="220"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="项目名称"
            label="项目名称"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="隶属公司"
            label="隶属公司"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="合同金额"
            label="合同金额"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="结算价"
            label="结算金额"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="累计开票"
            label="累计开票"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="累计收款"
            label="累计收款"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="未收金额"
            label="剩余未收"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="预算毛利率"
            label="预算毛利率"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="费用金额2"
            label="费用金额"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="成本2"
            label="成本"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="施工合同"
            label="施工合同"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="出货率"
            label="出货率"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="部门"
            label="部门"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="商务人员"
            label="商务人员"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="项目经理"
            label="项目经理"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="开工日期"
            label="开工日期"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="完工日期"
            label="完工日期"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="审计价"
            label="审计价"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="竣工日期"
            label="竣工日期"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="质保期"
            label="质保期"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="质保起"
            label="质保起"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="质保至"
            label="质保结束"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="合同号"
            label="合同号"
            show-overflow-tooltip
            width="120">
          </el-table-column>
          <el-table-column
            prop="项目编号"
            label="项目编号"
            width="250"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="账套名"
            label="数据提取公司"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
            prop="结算价"
            label="结算价"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="收款率"
            label="收款率"
            width="100"
            show-overflow-tooltip>
          </el-table-column> -->
        </el-table>
        <el-pagination style="float: right;margin-top: 15px;padding-right: 20px;"
          @current-change="handleCurrentChange"
          :current-page.sync="curPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="sum">
          </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import { Loading } from 'element-ui'
// import $ from 'jquery'
export default {
  name: 'FilterTable',
  data () {
    return {
      loading: false,
      tableHieght: 0,
      curPage: 1,
      pageSize: 20,
      sum: 0,
      resultData: [],
      CompanyOption: [
        {label: '全部', value: '全部'},
        {label: '泽天机电', value: '泽天机电'},
        {label: '泽天环科', value: '泽天环科'},
        {label: '禾长机电', value: '禾长机电'},
        {label: '泽天实业', value: '泽天实业'},
        {label: '其他', value: '其他'}
      ],
      signDepartmentList: [],
      industryTypeOption: [
        {label: '全部', value: '全部'},
        {label: '房产', value: '房产'},
        {label: '商业', value: '商业'},
        {label: '医疗', value: '医疗'},
        {label: '学校', value: '学校'},
        {label: '银行', value: '银行'},
        {label: '个人', value: '个人'}
      ],
      projectTypeOption: [
        {label: '全部', value: '全部'},
        {label: 'VRV项目', value: 'VRV项目'},
        {label: '水机项目', value: '水机项目'},
        {label: '净水项目', value: '净水项目'},
        {label: '改造项目', value: '改造项目'},
        {label: '大型维修项目', value: '大型维修项目'},
        {label: '维修项目', value: '维修项目'},
        {label: '保养项目', value: '保养项目'},
        {label: '供货项目', value: '供货项目'},
        {label: '驻场项目', value: '驻场项目'},
        {label: '板胶项目', value: '板胶项目'},
        {label: '外协', value: '外协'}
      ],
      warnTipOption: [
        {label: '全部', value: '全部'},
        {label: '进度节点', value: '进度节点'},
        {label: '收款节点', value: '收款节点'}
      ],
      makeLetterOption: [
        {label: '有保函', value: '有保函'},
        {label: '预付款保函', value: '预付款保函'},
        {label: '履约保函', value: '履约保函'},
        {label: '质量保函', value: '质量保函'}
      ],
      subcontractItemOption: [
        {label: '有分包项目', value: '有分包项目'},
        {label: '无分包项目', value: '无分包项目'}
      ],
      receivablesContionOption: [
        {label: '收款全部完成', value: '收款全部完成'}
      ],
      completionProjectOption: [
        {label: '全部', value: '全部'},
        {label: '已竣工', value: '已竣工'},
        {label: '未竣工', value: '未竣工'}
      ],
      advancesOption: [
        {label: '有垫资项目', value: '有垫资项目'}
      ],
      inQualityOption: [],
      contractPriceList: [
        {label: '全部', value: -1},
        {label: '99万元以下', value: 0},
        {label: '100-999万元', value: 1},
        {label: '1000-2999万元', value: 2},
        {label: '3000万元以上', value: 3}
      ],
      signYearList2: [
        {label: '全部', value: -1},
        {label: '2015', value: '2015'},
        {label: '2016', value: '2016'},
        {label: '2017', value: '2017'},
        {label: '2018', value: '2018'},
        {label: '2019', value: '2019'}
      ],
      signAndFinishList: [
        {label: '全部', value: -1},
        {label: '未签约先放号', value: 0},
        {label: '签约后长期无工程信息', value: 1},
        {label: '已完工但未竣工', value: 2}
      ],
      fileConditionnList: [
        {label: '全部', value: -1},
        {label: '档案全部交齐', value: 0},
        {label: '归档未完成', value: 1}
      ],
      classConditionList: [
        {label: '全部', value: -1},
        {label: '精品项目', value: 0},
        {label: '一般项目', value: 1},
        {label: '难收尾项目', value: 2}
      ],
      performBondList: [
        {label: '全部', value: -1},
        {label: '具有履约保证金的项目', value: 0}
      ],
      qualityBondList: [
        {label: '全部', value: -1},
        {label: '具有质量保证金的项目', value: 0}
      ],
      shipmentRateList: [],
      subItemsList: [
        {label: '全部', value: -1},
        {label: '具有分包的项目', value: 0}
      ],
      sortList: ['按签约价', '按结算价', '按预算毛利率', '按实际买利率', '按资金占用', '按出货率', '按收款率', '按商务', '按项目经理']
    }
  },
  created () {
    setTimeout(() => {
      let height = document.documentElement.clientHeight - 42
      document.getElementById('FilterBlock').style.height = height + 'px'
      this.tableHieght = height
    }, 0)
    // this.getList()
    this.getDepartSelectList()
    this.changeFilter()
  },
  computed: {
    ...mapState({
      resultDataOrigin: state => state.resultDataOrigin,
      userInfo: state => state.userInfo
    }),
    formFilter: {
      get: function () {
        console.log(this.$store.state.formFilter)
        return this.$store.state.formFilter
      },
      set: function (newValue) {
        this.$store.state.formFilter = newValue
      }
    },
    signYearList: function () {
      let temp = [{FName: '全部'}]
      let curYear = (new Date()).getFullYear()
      for (let i = curYear; i >= 2011; i--) {
        temp.push({FName: i})
      }
      return temp
    }
  },
  methods: {
    ...mapActions([
      'updateContractNo',
      'updateXMMC',
      'updateCurDB',
      'updateResultData',
      'updateFilterCondition'
    ]),
    goDetail (row) {
      this.updateContractNo(row['合同号'])
      this.updateXMMC(row['项目名称'])
      this.updateCurDB(row['账套名'])
      this.$router.push({name: 'InfoDynamicTable'})
    },
    // 部门selectList
    getDepartSelectList () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL><![CDATA[select FName from t_Department where FDeleted=0]]></FSQL>'
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
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = JSON.parse(Result)
        this.signDepartmentList = [{FName: '全部'}].concat(Info)
      }).catch((error) => {
        console.log(error)
      })
    },
    changeFilter () {
      this.curPage = 1
      this.search()
    },
    handleCurrentChange () {
      this.search()
    },
    // 精确查询
    search () {
      // let loadingInstance = Loading.service({
      //   lock: true,
      //   text: '加载中',
      //   spinner: 'el-icon-loading'
      // })
      this.loading = true
      // this.getTotal()
      let contractSumS = "''"
      let contractSumE = "''"
      if (this.formFilter.contractSumS) {
        contractSumS = this.formFilter.contractSumS
      }
      if (this.formFilter.contractSumE) {
        contractSumE = this.formFilter.contractSumE
      }
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL>exec [Z_ContractList] '" + this.formFilter.xmmc + "','" + this.formFilter.signDepartment + "','" + this.formFilter.customer + "','" + this.formFilter.projectNumber + "'," + contractSumS + ',' + contractSumE + ',' + this.formFilter.signYear + ",'" + this.formFilter.industryType + "','" + this.formFilter.projectType + "','" + this.formFilter.affiliatedCompany + "'," + Number((this.curPage - 1) * this.pageSize + 1) + ',' + this.pageSize * this.curPage + ',' + this.userInfo.fempid + '</FSQL>'
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
        if (Info.length > 1) {
          this.sum = Info[0].fcount
        } else {
          this.sum = 0
        }
        console.log('filterInfo---', Info)
        this.resultData = Info.map(item => {
          item['开工日期'] = item['开工日期'] ? item['开工日期'].slice(0, 10) : ''
          item['完工日期'] = item['完工日期'] ? item['完工日期'].slice(0, 10) : ''
          item['费用金额2'] = item['费用金额'] ? item['费用金额'].toFixed(2) : ''
          item['成本2'] = item['成本'] ? item['成本'].toFixed(2) : ''
          return item
        })
        this.loading = false
        // loadingInstance.close()
      }).catch((error) => {
        console.log(error)
        this.loading = false
        // loadingInstance.close()
      })
    },
    // 分页总数
    getTotal () {
      let contractSumS = "''"
      let contractSumE = "''"
      if (this.formFilter.contractSumS) {
        contractSumS = this.formFilter.contractSumS
      }
      if (this.formFilter.contractSumE) {
        contractSumE = this.formFilter.contractSumE
      }
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[exec [Z_ContractList_count] '" + this.formFilter.xmmc + "','" + this.formFilter.signDepartment + "','" + this.formFilter.customer + "','" + this.formFilter.projectNumber + "'," + contractSumS + ',' + contractSumE + ',' + this.formFilter.signYear + ",'" + this.formFilter.industryType + "','" + this.formFilter.projectType + "'," + this.userInfo.fempid + ']]></FSQL>'
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
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.JA_LISTResponse.JA_LISTResult
        let Info = (JSON.parse(Result))[0]
        this.sum = Info.fcount
      }).catch((error) => {
        this.$message({
          message: '接口报错!',
          type: 'error'
        })
        console.log(error)
      })
    },
    getList () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL><![CDATA[select FContractNo 合同号,b.fname 项目名称,b.FNumber 项目编号 from t_RPContract a left join t_Item_3001 b on a.fbase=b.FItemID order by FContractNo]]></FSQL>'
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
        if (Info.length > 1) {
          this.sum = Info[0].fcount
        }
        // Info.map((item, idx) => {
        //   let obj = {
        //     contractNo: item['合同号'],
        //     projectName: item['项目名称'],
        //     projectCode: item['项目编号']
        //   }
        //   this.resultData.push(obj)
        //   if (idx + 1 === Info.length) {
        //     this.loading = false
        //   }
        // })
        this.updateResultData(Info)
        // this.resultData = JSON.parse(HtmlStr)
        // this.loading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    enterEvent () {
      let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode
      if (keyCode === 13) {
        this.changeFilter()
      }
    },
    // 模糊查询
    mohuSearch () {
      if (this.formFilter.vagueSearch) {
        this.loading = true
        let newResult = []
        let keyArr = this.formFilter.vagueSearch.trim().split('*')
        var regStr = ''
        keyArr.map(function (item) {
          regStr = regStr + '.*' + item
          // regStr = regStr + '\\w*' + item
        })
        var reg = new RegExp(regStr)
        this.resultDataOrigin.map((item, idx) => {
          if (reg.test(item['合同号'])) {
            newResult.push(item)
          }
        })
        this.resultData = newResult
        this.loading = false
      } else {
        this.resultData = []
      }
    }
  }
}
</script>

<style lang='less' scoped>
.FilterTable{
  padding: 0;
  .FilterBlock{
    padding: 10px;
    // border: 1px solid #7bbfea;
    background: aliceblue;
    overflow-y: scroll;
  }
}
.sortBlock{
  height: 200px;
  overflow-y: scroll;
  text-align: left;
}
.vagueSearchBlock{
  // height: 50px;
  padding: 0 5px;
}
.WidthFull{
  width: 80%;
}
</style>
