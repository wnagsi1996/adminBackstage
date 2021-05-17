<template>
	<el-form ref="spread" :model="spread" :rules="spreadRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-form-item label="补退差价" prop="type">
				<el-radio-group v-model="spread.type" size="small">
				  <el-radio label="0" border>补差价</el-radio>
				  <el-radio label="1" border>退差价</el-radio>
				</el-radio-group>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="金额(小数点保留两位)" prop="money">
				<el-input v-model="spread.money"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="渠道" prop="channel">
				<el-select v-model="spread.channel" placeholder="请选择渠道">
				  <el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
			  </el-form-item>
			</el-col>
			<el-col :span="12">
			  <el-form-item label="账号" prop="account">
				<el-input v-model="spread.account"></el-input>
			  </el-form-item>
			</el-col>
			<el-col :span="24">
			  <el-form-item label="截图" prop="imgsrc">
				<PaseImage :imgsrc="spread.imgsrc" @getImgSrc="getImgSrc" />
			  </el-form-item>
			</el-col>
			<el-col :span="12">
			  <el-form-item label="备注" prop="remark">
				<el-input v-model="spread.remark"></el-input>
			  </el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('spread')" :loading="btnloading">立即提交</el-button>
			  </el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,Input,Select,Option,RadioGroup,Radio} from 'element-ui'
	import {paymentType} from '@/assets/js/orderState.js'
	import PaseImage from "@/components/PaseImage"
	export default({
		name:'Spread',
		components:{
			PaseImage,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option,
			[RadioGroup.name]:RadioGroup,
			[Radio.name]:Radio
		},
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				spread:{
					type:'',
					money:'',
					channel:'',
					account:'',
					remark:'',
					imgsrc:''
				},
				spreadRule:{
					type:[
						{  required: true, message: '请选择收款方式', trigger: 'change' }
					],
					money:[
						{ required: true, message: '请输入实收款金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/ , message: '实收款金额必须为数字', trigger: 'blur' }
					],
					channel:[
						{  required: true, message: '请选择渠道', trigger: 'change' }
					]
				},
				btnloading:false,
				paymentType
			}
		},
		methods:{
			//提交创建
			submitForm(spread){
				this.$refs[spread].validate((valid) => {
				  if (valid) {
					  let {account,imgsrc,remark,type,money,channel}=this.spread;
					  if(account=="" && imgsrc=="" ){
						  this.$message({
							type: 'warning',
							message: '收款账户或二维码不能都为空!'
						  });
					  }else{
						  this.btnloading=true;
						  this.$api.comitMakeUpTopOrderMoney({
							  "toporderno":this.orderno,
							  remark,
							  "ordertype":type,
							  "ordermoney":money,
							  "skaccount":account,
							  "sktype":channel,
							  "_img64":imgsrc
						  }).then(res=>{
							  //console.log(res);
						  	if(res.rescode>0){
								this.$message.success('提交成功')
						  		this.$emit('dialogToggle',true);
						  		this.resetForm();
						  	}else{
								this.$message.warning(res.resdesc);
						  	}
						  	this.btnloading=false;
						  }).catch(xhr=>{
						  	//console.log(xhr);
							this.$message.warning('提交失败')
						  	this.btnloading=false;
						  })
					  }
				  }else{
					  console.log('error submit!!');
					  return false;
				  }
				});
			},
			resetForm(){
				this.$refs.spread.resetFields();
			},
			getImgSrc(val){
				this.spread.imgsrc=val;
			}
		}
	})
</script>

<style>
</style>
