<template>
	<el-form ref="ReviewUrl" :model="ReviewUrl" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			  <el-form-item label="留评链接" prop="url">
				<el-input v-model="ReviewUrl.url"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="留评时间" prop="date">
				<el-input v-model="ReviewUrl.date"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24">
			  <el-form-item label="留评截图" prop="imgsrc">
				<PaseImage :imgsrc="ReviewUrl.imgsrc" @getImgSrc="getImgSrc" />
			  </el-form-item>
		  </el-col>
		  
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('ReviewUrl')" :loading="btnLoading">提交</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,Input} from 'element-ui'
	import PaseImage from "@/components/PaseImage"
	export default({
		name:'ReviewUrl',
		components:{
			PaseImage,
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
				ReviewUrl:{
					url:'',
					date:'',
					imgsrc:''
				},
				btnLoading:false
			}
		},
		created() {
			this.getReview(this.orderno);
		},
		methods:{
			//获取留评信息
			getReview(orderno){
				this.$api.getCPOrderDetailLPInfo({orderno}).then(res=>{
					if(res!=''){
						this.ReviewUrl={
							url:res.lpurl,
							date:res.reallpdate,
							imgsrc:res.lpimgurl
						}
					}else{
						this.$message.warning('留评信息获取出错！')
					}
				}).catch(xhr=>{
					this.$message.warning('留评信息获取出错！')
				})
			},
			//提交
			submitForm(){
			  this.btnLoading=true;
			  let {url,date,imgsrc}=this.ReviewUrl;
			  this.$api.setCPOrderDetailLPInfo({
				  "orderno":this.orderno,
				  "lpurl":url,
				  "reallpdate":date,
				  "_img64":imgsrc
			  }).then(res=>{
				//console.log(res);
				if(res.rescode>0){
					this.$message.success(res.resdesc);
					this.$emit('dialogToggle',true);
					this.resetForm();
				}else{
					this.$message.warning(res.resdesc)
				}
				this.btnLoading=false;
			  }).catch(xhr=>{
				this.$message.warning('留评上传出错')
				this.btnLoading=false;
			  })
			},
			getImgSrc(val){
				this.ReviewUrl.imgsrc=val;
			},
			//重置
			resetForm(){
				this.$refs.ReviewUrl.resetFields();
			}
		},
		watch:{
			orderno(newVal,oldVal){
				this.getReview(newVal);
			}
		}
	})
</script>

<style>
</style>
