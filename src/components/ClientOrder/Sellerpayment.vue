<template>
	<el-form ref="order" :model="order" :rules="orderRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-form-item label="收款金额(人民币)" prop="money">
				<el-input v-model="order.money"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="收款方式" prop="channel">
				<el-select v-model="order.channel" placeholder="请选择收款方式">
				  <el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
			  </el-form-item>
			</el-col>
			<el-col :span="12">
			  <el-form-item label="备注" prop="remark">
				<el-input v-model="order.remark"></el-input>
			  </el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('order')" :loading="btnloading">立即提交</el-button>
			  </el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,Row,Col,FormItem,Select,Option} from 'element-ui'
	import {paymentType} from '@/assets/js/orderState.js'
	export default({
		name:'Sellerpayment',
		components:{
			[Form.name]:Form,
			[Row.name]:Row,
			[Col.name]:Col,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option
		},
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				order:{
					money:'',
					channel:'',
					remark:''
				},
				orderRule:{
					money:[
						{ required: true, message: '请输入实收款金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/ , message: '实收款金额必须为数字', trigger: 'blur' }
					],
					channel:[
						{  required: true, message: '请选择收款方式', trigger: 'change' }
					]
				},
				btnloading:false,
				paymentType
			}
		},
		methods:{
			//提交创建
			submitForm(order){
				this.$refs[order].validate((valid) => {
				  if (valid) {
					  this.btnloading=true;
					  let {remark,money,channel}=this.order;
					  this.$api.comitPayTopOrderMoney({
						  "toporderno":this.orderno,
						  remark,
						  "ordermoney":money,
						  "sktype":channel
					  }).then(res=>{
					  	if(res.rescode>0){
							this.$message.success('提交成功')
					  		this.$emit('dialogToggle',true);
					  		this.resetForm();
					  	}else{
							this.$message.warning(res.resdesc);
					  	}
					  	this.btnLoading=false;
					  }).catch(xhr=>{
					  	//console.log(xhr);
						this.$message.warning('提交失败')
					  	this.btnLoading=false;
					  })
				  }else{
					  console.log('error submit!!');
					  return false;
				  }
				});
			},
			resetForm(){
				this.$refs.order.resetFields();
			}
		}
	})
</script>

<style>
</style>
