<template>
	<el-form ref="rebate" :model="rebate" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-form-item label="渠道" prop="channel">
				<el-select v-model="rebate.channel" placeholder="请选择渠道">
				  <el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="账号" prop="account">
				<el-input v-model="rebate.account"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="返款金额(美金)" prop="pricemj">
				<el-input v-model="rebate.pricemj"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12" v-show="rebate.channel!='3'">
			  <el-form-item label="返款金额（人民币）必填" prop="price">
				<el-input v-model="rebate.price"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="备注" prop="remark">
				<el-input v-model="rebate.remark"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24">
			  <el-form-item label="返款二维码" prop="imgsrc">
				<PaseImage :imgsrc="rebate.imgsrc" @getImgSrc="getImgSrc" />
			  </el-form-item>
		  </el-col>
		  
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('rebate')" :loading="btnLoading">提交返款</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import PaseImage from "@/components/PaseImage"
	import {Form,FormItem,Row,Col,Input,Select,Option} from 'element-ui'
	import {paymentType} from '@/assets/js/orderState.js'
	export default({
		name:'Rebate',
		components:{
			PaseImage,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option
		},
		props:{
			orderno:{
				type:String,
				default:''
			},
			Rebatedata:{
				type:Object,
				default:new Object()
			}
		},
		data(){
			return{
				rebate:{
					channel:'',
					account:'',
					pricemj:'',//美金
					price:'',
					remark:'',
					imgsrc:''
				},
				// rebateRule:{
				// 	channel:[
				// 		{required: true, message: '请选择收款渠道', trigger: 'change' }
				// 	],
				// 	price:[
				// 		{ pattern:/^\d+(\.\d+)?$/, message: '产品客单价必须为数字' }
				// 	]
				// },
				btnLoading:false,
				oldimg:'',
				paymentType
			}
		},
		created() {
			this.getdata();
		},
		methods:{
			submitForm(rebate){
				this.$refs[rebate].validate((valid) => {
				  if (valid) {
					  let {usmoney}=this.Rebatedata;
					  if(this.rebate.channel!='3'){
						   let {price}=this.rebate
						   let firstmoney = (Number(usmoney) * 7) * 1.1;
						   let lastmoney = (Number(usmoney) * 7) * 0.9;
						   if(price>firstmoney || price<lastmoney){
								this.$confirm('您输入的返款人民币跟实际误差比较大，请重新核算遍，继续提交点确定！', '警告', {
								  confirmButtonText: '确定',
								  cancelButtonText: '取消',
								  type: 'warning'
								}).then(() => {
								  this.uploadRebate();
								}).catch(() => {
									this.$message.info('已取消返款')        
								  return false;
								});
						   }else{
							   this.uploadRebate();
						   }
					  }else{
						  this.uploadRebate();
					  }
				  }
				})
			},
			//提交返款FN
			uploadRebate(){
				let {account,imgsrc,channel,remark,price,pricemj}=this.rebate;
				if(channel==''){
					this.$message.warning('请选择收款渠道!')
					return;
				}
				let reg=/^\d+(\.\d+)?$/;
				if(channel!=3){
					if(!reg.test(price)){
						this.$message.warning('客单价必须为数字!')
						return;
					}
				}
				
				if(pricemj==''){
					this.$message.warning('客单价（美金）必填!')
					return;
				}else if(!reg.test(pricemj)){
					this.$message.warning('客单价（美金）必须为数字!')
					return;
				}else if(pricemj<0 || Number(pricemj)>Number(this.Rebatedata.usmoney)){
					this.$message.warning('客单价（美金）不能小于0或者大于产品费!')
					return;
				}
				if(account=="" && imgsrc=="" ){
					this.$message.warning('收款账户或二维码不能都为空')
				}else{
				  this.btnLoading=true;
				  let newremark=remark;
				  if(channel!='3'){
					  newremark=`${remark} (填写人民币金额:${price})`;
				  }
				  this.$api.comitProductFK({
					  "orderno":this.orderno,
					  "remark":newremark,
					  "skaccount":account,
					  "oldfkimgurl":this.oldimg,
					  "sktype":channel,
					  "realproductfkmoney":pricemj,
					  "_img64":imgsrc
				  }).then(res=>{
					console.log(res);
					if(res.rescode>0){
						this.$message.success('提交成功')
						this.$emit('dialogToggle',true);
						this.resetForm();
					}else{
						this.$message.warning('提交失败')
					}
					this.btnLoading=false;
				  }).catch(xhr=>{
					this.$message.warning('提交失败')
					this.btnLoading=false;
				  })
				}
			},
			getImgSrc(val){
				this.rebate.imgsrc=val;
			},
			// 重置
			resetForm(){
				this.$refs.rebate.resetFields();
			},
			//有传数据来的时候赋值
			getdata(){
				Object.keys(this.rebate).forEach(key =>{this.rebate[key ]=''});
				let Rebatedata=this.Rebatedata;
				if(Object.keys(Rebatedata).length>1){
					let {fktype,fkaccount,fkimgurl,fkremark,usmoney}=Rebatedata;
					let newfkremark='',price='';
					if(fkremark!=''){
						let fkremarkrmb = fkremark.lastIndexOf("(");
						if (fkremarkrmb != -1) {
							newfkremark = fkremark.substring(0, fkremarkrmb);
							price = (fkremark.substring(fkremarkrmb).match(/\d+(.\d+)?/g)).toString();
						} else
							newfkremark = fkremark;
					}
					this.rebate={
						channel:fktype.toString(),
						account:fkaccount,
						imgsrc:fkimgurl,
						remark:newfkremark,
						pricemj:usmoney,
						price
					}
					this.oldimg=fkimgurl;
				}
				Object.assign(this.rebate,{pricemj:this.Rebatedata.usmoney})
			}
		},
		watch:{
			Rebatedata(newVal,oldVal){
				this.getdata();
			}
		}
	})
</script>

<style>
</style>
