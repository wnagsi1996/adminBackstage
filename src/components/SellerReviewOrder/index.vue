<template>
	<el-form ref="order" :model="order" :rules="orderRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="24" v-if="rowData.type=='1'">
			 <el-form-item label="购买金额" prop="price">
			  <el-input v-model="order.price"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="24">
			 <el-form-item label="备注" prop="remark">
			  <el-input v-model="order.remark"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-button type="primary" @click="submitForm('order')" :loading="btnLoading">提交</el-button>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,Input} from 'element-ui'
	export default({
		name:'SellerReviewOrder',
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[Input.name]:Input
		},
		props:{
			rowData:Object
		},
		data(){
			return{
				order:{
					price:this.rowData.price,
					remark:''
				},
				orderRule:{
					lpnum:[
						{ required: true, message: '请输入购买金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '购买金额必须为数字' }
					],
				},
				btnLoading:false
			}
		},
		methods:{
			submitForm(order){
				this.order.price=this.rowData.price
				this.$refs[order].validate((valid) => {
				  if (valid) {
					this.btnLoading=true;
					let {orderno,type}=this.rowData;
					let {remark,price}=this.order;
					this.$api.doSHXDInfo({
						"orderno": orderno,
						"shremark":remark,   
						"dostate":type,
						"realproductdj": price
					}).then(res=>{
						if(res.rescode>0){
							this.$message.success('提交成功!')
							this.order={
								price:'',
								remark:''
							}
							this.$emit("dialogToggle",true);
						}else{
							this.$message.warning('提交失败!')
						}
						this.btnLoading=false;
					}).catch(xhr=>{
						console.log(xhr);
						this.$message.warning('提交失败!')
						this.btnLoading=false;
					})
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			}
		},
		watch:{
			rowData:{
				handler:function(e){
					this.order.price=e.price;
				},
				deep:true
			}
		}
	})
</script>

<style>
</style>
