<template>
	<el-form ref="user" :model="user" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			 <el-form-item label="姓" prop="firstname">
			  <el-input v-model.trim="user.firstname"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="名" prop="lastname">
			  <el-input v-model.trim="user.lastname"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="邮箱" prop="email">
			  <el-input type="email" v-model="user.email"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="国家" prop="country">
			  <el-select v-model="user.country">
			    <el-option label="美国" value="美国"></el-option>
			    <el-option label="加拿大" value="加拿大"></el-option>
			    <el-option label="墨西哥" value="墨西哥"></el-option>
			    <el-option label="英国" value="英国"></el-option>
			    <el-option label="法国" value="法国"></el-option>
			    <el-option label="德国" value="德国"></el-option>
			    <el-option label="意大利" value="意大利"></el-option>
			    <el-option label="西班牙" value="西班牙"></el-option>
			    <el-option label="日本" value="日本"></el-option>
			    <el-option label="澳大利亚" value="澳大利亚"></el-option>
			    <el-option label="印度" value="印度"></el-option>
			  </el-select>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="亚马逊页面" prop="amazonpage">
			  <el-input v-model.trim="user.amazonpage"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="FB页面链接" prop="fbpage">
			  <el-input v-model.trim="user.fbpage"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="微信ID" prop="weixin">
			  <el-input v-model.trim="user.weixin"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="24">
			 <el-form-item label="备注" prop="remark">
			  <el-input type="textarea" v-model.trim="user.remark"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="24">
			  <el-button type="primary" @click="submitForm('user')" :loading="btnLoading">提交</el-button>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,Row,Col,FormItem,Input,Select,Option} from 'element-ui'
	export default({
		name:'BlackUser',
		props:{
			userInfo:{
				type:Object,
				default:new Object
			}
		},
		components:{
			[Form.name]:Form,
			[Row.name]:Row,
			[FormItem.name]:FormItem,
			[Col.name]:Col,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option
		},
		data(){
			return{
				user:{
					firstname:'',
					lastname:'',
					email:'',
					country:'美国',
					amazonpage:'',
					fbpage:'',
					weixin:'',
					remark:''
				},
				btnLoading:false,
				rid:0
			}
		},
		created() {
			this.editdata(this.userInfo);
		},
		methods:{
			submitForm(user){
				this.$refs[user].validate(async (valid) => {
				  if (valid) {
					  let {email,fbpage,weixin}=this.user;
					if(email=='' && fbpage=='' && weixin==''){
						this.$message.warning('邮箱/FB页面链接/微信ID三个必须要填写一个')
					}else{
						this.btnLoading=true;
						let rid=this.rid;
						let res='',messTxt=''
						try{
							if(rid==0){
								res=await this.$api.addCPHMD(this.user);
								messTxt='添加';
							}else{
								res=await this.$api.editCPHMD(Object.assign(this.user,{rid}))
								messTxt='编辑';
							}
							if(res.rescode==1){
								this.$message.success(`${messTxt}成功`)
								this.resetForm();
								this.$emit('dialogToggle',true);
							}else{
								this.$message.warning(res.resdesc)
							}
							this.btnLoading=false;
						}catch(e){
							let txt=rid==0?'添加':'编辑'
							this.$message.warning(`${messTxt}失败`)
							this.btnLoading=false;
						}
					}
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			resetForm(){
				this.$refs.user.resetFields();
			},
			editdata(userInfo){
				if(Object.keys(userInfo).length!=0){
					Object.assign(this.user,userInfo);
					this.rid=userInfo.rid
				}else{
					this.rid=0;
					let user=Object.assign({},this.user);
					Object.keys(user).forEach(key=>(user[key]=''));
					Object.assign(this.user,user);
				}
			}
		},
		watch:{
			userInfo(newVal,oldVal){
				this.editdata(newVal);
			}
		}
	})
</script>

<style>
</style>
