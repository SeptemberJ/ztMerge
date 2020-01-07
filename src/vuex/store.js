import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
let CurYear = (new Date()).getFullYear()

const state = {
  useName: 'liubai',
  userInfo: null,
  pathName: null,
  siderIdx: '1',
  // budget
  budgetId: null,
  filterCompanyName_budget: '',
  filterDepartment_budget: '',
  filterYear_budget: '',
  filterMonth_budget: '',
  filterSalesMan_budget: '',
  filterProjectName_budget: '',
  curPage_budget: 1,
  // subcontract
  contractId: null,
  filterProjectCode_subcontract: '',
  filterConstructionTeam_subcontract: '',
  filterCompanyName_subcontract: '',
  curPage_subcontract: 1,
  // HTJK
  curContractNo: '',
  cuXMMC: '',
  curDB: null,
  resultDataOrigin: [],
  formFilter: {
    affiliatedCompany: '全部', // 所属公司
    signDepartment: '全部', // 签约部门
    contractSumS: '', // 合同金额
    contractSumE: '', // 合同金额
    industryType: '全部', // 行业类型
    projectType: '全部', // 项目类型
    warnTip: '全部', // 具有报警项目
    subcontractItem: '全部', // 分包项目
    receivablesContion: '全部', // 收款情况
    // completionProject: '', // 竣工项目
    // advances: '', // 垫资情况
    inQuality: '全部', // 进入质保期项目
    // contractPrice: -1,
    signYear: CurYear,
    // signAndFinish: -1, // 签约与竣工
    // fileConditionn: -1, // 归档情况
    // classCondition: -1, // 分类管控
    // performBond: -1, // 履约保证金
    // qualityBond: -1, // 质量保证金
    // shipmentRate: '', // 出货率
    // receivablesRate: '', // 收款率
    // subItems: -1, // 分包项目情况
    sort: '按出货率',
    // vagueSearch: ''
    // contractNo: '', // XSHT002089
    xmmc: '', // B17070221ZG1804杨浦区311街坊C3地块及北区综合项目二期改造（复旦管院）
    customer: '',
    projectNumber: ''
  }
}

const actions = {
  changeSiderIdx ({commit, state}, IDX) {
    commit('setSiderIdx', IDX)
  },
  changePath ({commit, state}, PATH) {
    commit('setPath', PATH)
  },
  updateBudgetId ({commit, state}, ContractId) {
    commit('setBudgetId', ContractId)
  },
  updateContractId ({commit, state}, ContractId) {
    commit('setContractId', ContractId)
  },
  // HTJK
  updateContractNo ({commit, state}, ContractNo) {
    commit('setCurContractNo', ContractNo)
  },
  updateXMMC ({commit, state}, XMMC) {
    commit('setXMMC', XMMC)
  },
  updateCurDB ({commit, state}, CurDB) {
    commit('setCurDB', CurDB)
  },
  updateResultData ({commit, state}, Data) {
    commit('setResultData', Data)
  },
  updateFilterCondition ({commit, state}, Data) {
    commit('setFilterCondition', Data)
  },
  changeSort ({commit, state}, kind) {
    commit('setFilterSort', kind)
  },
  updateUserInfo ({commit, state}, UserInfo) {
    commit('setUserInfo', UserInfo)
  }
}

const mutations = {
  setSiderIdx (state, IDX) {
    state.siderIdx = IDX
  },
  setPath (state, PATH) {
    state.pathName = PATH
  },
  setBudgetId (state, ContractId) {
    state.budgetId = ContractId
  },
  setContractId (state, ContractId) {
    state.contractId = ContractId
  },
  // HTJK
  setCurContractNo (state, ContractNo) {
    state.curContractNo = ContractNo
  },
  setXMMC (state, XMMC) {
    state.cuXMMC = XMMC
  },
  setCurDB (state, curDB) {
    state.curDB = curDB
  },
  setResultData (state, Data) {
    state.resultDataOrigin = Data
  },
  setFilterCondition (state, Data) {
    state.formFilter = Data
  },
  setFilterSort (state, kind) {
    state.formFilter.sort = kind
  },
  setUserInfo (state, UserInfo) {
    state.userInfo = UserInfo
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
