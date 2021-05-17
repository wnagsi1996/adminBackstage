<template>
	<el-form ref="product" :model="product" :rules="productRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="24">
			 <el-form-item label="留评单数量" prop="lpnum">
			  <el-input v-model.number="product.lpnum" :placeholder="txtlpnum"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="24">
			 <el-form-item label="免评单数量" prop="mpnum">
			  <el-input v-model.number="product.mpnum" :placeholder="txtmpnum"></el-input>
			</el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-button type="primary" @click="submitForm('product')" :loading="btnLoading">提交</el-button>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,Input} from 'element-ui'
	export default({
		name:'Comments',
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
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
				product:{
					lpnum:'',
					mpnum:''
				},
				txtlpnum:'',
				txtmpnum:'',
				productRule:{
					lpnum:[
						{ required: true, message: '请输入留评单数', trigger: 'blur' },
						{ type: 'number', message: '留评单数必须为数字' }
					],
					mpnum:[
						{ required: true, message: '请输入免评单数', trigger: 'blur' },
						{ type: 'number', message: '免评单数必须为数字' }
					]
				},
				btnLoading:false
			}
		},
		created() {
			this.getCPOrderCanBackNum(this.orderno);
		},
		methods:{
			getCPOrderCanBackNum(orderno){
				this.$api.getCPOrderCanBackNum({orderno}).then(res=>{
					if(res!=''){
						this.txtlpnum="留评还有" + res.lpnum + "单";
						this.txtmpnum="留评还有" + res.mpnum + "单";
					}
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			submitForm(product){
				this.$refs[product].validate((valid) => {
				  if (valid) {
					this.btnLoading=true;
					let {mpnum,lpnum}=this.product;
					this.$api.comitUpdateCPOrderMpLPNum({
						"orderno": this.orderno,
						"newmpnum":mpnum,   
						"newlpnum": lpnum
					}).then(res=>{
						if(res.rescode>0){
							this.$message.success('修改成功!')
							this.resetForm();
							this.$emit("dialogToggle",true);
						}else{
							this.$message.warning('修改失败!')
						}
						this.btnLoading=false;
					}).catch(xhr=>{
						console.log(xhr);
						this.$message.warning('修改失败!')
					})
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			resetForm(){
				this.$refs.product.resetFields();
			}
		},
		watch:{
			orderno(newVal,oldVal){
				this.getCPOrderCanBackNum(newVal);
			}
		}
	})
</script>

<style>
</style>
