<template>
	<div>
		<el-input type="textarea" :rows="5" v-model="textarea" />
		<el-button type="primary" @click="save" :loading="btnLoading" style="margin-top:20px;">提交</el-button>
	</div>
</template>

<script>
	import {Input} from 'element-ui'
	export default({
		name:'Worklog',
		components:{
			[Input.name]:Input
		},
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				textarea:'',
				btnLoading:false
			}
		},
		created() {
			this.getWorkLog(this.orderno);
		},
		methods:{
			async getWorkLog(orderno){
				try{
					let res=await this.$api.getCPTopWorkLog({orderno});
					this.textarea=res
				}catch(e){
					this.$message.warning('记事本获取失败')
				}
			},
			save(){
				this.btnLoading=true;
				this.$api.addCPTopWorkLog({
					orderno:this.orderno,
					remark:this.textarea
				}).then(res=>{
					if(res.rescode>0){
						this.$message.success(res.resdesc);
						this.$emit('dialogToggle',true);
						this.textarea='';
					}else{
						this.$message.warning(res.resdesc);
					}
					this.btnLoading=false;
				}).catch(xhr=>{
					this.$message.warning('提交失败');
				})
			}
		},
		watch:{
			orderno(newVal,oldVal){
				this.getWorkLog(newVal)
			}
		}
	})
</script>

<style>
</style>
