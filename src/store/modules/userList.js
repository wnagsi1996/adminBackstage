import api from '@/api/api.js'
let isAgent=false
const state={
	allUserList:[],  //全部用户列表
	buyerUserList:[],  //买家端用户列表
	sellerUserList:[],  //卖家端用户列表
	roleList:[],  //角色列表
	buyerAgentList:[]  //买家端中介列表
}

const mutations={
	SET_ALLUSERLIST(state,list){
		state.allUserList=list;
	},
	SET_BUYERUSERLIST(state,list){
		state.buyerUserList=list;
	},
	SET_SELLERUSERLIST(state,list){
		state.sellerUserList=list;
	},
	SET_ROLELIST(state,list){
		state.roleList=list
	},
	SET_BUYERAGENTLIST(state,list){
		state.buyerAgentList=list
	}
}

const actions={
	//获取卖家端成员列表
	getSellerUserList({commit},pageindex=0,len=50){
		return new Promise((resolve,reject)=>{
			api.getMJUserList({pageindex,len}).then(res=>{
				if(res.rows.length!=0){
					commit('SET_SELLERUSERLIST',res.rows); 
				}
				resolve(res);
			}).catch(err=>{
				reject(err)
			})
		})
	},
	//获取买家端成员列表
	getBuyerUserList({commit},pageindex=0,len=50){
		return new Promise((resolve,reject)=>{
			api.getMMJUserList({pageindex,len}).then(res=>{
				if(res.rows.length!=0){
					commit('SET_BUYERUSERLIST',res.rows);
				}
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	//获取全部成员列表
	getAllUserList({commit},pageindex=0,len=100){
		return new Promise((resolve,reject)=>{
			api.getCPMMJUserList({pageindex,len}).then(res=>{
				if(res.rows.length!=0){
					commit('SET_ALLUSERLIST',res.rows);
				}
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	//获取角色列表
	getRoleList({commit}){
		return new Promise((resolve,reject)=>{
			api.getCPRoles().then(res=>{
				if(res.rows.length!=0){
					commit('SET_ROLELIST',res.rows);
				}
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	//获取中介列表
	getBuyerAgentList({commit}){
		if(isAgent) return;
		return new Promise((resolve,reject)=>{
			api.getCPAgentList().then(res=>{
				isAgent=true;
				if(res!=''){
					commit('SET_BUYERAGENTLIST',res.rows)
				}
				resolve(res)
			}).catch(err=>{
				reject(err);
			})
		})
	}
}

export default{
	state,
	mutations,
	actions
}