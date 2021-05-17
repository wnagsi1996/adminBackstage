<template>
	<el-form ref="aims" :model="aims" :rules="aimsRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <template v-if="rid==''">
			  <el-col :span="24">
				  <el-form-item prop="status">
					  <el-radio-group v-model="aims.status" @change="hankStatus">
						<el-radio border label="买家端"></el-radio>
						<el-radio border label="卖家端"></el-radio>
					  </el-radio-group>
					</el-form-item>
			  </el-col>
			  <el-col :span="24">
				  <el-form-item label="成员" prop="user">
					  <el-select v-model="aims.user" placeholder="请选择成员">
						<el-option v-for="item in userList" :label="item.username" :key="item.userid" :value="item.userid"></el-option>
					  </el-select>
					</el-form-item>
			  </el-col>
		  </template>
		  <el-col :span="20">
			  <el-form-item label="目标单数" prop="ordernum">
				<el-input  v-model.number="aims.ordernum" ></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="16">
			  <el-form-item label="月份" prop="monthly">
			    <el-date-picker v-model="aims.monthly" type="month" placeholder="选择月" format="yyyy 年 MM 月" value-format="yyyy-MM" />
			  </el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('aims')" :loading="btnLoading" close-on-click-modal="false">立即创建</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,RadioGroup,Radio,Select,Option,Input,DatePicker} from 'element-ui'
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'SetMonthTarget',
		components:{
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[RadioGroup.name]:RadioGroup,
			[Radio.name]:Radio,
			[Select.name]:Select,
			[Option.name]:Option,
			[Input.name]:Input,
			[DatePicker.name]:DatePicker
		},
		props:{
			userMonthAims:{
				type:Object,
				default:new Object
			}
		},
		data(){
			return{
				userList:[],  
				aims:{
					status:'',
					user:'',
					ordernum:'',
					monthly:''
				},
				statusID:0,
				aimsRule:{
					status:[
						{ required: true, message: '请选择买家端或卖家端', trigger: 'change' }
					],
					user: [
						{ required: true, message: '请选择用户，无数据请先选择买卖家端', trigger: 'change' }
					  ],
					ordernum:[
						{ required: true, message: '请输入目标单数'},
						{ type: 'number', message: '目标单数只能为数字'}
					],
					monthly: [
						{ required: true, message: '请选择月份', trigger: 'change' }
					]
				},
				rid:'',
				btnLoading:false
			}
		},
		computed:{
			...mapGetters([
				'sellerUserList',
				'buyerUserList'
			])
		},
		created() {
			this.ifRID(this.userMonthAims);
		},
		methods:{
			//根据不同角色获取不同员工列表
			async hankStatus(value){
				try{
					if(value=="买家端"){
						if(this.buyerUserList.length==0){
							await this.getBuyerUserList()
						}
						this.userList=this.buyerUserList;
						this.statusID=1
					}else{
						if(this.sellerUserList.length==0){
							await this.getSellerUserList()
						}
						this.userList=this.sellerUserList;
						this.statusID=0
					}
				}catch(e){
					this.$message({
						type:'warning',
						message:'获取用户出错'
					})
				}
			},
			//创建月份目标
			submitForm(asim){
				this.$refs[asim].validate((valid) => {
				  if (valid) {
					this.btnLoading=true;
					if(this.rid==''){ //创建月份目标
						this.$api.addUserPlant({
							"month":this.aims.monthly,
							"usertype":this.statusID,
							"plantnum":this.aims.ordernum,
							"userid":this.aims.user
						}).then(res=>{
							if(res>0){
								this.$message({
									type: 'success',
									message:'设置成功'
								});
								this.$emit('dialogMonthToggle');
								this.resetForm();
								this.rid='';
							}else{
								this.$message({
									type: 'warning',
									message:'设置失败'
								});
							}
							this.btnLoading=false;
						})
					}else{  //编辑月份目标
						this.axios.get("/Handler/CPManageSystem.ashx?cmd=editUserPlant",{
							params:{
								"month":this.aims.monthly,
								"plantnum":this.aims.ordernum,
								"rid":this.rid
							}
						}).then(res=>{
							if(res>0){
								this.$message({
									type: 'success',
									message:'编辑成功'
								});
								this.resetForm();
								this.$emit('dialogMonthToggle');
								this.rid='';
							}else{
								this.$message({
									type: 'warning',
									message:'编辑失败'
								});
							}
							this.btnLoading=false;
							
						})
					}
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			// 重置
			resetForm(){
				if(this.$refs.aims!==undefined){
					this.$refs.aims.resetFields();
				}
			},
			//判断是否编辑还是创建
			ifRID(val){
				if(Object.keys(val).length>0){
					this.aims.ordernum=val.plantnum;
					this.aims.monthly=val.month;
					this.rid=val.rid;  
					this.aims.status='1';  //随便填写无意义，为了不让表格检索出错
					this.aims.user='1';  //随便填写无意义，为了不让表格检索出错
					
				}else{
					this.rid='';
					this.resetForm();
					this.aims.user='';
				}
			},
			...mapActions([
				'getSellerUserList',
				'getBuyerUserList'
			])
		},
		watch:{
			userMonthAims(newVal,oldVal){
				this.ifRID(newVal);
			}
		}
		
	})
</script>

<style>
</style>
