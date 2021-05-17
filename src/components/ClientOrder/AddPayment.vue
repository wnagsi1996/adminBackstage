<template>
	<el-form ref="order" :model="order" :rules="orderRule" label-width="80px" label-position="top">
		<el-form-item label="收款方式" prop="channel">
			<el-select v-model="order.channel" placeholder="请选择收款方式" style="width: 100%;">
			  <el-option label="微信" value="0"></el-option>
			  <el-option label="支付宝" value="1"></el-option>
			  <el-option label="银行转账" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="收款金额(人民币)" prop="money">
			<el-input v-model="order.money"></el-input>
		</el-form-item>
		<el-form-item label="备注" prop="remark">
			<el-input v-model="order.remark"></el-input>
		</el-form-item>
	  <el-form-item>
		 <el-button type="primary" @click="submitForm('order')" :loading="btnloading">提交</el-button>
	  </el-form-item>
	</el-form>
</template>

<script>
	import {Form,FormItem,Select,Option,Input} from 'element-ui'
	export default({
		name:'AddPayment',
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option,
			[Input.name]:Input
		},
		data(){
			return{
				order:{
					channel:'',
					money:'',
					remark:''
				},
				orderRule:{
					channel:[
						{  required: true, message: '请选择收款方式', trigger: 'change' }
					],
					money:[
						{ required: true, message: '请输入实收款金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/ , message: '实收款金额必须为数字', trigger: 'blur' }
					]
				},
				btnloading:false
			}
		},
		methods:{
			submitForm(order){
				this.$refs[order].validate((valid) => {
				  if (valid) {
					  this.btnloading=true;
					  let {channel,remark,money}=this.order;
					  this.$api.comitPayTopOrderMoney({
						  "toporderno":this.orderno,
						  "sktype":channel,
						  remark,
						  "ordermoney":money
					  }).then(res=>{
					  	//console.log(res);
					  	if(res.rescode>0){
							this.$message.success('成功提交给财务审核')
					  		this.$emit('dialogToggle',true);
					  		this.resetForm();
					  	}else{
							this.$message.warning(res.resdesc)
					  	}
					  	this.btnLoading=false;
					  }).catch(xhr=>{
					  	//console.log(xhr);
						this.$message.warning('提交失败')
					  	this.btnLoading=false;
					  })
					}
				})
			},
			resetForm(){
				this.$refs.order.resetFields();
			}
		}
	})
</script>
