<template>
	<el-form ref="product" :model="product" :rules="productRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-form-item label="退款渠道" prop="channel">
				<el-select v-model="product.channel" placeholder="请选择退款渠道">
				  <el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="货币类型" prop="type">
				<el-select v-model="product.type" @change="switchCurrency" placeholder="请选择货币类型">
				  <el-option label="人民币" value="0"></el-option>
				  <el-option label="美元" value="1"></el-option>
				</el-select>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="退款产品费" prop="money">
			  <el-input v-model="product.money"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12" v-if="product.yjmoney!=0">
			 <el-form-item label="刷手佣金" prop="yjmoney">
			  <el-input v-model="product.yjmoney"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12" v-if="product.yjmoney!=0">
			 <el-form-item label="总退款" prop="totalMoney">
			  <el-input v-model="product.totalMoney"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="备注" prop="remark">
			  <el-input v-model="product.remark"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('product')" :loading="btnLoading">提交</el-button>
			  </el-form-item>
		  </el-col>
		 </el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,Input,Select,Option} from 'element-ui'
	import {paymentType} from '@/assets/js/orderState.js'
	export default({
		name:'Chargeback',
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option
		},
		data(){
			return{
				product:{
					channel:'',//退款渠道
					money:'', //产品费
					yjmoney:'',//佣金
					totalMoney:'',//总退款
					remark:'',//备注
					type:''//货币类型
				},
				productRule:{
					money:[
						{ required: true, message: '请输入退款产品费', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '退款产品费必须为数字' }
					],
					yjmoney:[
						{ required: true, message: '请输入退款佣金', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '退款佣金必须为数字' }
					],
					channel:[
						 { required: true, message: '请选择收款渠道', trigger: 'change' }
					],
					type:[
						 { required: true, message: '请选择货币类型', trigger: 'change' }
					]
				},
				btnLoading:false,
				ordertype:0,
				orderdata:{},
				paymentType
			}
		},
		created() {
			this.getbackorder(this.orderno)
		},
		methods:{
			//获取退单数据
			getbackorder(orderno){
				this.$api.getBackProductMoney({orderno}).then(res=>{
					if(Object.keys(res).length>0){
						this.orderdata=res
					}else{
						this.$message.warning('退单数据获取失败!')
					}
				}).catch(xhr=>{
					this.$message.warning('退单数据获取失败!')
				})
			},
			//提交
			submitForm(product){
				this.$refs[product].validate((valid) => {
				  if (valid) {
					  let {money,channel,remark,type,yjmoney}=this.product;
					  if(money=="0"){
						  this.$message.warning('退款金额不能为0!')
						}else{
							this.btnLoading=true;
							this.$api.backProductFK({
								"orderno":this.orderno,
								"sktype":channel,
								remark,
								"currency":type,
								"tkmoney":money,
								yjmoney
							}).then(res=>{
								 console.log(res);
								 if(res.rescode>0){
									 this.$message.success('退单已提交给财务确认!')
								 	this.$emit('dialogToggle',true);
								 	this.resetForm();
								 }else{
									 this.$message.warning(res.resdesc)
								 }
								 this.btnLoading=false;
							 }).catch(xhr=>{
								 this.$message.warning('提交失败')
								 console.log(xhr)
							 })
						}
				  }
				})
			},
			resetForm(){
				this.$refs.product.resetFields();
			},
			switchCurrency(even){
				let obj=Object.assign({},this.orderdata);
				let pdObj={}
				if(even==0){
					pdObj={
						money:obj.cpf_rmb,
						yjmoney:obj.yj_rmb,
						totalMoney:Number(obj.cpf_rmb)+Number(obj.yj_rmb)
					}
				}else{
					pdObj={
						money:obj.cpf_usd,
						yjmoney:obj.yj_usd,
						totalMoney:Number(obj.cpf_usd)+Number(obj.yj_usd)
					}
				}
				Object.assign(this.product,pdObj);
			}
		},
		watch:{
			orderno(newVal,oldVal){
				this.getbackorder(newVal)
			}
		}
	})
</script>

<style>
</style>
