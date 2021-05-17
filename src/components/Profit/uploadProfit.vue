<template>
	<div>
		<el-form ref="formdata" :rules="formdataRule" :model="formdata" class="demo-form-inline">
			 <el-form-item label="提取金额" prop="money">
			  <el-input v-model="formdata.money"></el-input>
			</el-form-item>
			 <el-form-item label="备注">
			  <el-input v-model="formdata.remark"  type="textarea" :rows="2"></el-input>
			</el-form-item>
			<el-button type="primary" @click="submit" :loading="btnLoading">提交</el-button>	
		</el-form>
	</div>
</template>

<script>
	import {Form,FormItem,Input} from 'element-ui'
	export default({
		name:'uploadProfit',
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input
		},
		data(){
			return{
				formdata:{
					money:'',
					remark:''
				},
				formdataRule:{
					money:[
						{ required: true, message: '请输入提取金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '提取金额必须为数字' }
					]
				},
				btnLoading:false
			}
		},
		methods:{
			submit(){
				this.$refs.formdata.validate((valid) => {
				  if (valid) {
					  let {tqmoney,remark}=this.formdata
					if(money<=0){
						this.$message.warning('提取金额必须大于0!')
					}else{
						this.$api.comitProfitTQ({
							tqmoney:money,
							remark
						}).then(res=>{
							if(res.rescode>0){
								this.$message.success('提交成功!')
								this.$emit('dialogToggle',true);
								this.resetForm();
							}else{
								this.$message.warning(res.resdesc)
							}
							this.btnLoading=false;
						}).catch(xhr=>{
							console.log(xhr)
							this.btnLoading=false;
							this.$message.warning('提取失败')
						})
					}
				  }
				});
			},
			resetForm(){
				this.$refs.formdata.resetFields();
			}
		}
	})
</script>

<style>
</style>
