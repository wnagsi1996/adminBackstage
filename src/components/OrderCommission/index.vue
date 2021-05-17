<template>
	<el-form ref="rebate" :model="rebate" :rules="rebateRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12" v-if="orderYJShow">
			  <el-form-item label="下单佣金" prop="orderYJ">
				<el-input v-model="rebate.orderYJ"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12" v-if="reviewYJShow">
			  <el-form-item label="留评佣金" prop="reviewYJ">
				<el-input v-model="rebate.reviewYJ"></el-input>
			  </el-form-item>
		  </el-col>
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
	import {Form,FormItem,Row,Col,Input,Select,Option} from 'element-ui'
	import PaseImage from "@/components/PaseImage"
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
					orderYJ:'',
					reviewYJ:'',
					remark:'',
					imgsrc:''
				},
				rebateRule:{
					channel:[
						{required: true, message: '请选择收款渠道', trigger: 'change' }
					],
					orderYJ:[
						{ pattern:/^\d+(\.\d+)?$/, message: '下单佣金必须为数字' }
					],
					reviewYJ:[
						{ pattern:/^\d+(\.\d+)?$/, message: '留评佣金必须为数字' }
					]
				},
				btnLoading:false,
				oldimg:'',
				paymentType
			}
		},
		computed:{
			//控制下单佣金显示
			orderYJShow(){
				let {iffkxdyj}=this.Rebatedata;
				if(iffkxdyj=='0' || iffkxdyj=='3') return true;
				else return false;
			},
			//控制留评佣金显示
			reviewYJShow(){
				let {iffklpyj,lpzt}=this.Rebatedata;
				if(lpzt=='1' && iffklpyj=='0' || iffklpyj=='3') return true;
				else return false;
			}
		},
		methods:{
			submitForm(rebate){
				this.$refs[rebate].validate((valid) => {
				  if (valid) {
					  let {orderYJ,reviewYJ,account,imgsrc,channel,remark}=this.rebate;
					  if(orderYJ=='' && reviewYJ==''){
						  this.$message.warning('返款金额不能为空')
						  return false;
					  }
					  if(account=="" && imgsrc=="" ){
						  this.$message.warning('收款账户或二维码不能都为空')
							return false;
					   }
					   
						this.btnLoading=true;
						this.$api.comitCPOrderDetailYJFK({
							"orderno":this.Rebatedata.orderno,
							remark,
							"skaccount":account,
							"yjmoney_xd":orderYJ==''?0:orderYJ,
							"yjmoney_lp":reviewYJ==''?0:reviewYJ,
							"sktype":channel,
							"_img64":imgsrc,
						}).then(res=>{
							//console.log(res);
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
				})
			},
			getImgSrc(val){
				this.rebate.imgsrc=val;
			},
			// 重置
			resetForm(){
				this.$refs.rebate.resetFields();
			}
		}
	})
</script>

<style>
</style>
