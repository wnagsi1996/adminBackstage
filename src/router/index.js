import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'
import {IsPC} from '@/utils/PublicFn'  //引入判断PC手机得函数

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


const isPc=IsPC();

 export const constRouter = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
	hidden: true //导航菜单忽略选项
  },
  {
      path: '',
      component: Layout, //应用布局页
      name: '',
	  redirect:'/main',
      meta:{
          title: "首页", //导航菜单项标题
          icon: 'el-icon-s-home' //导航菜单图标
      }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
  	hidden: true //导航菜单忽略选项
  }
]

// 动态路由 communication
export const asyncRoutes = [
	{
	  path: '',  //管理员首页
	  component: () => import('@/views/CommentSystem/Admin/Home'),
	  name: '首页',
	  meta: {
	    title: "首页",
	    icon: 'el-icon-s-home',
	    roles: ['m-53']
	  }
	},
	{
	  path: '',  //财务首页
	  component: () => import('@/views/CommentSystem/FinancialAffairs/Home'),
	  name: '首页',
	  meta: {
	    title: "首页",
	    icon: 'el-icon-s-home',
	    roles: ['m-52']
	  }
	},
	{
	  path: '',  //买家端首页
	  component: () => import('@/views/CommentSystem/Buyer/Home'),
	  name: '首页',
	  meta: {
	    title: "首页",
	    icon: 'el-icon-s-home',
	    roles: ['m-51']
	  }
	},
	{
	  path: '',  //卖家端首页
	  component: () => import('@/views/CommentSystem/Seller/Home'),
	  name: '首页',
	  meta: {
	    title: "首页",
	    icon: 'el-icon-s-home',
	    roles: ['m-50']
	  }
	},
	{
	  path: '/allorder',
	  component: () => import('@/views/CommentSystem/Admin/AllOrder'),
	  name: '测评订单管理',
	  meta: {
	    title: "测评订单管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11818']
	  }
	},
	
	{
	  path: '/addproduct',
	  component: () => import('@/views/CommentSystem/Seller/AddProduct'),
	  name: '测评产品管理',
	  meta: {
	    title: "测评产品管理",
	    icon: 'el-icon-s-home',
	    roles: ['m1181']
	  }
	},
	{
	  path: '/accountinfo',
	  component: () => import('@/views/CommentSystem/Admin/AccountInfo'),
	  name: '员工账号信息管理',
	  meta: {
	    title: "员工账号信息管理",
	    icon: 'el-icon-s-home',
	    roles: ['m1191']
	  }
	},
	{
	  path: '/monthlygoal',
	  component: () => import('@/views/CommentSystem/Admin/MonthlyGoal'),
	  name: '员工月份目标管理',
	  meta: {
	    title: "员工月份目标管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11822']
	  }
	},
	{
	  path: '/clientorder',
	  component: () => import('@/views/CommentSystem/Seller/ClientOrder'),
	  name: '客户订单管理',
	  meta: {
	    title: "客户订单管理",
	    icon: 'el-icon-s-home',
	    roles: ['m1180']
	  }
	},
	{
	  path: '/clientorder',
	  component: () => import('@/views/CommentSystem/Admin/ClientOrder'),
	  name: '客户订单管理',
	  meta: {
	    title: "客户订单管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11817']
	  }
	},
	{
	  path: '/sellerlist',
	  component: () => import('@/views/CommentSystem/Seller/SellerList'),
	  name: '卖家客户管理',
	  meta: {
	    title: "卖家客户管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11811']
	  }
	},
	{
	  path: '/intermediary',
	  component: () => import('@/views/CommentSystem/Intermediary'),
	  name: '测评中介管理',
	  meta: {
	    title: "测评中介管理",
	    icon: 'el-icon-s-home',
	    roles: ['m1188']
	  }
	},
	{
	  path: '/blacklist',
	  component: () => import('@/views/CommentSystem/Blacklist'),
	  name: '测评黑名单',
	  meta: {
	    title: "测评黑名单",
	    icon: 'el-icon-s-home',
	    roles: ['m1200']
	  }
	},
	{
	  path: '/waitingorder',
	  component: () => import('@/views/CommentSystem/Seller/WaitingOrder'),
	  name: '等待放单库',
	  meta: {
	    title: "等待放单库",
	    icon: 'el-icon-s-home',
	    roles: ['m1186']
	  }
	},
	{
	  path: '/revieworder',
	  component: () => import('@/views/CommentSystem/Seller/ReviewOrder'),
	  name: '单号待审核',
	  meta: {
	    title: "单号待审核",
	    icon: 'el-icon-s-home',
	    roles: ['m1189']
	  }
	},
	{
	  path: '/commentnotification',
	  component: () => import('@/views/CommentSystem/Seller/CommentNotification'),
	  name: '最新留评单',
	  meta: {
	    title: "最新留评单",
	    icon: 'el-icon-s-home',
	    roles: ['m11814']
	  }
	},
	{
	  path: '/totalorder',
	  component: () => import('@/views/CommentSystem/Seller/TotalOrder'),
	  name: '历史测评订单管理',
	  meta: {
	    title: "历史测评订单管理",
	    icon: 'el-icon-s-home',
	    roles: ['m1184']
	  }
	},
	{
	  path: '/financialaudittrail',
	  component: () => import('@/views/CommentSystem/Seller/FinancialAuditTrail'),
	  name: '财务处理进度查询',
	  meta: {
	    title: "财务处理进度查询",
	    icon: 'el-icon-s-home',
	    roles: ['m11815']
	  }
	},
	{
	  path: '/audit',
	  component: () => import('@/views/CommentSystem/FinancialAffairs/Audit'),
	  name: '收入审核',
	  meta: {
	    title: "收入审核",
	    icon: 'el-icon-s-home',
	    roles: ['m1182']
	  }
	},
	{
	  path: '/expenditure',
	  component: () => import('@/views/CommentSystem/FinancialAffairs/Expenditure'),
	  name: '支出处理',
	  meta: {
	    title: "支出处理",
	    icon: 'el-icon-s-home',
	    roles: ['m1183']
	  }
	},
	{
	  path: '/lossexpenses',
	  component: () => import('@/views/CommentSystem/FinancialAffairs/Lossexpenses'),
	  name: '员工财务损失管理',
	  meta: {
	    title: "员工财务损失管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11826']
	  }
	},
	{
	  path: '/monthlyexpenditure',
	  component: () => import('@/views/CommentSystem/FinancialAffairs/MonthlyExpenditure'),
	  name: '月份支出管理',
	  meta: {
	    title: "月份支出管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11823']
	  }
	},
	{
	  path: '/profit',
	  component: () => import('@/views/CommentSystem/FinancialAffairs/Profit'),
	  name: '营业收入管理',
	  meta: {
	    title: "营业收入管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11830']
	  }
	},
	{
	  path: '/monthinterval',
	  name: '月份区间数据汇总',
	  component: () => import('@/views/CommentSystem/FinancialAffairs/MonthInterval'),
	  meta: {
	    title: "月份区间数据汇总",
	    icon: 'el-icon-s-home',
	    roles: ['m11830']
	  }
	},
	{
	  path: '/receiveorder',
	  component: () => import('@/views/CommentSystem/Buyer/ReceiveOrder'),
	  name: '等待接单库',
	  meta: {
	    title: "等待接单库",
	    icon: 'el-icon-s-home',
	    roles: ['m1185']
	  }
	},
	{
	  path: '/evaluationorder',
	  component: () => import('@/views/CommentSystem/Buyer/EvaluationOrder'),
	  name: '待测评订单',
	  meta: {
	    title: "待测评订单",
	    icon: 'el-icon-s-home',
	    roles: ['m11812']
	  }
	},
	{
	  path: '/orderreview',
	  component: () => import('@/views/CommentSystem/Buyer/ReviewOrder'),
	  name: '待审核订单',
	  meta: {
	    title: "待审核订单",
	    icon: 'el-icon-s-home',
	    roles: ['m11821']
	  }
	},
	{
	  path: '/rebateorder',
	  component: () => import('@/views/CommentSystem/Buyer/RebateOrder'),
	  name: '待返款订单',
	  meta: {
	    title: "待返款订单",
	    icon: 'el-icon-s-home',
	    roles: ['m11810']
	  }
	},
	{
	  path: '/allorder',
	  component: () => import('@/views/CommentSystem/Buyer/AllOrder'),
	  name: '测评订单管理',
	  meta: {
	    title: "测评订单管理",
	    icon: 'el-icon-s-home',
	    roles: ['m1187']
	  }
	},
	{
	  path: '/intermediarycommissionstorage',
	  component: () => import('@/views/CommentSystem/Buyer/Intermediarycommissionstorage'),
	  name: '中介佣金挂账',
	  meta: {
	    title: "中介佣金挂账",
	    icon: 'el-icon-s-home',
	    roles: ['m11827']
	  }
	},
	{
	  path: '/modifypassword',
	  component: () => import('@/views/ModifyPass'),
	  name: '密码修改',
	  meta: {
	    title: "密码修改",
	    icon: 'el-icon-s-home',
	    roles: ['m20001']
	  }
	},
	{
	  path: '/agentcommission',
	  component: () => import('@/views/CommentSystem/Buyer/AgentCommission'),
	  name: '中介佣金返款',
	  meta: {
	    title: "中介佣金返款",
	    icon: 'el-icon-s-home',
	    roles: ['m11813']
	  }
	},
	{
	  path: '/commentorder',
	  component: () => import('@/views/CommentSystem/Buyer/CommentOrder'),
	  name: '待留评订单',
	  meta: {
	    title: "待留评订单",
	    icon: 'el-icon-s-home',
	    roles: ['m11813']
	  }
	},
	{
	  path: '/business',
	  component: () => import('@/views/CommentSystem/Admin/Business'),
	  name: '卖家客户管理',
	  meta: {
	    title: "卖家客户管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11816']
	  }
	},
	{
	  path: '/financialaudittrail',
	  component: () => import('@/views/CommentSystem/Admin/FinancialAuditTrail'),
	  name: '财务处理进度',
	  meta: {
	    title: "财务处理进度",
	    icon: 'el-icon-s-home',
	    roles: ['m11819']
	  }
	},
	{
	  path: '/syslogmanage',
	  component: () => import('@/views/CommentSystem/Admin/SysLogManage'),
	  name: '操作日志查询',
	  meta: {
	    title: "操作日志查询",
	    icon: 'el-icon-s-home',
	    roles: ['m11820']
	  }
	},
	{
	  path: '/intermediarycommissionstorage',
	  component: () => import('@/views/CommentSystem/Admin/Intermediarycommissionstorage'),
	  name: '中介佣金挂账管理',
	  meta: {
	    title: "中介佣金挂账管理",
	    icon: 'el-icon-s-home',
	    roles: ['m11828']
	  }
	},
	{
	    path: '/monthsummary',
	    component: () => import('@/views/CommentSystem/FinancialAffairs/MonthSummary'),
	    name: '月份财务报表',
	    meta: {
	      title: "月份财务报表",
	      icon: 'el-icon-s-home',
	      roles: ['m11824']
	    }
	},
	{
	    path: '/adminmonthsummary',
	    component: () => import('@/views/CommentSystem/Admin/MonthSummary'),
	    name: '月份数据汇总',
	    meta: {
	      title: "月份数据汇总",
	      icon: 'el-icon-s-home',
	      roles: ['m11825']
	    }
	}
]

const router = new VueRouter({
  // mode: 'history',//history
  base: process.env.NODE_ENV === "production" ? "main" : "/",
  routes: constRouter
})

router.afterEach((to, from) => {
  let url=window.location.href;
  if(url.endsWith('/')){
	  url=url.substr(0, url.length - 1);
	  window.history.pushState(null, null, url);
  }
  
})

export default router
