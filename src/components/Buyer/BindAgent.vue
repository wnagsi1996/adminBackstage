<template>
	<el-form ref="user" :model="user" :rules="userRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="24">
			  <el-form-item label="" prop="Username">
				  <el-select v-model="user.Username">
					<el-option v-for="item in buyerAgentList" :label="item.name" :key="item.rid" :value="item.rid"></el-option>
				 </el-select>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('user')" :loading="btnLoading" close-on-click-modal="false">设置</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,Row,Col,FormItem,Select,Option} from 'element-ui'
	import {mapGetters} from 'vuex'
	export default({
		name:'BindAgent',
		components:{
			[Form.name]:Form,
			[Row.name]:Row,
			[Col.name]:Col,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option
		},
		props:{
			rids:{
				type:String,
				default:''
			}
		},
		computed:{
			...mapGetters([
				'buyerAgentList'
			])
		},
		data(){
			return{
				user:{
					Username:''
				},
				userRule:{
					Username:[
						{required: true, message: '请选择中介', trigger: 'change' }
					]
				},
				btnLoading:false
			}
		},
		methods:{
			submitForm(user){
				this.$refs[user].validate((valid) => {
					if (valid) {
						this.btnLoading=true;
						let rids=this.rids;
						this.$api.setCPOrderDetailAgent({
							rids,
							zjid:this.user.Username
						}).then(res=>{
							if(res.rescode>0){
								this.$message({
									type: 'success',
									message:res.resdesc
								});
								this.$emit('dialogToggle',rids);
								this.resetForm();
								
							}else{
								this.$message({
									type: 'warning',
									message:res.resdesc
								});
							}
							this.btnLoading=false;
						}).catch(xhr=>{
							console.log(xhr);
							this.btnLoading=false;
						})
					}
				})
			},
			resetForm(){
				this.$refs.user.resetFields();
			}
		}
	})
</script>

<style>
</style>
