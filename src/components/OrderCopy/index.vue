<template>
	<div>
		<p>{{this.orderno | ordernofilter}} <i class='el-icon-document-copy' @click="copyorderno()"></i></p>
	</div>
</template>

<script>
	export default({
		name:'OrderCopy',
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		methods:{
			//拷贝订单号
			copyorderno(){
				 let oInput = document.createElement('input');
				oInput.value = this.orderno;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				//console.log(oInput.value)
				document.execCommand("Copy"); // 执行浏览器复制命令
				this.$message.success('复制成功')
				oInput.remove()
			}
		},
		filters:{
			ordernofilter(value){
				let first,last;
				if(value.length>10){
					first=value.substring(0,5);
					last=value.substring(value.length-5,value.length);
					return first+"..."+last;
				}
				return value;
			}
		}
	})
</script>

<style>
</style>
