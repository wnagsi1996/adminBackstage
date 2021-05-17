<template>
	<el-form ref="order" :model="order" :rules="orderRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<el-col :span="12">
				 <el-form-item label="刷手邮箱或微信号" prop="userinfo">
				  <el-input v-model.trim="order.userinfo" />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				 <el-form-item label="购买单号" prop="xdorderno">
				  <el-input v-model.trim="order.xdorderno" />
				</el-form-item>
			</el-col>
		  <el-col :span="12">
			 <el-form-item label="购买价格" prop="price">
			  <el-input v-model.trim="order.price" />
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="下单时间" prop="date">
			  <el-date-picker type="date" placeholder="开始时间" v-model="order.date" style="width: 100%;" />
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			 <el-form-item label="备注" prop="xdremark">
			  <el-input v-model.trim="order.xdremark" />
			</el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('order')" :loading="btnLoading">提交</el-button>
			  </el-form-item>
		  </el-col>
		 </el-row>
	</el-form>
</template>

<script>
	import PaseImage from '@/components/PaseImage'
	import {Form,FormItem,Row,Col,Input,datePicker} from 'element-ui'
	export default({
		name:'BackOrder',
		components:{
			PaseImage,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[datePicker.name]:datePicker,
			[Input.name]:Input
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
					userinfo:'',
					xdorderno:'',
					price:'',
					date:'',
					xdremark:''
				},
				orderRule:{
					userinfo:[
						{ required: true, message: '请输入刷手邮箱或微信号', trigger: 'blur' },
					],
					xdorderno:[
						{ required: true, message: '请输入购买单号', trigger: 'blur' },
					],
					price:[
						{ required: true, message: '请输入应退产品费金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '应退产品费金额必须为数字' }
					]
				},
				btnLoading:false,
				ordertype:0
			}
		},
		created() {
			this.getOrderInfo(this.orderno);
		},
		methods:{
			//获取订单信息
			getOrderInfo(orderno){
				this.$api.getCPOrderDetailXDInfo({orderno}).then(res=>{
					//console.log(res);
					if(res!=''){
						this.order={
							userinfo:res.fklxfs,
							xdorderno:res.xdOrderno,
							price:res.realproductdj,
							date:res.realxddate,
							xdremark:res.fkremar
						}
					}else{
						this.resetForm()
					}
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//提交
			submitForm(order){
				this.$refs[order].validate((valid) => {console.log(this.order)
				  if (valid) {
					this.btnLoading=true;
					let {userinfo,xdorderno,xdremark,date,price}=this.order
					this.$api.setCPOrderDetailXDInfo({
						"orderno":this.orderno,
						"useremail":userinfo,
						"xdOrderno":xdorderno,
						"fkaccount":'',
						"fkremark":xdremark?xdremark:'',
						"realxddate":date,
						"realproductdj":price,
						"fktype":0,
						"_img64":''
					}).then(res=>{
						 console.log(res);
						 if(res.rescode>0){
							 this.$message.success(res.resdesc)
							this.$emit('dialogToggle',true);
							this.resetForm();
						 }else{
							 this.$message.warning(res.resdesc)
						 }
						 this.btnLoading=false;
					 }).catch(xhr=>{
						 console.log(xhr);
						 this.$message.warning('上传失败')
						 this.btnLoading=false;
					 })
				  }else{
					  
				  }
				})
			},
			resetForm(){
				this.$refs.order.resetFields();
			}
		},
		watch:{
			orderno(newVal,oldVal){
				this.getOrderInfo(newVal);
			}
		}
	})
</script>

<style>
</style>
