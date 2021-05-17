
 const state= {
      isCollapse: false,
      currentMenu: ["首页"],
      tabsList: [
          {
              path: '/main',
              name: '首页',
              icon: 'home',
			  menuid:''
          }
      ]
  }
  //调用方法
 const mutations= {
      collapseMenu(state) {
          state.isCollapse = !state.isCollapse
      },
      //选择标签 选择面包屑
      selectMenu(state, val) {
		  if (state.tabsList.some(v => v.name === val.name)) return
		  
          // if (val.name === 'home') {
          //     state.currentMenu = null
          // } else {
              state.currentMenu = val
              //如果等于-1说明tabsList不存在那么插入，否则什么都不做
              let result = state.tabsList.findIndex(item => item.name === val.name)
              //result === -1 ? state.tabsList.push(val) : ''
			if(result===-1){
				state.tabsList.push(val);
				//window.sessionStorage.setItem("tab",JSON.stringify(state.tabsList));
			}
         // }
          // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
      },
      //关闭标签
      closeTab(state, val) {
          let result = state.tabsList.findIndex(item => item.name === val.name)
          state.tabsList.splice(result, 1);
      },
	  //关闭全部标签
	  closeAll(state){
		  let attr=state.tabsList.filter(item=>item.name=='首页');
		  state.tabsList=attr;
	  }
  }
 const actions={}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
