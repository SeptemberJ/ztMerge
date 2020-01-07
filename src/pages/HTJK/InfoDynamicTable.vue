<template>
  <div class="InfoDynamicTable">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/FilterTable' }">项目进度管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目进度详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- <el-page-header class="MarginB_10" @back="goBack" content="项目详情"></el-page-header> -->
    <div v-loading="loading">
      <el-row>
        <!-- 基本信息 -->
        <el-col :span="24">
          <!-- <el-button type="info" size="small" icon="el-icon-close" @click="goBack"></el-button> -->
          <div class="ModuleTit TextAlignL">项目信息</div>
          <el-form ref="formBasic" :model="formBasic" label-width="85px" size="small" class="DisabledNormal MarginT_20"  style="padding-right: 20px;">
            <el-row>
              <el-col :span="6">
                <el-form-item label="隶属公司">
                  <el-input v-model="formBasic.subsidiary" disabled :title="formBasic.subsidiary"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户名称">
                  <el-input v-model="formBasic.customerName" disabled :title="formBasic.customerName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目名称">
                  <el-input v-model="formBasic.projectName" disabled :title="formBasic.projectName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="签约日期">
                  <el-input v-model="formBasic.qyrq" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="签约部门">
                  <el-input v-model="formBasic.signDepartment" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TextAlignL">
                <el-form-item label="商务人员">
                  <el-input v-model="formBasic.swry" clearable style="width:70%;"></el-input>
                  <el-popover
                    placement="right"
                    width="100"
                    trigger="click">
                    <div>
                      <p v-for="(people, idx) in swryHistory" :key="idx">{{people['商务人员']}} <span style="float:right;">{{people['Column1']}}</span></p>
                    </div>
                    <el-button type="text" style="width:25%;display: inline-block;" slot="reference">历史记录</el-button>
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TextAlignL">
                <el-form-item label="项目经理">
                  <el-input v-model="formBasic.xmjl" clearable style="width:70%;"></el-input>
                  <el-popover
                    placement="right"
                    width="100"
                    trigger="click">
                    <div>
                      <p v-for="(people, idx) in xmjlHistory" :key="idx">{{people['项目经理']}}  <span style="float:right;">{{people['Column1']}}</span></p>
                    </div>
                    <el-button type="text" style="width:25%;display: inline-block;" slot="reference">历史记录</el-button>
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开工日期">
                  <el-date-picker style="width: 100%;"
                    v-model="formBasic.kgrq"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="签约合同金额" label-width="100px">
                  <el-input v-model="formBasic.qyhtje"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="合同金额">
                  <el-input v-model="formBasic.htje" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="结算价">
                  <el-input v-model="formBasic.jsj" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="审计价">
                  <el-input v-model="formBasic.sjj" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="竣工日期">
                  <el-input v-model="formBasic.jgrq" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="预算毛利率" label-width="100px">
                  <el-input v-model="formBasic.ysmll" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="毛利率">
                  <el-input v-model="formBasic.mll" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="出货率">
                  <el-input v-model="formBasic.chl" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="收款率">
                  <el-input v-model="formBasic.skl" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="质保起">
                  <el-input v-model="formBasic.zbks" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="累计开票">
                  <el-input v-model="formBasic.ljkp" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="累计收款">
                  <el-input v-model="formBasic.ljsk" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="费用合计">
                  <el-input v-model="formBasic.fyhj" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="成本合计">
                  <el-input v-model="formBasic.cbhj" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="质保期">
                  <el-input v-model="formBasic.zbq" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="质保至">
                  <el-input v-model="formBasic.zbjs" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- <el-row>
              <el-col :span="6">
                <el-form-item label="完工日期">
                  <el-date-picker style="width: 100%;"
                    v-model="formBasic.wgrq"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row> -->

            <el-button class="MarginB_20" type="danger" size="small" @click="save">保 存</el-button>
          </el-form>
        </el-col>
        <!-- 收款比例 -->
        <el-col :span="24">
          <div class="ModuleTit TextAlignL">收款比例</div>
          <!-- <section v-if="receiptRateInfo.length > 0" class="TextAlignL MarginB_10" style="font-size: 14px;padding:0 5px 5px 20px;"> -->
          <section v-if="receiptRateInfo.length > 0" class="TextAlignL MarginB_10" style="font-size: 14px;height: 150px;overflow-y: scroll;padding:0 5px 5px 20px;">
            <!-- <el-row style="margin-bottom: 10px; font-weight: bold;">
              <el-col :span="4">项目</el-col>
              <el-col :span="4">实际比例</el-col>
              <el-col :span="4">应收金额</el-col>
              <el-col :span="4">实际金额</el-col>
              <el-col :span="4">未收金额</el-col>
              <el-col :span="4">收款时间</el-col>
            </el-row>
            <div v-for="(item, idx) in receiptRateInfo" :key="idx" class="text item MarginB_10">
              <el-row>
                <el-col :span="4">{{idx + 1}}. {{item.FName}}</el-col>
                <el-col :span="4">{{item.fpercent}}</el-col>
                <el-col :span="4">{{item.fyingshou}}</el-col>
                <el-col :span="4">{{item.fshiji}}</el-col>
                <el-col :span="4">{{(item.fyingshou - item.fshiji).toFixed(2)}}</el-col>
                <el-col :span="4">{{item.fdate}}</el-col>
              </el-row>
            </div> -->
            <el-row>
              <el-col :span="19">
                <el-row style="margin-bottom: 10px; font-weight: bold;">
                  <el-col :span="4">项目</el-col>
                  <el-col :span="2" class="TextAlignR">实际比例</el-col>
                  <el-col :span="4" class="TextAlignR">应收金额</el-col>
                  <el-col :span="4" class="TextAlignR">实际金额</el-col>
                  <el-col :span="4" class="TextAlignR">未收金额</el-col>
                  <el-col :span="6" class="TextAlignR">收款时间</el-col>
                </el-row>
              </el-col>
              <el-col :span="5" class="TextAlignR">
                <el-row style="margin-bottom: 10px; font-weight: bold;">
                  <el-col>收款条件</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="19">
                <div v-for="(item, idx) in receiptRateInfo" :key="idx" class="text item MarginB_10">
                  <el-row>
                    <el-col :span="4">{{idx + 1}}. {{item.FName}}</el-col>
                    <el-col :span="2" class="TextAlignR">{{item.fpercent}}</el-col>
                    <el-col :span="4" class="TextAlignR">{{(item.fyingshou).toFixed(2)}}</el-col>
                    <el-col :span="4" class="TextAlignR">{{(item.fshiji).toFixed(2)}}</el-col>
                    <el-col :span="4" class="TextAlignR">{{(item.fyingshou - item.fshiji).toFixed(2)}}</el-col>
                    <el-col :span="6" class="TextAlignR">
                      <el-date-picker style="width: 65%;" size="mini" :clearable="false" @change="(value) => saveDate(value, item.FName, item.fyingshou - item.fshiji, idx)"
                        v-model="item.fdate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                      <!-- <el-button size="mini" type="danger" @click="saveDate(item.FName, item.fdate)">保存</el-button> -->
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="5" class="TextAlignR">
                <el-input style="width: 90%;" type="textarea" :rows="4" placeholder="请输入收款条件" v-model="receiptRateInfo[0].Fnote"></el-input>
                <el-button size="mini" type="danger" style="margin-top: 5px;" @click="saveCollectionCondition(receiptRateInfo[0].Fnote)">保存</el-button>
              </el-col>
            </el-row>
          </section>
          <!-- 无数据 -->
          <section v-else class="TextAlignL MarginB_10" style="font-size: 14px;height: 100px;">
            <div style="text-align: center;line-height: 100px;" >暂无数据</div>
          </section>
        </el-col>
        <!-- 警报信息 -->
        <!-- <el-col :span="12">
          <div class="ModuleTit TextAlignL">警报信息</div>
          <section class="TextAlignL" style="font-size: 14px;height: 140px;overflow-y: scroll;">
            <div v-for="(item, idx) in warnList" :key="idx" class="text item" style="padding: 5px 5px 5px 20px;">
              <span>{{idx + 1}}. {{item}}</span>
            </div>
          </section>
        </el-col> -->
        <!-- 工程项目总进度 -->
        <!-- 1代表可操作（黄色），0代表不可操作（灰色），2代表操作完成（绿色），3代表警告(红色), 当前的流程蓝色 -->
        <el-col :span="24" class="TextAlignL"><span class="ModuleTit">工程项目总进度</span></el-col>
        <el-col :span="24" class="StepWrap TextAlignL" style="width: 100%;overflow-x: scroll;">
          <div :class="{SetpItem: true, 'NotAllowed': item.status == 0}" v-for="(item, idx) in steps" :key="idx" @click="changeStep(idx)">
            <div :class="{'LineItem':true, 'bgGrey': item.status == 0, 'bgYellow': item.status == 1 && curLuiCheng != item.tit, 'bgBlue': item.status == 1 && curLuiCheng == item.tit, 'bgGreen': item.status == 2, 'bgRed': item.status == 3 || item.status == 1 && idx < curLuiChengIdx}" v-show="idx > 0"></div>
            <div class="DotItemwrap">
              <div class="TextItem">
                <!-- <p :class="{'colorYellow': item.node.color == 0, 'colorRed': item.node.color == 3, 'colorWhite': item.node.color == 2, 'fontWeight': item.node.color == 3}">{{item.node.txt}}</p> -->
                <p style="height: 23px;">{{item.tit == '合同签订' || item.tit == '设备到现场' || item.tit == '审价结算' || item.tit == '质保结束' || item.tit == '合同到期' ? formBasic.swry : formBasic.xmjl}}</p>
                <!-- 未收金额显示 -->
                <p>
                  <span v-if="item.tit != '质保结束'" :class="{'colorRed fontWeight bigSize': item.dateOver == 1 && item.money >= 0, 'colorWhite': item.dateOver != 1 || item.money < 0}">{{item.money}}</span>
                  <span v-else class="colorRed bigSize fontWeight">{{item.dateOver == 1 &&  item.money >= 0 ? item.money: ''}}</span>
                </p>
                <!-- <p>
                  <span v-if="item.tit != '质保结束'" :class="{'colorYellow': item.node.color == 0, 'colorRed fontWeight bigSize': item.dateOver == 1 &&  item.money >= 0, 'colorWhite': item.node.color == 2}">{{ item.node.color == 0 ? '' : item.money}}</span>
                  <span v-else class="colorRed bigSize fontWeight">{{item.dateOver == 1 &&  item.money >= 0 ? item.money: ''}}</span>
                </p> -->
              </div>
              <div :class="{'DotItem':true, 'bgGrey': item.status == 0, 'bgYellow': item.status == 1 && curLuiCheng != item.tit, 'bgBlue': item.status == 1 && curLuiCheng == item.tit, 'bgGreen': item.status == 2, 'bgRed': item.status == 3 || item.status == 1 && idx < curLuiChengIdx}"></div>
              <div class="TextItem">
                <p>{{item.tit}}</p>
                <!-- --{{item.dateOver}}-- {{item.node.color}} --{{item.money}} -->
              </div>
            </div>
          </div>
        </el-col>
        <!-- 返回 -->
        <el-col :span="24" class="MarginT_20 MarginB_20">
          <el-button type="info" size="small" icon="el-icon-arrow-left" @click="goBack">返 回</el-button>
          <el-button type="primary" size="small" @click="toCost">成 本</el-button>
          <el-button type="warning" size="small" @click="toOutlay">费 用</el-button>
        </el-col>
      </el-row>
      <!-- ProcessEdit -->
      <ProcessEdit v-if="ifEdit" :curTimeStamp="curTimeStamp" :processStatus="processStatus" :processName="processName" :curEditIdx="curEditIdx" :curLuiChengIdx="curLuiChengIdx" :contractNo="formBasic.contractNo" @markRed="markRed" @refresh="getInfor" @toggleProcessDialog="toggleProcessDialog"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { Loading } from 'element-ui'
