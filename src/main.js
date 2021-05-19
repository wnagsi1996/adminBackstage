import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {IsPC} from '@/utils/PublicFn'  //引入判断PC手机得函数
const ispc=IsPC()

Vue.config.productionTip=false;


import {Button,Message,Loading,MessageBox,Notification} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button)
Vue.use(Loading)

Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

//引入API
import api from '@/api/api.js'
Vue.prototype.$api=api



// 全局路由守卫
import './router/permission'

//进度条的颜色变化设置过滤器（首页使用）
Vue.filter('progressbarColor',val=>{
	let color='';
	if(val<=50){
		color='red'
	}else if(val>50 && val<100){
		color='orange'
	}else if(val>=100){
		color='green'
	}
	return color
})


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
