<template>
	<el-form ref="agent" :model="agent" :rules="agentRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-form-item label="中介名称" prop="name">
			    <el-input v-model="agent.name"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="联系方式：（手机号码/微信号/FB号）" prop="contact">
				<el-input v-model="agent.contact"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="收款渠道" prop="channel">
				<el-select v-model="agent.channel" @change="selVal" placeholder="请选择收款渠道">
				  <el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="收款账号" prop="account">
				<el-input v-model="agent.account"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="备注" prop="remark">
				<el-input v-model="agent.remark"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24">
			  <el-form-item label="收款二维码" prop="remark">
				<PaseImage :imgsrc="agent.imgsrc" @getImgSrc="getImgSrc" />
			  </el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('agent')" :loading="btnLoading">立即设置</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import PaseImage from "@/components/PaseImage"
	import {Form,Row,Col,FormItem,Input,Select,Option} from 'element-ui'
	import {paymentType} from '@/assets/js/orderState.js'
	export default({
		name:'Agen',
		components:{
			PaseImage,
			[Form.name]:Form,
			[Row.name]:Row,
			[Col.name]:Col,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option
		},
		props:{
			dialogUserInfoToggle:{
				type:Function,
				default:function(){}
			},
			agentdes:{
				type:Object,
				default:new Object()
			}
		},
		data(){
			return{
				agent:{
					name:'',
					contact:'',
					channel:'',
					account:'',
					remark:'',
					imgsrc:''
				},
				agentRule:{
					name:[
						{ required: true, message: '请输入中介名称', trigger: 'blur' },
					],
					contact:[
						{ required: true, message: '请输入中介联系方式', trigger: 'blur' },
					],
					channel:[
						{required: true, message: '请选择收款渠道', trigger: 'change' }
					]
				},
				btnLoading:false,
				oldimg:'',
				zjid:'',
				paymentType
			}
		},
		created() {
			this.ifAgentdes(this.agentdes)
		},
		methods:{
			submitForm(agent){
				this.$refs[agent].validate((valid) => {
				  if (valid) {
					  let {account,imgsrc,name,contact,remark,channel}=this.agent;
					  if(account=="" && imgsrc=="" ){
						  this.$message.warning('收款账户或二维码不能都为空!')
					  }else{
						  this.btnLoading=true;
						  if(this.zjid==''){
							  this.$api.addCPAgent({
								  name,
								  "lxfs":contact,
								  remark,
								  "skaccount":account,
								  "sktype":channel,
								  "_img64":imgsrc
							  }).then(res=>{
							  	//console.log(res);
							  	if(res.data>0){
									this.$message.success('中介创建成功')
							  		this.$emit('dialogAgentinfoToggle',true);
							  		this.resetForm();
							  	}else{
									this.$message.warning('中介创建出错')
							  	}
							  	this.btnLoading=false;
							  }).catch(xhr=>{
							  	//console.log(xhr);
							  	this.$message.warning('中介创建出错')
							  	this.btnLoading=false;
							  })
						  }else{
							  this.$api.editCPAgent({
								  "zjid":this.zjid,
								  name,
								  "lxfs":contact,
								  remark,
								  "skaccount":account,
								  "sktype":channel,
								  "_img64":imgsrc,
								  "oldfkimgurl":this.oldimg
							  }).then(res=>{
							  	//console.log(res);
							  	if(res>0){
									this.$message.success('中介编辑成功')
							  		this.$emit('dialogAgentinfoToggle');
							  		this.resetForm();
							  	}else{
									this.$message.warning('中介编辑出错')
							  	}
							  	this.btnLoading=false;
							  }).catch(xhr=>{
							  	//console.log(xhr);
							  	this.$message.warning('中介编辑出错')
							  	this.btnLoading=false;
							  })
						  }
					  }
				  }
				})
			},
			getImgSrc(val){
				this.agent.imgsrc=val;
			},
			// 重置
			resetForm(){
				this.$refs.agent.resetFields();
			},
			//判断是否编辑还是创建
			ifAgentdes(val){
				if(Object.keys(val).length>0){
					let obj={
						name:val.name,
						channel:val.sktype.toString(),
						account:val.skaccount,
						contact:val.lxfs,
						imgsrc:val.fkImgUrl
					}
					Object.assign(this.agent,obj);
					this.oldimg=val.fkImgUrl;
					this.zjid=val.rid
				}else{
					this.zjid='';
					this.agent.imgsrc='';
					this.resetForm();
				}
			},
			selVal(val){
				console.log(this.agent.channel);
			}
		},
		watch:{
			agentdes(newVal,oldVal){
				this.ifAgentdes(newVal);
			}
		}
	})
</script>

<style>
</style>
