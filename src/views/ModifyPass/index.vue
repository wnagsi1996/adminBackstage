<template>
	<el-col :span="6">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="旧密码" prop="oldPass">
		    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="新密码" prop="pass">
		    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</el-col>
</template>

<script>
	import {Form,FormItem,Input,Col} from 'element-ui'
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	export default {
	    data() {
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
	          if (this.ruleForm.checkPass !== '') {
	            this.$refs.ruleForm.validateField('checkPass');
	          }
	          callback();
	        }
	      };
	      var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.ruleForm.pass) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
	      return {
	        ruleForm: {
			  oldPass:'',
	          pass: '',
	          checkPass: ''
	        },
	        rules: {
			  oldPass:[
				{ required: true, message: '请输入旧密码',trigger: 'blur'}
			  ],
	          pass: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          checkPass: [
	            { validator: validatePass2, trigger: 'blur' }
	          ]
	        }
	      };
	    },
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Col.name]:Col,
			[Input.name]:Input
		},
	    methods: {
	      submitForm(ruleForm ) {
	        this.$refs[ruleForm].validate(async (valid) => {
				
	          if (valid) {
				  let oldPassRsa='';let passRsa='';
				  this.loading=true;
	            //获取后台传过来的公钥
				try{
					let rsa=await this.$api.rsaKey();
					if(rsa.rescode==0){
						let {oldPass,pass}=this.ruleForm;
						oldPassRsa = cmdEncrypt(oldPass, rsa.strPublicKeyExponent, rsa.strPublicKeyModulus);
						passRsa = cmdEncrypt(pass, rsa.strPublicKeyExponent, rsa.strPublicKeyModulus);
					}else{
						this.$message({
						  message: '修改密码出错',
						  type: 'warning'
						});
						this.loading=false;
						return false;
					}
				}catch(e){
					this.$message({
					  message: '修改密码出错',
					  type: 'warning'
					});
					this.loading=false;
				}
				
				this.$api.modifyPasswordByCurUser({
					"password1":oldPassRsa,
					"password2":passRsa,
					"password3":passRsa
				}).then(res=>{
					if(res.rescode>0){
						this.$message({
						  message: res.resdesc,
						  type: 'success'
						});
						this.resetForm();
					}else{
						this.$message({
						  message: res.resdesc,
						  type: 'warning'
						});
					}
					this.loading=false;
				}).catch(err=>{console.log(err);
					this.$message({
					  message: '修改密码出错',
					  type: 'warning'
					});
					this.loading=false;
				})
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm() {
	        this.$refs.ruleForm.resetFields();
	      }
	    }
	  }
</script>

<style>
</style>
