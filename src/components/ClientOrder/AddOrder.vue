<template>
	<el-form ref="order" :model="order" :rules="orderRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
		  <el-col :span="12">
			 <el-form-item label="客户" prop="name">
			  <el-select
			      v-model="order.name"
			      filterable
			      remote
			      placeholder="请输入关键词"
			      :remote-method="remoteMethod"
			      :loading="loading">
			      <el-option
			        v-for="item in sellerdata"
			        :key="item.id"
			        :label="item.cname"
			        :value="item.id">
			      </el-option>
			    </el-select>
			</el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="选择中介" prop="intermediary">
			    <el-select v-model="order.intermediary" placeholder="请选择中介" @focus="getAgent()">
				  <el-option label="不指定" value="0"></el-option>
				  <el-option v-for="item in buyerAgentList" :label="item.name" :key="item.rid" :value="item.rid"></el-option>
				</el-select>
			    </el-form-item>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="支付选择" prop="paySel">
				<el-select v-model="order.paySel" placeholder="请选择支付选择" @change="paySel">
				  <el-option label="全额支付" value="0"></el-option>
				  <el-option label="见单号返" value="1"></el-option>
				  <el-option label="预付定金" value="2"></el-option>
				</el-select>
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
			  <el-form-item label="汇率" prop="rate">
				<el-input v-model="order.rate"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="12">
			  <el-form-item label="当前实际收款金额(人民币)" prop="money">
				<el-input v-model="order.money"></el-input>
			  </el-form-item>
		  </el-col>
		  <el-col :span="24" style="text-align: center;">
			  <el-form-item>
				 <el-button type="primary" @click="submitForm('order')" :loading="btnloading">立即创建</el-button>
				 <el-button @click="resetForm('order')">重置</el-button>
			  </el-form-item>
		  </el-col>
		</el-row>
		
	</el-form>
</template>

<script>
	import {Form,FormItem,Row,Col,Input,Select,Option} from 'element-ui'
	import {mapGetters,mapActions} from 'vuex'
	import {paymentType} from '@/assets/js/orderState.js'
	export default({
		name:'AddOrder',
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
				order:{
					name:'',
					intermediary:'0',
					paySel:'',
					channel:'',
					rate:'',
					money:''
				},
				orderRule:{
					name:[
						{ required: true, message: '请选择客户', trigger: 'change' }
					],
					intermediary:[
						{ required: true, message: '请选择中介', trigger: 'change' }
					],
					paySel:[
						{ required: true, message: '请选择支付选择', trigger: 'change' }
					],
					channel:[
						{  required: true, message: '请选择收款方式', trigger: 'change' }
					],
					rate:[
						{ required: true, message: '请输入汇率', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/ , message: '汇率必须为数字', trigger: 'blur' }
					],
					money:[
						{ required: true, message: '请输入实收款金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/ , message: '实收款金额必须为数字', trigger: 'blur' }
					]
				},
				loading:false,
				sellerdata:[],
				btnloading:false,
				paymentType
			}
		},
		computed:{
			...mapGetters([
				'buyerAgentList'
			])
		},
		methods:{
			//搜索商家
			async remoteMethod(val){
				//console.log(val);
				if(val!==''){
					this.loading=true;
					try{
						let res=await this.$api.getHzsjListBySjname({sjname:val});
						if(res!=''){
							this.sellerdata=res;
							this.loading=false;
						}
					}catch(err){
						console.log(xhr)
					}
				}else{
					this.sellerdata=[];
				}
			},
			//获取中介列表
			getAgent(){
				if(this.buyerAgentList.length==0){
					this.getBuyerAgentList()
				}
			},
			//提交创建
			submitForm(order){
				this.$refs[order].validate((valid) => {
				  if (valid) {
					  this.btnloading=true;
					  let {name,channel,paySel,intermediary,rate,money}=this.order;
					  this.$api.addCPTopOrder({
						  "hzsjid":name,
						  "sktype":channel,
						  "sktypeinfo":paySel,
						  "selAgent":intermediary,
						  "rmb2us":rate,
						  "realskTotalMoney":money
					}).then(res=>{
						//console.log(res);
						if(res.rescode==1){
							this.$message.success('创建成功')
							this.$emit('dialogToggle',true);
							this.resetForm();
							this.$router.push({path:'/addproduct', query: { orderno: res.resdesc }})
							let item={
								path:'/addproduct?orderno='+res.resdesc,
								name: '测评产品管理',
								icon: 'addproduct'
							}
							this.$store.commit('tagsView/selectMenu', item)
						}else{
							this.$message.warning(res.resdesc)
						}
						this.btnLoading=false;
					}).catch(xhr=>{
						//console.log(xhr);
						this.$message.warning('客户测评订单创建失败')
						this.btnLoading=false;
					})
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			resetForm(){
				this.$refs.order.resetFields();
			},
			//选中的值
			paySel(val){
				if(val==1){
					this.order.money=0
				}
			},
			...mapActions([
				'getBuyerAgentList'
			])
		}
	})
</script>