import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import user from './modules/user'
import userList from './modules/userList'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
  },
  modules: {
	  tagsView,
	  user,
	  permission,
	  userList
  },
  // 定义全局getters 
  getters:{
    roles: state => state.user.roles,
	account:state=>state.user.account,
	menulist:state=>state.user.menulist,
    permission_routes: state => state.permission.routes,
	sellerUserList:state=>state.userList.sellerUserList,
	buyerUserList:state=>state.userList.buyerUserList,
	allUserList:state=>state.userList.allUserList,
	roleList:state=>state.userList.roleList,
	buyerAgentList:state=>state.userList.buyerAgentList
  }
})
