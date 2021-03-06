import axios from 'axios'
import {message} from 'element-ui'
import qs from 'qs'

if(process.env.NODE_ENV=='development'){  //开发版本
	axios.defaults.baseURL='/Handler';
}else if(process.env.NODE_ENV=='production'){  //生产版本
	axios.defaults.baseURL=''
}

//设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截器
axios.interceptors.request.use(config=>{
	return config
},error=>{ //数据请求错误
	message('Request timed out');
	return Promise.reject(error);
})

//响应拦截器
axios.interceptors.response.use(result=>{
	return result;
},(error)=>{
	let {response}=error;
	if(response){
		errorHandle(response.status,response.data.message)
	}
	return Promise.reject(error)
})

//封装Get请求
export const get=(url,params={})=>{
	return new Promise((resolve,reject)=>{
		axios.get(url,{params})
		.then(res=>{console.log(res)
			resolve(res.data)
		}).catch(err=>{
			reject(err)
		})
	})
}

//封装post请求
export const post=((url,params={})=>{
	return new Promise((resolve,reject)=>{
		axios.post(url,qs.stringify(params))
		.then(res=>{console.log(res)
			resolve(res.data)
		}).catch(err=>{//console.log(err)
			reject(err)
		})
	})
})

//封装图片上传
export const upload=((url,params={})=>{
	return new Promise((resolve,reject)=>{
		let config = {
		    headers: {
		        'Content-Type': 'multipart/form-data'
		    }
		}
		axios.post(url,params,config).then(res=>{
		// axios.post({
		// 	url,
		// 	method:'post',
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data'
		// 	},
		// 	data:params
		// }).then(res=>{console.log(res)
			resolve(res.data)
		}).catch(err=>{console.log(err)
			reject(err)
		})
	})
})