// 路由的全局守卫

// 权限控制逻辑
import router from './index'
import store from '../store/index'



//import { Message } from 'element-ui'
//import { getToken } from '@/utils/auth' // 从cookie获取令牌


const isPC=()=>{     
	var userAgentInfo = navigator.userAgent;     
	var Agents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];     
	var flag = true;     
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;         
		}    
	}     
	return flag; 
}

const whiteList = ['/login'] //排除的路径

router.beforeEach(async (to,from,next) => {
	 //console.log(to)
	if(!isPC()){
		if(to.path==='/login' && process.env.NODE_ENV === "production"){
			window.location.href="/mmain"
			// window.location.href="/mobileDist"
		}
	}
	
	
	
    //NProgress.start()
    // 获取令牌判断用户是否登陆
	// const hasRoles = store.getters.roles && store.getters.roles.length > 0 //若用户角色已附加则说明动态路由已经添加
	// const  roles=await store.dispatch('user/getInfo'); //先请求获取用户角色
    const hasToken = window.sessionStorage.getItem("token",1);
    // 有令牌 表示已经登陆
    if(hasToken){
        
        if(to.path === '/login'){
            
            // 已登录重定向到首页
            next({path: '/'})
        }else{
            
            //若用户角色已附加则说明动态路由已经添加
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
			
            if(hasRoles){
				if(to.matched.length==0){
					next('/404')
				}else{
					next()
				}
                //角色存在
                // /next() //继续即可
            } else {
                try {
                    //先请求获取用户角色
                    const  roles=await store.dispatch('user/getInfo');
					//const  roles  = store.user.state.roles;
                    // 根据当前用户角色动态生成路由
                    let accessRoutes = await store.dispatch('permission/generateRoutes', roles)
					 console.log(accessRoutes)
					
					// 添加这些路由至路由器
					router.addRoutes([{
						path: '/main',
						// redirect:'/index',
						component: () => import('@/layout'),
						 children: accessRoutes
					}])
					
					//第一次进入，如果匹配不到就跳转404，并且路由添加
					if(to.matched.length==0){
						next({...to,path:'/404',replace: true});
					}
                   
                    // console.log(hasRoles)
                    // 继续路由切换,确保addRoutes完成
                   
                   	
                   next({...to,replace: true});
                   
                } catch(error){
                    // 出错需要重置令牌并重新登陆(令牌过期,网络错误等原因)
                    await store.dispatch('user/resetToken')
                   // Message.error(error || "网络错误")
                    next(`/login?redirect=${to.path}`)
                }
            }
           
        }
    }else{
        // 用户无令牌
        if(whiteList.indexOf(to.path) !== -1){
            //白名单路由放过
            next()
        } else {
            // 重定向至登录页
            next(`/login?redirect=${to.path}`)
        }
    }
})

// router.afterEach(() => {
//     NProgress.done()
//   })