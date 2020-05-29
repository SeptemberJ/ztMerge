<template>
  <div class="Contract">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="MarginT_10">
      <el-breadcrumb-item :to="{ path: '/ContractList' }">分包合同列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- <h2 class="MarginB_20">合同（应付）</h2> -->
    <el-row class="MarginT_20">
      <el-form ref="formContract" :rules="rules" label-position="left" :model="formContract" label-width="80px" size="small" style="padding: 10px;">
        <el-col :span="24">
          <el-row>
            <el-col :span="6">
              <el-form-item label="合同日期" prop="contractDate">
                <el-date-picker prop="contractDate" style="width: 90%;float:left"
                  v-model="formContract.contractDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同名称" prop="contractName">
                <el-input v-model="formContract.contractName" clearable placeholder="请输入合同名称" style="width: 90%;float:left"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="施工队" prop="constructionTeam">
                <el-select v-model="formContract.constructionTeam" placeholder="请选择所属公司" style="width: 90%;float:left">
                  <el-option
                    v-for="item in constructionTeamList"
                    :key="item.fitemid"
                    :label="item.fname"
                    :value="item.fitemid">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="施工队" prop="constructionTeam">
                <!-- <el-input v-model="formContract.constructionTeam" clearable placeholder="请输入施工队" style="width: 90%;float:left"></el-input> -->
                <el-select v-model="formContract.constructionTeam" filterable remote :remote-method="changeTeam" placeholder="请输入关键字" style="width: 90%;float:left">
                  <el-option
                    v-for="item in constructionTeamList"
                    :key="item.fitemid"
                    :label="item.fname"
                    :value="item.fitemid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门" prop="department">
                <el-select v-model="formContract.department" filterable remote :remote-method="changeDepartment" placeholder="请输入关键字" style="width: 100%;float:left">
                  <el-option
                    v-for="item in departmentList"
                    :key="item.fitemid"
                    :label="item.fname"
                    :value="item.fitemid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="6">
              <el-form-item label="业务员" prop="salesman">
                <el-select v-model="formContract.salesman" filterable remote :remote-method="changeSalesman" placeholder="请输入关键字" style="width: 90%;float:left">
                  <el-option
                    v-for="item in salesmanList"
                    :key="item.fitemid"
                    :label="item.fname"
                    :value="item.fitemid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目编号" prop="projectCode">
                <el-select v-model="formContract.projectCode" filterable remote :remote-method="changeProject" placeholder="请输入关键字" style="width: 90%;float:left">
                  <el-option
                    v-for="item in projectList"
                    :key="item.fitemid"
                    :label="item.fname"
                    :value="item.fitemid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="formContract.companyName" clearable placeholder="请输入公司名称" style="width: 90%;float:left"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属公司" prop="affiliatedCompany">
                <el-select v-model="formContract.affiliatedCompany" placeholder="请选择所属公司" style="width: 90%;float:left">
                  <el-option
                    v-for="item in affiliatedCompanyList"
                    :key="item.fitemid"
                    :label="item.fname"
                    :value="item.fitemid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-form>
    </el-row>
    <!-- list -->
    <el-table
      ref="singleTable"
      :summary-method="getSummaries"
      show-summary
      :data="formAdd.list"
      style="width: 100%">
      <el-table-column
        label="行号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="产品名称"
        width="170">
        <template slot-scope="scope">
          <el-select v-model="scope.row.fitemid" filterable remote :filter-method="(value) => filterMethodPCode(value, scope.$index)" @change="(value) => changePCode(value, scope.$index)" size="mini" placeholder="请输入关键字" style="width: 95%;margin: 0 auto;">
            <el-option
              v-for="item in scope.row.productionCodeList"
              :key="item.fitemid"
              :label="item.fname"
              :value="item.fitemid">
              <span style="float: left">{{ item.fname }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.fnumber }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px;margin-right: 15px;">{{ item.fmodel }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        property="fnumber"
        label="产品代码"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="fmodel"
        label="规格型号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="数量"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pamount" @change="calculate(scope.$index)" size="mini" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="含税单价"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pprice" @change="calculate(scope.$index)" size="mini" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="价税合计"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.psum" size="mini" disabled clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.pnote" size="mini" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="funit"
        label="计量单位"
        width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="删除"
          width="80">
          <template slot-scope="scope">
            <span class="CursorPointer" @click="remove(scope.$index)"><i class="el-icon-delete"></i></span>
          </template>
      </el-table-column>
    </el-table>
    <section class="MarginT_20">
      <el-button icon="el-icon-plus" size="mini" @click="addLine">新增一行</el-button>
    </section>
    <!-- 付款比列 -->
    <!-- <section class="MarginT_20 MarginB_20">
      <p class="TextAlignL ModuleTit">付款比列</p>
      <el-row class="TextAlignL MarginB_10" style="font-size: 14px;padding:0 5px 5px 20px;">
        <el-col :span="20">
          <el-row style="margin-bottom: 10px; font-weight: bold;">
            <el-col :span="3">项目</el-col>
            <el-col :span="4">实际比例(%)</el-col>
            <el-col :span="4">应付金额</el-col>
            <el-col :span="4">实际金额</el-col>
            <el-col :span="4">未付金额</el-col>
            <el-col :span="5">付款时间</el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row style="margin-bottom: 10px; font-weight: bold;">
            <el-col>付款条件</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-row class="TextAlignL" style="font-size: 14px;padding:0 5px 5px 20px;">
            <el-col :span="3">1. 进场后</el-col>
            <el-col :span="4"><el-input v-model="jch.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{jch.yfje}}</el-col>
            <el-col :span="4"><el-input v-model="jch.sjje" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{jch.yfje - jch.sjje}}</el-col>
            <el-col :span="5">
              <el-date-picker style="width: 65%;" size="mini"
                v-model="jch.fdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="TextAlignL" style="font-size: 14px;padding:0 5px 5px 20px;">
            <el-col :span="3">2. 隐蔽验收</el-col>
            <el-col :span="4"><el-input v-model="ybys.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{ybys.yfje}}</el-col>
            <el-col :span="4"><el-input v-model="ybys.sjje" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{ybys.yfje - ybys.sjje}}</el-col>
            <el-col :span="5">
              <el-date-picker style="width: 65%;" size="mini"
                v-model="ybys.fdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="TextAlignL" style="font-size: 14px;padding:0 5px 5px 20px;">
            <el-col :span="3">3. 竣工验收</el-col>
            <el-col :span="4"><el-input v-model="jgys.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{jgys.yfje}}</el-col>
            <el-col :span="4"><el-input v-model="jgys.sjje" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{jgys.yfje - jgys.sjje}}</el-col>
            <el-col :span="5">
              <el-date-picker style="width: 65%;" size="mini"
                v-model="jgys.fdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="TextAlignL" style="font-size: 14px;padding:0 5px 5px 20px;">
            <el-col :span="3">4. 质保期</el-col>
            <el-col :span="4"><el-input v-model="zbq.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{zbq.yfje}}</el-col>
            <el-col :span="4"><el-input v-model="zbq.sjje" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="4" style="padding-top: 6px;">{{zbq.yfje - zbq.sjje}}</el-col>
            <el-col :span="5">
              <el-date-picker style="width: 65%;" size="mini"
                v-model="zbq.fdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-input type="textarea" :rows="5" placeholder="请输入付款条件" v-model="fkNote" style="width:95%;"></el-input>
        </el-col>
      </el-row>
    </section> -->
    <!-- 付款方式 -->
    <section class="MarginT_20 MarginB_20">
      <!-- {{azfee}} -- {{psumTotal}} -- {{psumTotal - azfee}} -->
      <p class="TextAlignL ModuleTit">付款方式</p>
      <el-row class="TextAlignL MarginB_10" style="font-size: 14px;padding:0 5px 5px 5px;">
        <!-- 安装付款 -->
        <el-col :span="12" class="TextAlignC">
          <el-row style="padding-bottom: 10px;border-bottom: 1px solid #DCDFE6;">安装付款</el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6">摘要</el-col>
            <el-col :span="6">付款比例(%)</el-col>
            <el-col :span="6">金额</el-col>
            <el-col :span="6">备注</el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6" style="padding-top: 6px;">进场后</el-col>
            <el-col :span="6"><el-input v-model="jch.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{jch.yfje}}</el-col>
            <el-col :span="6"><el-input v-model="jch.fnote" size="mini" style="width: 85%;"></el-input></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6" style="padding-top: 6px;">隐蔽验收</el-col>
            <el-col :span="6"><el-input v-model="ybys.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{ybys.yfje}}</el-col>
            <el-col :span="6"><el-input v-model="ybys.fnote" size="mini" style="width: 85%;"></el-input></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6" style="padding-top: 6px;">竣工验收</el-col>
            <el-col :span="6"><el-input v-model="jgys.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{jgys.yfje}}</el-col>
            <el-col :span="6"><el-input v-model="jgys.fnote" size="mini" style="width: 85%;"></el-input></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6" style="padding-top: 6px;">质保期</el-col>
            <el-col :span="6"><el-input v-model="zbq.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{zbq.yfje}}</el-col>
            <el-col :span="6"><el-input v-model="zbq.fnote" size="mini" style="width: 85%;"></el-input></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6">合计</el-col>
            <el-col :span="6"><el-input style="opacity:0;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{(Number(jch.yfje) + Number(ybys.yfje) + Number(jgys.yfje) + Number(zbq.yfje)).toFixed(2)}}</el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </el-col>
        <!-- 材料付费 -->
        <el-col :span="12" class="TextAlignC" style="border-left: 1px solid #DCDFE6;">
          <el-row style="padding-bottom: 10px;border-bottom: 1px solid #DCDFE6;">材料付费</el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6">摘要</el-col>
            <el-col :span="6">付款比例(%)</el-col>
            <el-col :span="6">金额</el-col>
            <el-col :span="6">备注</el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6" style="padding-top: 6px;">竣工验收</el-col>
            <el-col :span="6"><el-input v-model="jgys2.sjbl" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{jgys2.yfje}}</el-col>
            <el-col :span="6"><el-input v-model="jgys2.fnote" size="mini" style="width: 85%;"></el-input></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6" style="padding-top: 6px;">材料结算</el-col>
            <el-col :span="6">--</el-col>
            <el-col :span="6"><el-input v-model="cljs.yfje" size="mini" style="width: 85%;"></el-input></el-col>
            <el-col :span="6"><el-input v-model="cljs.fnote" size="mini" style="width: 85%;"></el-input></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="24"><el-input size="mini" style="opacity: 0;"></el-input></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6" style="padding-top: 6px;">差额</el-col>
            <el-col :span="6"><el-input size="mini" style="opacity: 0;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{(jgys2.yfje - cljs.yfje).toFixed(2)}}</el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row style="padding: 10px 0;">
            <el-col :span="6">合计</el-col>
            <el-col :span="6"><el-input style="opacity:0;"></el-input></el-col>
            <el-col :span="6" style="text-align:center;padding-top: 6px;">{{(jgys2.yfje - cljs.yfje).toFixed(2)}}</el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </el-col>
        <el-col :span="24" style="border-top: 1px solid #DCDFE6;border-bottom: 1px solid #DCDFE6;">
          <el-row style="padding: 10px 0;">
            <el-col :span="3" class="TextAlignC">总计</el-col>
            <el-col :span="21" style="text-align:center;">{{(Number(jch.yfje) + Number(ybys.yfje) + Number(jgys.yfje) + Number(zbq.yfje) + Number(jgys2.yfje) - Number(cljs.yfje)).toFixed(2)}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </section>
    <section class="MarginT_20 MarginB_20">
      <el-button type="info" size="mini" @click="back">返 回</el-button>
      <el-button type="danger" size="mini" :loading="btLoading" @click="save">确认新增</el-button>
    </section>
    <!-- 导入Excel -->
    <!-- <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="changeFile"
      :multiple="false"
      :auto-upload="false"
      :show-file-list="false">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import $ from 'jquery'
import {formatToString} from '../../util/utils'
import XLSX from 'xlsx'
export default {
  name: 'Contract',
  data () {
    return {
      btLoading: false,
      formContract: {
        contractDate: '',
        contractName: '',
        constructionTeam: '',
        department: '',
        // payTerm: '',
        salesman: '',
        // contractNo: '',
        projectCode: '',
        companyName: '',
        affiliatedCompany: ''
      },
      rules: {
        // contractDate: [
        //   { required: true, message: '请选择合同日期', trigger: 'change' }
        // ],
        contractName: [
          { required: true, message: '请输入合同名称', trigger: 'change' }
        ],
        constructionTeam: [
          { required: true, message: '请选择施工队', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        salesman: [
          { required: true, message: '请选择业务员', trigger: 'change' }
        ],
        projectCode: [
          { required: true, message: '请选择项目编号', trigger: 'change' }
        ],
        affiliatedCompany: [
          { required: true, message: '请选择所属公司', trigger: 'change' }
        ]
      },
      curFItemID: null, // 当前选择的产品代码项
      formAdd: {
        list: [
          {fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []}
        ]
      },
      constructionTeamList: [],
      departmentList: [],
      salesmanList: [],
      projectList: [],
      affiliatedCompanyList: [],
      // productionCodeList: [],
      jch: {sjbl: 0, yfje: '0.00', sjje: '0.00', ftype: '安装付款', fnote: ''},
      ybys: {sjbl: 0, yfje: '0.00', sjje: '0.00', ftype: '安装付款', fnote: ''},
      jgys: {sjbl: 0, yfje: '0.00', sjje: '0.00', ftype: '安装付款', fnote: ''},
      zbq: {sjbl: 0, yfje: '0.00', sjje: '0.00', ftype: '安装付款', fnote: ''},
      jgys2: {sjbl: 0, yfje: '0.00', sjje: '0.00', ftype: '材料付款', fnote: ''},
      cljs: {sjbl: 0, yfje: '0.00', sjje: '0.00', ftype: '材料付款', fnote: ''},
      // fkNote: '',
      azfee: 0.00, // 安装费
      clfee: 0.00, // 材料费
      psumTotal: 0.00 // 价税合计总额
    }
  },
  computed: {
    // ...mapState({
    // })
  },
  watch: {
    psumTotal: function (newVal) {
      this.jgys2.yfje = ((newVal - this.azfee) * (this.jgys2.sjbl / 100)).toFixed(2)
    },
    // clfee: function (newVal) {
    //   this.jgys2.yfje = (newVal * (this.jgys2.sjbl / 100)).toFixed(2)
    // },
    azfee: function (newVal) {
      this.jch.yfje = (newVal * (this.jch.sjbl / 100)).toFixed(2)
      this.ybys.yfje = (newVal * (this.ybys.sjbl / 100)).toFixed(2)
      this.jgys.yfje = (newVal * (this.jgys.sjbl / 100)).toFixed(2)
      this.zbq.yfje = (newVal * (this.zbq.sjbl / 100)).toFixed(2)
    },
    'jch.sjbl': function (newVal) {
      this.jch.yfje = (this.azfee * (newVal / 100)).toFixed(2)
    },
    'ybys.sjbl': function (newVal) {
      this.ybys.yfje = (this.azfee * (newVal / 100)).toFixed(2)
    },
    'jgys.sjbl': function (newVal) {
      this.jgys.yfje = (this.azfee * (newVal / 100)).toFixed(2)
    },
    'zbq.sjbl': function (newVal) {
      this.zbq.yfje = (this.azfee * (newVal / 100)).toFixed(2)
    },
    'jgys2.sjbl': function (newVal) {
      this.jgys2.yfje = ((this.psumTotal - this.azfee) * (newVal / 100)).toFixed(2)
    }
  },
  created () {
    this.formContract.contractDate = formatToString(new Date(), 'Simple', '-')
    this.getAffiliatedCompany()
    this.getConstructionTeam()
  },
  methods: {
    ...mapActions([
      'updateContractId'
    ]),
    back () {
      this.$router.push({name: 'ContractList'})
    },
    addLine () {
      this.formAdd.list.push({fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []})
    },
    remove (idx) {
      this.formAdd.list.splice(idx, 1)
      this.updateFee()
    },
    changeFile (file, fileList) {
      let files = {0: file.raw}
      this.readExcel1(files)
    },
    // 计算总价格
    calculate (idx) {
      let LineItem = this.formAdd.list[idx]
      if (LineItem.pprice && LineItem.pamount) {
        this.formAdd.list[idx].psum = LineItem.pprice * LineItem.pamount
      } else {
        this.formAdd.list[idx].psum = 0
      }
      this.updateFee()
    },
    updateFee () {
      this.azfee = 0.00
      let hasAZ = false
      // let hasCL = false
      let sum = 0.00
      this.formAdd.list.map((item, idx) => {
        sum += item.psum
        if (item.fnumber === '99.02.006' && item.fitemid === 3022) {
          hasAZ = true
          this.azfee = this.azfee + item.psum
        }
        // if (item.fnumber === '99.02.034' && item.fitemid === 7273) {
        //   hasCL = true
        //   this.clfee = item.psum
        // }
        if (idx === this.formAdd.list.length - 1) {
          this.psumTotal = sum
          if (!hasAZ) {
            this.azfee = 0.00
          }
          // if (!hasCL) {
          //   this.clfee = 0.00
          // }
        }
      })
    },
    // 获取下拉
    changeTeam (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[select top 50 fitemid,fname from t_supplier where fname like '%" + val + "%' order by fnumber]]></FSQL>"
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
          this.constructionTeamList = Info
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.constructionTeamList = []
      }
    },
    changeDepartment (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[select top 50 fitemid,fname from t_department where fname like '%" + val + "%' order by fnumber]]></FSQL>"
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
          this.departmentList = Info
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.departmentList = []
      }
    },
    changeSalesman (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[select top 50 fitemid,fname from t_emp where fname like '%" + val + "%' order by fnumber]]></FSQL>"
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
          this.salesmanList = Info
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.salesmanList = []
      }
    },
    changeProject (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[select top 50 fitemid,fname from z_project where fname like '%" + val + "%' order by fnumber]]></FSQL>"
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
          this.projectList = Info
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.projectList = []
      }
    },
    getConstructionTeam () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL><![CDATA[select fitemid,fname from t_Item where fitemclassid=3004]]></FSQL>'
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
        this.constructionTeamList = Info
      }).catch((error) => {
        this.$message({
          message: '接口报错!',
          type: 'error'
        })
        console.log(error)
      })
    },
    getAffiliatedCompany () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL><![CDATA[select fname,fitemid from t_item where fitemclassid=3002]]></FSQL>'
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
        this.affiliatedCompanyList = Info
      }).catch((error) => {
        this.$message({
          message: '接口报错!',
          type: 'error'
        })
        console.log(error)
      })
    },
    filterMethodPCode (val, idx) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[select top 50 a.fitemid,a.fnumber,a.fname,a.fmodel,b.fname funit from t_icitem a inner join t_MeasureUnit b on a.funitid=b.fitemid  where a.fname like '%" + val + "%' order by a.fnumber]]></FSQL>"
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
          this.formAdd.list[idx].productionCodeList = Info
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.formAdd.list[idx].productionCodeList = []
      }
    },
    // 返回选中选项
    checkPCode (item) {
      return item.fitemid === this.curFItemID
    },
    changePCode (val, idx) {
      this.curFItemID = val
      let options = this.formAdd.list[idx].productionCodeList
      let resultItem = (options.filter(this.checkPCode))[0]
      this.formAdd.list[idx].fitemid = resultItem.fitemid
      this.formAdd.list[idx].fnumber = resultItem.fnumber
      this.formAdd.list[idx].fname = resultItem.fname
      this.formAdd.list[idx].fmodel = resultItem.fmodel
      this.formAdd.list[idx].funit = resultItem.funit
      this.updateFee()
    },
    // 合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 4 || index === 6) {
            let Sum = data.reduce((prev, curr) => {
              const Pamount = curr.pamount
              const Psum = curr.psum
              const Prev = prev
              if (index === 4) {
                if (!isNaN(Pamount)) {
                  // console.log(Prev, Pamount)
                  return Number(Prev) + Number((Pamount === '' ? 0 : Pamount))
                } else {
                  return Prev
                }
              } else {
                if (!isNaN(Psum)) {
                  return Number(Prev) + Number((Psum === '' ? 0 : Psum))
                } else {
                  return Number(Prev)
                }
              }
            }, 0)
            // console.log('Number(Sum)', Number(Sum))
            // debugger
            sums[index] = (Number(Sum)).toFixed(2)
          } else {
            sums[index] = ''
          }
        })
      }
      return sums
    },
    save () {
      // 为空校验
      let botData = {'items': []}
      let listData = this.formAdd.list
      if (listData.length === 0) {
        this.$message({
          message: '请至少添加一行记录!',
          type: 'warning'
        })
        return false
      }
      for (let i = 0; i < listData.length; i++) {
        if (!listData[i].fnumber || listData[i].psum === 0 || listData[i].psum === '') {
          this.$message({
            message: '请将信息填写完整!',
            type: 'warning'
          })
          return false
        } else {
          botData.items.push({
            'FItemID': listData[i].fitemid,
            'FQty': listData[i].pamount,
            'FPrice': listData[i].pprice,
            'FAmount': listData[i].psum,
            'FNote': listData[i].pnote
          })
        }
      }
      this.btLoading = true
      let topData = {
        'items': [{
          'FDate': this.formContract.contractDate,
          'FExplanation': this.formContract.contractName ? this.formContract.contractName : '',
          'FTeam': this.formContract.constructionTeam ? this.formContract.constructionTeam : '',
          'FDeptID': this.formContract.department ? this.formContract.department : 0,
          'FEmpID': this.formContract.salesman ? this.formContract.salesman : 0,
          'FProjectID': this.formContract.projectCode ? this.formContract.projectCode : 0,
          'FCompany': this.formContract.companyName ? this.formContract.companyName : '',
          'FSupplyID': this.formContract.affiliatedCompany ? this.formContract.affiliatedCompany : 0
        }]
      }
      let fkData = {'items': [
        {
          'fper': this.jch.sjbl + '%',
          'fname': '进场后',
          'famount': this.jch.yfje,
          'fnote': this.jch.fnote,
          'ftype': '安装付款'
        },
        {
          'fper': this.ybys.sjbl + '%',
          'fname': '隐蔽验收',
          'famount': this.ybys.yfje,
          'fnote': this.ybys.fnote,
          'ftype': '安装付款'
        },
        {
          'fper': this.jgys.sjbl + '%',
          'fname': '竣工验收',
          'famount': this.jgys.yfje,
          'fnote': this.jgys.fnote,
          'ftype': '安装付款'
        },
        {
          'fper': this.zbq.sjbl + '%',
          'fname': '质保期',
          'famount': this.zbq.yfje,
          'fnote': this.zbq.fnote,
          'ftype': '安装付款'
        },
        {
          'fper': this.jgys2.sjbl + '%',
          'fname': '竣工验收',
          'famount': this.jgys2.yfje,
          'fnote': this.jgys2.fnote,
          'ftype': '材料付款'
        },
        {
          'fper': '0%',
          'fname': '材料结算',
          'famount': this.cljs.yfje,
          'fnote': this.cljs.fnote,
          'ftype': '材料付款'
        },
        {
          'fper': '0%',
          'fname': '差额',
          'famount': (Number(this.jgys2.yfje) - Number(this.cljs.yfje)).toFixed(2),
          'fnote': '',
          'ftype': '材料付款'
        }
      ]}
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<PayContract xmlns="http://tempuri.org/">'
      tmpData += '<FJSONBtou>' + JSON.stringify(topData) + '</FJSONBtou>'
      tmpData += '<FJSONBti>' + JSON.stringify(botData) + '</FJSONBti>'
      tmpData += '<FJSONPer>' + JSON.stringify(fkData) + '</FJSONPer>'
      tmpData += '<ID>0</ID>'
      tmpData += '</PayContract>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'
      this.Http.post('PayContract', tmpData
      ).then(res => {
        // let xml = res.data
        // let parser = new DOMParser()
        // let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // // 提取数据
        // let Result = xmlDoc.getElementsByTagName('PayContractResponse')[0].getElementsByTagName('PayContractResult')[0]
        // let HtmlStr = $(Result).html()
        // let Info = (JSON.parse(HtmlStr))[0]
        // 解析
        let xmlData = this.$x2js.xml2js(res.data)
        let Result = xmlData.Envelope.Body.PayContractResponse.PayContractResult
        let Info = (JSON.parse(Result))[0]
        console.log(Info)
        if (Info.code === '1') {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.btLoading = false
          this.updateContractId(Info.ID)
          this.$router.push({name: 'ContractDetail'})
          // 初始化界面
          // this.formContract = {
          //   contractDate: '',
          //   contractName: '',
          //   constructionTeam: '',
          //   department: '',
          //   salesman: '',
          //   projectCode: ''
          // }
          // this.formAdd = {
          //   list: [
          //     {fnumber: '', fname: '', fmodel: '', pamount: '', pprice: '', psum: '', pnote: '', funit: '', productionCodeList: []}
          //   ]
          // }
        } else {
          this.$message({
            message: '新增失败!',
            type: 'error'
          })
          this.btLoading = false
        }
      }).catch((error) => {
        console.log(error)
        this.btLoading = false
      })
    },
    readExcel1 (files) { // 表格导入
      // var that = this
      console.log(files)
      if (files.length <= 0) { // 如果没有文件名
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          console.log(ws)
          // that.peopleArr = [] // 清空接收数据
          // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == '' && that.peopleArr[0].enLine == ''){
          //   that.peopleArr = []
          // }
          // 重写数据
          try {
          } catch (err) {
            console.log(err)
          }
          this.$refs.upload.value = ''
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>

<style lang='less' scoped>
.Contract{
  background: #fff;
  padding: 20px;
}
.listColumnTit{
  background:lightsteelblue;
  border-bottom: 1px solid #eee;
  .el-col{
    &:not(:last-child){
      border-right: 1px solid #eee;
    }
      span{
      height: 42px;
      line-height: 42px;
      display: block;
    }
  }
}
.listTable{
  border-bottom: 1px solid #eee;
  .el-col{
    height: 42px;
    line-height: 42px;
    &:not(:last-child){
      border-right: 1px solid #eee;
    }
    span{
      font-size: 14px;
    }
  }
}
.ModuleTit{
  height: 42px;
  background: #ddd;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 42px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
