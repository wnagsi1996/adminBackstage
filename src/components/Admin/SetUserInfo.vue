<template>
	<el-form ref="user" :model="user" :rules="userRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-form-item label="员工姓名" prop="Username">
			    <el-input v-model="user.Username"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="登陆名称" prop="Loginname">
				<el-input v-model="user.Loginname" autocomplete="new-password"></el-input>
			  </el-form-item>
		  </el-col>
		  <template v-if="userID==''">
			  <el-col :span="12">
				  <el-form-item label="登陆密码" prop="pass">
					<el-input type="password" v-model="user.pass" autocomplete="new-password"></el-input>
				  </el-form-item>
			  </el-col>
			  <el-col :span="12">
				  <el-form-item label="确认密码" prop="pass1">
					<el-input type="password" v-model="user.pass1"></el-input>
				  </el-form-item>
			  </el-col>
		  </template>
		  <el-col :span="12">
			  <el-form-item label="角色" prop="Roleid">
				<el-select v-model="user.Roleid" placeholder="请选择用户角色">
					<el-option v-for="item in roleList"  :label="item.rolename" :value="item.roleid" :key="item.roleid"></el-option>
				</el-select>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="备注" prop="Remark">
				<el-input v-model="user.Remark"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('user')" :loading="btnLoading" close-on-click-modal="false">立即创建</el-button>
				 <el-button @click="resetForm()">重置</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,Select,Option,Input} from 'element-ui'
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	export default({
		name:'SetUserInfo',
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[Select.name]:Select,
			[Option.name]:Option,
			[Input.name]:Input
		},
		data(){
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
				  callback(new Error('请再次输入密码'));
				} else if (value !== this.user.pass) {
				  callback(new Error('两次输入密码不一致!'));
				} else {
				  callback();
				}
			  };
			return{
				user:{
					Username:'',
					Loginname:'',
					pass:'',
					pass1:'',
					Roleid:'',
					Remark:''
				},
				userRule:{
					Username:[
						{ required: true, message: '请输入员工姓名', trigger: 'blur' },
					],
					Loginname:[
						{ required: true, message: '请输入登陆名称', trigger: 'blur' },
					],
					pass:[
						{ required: true, message: '请输入登陆密码', trigger: 'blur' },
					],
					pass1:[
						 { validator: validatePass2, trigger: 'blur' }
					],
					Roleid:[
						{required: true, message: '请选择角色', trigger: 'change' }
					]
				},
				btnLoading:false
			}
		},
		props:{
			userID:{
				type:String,
				default:''
			},
			roleList:{
				type:Array,
				default:new Array
			},
			dialogUserInfoToggle:{
				type:Function,
				default:function(){}
			}
		},
		created() {
			this.getUserInfo(this.userID);
		},
		methods:{
			//获取用户信息
			getUserInfo(userid){
				if(userid!=""){
					this.$api.getCPUserInfo({userid}).then(res=>{
						Object.assign(this.user,res);
					}).catch(xhr=>{
						this.$message.warning('获取用户信息失败!')
					})
					this.user={
						pass:'1',
						pass1:'1'
					}
				}else{
					this.user={
						pass:'',
						pass1:''
					}
				}
			},
			// 提交
			submitForm(user){
				this.$refs[user].validate((valid) => {
				  if (valid) {
					let pass,pass1,userid=this.userid;
					let uid=0;  //创建
					this.btnLoading=true;
					if(userid!=''){
						uid=userid;
						pass="1",
						pass1="1",
						this.createAccount(uid,pass,pass1)
					}else{
						let userPass=this.user.pass;
						//获取后台传过来的公钥
						this.$api.rsaKey().then(res=>{
							if(res.rescode==0){
								pass = cmdEncrypt(userPass, res.strPublicKeyExponent, res.strPublicKeyModulus);
								pass1 = cmdEncrypt(userPass, res.strPublicKeyExponent, res.strPublicKeyModulus);
								if(pass!='' && pass1!=''){
									this.createAccount(uid,pass,pass1)
								}else{
									this.$message.warning('创建加密数据失败!')
									this.btnLoading=false;
								}
							}else{
								this.$message.warning('创建加密数据失败!')
								this.btnLoading=false;
							}
						}).catch(xhr=>{
							this.$message.warning('创建加密数据失败!')
							this.btnLoading=false;
						})
					}
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			createAccount(uid,password,surepassword){
				let {Username,Loginname,Roleid,Remark}=this.user;
				this.$api.addOrEditCPUser({
					uid,
					"username":Username,
					"loginname":Loginname,
					password,
					surepassword,
					"roleid":Roleid,
					"remark":Remark
				}).then(res=>{
					//console.log(res);
					if(res.rescode==1){
						this.$message.success(res.resdesc)
						this.$emit('dialogUserInfoToggle',true);
					}else{
						this.$message.warning(res.resdesc)
					}
					this.btnLoading=false;
				}).catch(err=>{
					//console.log(xhr);
					this.$message.warning('员工账号创建出错')
					this.btnLoading=false;
				})
			},
			// 重置
			resetForm(){
				this.$refs.user.resetFields();
			}
		},
		watch:{
			userID(newVal,oldVal){
				this.resetForm();
				this.getUserInfo(newVal);
			}
		}
	})
</script>
