import { Message } from 'element-ui'
 import router from '@/router/index.js'
import api from '@/api/api.js'


// 村赤用户令牌和角色信息
const state ={
    token: window.sessionStorage.getItem("token"),
    roles: [] ,//角色ID
	account:[]  ,//角色信息
	menulist:[]  //原始目录
}

const mutations ={
    SET_TOKEN: (state,token) => {
        state.token = token;
    },
    SET_ROLES: (state,roles) => {
        state.roles = roles;
    },
	SET_ACCOUNT:(state,info)=>{
		state.account=info;
	},
	SET_MENULIST:(state,menulist)=>{
		state.menulist=menulist;
	}
};

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        return new Promise((resolve,reject) => {
			api.login({VerifyCode:userInfo.VerifyCode,VerifyType:'valiregister',lname:userInfo.lname,pass:userInfo.pass}).then(res=>{
				if(res.rescode=='0'){
					Message.success("登录成功")
					commit('SET_TOKEN',1);
					window.sessionStorage.setItem("token",1);
				}else{
					window.sessionStorage.setItem("token",0);
					commit('SET_TOKEN',0);
				}
				resolve(res)
			}).catch(err=>{console.log(err)
				window.sessionStorage.setItem("token",0);
				commit('SET_TOKEN',0);
				reject(err)
			})
        })
    },
    // 获取用户角色信息
    getInfo({ commit, state }){
		return new Promise((resolve,reject) => {
			api.getMenuConfig({ifMobile:0}).then(res=>{
				//console.log(res);
				let menuId=[];
				if(res!=''){
					//添加角色信息
					let info=[res[0].username,res[0].userroleid];
					commit('SET_ACCOUNT',info);
					let menu=res[0].menu;
					if(menu.length>0){
						commit('SET_MENULIST',menu)
						menu.forEach((item,index)=>{
							if(item.items){
								item.items.forEach((item1,index1)=>{
									menuId.push(item1.id);
								})
							}
						})
						menuId.splice(0, 0, 'm-'+res[0].userroleid);
						commit('SET_ROLES',menuId);
						 resolve({menuId});
					}else{
						reject('没有数据')
					}
				}else{
					reject('数据获取出错')
				}
			}).catch(xhr=>{console.log(xhr);
				 reject(xhr)
			})
		})
    },
	
    // 重置令牌
    resetToken({ commit }){
		return new Promise((resolve,reject) => {
			api.logout().then(res=>{
				if (res.rescode == "0"){
					console.log("退出登录成功")
					commit('SET_TOKEN','')
					commit('SET_ROLES',[])
					commit('SET_ACCOUNT',[])
					commit('permission/DEL_ROUTES','',{root: true})
					commit('tagsView/closeAll','',{root: true})
					window.sessionStorage.removeItem('token');
					router.push({path:'/login'})
					resolve()
				}else{
					console.log(res.resdesc)
					reject('退出登录出错')
				}
			}).catch(xhr=>{console.log(xhr);
				 reject(xhr)
			})
		})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}