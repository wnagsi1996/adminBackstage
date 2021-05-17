<template>
	<el-form ref="product" :model="product" :rules="productRule" label-width="80px" label-position="top" v-loading='loading'>
		<el-row :gutter="20">
		  <el-col :span="6">
			  <el-form-item label="关键词" prop="keyword">
			    <el-input v-model="product.keyword"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="6">
			  <el-form-item label="关键词大概在第几页" prop="keywordPage">
				<el-input v-model.number="product.keywordPage"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="6">
			  <el-form-item label="产品主图" prop="imgurl">
				<el-input v-model="product.imgurl"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="6">
			  <el-form-item label="折扣码" prop="code">
				<el-input v-model="product.code"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="6">
			  <el-form-item label="客单价(单位:美金)" prop="price">
				<el-input v-model.number="product.price"></el-input>
			  </el-form-item>
		  </el-col>
		  
		  <el-col :span="6">
			  <el-form-item label="QA提问" prop="qa">
				<el-input v-model="product.qa"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="6">
			  <el-form-item label="Feedback" prop="feedback">
				<el-input v-model="product.feedback"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="6">
			  <el-form-item label="点赞（评论URL）" prop="reviewUrl">
				<el-input v-model="product.reviewUrl"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="6">
			  <el-form-item label="下单要求" prop="xdReamrk">
				<el-input v-model="product.xdReamrk"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="8">
			  <el-form-item label="备注" prop="remark">
				<el-input type="textarea" v-model="product.remark"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
			     <el-button type="primary" @click="submitForm('product','1')" :loading="btnLoading">放单</el-button>
			     <el-button type="primary" @click="submitForm('product','0')" :loading="btnLoading">暂存</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Input,Row,Col} from 'element-ui'
	export default({
		name:'EditOrder',
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Row.name]:Row,
			[Col.name]:Col
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
					keyword:'',
					keywordPage:'',
					imgurl:'',
					code:'',
					price:'',
					qa:'',
					feedback:'',
					reviewUrl:'',
					xdReamrk:'',
					remark:''
				},
				productRule:{
					keyword:[
						{ required: true, message: '请输入关键词', trigger: 'blur' }
					],
					imgurl:[
						{ required: true, message: '请输入产品图片链接', trigger: 'blur' },
						{ pattern:/\.(png|jpg|gif|jpeg)$/, message: '图片格式不正确' }
					],
					keywordPage:[
						{ required: true,type: 'number', message: '关键词行数必须为数字值' }
					],
					price:[
						{ required: true, message: '请输入产品客单价', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '请产品客单价必须为数字' }
					]
				},
				btnLoading:false,
				loading:true
			}
		},
		created() {
			this.getOrderInfo(this.orderno);
		},
		methods:{
			//获取订单信息
			getOrderInfo(orderno){
				this.loading=true;
				this.$api.getCPOrderDetailInfo({orderno}).then(res=>{
					//console.log(res);
					if(res!=''){
						let obj={
							imgurl:res.ProductImgUrl,
							keyword:res.KeyWord,
							keywordPage:Number(res.KeyWordPage),
							code:res.CouponCode,
							price:res.productdj,
							qa:res.QA,
							feedback:res.FB,
							reviewUrl:res.HelpFulUrl,
							xdReamrk:res.xdyq,
							remark:res.remark
						}
						Object.assign(this.product,obj);
						this.loading=false;
					}else{
						this.resetForm()
					}
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			submitForm(product,state){
				this.$refs[product].validate((valid) => {
				  if (valid) {
					  let {keyword,imgurl,keywordPage,code,price,qa,feedback,reviewUrl,xdReamrk,remark}=this.product;
					  if(keyword!=''){
						  if(keyword.includes("\“")||keyword.includes("\"")){
							  this.$message.warning('关键词不能用双引号')
							  return false
						  }
					  }
					  let ifQA=0,ifFB=0;
					 if(qa==''){
						ifQA=0
					 }else{
						ifQA=1 
					 }
					 if(feedback==''){
					 	ifFB=0
					 }else{
					 	ifFB=1 
					 }
					 //console.log(this.$refs.btn1);
					this.btnLoading=true;
					this.$api.editCPOrderDetail({
						"orderno": this.orderno,
						"KeyWord": keyword,                         
						"KeyWordPage":Number(keywordPage),   
						"CouponCode": code,
						"HelpFulUrl": reviewUrl,
						remark,
						"xdyq": xdReamrk,
						"ProductImgUrl": imgurl,
						"productdj": price,
						ifQA,
						ifFB,
						"QA": qa,
						"FB": feedback,
						"fd":state
					}).then(res=>{
						console.log(res);
						if(res.rescode>0){
							this.$message.success(res.resdesc)
							this.resetForm();
							this.$emit("dialogToggle",true);
						}else{
							this.$message.warning(res.resdesc)
						}
						this.btnLoading=false;
					}).catch(xhr=>{
						console.log(xhr);
						this.$message.warning('操作出错')
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
				this.getOrderInfo(newVal);
			}
		}
	})
</script>

<style>
</style>
