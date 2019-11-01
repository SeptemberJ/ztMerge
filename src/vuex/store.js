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
    affiliatedCompany: '全部',
    signDepartment: '全部',
    contractSumS: '',
    contractSumE: '',
    industryType: '全部',
    projectType: '全部',
    warnTip: '',
    subcontractItem: '',
    receivablesContion: '',
    completionProject: '',
    advances: '',
    inQuality: '',
    contractPrice: -1,
    signYear: CurYear,
    signAndFinish: -1,
    fileConditionn: -1,
    classCondition: -1,
    performBond: -1,
    qualityBond: -1,
    shipmentRate: '',
    receivablesRate: '',
    subItems: -1,
    sort: '',
    // vagueSearch: ''
    // contractNo: '', // XSHT002089
    xmmc: 'B17070221ZG1804杨浦区311街坊C3地块及北区综合项目二期改造（复旦管院）', // B17070221ZG1804杨浦区311街坊C3地块及北区综合项目二期改造（复旦管院）
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
