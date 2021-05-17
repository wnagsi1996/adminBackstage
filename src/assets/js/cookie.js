/*
	key:名称
	value:值
	day:时间
	path：页面路径
*/
export const setCookie=function(key,value,day,path='*'){
	if(typeof day==='number'){
		let exdate = new Date();
		exdate.setDate(exdate.getDate() + day);
		document.cookie=`${key}=${value};expires=${exdate};path=${path}`
	}else{
		document.cookie = `${key}=${value};path=/`;
	}
}

export const getCookie=function(key){
	if(document.cookie){
		let arr=document.cookie.split(';');//拆分cookie;
		for(let i=0;i<arr.length;i++){
			arr[i]=arr[i].trim();//去除头尾空格
			let item=arr[i].split('=');//将cookie拆分key，value形式
			if(key==item[0]) return item[1]; //找到key，返回value
		}
		return '';//循环结束，没找到返回空
	}else{
		return '';//没有cookie返回空
	}
}

export const delCookie=function(key){
	setCookie(key, "", -1); 
}