// import $ from 'jquery'
import ProcessEdit from '../../components/HTJK/ProcessEdit'
import {compareNYR} from '../../util/utils'
export default {
  name: 'InfoDynamicTable',
  data () {
    return {
      loading: false,
      ifEdit: false,
      processName: '',
      curLuiCheng: '',
      curLuiChengIdx: '',
      curEditIdx: '',
      processStatus: '',
      formBasic: {},
      xmjlHistory: [],
      swryHistory: [],
      receiptRateInfo: [],
      warnList: ['预收款未收齐'],
      steps: [],
      curTimeStamp: '',
      liuCheng: ['放号', '合同签订', '进场施工', '设备到现场', '隐蔽验收', '安装调试', '竣工验收', '审价结算', '项目移交', '质保开始', '质保结束'],
      liuChengSecond: ['放号', '合同签订', '第一季度', '第二季度', '第三季度', '第四季度', '合同到期']
    }
  },
  components: {
    ProcessEdit
  },
  computed: {
    ...mapState({
      cuXMMC: state => state.cuXMMC,
      curContractNo: state => state.curContractNo,
      curDB: state => state.curDB,
      userInfo: state => state.userInfo
    }),
    formFilter: {
      get: function () {
        return this.$store.state.formFilter
      },
      set: function (newValue) {
        this.$store.state.formFilter = newValue
      }
    }
  },
  created () {
    this.getInfor()
    this.getxmjl()
    this.getSwry()
  },
  methods: {
    toggleProcessDialog (val) {
      this.ifEdit = val
    },
    // 返回
    goBack () {
      this.$router.push({name: 'FilterTable'})
    },
    // 保存编辑信息
    save () {
      let data = {
        items: [
          {
            FContractNo: this.curContractNo,
            FDB: this.curDB,
            f1: this.formBasic.swry,
            f2: this.formBasic.xmjl,
            famount: this.formBasic.qyhtje,
            fsdate: this.formBasic.kgrq ? this.formBasic.kgrq : '',
            fedate: this.formBasic.wgrq ? this.formBasic.wgrq : ''
          }
        ]
      }
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<Contractdetail xmlns="http://tempuri.org/">'
      tmpData += '<FJSONMSG>' + JSON.stringify(data) + '</FJSONMSG>'
      tmpData += '</Contractdetail>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'
      this.Http.post('Contractdetail', tmpData
      ).then(res => {
        // let xml = res.data
        // let parser = new DOMParser()
        // let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // // 提取数据
        // let Result = xmlDoc.getElementsByTagName('ContractdetailResponse')[0].getElementsByTagName('ContractdetailResult')[0]
        // let HtmlStr = $(Result).html()
        // let Info = (JSON.parse(HtmlStr))[0]
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.ContractdetailResponse.ContractdetailResult
        let Info = (JSON.parse(Result))[0]
        if (Info.code === '1') {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
          this.getInfor()
          this.getxmjl()
          this.getSwry()
        } else {
          this.$message({
            message: '保存失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    changeStep (idx) {
      this.processStatus = this.steps[idx].status
      this.curTimeStamp = new Date().getTime()
      this.processName = this.steps[idx].tit
      switch (this.steps[idx].status) {
        case 0:
          this.$message({
            message: '该流程不可进行编辑！',
            type: 'warning'
          })
          break
        // case 2:
        //   this.toggleProcessDialog(true)
        //   break
        default:
          if (!this.steps[idx].author) {
            this.$message({
              message: '对不起，您没有权限对此流程进行编辑！',
              type: 'warning'
            })
          } else {
            this.curEditIdx = idx
            this.toggleProcessDialog(true)
          }
          // if (this.curLuiCheng !== this.steps[idx].tit) {
          //   this.$message({
          //     message: '请按照流程先后操作，该流程还不能进行编辑！',
          //     type: 'warning'
          //   })
          // } else {
          //   this.toggleProcessDialog(true)
          // }
      }
    },
    async getInfor () {
      this.loading = true
      // let loadingInstance = Loading.service({
      //   text: '加载中',
      //   target: document.querySelector('.dg'),
      //   lock: true,
      //   fullscreen: false,
      //   spinner: 'el-icon-loading'
      // })
      Promise.all([this.getReceiptRate(), this.getAuthor(), this.getMainInfo()]).then((result) => {
        console.log('ReceiptRate and Author and Info', result)
        this.getBasicInfor(result[0], result[1], result[2], null)
      }).catch((error) => {
        console.log(error)
      })
    },
    getBasicInfor (ReceiptRate, Author, Info, loadingInstance) {
      if (Info) {
        this.formBasic = {
          isWbxm: Info['是否维保项目'] === '是',
          subsidiary: Info['隶属公司'],
          contractNo: Info['合同号'],
          projectName: Info['项目名称'],
          signDepartment: Info['部门'],
          customerName: Info['客户'],
          // isSigned: Info['是否先签约'],
          swry: Info['商务人员'],
          qyrq: Info['签约日期'],
          htje: Info['合同金额'],
          qyhtje: Info['签约合同金额'],
          ysmll: Info['预算毛利率'],
          mll: Info['毛利率'],
          xmjl: Info['项目经理'],
          kgrq: Info['开工日期'] ? Info['开工日期'].slice(0, 10) : '',
          wgrq: Info['完工日期'] ? Info['完工日期'].slice(0, 10) : '',
          jsj: Info['结算价'],
          sjj: Info['审计价'],
          ljkp: Info['累计开票'],
          ljsk: Info['累计收款'],
          chl: Info['出货率'],
          skl: Info['收款率'],
          jgrq: Info['竣工日期'],
          fyhj: Info['费用合计'].toFixed(2),
          cbhj: Info['成本合计'].toFixed(2),
          zbq: Info['质保期'],
          zbks: Info['质保起'],
          zbjs: Info['质保至'],
          wsje: Info['未收金额']
        }
        if (Info['是否维保项目'] === '否') {
          this.steps = [
            {status: Info['放号'], dateOver: '', tit: '放号', author: Author['放号'], money: '', node: {txt: '--', color: 2}},
            {status: Info['合同签订'], dateOver: compareNYR(ReceiptRate[0].fdate), tit: '合同签订', author: Author['合同签订'], money: (ReceiptRate[0].fyingshou - ReceiptRate[0].fshiji).toFixed(2), node: {txt: '--', color: 2}},
            {status: Info['进场施工'], dateOver: compareNYR(ReceiptRate[1].fdate), tit: '进场施工', author: Author['进场施工'], money: (ReceiptRate[1].fyingshou - ReceiptRate[1].fshiji).toFixed(2), node: {txt: '预付款', color: Info['f6']}},
            {status: Info['设备到现场'], dateOver: compareNYR(ReceiptRate[2].fdate), tit: '设备到现场', author: Author['设备到现场'], money: (ReceiptRate[2].fyingshou - ReceiptRate[2].fshiji).toFixed(2), node: {txt: '货到付款', color: Info['f7']}},
            {status: Info['隐蔽验收'], dateOver: compareNYR(ReceiptRate[3].fdate), tit: '隐蔽验收', author: Author['隐蔽验收'], money: (ReceiptRate[3].fyingshou - ReceiptRate[3].fshiji).toFixed(2), node: {txt: '隐蔽验收', color: Info['f8']}},
            {status: Info['安装调试'], dateOver: compareNYR(ReceiptRate[4].fdate), tit: '安装调试', author: Author['安装调试'], money: (ReceiptRate[4].fyingshou - ReceiptRate[4].fshiji).toFixed(2), node: {txt: '--', color: 2}},
            {status: Info['竣工验收'], dateOver: compareNYR(ReceiptRate[5].fdate), tit: '竣工验收', author: Author['竣工验收'], money: (ReceiptRate[5].fyingshou - ReceiptRate[5].fshiji).toFixed(2), node: {txt: '合同项目验收', color: Info['f9']}},
            {status: Info['审价结算'], dateOver: compareNYR(ReceiptRate[6].fdate), tit: '审价结算', author: Author['审价结算'], money: (ReceiptRate[6].fyingshou - ReceiptRate[6]).toFixed(2).fshiji, node: {txt: '审计审价', color: Info['f10']}},
            {status: Info['项目移交'], dateOver: '', tit: '项目移交', author: Author['项目移交'], money: '', node: {txt: '--', color: 2}},
            {status: Info['质保开始'], dateOver: '', tit: '质保开始', author: Author['质保开始'], money: '', node: {txt: '--', color: 2}},
            {status: Info['质保结束'], dateOver: compareNYR(ReceiptRate[7].fdate), tit: '质保结束', author: Author['质保结束'], money: (ReceiptRate[7].fyingshou - ReceiptRate[7].fshiji).toFixed(2), node: {txt: '质保金', color: Info['f11']}}
          ]
        } else {
          this.steps = [
            {status: Info['放号'], dateOver: '', tit: '放号', author: true, money: '', node: {txt: '--', color: 2}},
            {status: Info['合同签订'], dateOver: '', tit: '合同签订', author: true, money: '', node: {txt: '--', color: 2}},
            {status: Info['第一季度'], dateOver: compareNYR(ReceiptRate[0].fdate), tit: '第一季度', author: true, money: (ReceiptRate[0].fyingshou - ReceiptRate[0].fshiji).toFixed(2), node: {txt: '第一季度', color: Info['f1']}},
            {status: Info['第二季度'], dateOver: compareNYR(ReceiptRate[1].fdate), tit: '第二季度', author: true, money: (ReceiptRate[1].fyingshou - ReceiptRate[1].fshiji).toFixed(2), node: {txt: '第二季度', color: Info['f2']}},
            {status: Info['第三季度'], dateOver: compareNYR(ReceiptRate[2].fdate), tit: '第三季度', author: true, money: (ReceiptRate[2].fyingshou - ReceiptRate[2].fshiji).toFixed(2), node: {txt: '第三季度', color: Info['f3']}},
            {status: Info['第四季度'], dateOver: compareNYR(ReceiptRate[3].fdate), tit: '第四季度', author: true, money: (ReceiptRate[3].fyingshou - ReceiptRate[3].fshiji).toFixed(2), node: {txt: '第四季度', color: Info['f4']}},
            {status: Info['合同到期'], dateOver: compareNYR(ReceiptRate[4].fdate), tit: '合同到期', author: true, money: (ReceiptRate[4].fyingshou - ReceiptRate[4].fshiji).toFixed(2), node: {txt: '合同到期', color: Info['f5']}}
          ]
        }
        // console.log('steps', this.steps)
        // 判断当前流程
        let LiuChengList = Info['是否维保项目'] === '否' ? this.liuCheng : this.liuChengSecond
        if (Info['放号'] === 1) {
          this.curLuiCheng = ''
          this.curLuiChengIdx = 0
        } else {
          for (let i = 0; i < 11; i++) {
            if (Info[LiuChengList[i]] === 2 && Info[LiuChengList[i + 1]] !== 0) {
              this.curLuiCheng = LiuChengList[i + 1]
              this.curLuiChengIdx = Number(i) + 1
            }
            // 有禁止操作项时
            if (Info[LiuChengList[i]] === 2 && Info[LiuChengList[i + 1]] === 0) {
              for (let j = i + 1; j < LiuChengList.length; j++) {
                if (Info[LiuChengList[j]] === 1) {
                  this.curLuiCheng = LiuChengList[j] ? LiuChengList[j] : ''
                  this.curLuiChengIdx = Number(j) ? Number(j) : 100
                  break
                }
              }
            }
          }
        }
        this.receiptRateInfo = ReceiptRate
        this.loading = false
        // loadingInstance.close()
      } else {
        this.$message({
          message: '暂无信息!',
          type: 'info'
        })
        this.loading = false
        // loadingInstance.close()
      }
    },
    getSwry () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select f1 商务人员,convert(varchar(50),f1date,23) from Z_Contract_log where isnull(f1,'')<>'' and FContractNo='" + this.curContractNo + "' and fdb='" + this.curDB + "'  order by fid]]></FSQL>"
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
        this.swryHistory = Info
      }).catch((error) => {
        console.log(error)
      })
    },
    getxmjl () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select f2 项目经理,convert(varchar(50),f2date,23) from Z_Contract_log where isnull(f2,'')<>'' and FContractNo='" + this.curContractNo + "'and fdb='" + this.curDB + "' order by fid]]></FSQL>"
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
        this.xmjlHistory = Info
      }).catch((error) => {
        console.log(error)
      })
    },
    getMainInfo () {
      let contractSumS = "''"
      let contractSumE = "''"
      if (this.formFilter.contractSumS) {
        contractSumS = this.formFilter.contractSumS
      }
      if (this.formFilter.contractSumE) {
        contractSumE = this.formFilter.contractSumE
      }
      return new Promise((resolve, reject) => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>exec [Z_ContractList_detail] '" + this.cuXMMC + "','" + this.formFilter.signDepartment + "','" + this.formFilter.customer + "','" + this.formFilter.projectNumber + "'," + contractSumS + ',' + contractSumE + ',' + this.formFilter.signYear + ",'" + this.formFilter.industryType + "','" + this.formFilter.projectType + "','" + this.formFilter.affiliatedCompany + "'," + this.userInfo.fempid + '</FSQL>'
        // tmpData += "<FSQL><![CDATA[SELECT * FROM Z_Contract WHERE  合同号='" + this.curContractNo + "' and 账套名='" + this.curDB + "']]></FSQL>"
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
          resolve(Info)
          console.log('detail', Info)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getReceiptRate () {
      return new Promise((resolve, reject) => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[exec z_skbl '" + this.curContractNo + "','" + this.curDB + "']]></FSQL>"
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
          resolve(Info)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getAuthor () {
      return new Promise((resolve, reject) => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += '<FSQL><![CDATA[select isnull(f_102,0)放号,isnull(f_103,0)合同签订,isnull(f_104,0)进场施工,isnull(f_105,0)设备到现场,isnull(f_106,0)隐蔽验收,isnull(f_107,0)安装调试,isnull(f_108,0)竣工验收,isnull(f_109,0)审价结算,isnull(f_110,0)项目移交,isnull(f_111,0)质保开始,isnull(f_112,0)质保结束 from t_emp where fitemid=' + this.userInfo.fempid + ']]></FSQL>'
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
          resolve(Info)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // 标记红色
    markRed (Idx) {
      this.steps.map((step, idx) => {
        if (step.status === 1 && idx < Idx) {
          var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
          tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
          tmpData += '<soap:Body> '
          tmpData += '<jindu xmlns="http://tempuri.org/">'
          tmpData += '<FContractNo>' + this.curContractNo + '</FContractNo>'
          tmpData += '<FType>' + step.tit + '</FType>'
          tmpData += '<FColor>' + 3 + '</FColor>'
          tmpData += '</jindu>'
          tmpData += '</soap:Body>'
          tmpData += '</soap:Envelope>'
          this.Http.post('jindu', tmpData
          ).then(res => {
            // let xml = res.data
            // let parser = new DOMParser()
            // let xmlDoc = parser.parseFromString(xml, 'text/xml')
            // // 提取数据
            // let Result = xmlDoc.getElementsByTagName('jinduResponse')[0].getElementsByTagName('jinduResult')[0]
            // let HtmlStr = $(Result).html()
            // let Info = (JSON.parse(HtmlStr))[0]
            // if (Info.code === '1') {
            //   // this.$message({
            //   //   message: '确认红色成功!',
            //   //   type: 'success'
            //   // })
            //   // this.refresh()
            // } else {
            //   // this.$message({
            //   //   message: '确认红色失败!',
            //   //   type: 'error'
            //   // })
            // }
          }).catch((error) => {
            console.log(error)
          })
        }
        if (idx === 10) {
          this.getInfor()
        }
      })
    },
    toOutlay () {
      this.$router.push({name: 'HTJKOutlay'})
    },
    toCost () {
      this.$router.push({name: 'HTJKCost'})
    },
    saveDate (FDate, FName, FAmount, Idx) {
      let Result = 1
      let timeStamp = (new Date(FDate)).getTime()
      let timeStampCur = (new Date()).getTime()
      switch (FName) {
        case '预收款':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[1].node.color = 3
            this.steps[1].dateOver = 1
          } else {
            this.steps[1].node.color = 1
            this.steps[1].dateOver = 0
          }
          break
        case '设备交货前收款':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[2].node.color = 3
            this.steps[2].dateOver = 1
          } else {
            this.steps[2].node.color = 1
            this.steps[2].dateOver = 0
          }
          break
        case '设备交货后收款':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[3].node.color = 3
            this.steps[3].dateOver = 1
          } else {
            this.steps[3].node.color = 1
            this.steps[3].dateOver = 0
          }
          break
        case '隐蔽验收':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[4].node.color = 3
            this.steps[4].dateOver = 1
          } else {
            this.steps[4].node.color = 1
            this.steps[4].dateOver = 0
          }
          break
        case '安装调试':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[5].node.color = 3
            this.steps[5].dateOver = 1
          } else {
            this.steps[5].node.color = 1
            this.steps[5].dateOver = 0
          }
          break
        case '合同项目验收后收款':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[6].node.color = 3
            this.steps[6].dateOver = 1
          } else {
            this.steps[6].node.color = 1
            this.steps[6].dateOver = 0
          }
          break
        case '审计审价':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[7].node.color = 3
            this.steps[7].dateOver = 1
          } else {
            this.steps[7].node.color = 1
            this.steps[7].dateOver = 0
          }
          break
        case '质保款':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[10].node.color = 3
            this.steps[10].dateOver = 1
          } else {
            this.steps[10].node.color = 1
            this.steps[10].dateOver = 0
          }
          break
        case '第一季度':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[2].node.color = 3
            this.steps[2].dateOver = 1
          } else {
            this.steps[2].node.color = 1
            this.steps[2].dateOver = 0
          }
          break
        case '第二季度':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[3].node.color = 3
            this.steps[3].dateOver = 1
          } else {
            this.steps[3].node.color = 1
            this.steps[3].dateOver = 0
          }
          break
        case '第三季度':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[4].node.color = 3
            this.steps[4].dateOver = 1
          } else {
            this.steps[4].node.color = 1
            this.steps[4].dateOver = 0
          }
          break
        case '第四季度':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[5].node.color = 3
            this.steps[5].dateOver = 1
          } else {
            this.steps[5].node.color = 1
            this.steps[5].dateOver = 0
          }
          break
        case '合同到期':
          if (FAmount >= 0 && timeStamp < timeStampCur) {
            Result = 3
            this.steps[6].node.color = 3
            this.steps[6].dateOver = 1
          } else {
            this.steps[6].node.color = 1
            this.steps[6].dateOver = 0
          }
          break
      }
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<skDate  xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.curContractNo + '</FContractNo>'
      tmpData += '<FDB>' + this.curDB + '</FDB>'
      tmpData += '<FName>' + FName + '</FName>'
      tmpData += '<FDate>' + FDate + '</FDate>'
      tmpData += '<Result>' + Result + '</Result>'
      tmpData += '</skDate >'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'
      this.Http.post('skDate', tmpData
      ).then(res => {
        // let xml = res.data
        // let parser = new DOMParser()
        // let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // // 提取数据
        // let Result = xmlDoc.getElementsByTagName('skDateResponse')[0].getElementsByTagName('skDateResult')[0]
        // let HtmlStr = $(Result).html()
        // let Info = (JSON.parse(HtmlStr))[0]
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.skDateResponse.skDateResult
        let Info = (JSON.parse(Result))[0]
        if (Info.code === '1') {
          this.$message({
            message: '收款时间保存成功!',
            type: 'success'
          })
        } else {
          this.$message({
            message: '收款时间保存失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    saveCollectionCondition (FNote) {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<skNote  xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.curContractNo + '</FContractNo>'
      tmpData += '<FDB>' + this.curDB + '</FDB>'
      tmpData += '<FNote>' + FNote + '</FNote>'
      tmpData += '</skNote >'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'
      this.Http.post('skNote', tmpData
      ).then(res => {
        // let xml = res.data
        // let parser = new DOMParser()
        // let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // // 提取数据
        // let Result = xmlDoc.getElementsByTagName('skNoteResponse')[0].getElementsByTagName('skNoteResult')[0]
        // let HtmlStr = $(Result).html()
        // let Info = (JSON.parse(HtmlStr))[0]
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.skNoteResponse.skNoteResult
        let Info = (JSON.parse(Result))[0]
        if (Info.code === '1') {
          this.$message({
            message: '收款条件保存成功!',
            type: 'success'
          })
        } else {
          this.$message({
            message: '收款条件保存失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@stepItemWidth: 150px;
.InfoDynamicTable{
  background: #fff;
  padding: 20px;
}
.mainContainer {
  display:flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  -webkit-align-content: stretch;
  align-content: stretch;
}
.topLeft {
  width:70%;
  // background-color:lightgreen;
}
.topRight {
  // background-color: red;
  -webkit-flex: 1;
  flex:1;
  position:relative;
}
.ModuleTit{
  width: calc(100% - 5px);
  height: 42px;
  background: #ddd;
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 42px;
  font-weight: bold;
  margin-bottom: 10px;
}
.StepWrap{
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
.SetpItem{
  width: @stepItemWidth;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  .DotItemwrap{
    width: @stepItemWidth/2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .DotItem{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .LineItem{
    width: @stepItemWidth/2;
    height: 2px;
    float: left;
  }
}
.TextItem{
  height: 30px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.bgGreen{
  background: green;
}
.bgYellow{
  background: yellow;
}
.bgBlue{
  background: blue;
}
.bgRed{
  background: red;
}
.bgGrey{
  background: grey;
}
.colorYellow{
  color: yellow;
}
.colorRed{
  color: red;
}
.colorWhite{
  color: white;
}
.fontWeight{
  font-weight: bold;
}
.bigSize{
  font-size: 14px;
}

</style>
