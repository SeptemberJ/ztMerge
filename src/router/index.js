import Vue from 'vue'
import VueRouter from 'vue-router'
import BudgetAdd from '@/pages/Budget/BudgetAdd'
import BudgetList from '@/pages/Budget/BudgetList'
import BudgetDetail from '@/pages/Budget/BudgetDetail'
import ContractList from '@/pages/Subcontract/ContractList'
import ContractDetail from '@/pages/Subcontract/ContractDetail'
import ContractAdd from '@/pages/Subcontract/ContractAdd'
import ContractFee from '../components/Subcontract/Fee'
import FilterTable from '@/pages/HTJK/FilterTable'
import InfoDynamicTable from '@/pages/HTJK/InfoDynamicTable'
import HTJKOutlay from '@/pages/HTJK/Outlay'
import HTJKCost from '@/pages/HTJK/Cost'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import {getCookie} from '@/util/utils'
import store from '../vuex/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetAdd',
      name: 'BudgetAdd',
      component: BudgetAdd,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetList',
      name: 'BudgetList',
      component: BudgetList,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetDetail',
      name: 'BudgetDetail',
      component: BudgetDetail,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractList',
      name: 'ContractList',
      component: ContractList,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractDetail',
      name: 'ContractDetail',
      component: ContractDetail,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractAdd',
      name: 'ContractAdd',
      component: ContractAdd,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractFee',
      name: 'ContractFee',
      component: ContractFee,
      meta: {requireAuth: true}
    },
    {
      path: '/FilterTable',
      name: 'FilterTable',
      component: FilterTable,
      meta: {requireAuth: true}
    },
    {
      path: '/InfoDynamicTable',
      name: 'InfoDynamicTable',
      component: InfoDynamicTable,
      meta: {requireAuth: true}
    },
    {
      path: '/HTJKCost',
      name: 'HTJKCost',
      component: HTJKCost,
      meta: {requireAuth: true}
    },
    {
      path: '/HTJKOutlay',
      name: 'HTJKOutlay',
      component: HTJKOutlay,
      meta: {requireAuth: true}
    },
    {path: '*', redirect: '/Login'}
  ]
})

// 登录控制
router.beforeEach((to, from, next) => {
  store.dispatch('changePath', to.name)
  if (to.meta.requireAuth) {
    if (getCookie('ZT_18a808c40bba58c2c')) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  store.dispatch('changePath', to.name)
})
export default router
