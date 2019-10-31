import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

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
  curPage_subcontract: 1
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
