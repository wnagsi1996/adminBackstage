<template>
	<div>
		<el-form v-if="ifdata" ref="rebate" :model="rebate" :rules="rebateRule" label-width="80px" label-position="top">
			<el-row :gutter="20">
			  <el-col :span="12">
				  <el-form-item label="中介" prop="agent">
					<el-select v-model="rebate.agent" placeholder="请选择中介">
					  <el-option v-for="item in buyerAgentList" :label="item.name" :key="item.rid" :value="item.rid"></el-option>
					</el-select>
				  </el-form-item>
			  </el-col>
			  <el-col :span="12">
				  <el-form-item label="开始时间" prop="date1">
					<el-date-picker type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="rebate.date1" style="width: 100%;"></el-date-picker>
				  </el-form-item>
			  </el-col>
			  <el-col :span="12">
				  <el-form-item label="结束时间" prop="date2">
					<el-date-picker type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="rebate.date2" style="width: 100%;"></el-date-picker>
				  </el-form-item>
			  </el-col>
			  <el-col :span="24" style="text-align: center;">
				  <el-form-item>
					 <el-button type="primary" @click="searchAgent('rebate')" :loading="btnLoading">搜索</el-button>
				  </el-form-item>
			  </el-col>
			</el-row>
		</el-form>
		<el-form v-else ref="agent" :model="agent" :rules="agentRule" label-width="80px" label-position="top">
			<h4>中介“{{agentname}}”在{{rebate.date1}}至{{rebate.date2}}的数据如下</h4>
			<el-row :gutter="20">
				<el-col :span="8">
				  <el-form-item label="下单单数">
					<el-input v-model="agent.ordernum" :disabled="true"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item label="单个下单佣金">
					<el-input v-model.number="agent.orderyj"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item label="总的下单佣金">
					<el-input v-model="agent.totalorderyj" :disabled="true"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item label="留评单数">
					<el-input v-model="agent.reviewnum" :disabled="true"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item label="单个留评佣金">
					<el-input v-model.number="agent.reviewyj"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item label="总的留评佣金">
					<el-input v-model="agent.totalreviewyj" :disabled="true"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item label="总的返款佣金">
					<el-input v-model="agent.totalyj" :disabled="true"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="16">
				  <el-form-item label="备注">
					<el-input v-model="agent.remark"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="24" style="text-align: center;">
				  <el-form-item>
					 <el-button type="primary" @click="submithReate('agent')" :loading="btnLoading">提交</el-button>
				  </el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import {Form,Row,Col,FormItem,Input,Select,Option,DatePicker} from 'element-ui'
	import {mapGetters,mapAcitons} from 'vuex'
	export default({
		name:'AgentRebate',
		components:{
			[Form.name]:Form,
			[Row.name]:Row,
			[Col.name]:Col,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option,
			[DatePicker.name]:DatePicker
		},
		data(){
			return{
				newAgentdata:[],
				rebate:{
					agent:'',
					date1:'',
					date2:''
				},
				rebateRule:{
					agent:[
						{required: true, message: '请选择中介', trigger: 'change' }
					]
				},
				agent:{
					ordernum:'',  //下单数量
					reviewnum:'',  //留评数量
					orderyj:'',  //单个下单佣金
					reviewyj:'', //单个留评佣金
					totalorderyj:'',  //总的下单佣金
					totalreviewyj:'',  //总的留评佣金
					totalyj:''  ,//总的佣金
					DraftMaxMoney:0  ,//中介最大抵扣佣金
					remark:''
				},
				agentRule:{
					orderyj:[
						{ pattern:/^\d+(\.\d+)?$/ , message: '下单佣金必须为数字', trigger: 'blur' }
					],
					reviewyj:[
						{ pattern:/^\d+(\.\d+)?$/ , message: '留评佣金必须为数字', trigger: 'blur' }
					]
				},
				ifdata:true,
				btnLoading:false
			}
		},
		computed:{
			...mapGetters([
				'buyerAgentList'
			]),
			agentname(){
				let {agent}=this.rebate;
				let attr=this.buyerAgentList.filter(n=>n.rid==agent);
				return attr[0].name;
			}
		},
		methods:{
			searchAgent(rebate){
				this.$refs[rebate].validate((valid) => {
				  if (valid) {
					  let {date1,date2,agent}=this.rebate;
					  if(date1==''&& date2==''){
						  this.$message.warning('两个时间都不能为空！')
					  }else{
						  this.btnLoading=true;
						  this.$api.searchBuyerZJYJ({
							  "zjid":agent,
							  "cxsjs":date1,
							  "cxsje":date2
						  }).then(res=>{
							  this.btnLoading=false;
							  if(res.rescode>0){
								  if(res.xdnum==0 && res.lpnum==0){
									  this.$message.warning('您查询的数据为空！')
								  }else{
									  this.ifdata=false;
									  Object.assign(this.agent,{ordernum:res.xdnum,reviewnum:res.lpnum})
								  }
							  }else{
								  this.$message.warning(res.resdesc)
							  }
						  }).catch(xhr=>{
							  this.$message.warning('数据查询出错！')
						  })
					  }
				  }
				})
			},
			submithReate(agent){
				this.$refs[agent].validate((valid) => {
				  if (valid) {
					  
					  let {orderyj,reviewyj,totalyj}=this.agent
					  if(!Number.isFinite(orderyj) || !Number.isFinite(reviewyj)){
						  this.$message.warning('返款金额不能为空,没有则填写0')
						  return false;
					  }else{
						  
						  this.btnLoading=true;
						  this.$api.getAgentOverDraftMaxMoney({
							  zjid:this.rebate.agent,
							  ordermoney:totalyj
						  }).then(res=>{
							  if(res==0){
								  this.submitdata()
							  }else{
								  this.rebate.DraftMaxMoney=res;
								  let zfmoney=totalyj - Number(res);
								  let txt=`该中介还欠${res}美金;本次所需支付是${totalyj}美金,减掉中介所欠还需支付${zfmoney}美金`;
								  this.$confirm(txt, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								  }).then(() => {
									this.submitdata()
								  }).catch(() => {
									  this.$message.info('已取消返款')      
								  });
							  }
						  })
						  
					  }
				  }
				 })
			},
			submitdata(){
				let {agent,date1,date2}=this.rebate;
				let {orderyj,reviewyj,remark,DraftMaxMoney}=this.agent;
				this.$api.comitBuyerZJYJFK({
					"zjid":agent,
					"cxsjs":date1,
					"cxsje":date2,
					"xdyjdj":orderyj,
					"lpyjdj":reviewyj,
					"remark":remark,
					"DraftMaxMoney":DraftMaxMoney
				}).then(res=>{
					//console.log(res);
					if(res.rescode>0){
						this.$message.success('提交成功')
						this.$emit('dialogToggle',true);
						this.resetForm();
					}else{
						this.$message.warning('提交失败')
					}
					this.btnLoading=false;
				}).catch(xhr=>{
					this.$message.warning('提交失败')
					this.btnLoading=false;
				})
			}
		},
		watch:{
			'agent.orderyj'(newVal,oldVal){
				let {ordernum,totalorderyj,totalreviewyj,totalyj}=this.agent;
				totalorderyj=ordernum*newVal;
				totalorderyj=totalorderyj?totalorderyj:0;
				totalreviewyj=totalreviewyj?totalreviewyj:0;
				totalyj=totalorderyj+totalreviewyj;
				Object.assign(this.agent,{totalorderyj,totalreviewyj,totalyj})
			},
			'agent.reviewyj'(newVal,oldVal){
				let {reviewnum,totalorderyj,totalreviewyj,totalyj}=this.agent;
				totalreviewyj=reviewnum*newVal;
				totalorderyj=totalorderyj?totalorderyj:0;
				totalreviewyj=totalreviewyj?totalreviewyj:0;
				totalyj=totalorderyj+totalreviewyj;
				Object.assign(this.agent,{totalorderyj,totalreviewyj,totalyj})
			}
		}
	})
</script>

<style>
</style>
