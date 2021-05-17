<template>
	<el-form :model="setdate" ref="setdate" :rules="setDateRule" label-width="100px" class="demo-ruleForm">
		 <el-form-item label="时间" prop="plandate">
			 <el-date-picker
			   v-model="setdate.plandate"
			   type="datetime"
			   placeholder="选择日期"
			   value-format="yyyy-MM-dd HH:mm:ss">
			 </el-date-picker>
		 </el-form-item>
		  <el-form-item>
		     <el-button type="primary" @click="submitForm('setdate')" :loading="btnLoading">提交</el-button>
		   </el-form-item>
	</el-form>
</template>

<script>
	import {Form,FormItem,DatePicker} from 'element-ui'
	export default({
		name:'SetDate',
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[DatePicker.name]:DatePicker
		},
		data(){
			return{
				setdate:{
					plandate:''
				},
				setDateRule:{
					plandate:[
						{ required: true, message: '请选择日期', trigger: 'change' }
					]
				},
				btnLoading:false
			}
		},
		methods:{
			//提交
			submitForm(setdate){
				console.log(this.setdate.plandate);
				this.$refs[setdate].validate((valid) => {
				  if (valid) {
					  this.btnLoading=true;
					  this.$api.setCPDetailPlanFD({
						  "orderno":this.orderno,
						  "plandate": this.setdate.plandate
					  }).then(res=>{
						  //console.log(res);
					  	if(res>0){
							this.$message.success('设置成功!')
							this.$emit('dialogToggle',true);
						}else{
							this.$message.warning('设置失败!')
						}
						this.btnLoading=false;
					  }).catch(xhr=>{
					  	console.log(xhr);
						this.$message.warning('设置失败!')
					  })
				  }else{
					  
				  }
				})
			}
		}
	})
</script>

<style>
</style>
