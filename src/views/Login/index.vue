<template>
	<div>
		<!-- 粒子背景特效 -->
		<!-- <Particles /> -->
		<div class="login">
			<div class="login-item">
				<div class="login-title">
					<h3>跨境测评管理平台</h3>
				</div>
				<div class="login-form">
					<el-form ref="form" status-icon :model="form" :rules="rules">
					  <el-form-item prop="account">
					    <el-input v-model="form.account">
							<el-button slot="prepend" icon="el-icon-user"></el-button>
						</el-input>
					  </el-form-item>
					  <el-form-item prop="pass">
					    <el-input type="password" v-model="form.pass">
							<el-button slot="prepend" icon="el-icon-key"></el-button>
						</el-input>
					  </el-form-item>
					  <el-form-item prop="code">
							 <el-col :span="11">
								<el-input v-model="form.code" @keyup.enter.native="onSubmit('form')">
									<el-button slot="prepend" icon="el-icon-time"></el-button>
								</el-input>
							 </el-col>
							 <el-col :span="2"></el-col>
							 <el-col :span="11">
								 <img class="codeimg" src='' id="codeimg" @click="showCode" />
							 </el-col>
					  </el-form-item>
					  <el-form-item>
					    <el-button style="width:100%" type="primary" :loading="loading" @click="onSubmit('form')">登录</el-button>
					  </el-form-item>
					  <el-checkbox v-model="form.savePass">记住密码</el-checkbox>
					</el-form>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	 import {cmdEncrypt} from "@/assets/js/RSAz.js"
	 import {Form,Input,FormItem,Col,Checkbox } from 'element-ui'
	 import {getCookie,setCookie,delCookie} from '@/assets/js/cookie.js'
	 import {encryption,ecrypt} from '@/assets/js/encryption.js'
	 // import Particles from "@/components/particles"   //引入粒子背景特效
	export default {
		components:{
			[Form.name]:Form,
			[Input.name]:Input,
			[FormItem.name]:FormItem,
			[Checkbox.name]:Checkbox,
			[Col.name]:Col
		},
	  data() {
		  var account = (rule, value, callback) => {
			  if (!value) {
				return callback(new Error('登录账号不能为空'));
			  }
			  callback();
			};
			var pass = (rule, value, callback) => {
				if (value === '') {
				  callback(new Error('请输入密码'));
				} 
				callback();
			  };
			 var code = (rule, value, callback) => {
			  if (!value) {
				return callback(new Error('验证码不能为空'));
			  }
			  callback();
			};
	    return {
	      form: {
	        account: '',
	        pass: '',
			savePass:false,//记住密码
			code:''
	      },
		  loading:false,
		  rules: {
			account: [
			  { validator: account, trigger: 'blur' }
			],
			pass: [
			  { validator: pass, trigger: 'blur' }
			],
			code: [
			  { validator: code, trigger: 'blur' }
			]
		  }
	    }
	  },
	  created() {
	  	let user=getCookie('login-user');
		let pass=getCookie('login-pass');
		if(user!='' && pass!=''){
			this.form={
				account:user,
				pass:ecrypt(pass),
				savePass:true
			}
		}
	  },
	  mounted() {
		this.showCode();
	  },
	  methods: {
	    onSubmit(formName) {
			 this.$refs[formName].validate(async valid => {
			   if (valid) {
				   this.loading=true;
				//获取后台传过来的公钥 
				let rsa=await this.$api.rsaKey();
				if(rsa.rescode!=0){
					this.loading=false;
					this.$message('登录失败')
					return;
				}
				let {pass,code,account,savePass}=this.form;
				let passrsa = cmdEncrypt(pass, rsa.strPublicKeyExponent, rsa.strPublicKeyModulus);
				let loginForm={'VerifyCode':code,'lname':account,'pass':passrsa};
				this.$store.dispatch('user/login',loginForm).then(res=>{
					this.loading = false;
					if(res.rescode=='0'){
						if(savePass){
							setCookie('login-user',account,7,'/login');
							setCookie('login-pass',encryption(pass),7,'/login');
						}else{
							delCookie('login-user');
							delCookie('login-pass');
						}
						// 登陆成功后重定向
						this.$router.push({
							path: this.redirect || '/'
						})
					}else{
						this.$message('登录失败')
					}
				 }).catch(err=>{
					this.loading = false
				 }) 
			   }
			});
	    },
		//获取图片验证码
		showCode(){
			let url=""
			process.env.NODE_ENV==='development'?url="/Handler":url='';  //区分开发环境加‘/Handler’，生产环境不加
			document.getElementById("codeimg").src=url+'/UserControl/Validata.aspx?ValiType=valiregister&' + Math.random();
		}
	  }
	}
</script>

<style scoped>
	.login{width: 100vw;height: 100vh;background:url(../../assets/image/login-bj.jpg) no-repeat 0 0/100%;}
	.login-item{width: 400px;height: 400px; border:1px solid #fff; border-radius: 5px;position: fixed;right: 15%;top: 25%;background-color: #fff;}
	.login-title{width:80%;height: 40px;line-height:40px;border-left:5px solid #006cfb;margin:10px auto 0;padding-left:20px}
	.codeimg{height: 40px;padding-left: 10px;}
	.login-form{padding:30px}
</style>
