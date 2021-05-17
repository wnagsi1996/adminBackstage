<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder="" />
		  </el-form-item>
		  <el-form-item label="客户名称">
		    <el-input v-model="fromorder.name" placeholder="" />
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderStaus" placeholder="">
		      <el-option label="全部" value="-1" />
		      <el-option v-for="item in clientOrderState" :key="item.value" :label="item.text" :value="item.value" />
		    </el-select>
		  </el-form-item>
		  <el-form-item label="利润值">
		    <el-select v-model="fromorder.profit" placeholder="">
		      <el-option label="全部" value="-1" />
		      <el-option label="非负数" value="0" />
		      <el-option label="负数" value="1" />
		    </el-select>
		  </el-form-item>
		  <el-form-item label="创建时间">
		      <el-col :span="11">
		        <el-form-item prop="date1">
		          <el-date-picker type="datetime" placeholder="开始时间" v-model="fromorder.date1" style="width: 100%;" />
		        </el-form-item>
		      </el-col>
		      <el-col class="line" :span="1">-</el-col>
		      <el-col :span="11">
		        <el-form-item prop="date2">
		          <el-date-picker type="datetime" placeholder="结束时间" v-model="fromorder.date2" style="width: 100%;" />
		        </el-form-item>
		      </el-col>
		   </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<div>
			<el-button type="primary"  @click="addorder()" size="small">新建订单</el-button>
			<el-button type="primary"  @click="batchDownload()" size="small">批量下载</el-button>
		</div>
		
		<!-- 表格数据 -->
		<div class="tableMag">
			<el-table :data="tableData" border stripe show-summary :summary-method="getSummaries" v-loading="loading" style="width: 100%">
			    <el-table-column prop="orderno" label="订单号" min-width="6%">
					 <template slot-scope="scope">
						 <copyorderno :orderno="scope.row.orderno" />  
					 </template>
				 </el-table-column>
			    <el-table-column prop="hzsjname" label="客户名称" min-width="6%" />
			    <el-table-column prop="payselstr" label="支付选择" min-width="5%" />
			    <el-table-column prop="channelstr" label="收款方式" min-width="6%" />
				 <el-table-column prop="yskmoney" label="应收金额" min-width="5%" />
				 <el-table-column prop="sskmoney" label="已收金额" min-width="5%" />
				 <el-table-column prop="fkmoney" label="已返款金额" min-width="5%" />
				 <el-table-column prop="fkmoney" label="当前利润" min-width="5%"  :formatter="profit" />
				 <el-table-column prop="ztstr" label="订单状态" min-width="5%" >
					 <template slot-scope="scope">
						 <p>{{scope.row.ztstr}} 
							<el-tooltip class="item" effect="dark" content="需要补退差价" placement="top-start">
								<i v-if="scope.row.ifneedbt==1" @click="showmoney(scope.row.orderno)" class="el-icon-money" style="color: red;cursor: pointer;"></i>
							</el-tooltip>
						 </p>
					 </template>
				 </el-table-column>
				 <el-table-column prop="cjsj" label="创建时间" min-width="8%" />
			    <el-table-column fixed="right" label="操作" min-width="12%" >
			      <template slot-scope="scope">
					  <template v-if="scope.row.zt=='0' || scope.row.zt=='3'">
						  <el-button @click="goProduct(scope.row.orderno)" type="text" size="small">添加产品</el-button>
						  <el-button @click="review(scope.row.orderno)" type="text" size="small">提交财务审核</el-button>
						  <el-button @click="delOrder(scope.row.orderno)" type="text" size="small">删除</el-button>
					  </template>
			        
			        <el-button v-if="scope.row.zt!='0'" @click="goProduct(scope.row.orderno)" type="text" size="small">测评产品管理</el-button>
			        
					<template v-if="scope.row.zt == '2' || scope.row.zt == '4'">
						<el-button v-if="scope.row.zt=='2'" @click="chargeback(scope.row.orderno)" type="text" size="small">退单</el-button>
						<el-button @click="spread(scope.row.orderno)" type="text" size="small">补退差价</el-button>
						<el-button v-if="scope.row.ifneedbt==1" @click="showmoney(scope.row.orderno)" type="text" size="small">差价数据</el-button>
						<el-button v-if="scope.row.paysel!='0'" @click="addPayment(scope.row.orderno)" type="text" size="small">新增收款</el-button>
						<el-button v-if="scope.row.paysel!='0'" @click="dowload(scope.row.orderno)" type="text" size="small">下载数据</el-button>
					</template>
			        <el-button @click="worklog(scope.row.orderno)" type="text" size="small">记事本</el-button>
					<el-button @click="showLog(scope.row.orderno)" type="text" size="small">查看日志</el-button>
					
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  <!-- 补退差价数据 -->
		  <el-dialog title="差价数据" :visible.sync="DifferencePricesToggle" width="30%"  >
			  <component :is="DifferencePricesLoad" :orderno="orderno" />
		  </el-dialog>
		  
		  <!-- 公共弹窗组件 -->
		  <el-dialog :title="dialog.title" :visible.sync="dialog.Visible" :width="dialog.width"  >
			  <component :is="dialog.dialogComponent" :orderno="orderno" @dialogToggle="dialogToggle"/>
		  </el-dialog>
		  
		  <!-- 操作日志 -->
		  <el-dialog title="操作日志" :visible.sync="dialogVisible" width="50%" @close="closeDialog" >
		  	<component :is="Log" :logorderno="orderno"/>
		  </el-dialog>

	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Dialog,Table,TableColumn,Tooltip,Form,FormItem,Input,Select,Option,DatePicker,Col} from 'element-ui'
	import {clientOrderState} from '@/assets/js/orderState.js'
	export default({
		name:'ClientOrder',
		components:{
			Pagination,
			copyorderno,
			[Dialog.name]:Dialog,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Tooltip.name]:Tooltip,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option,
			[Col.name]:Col,
			[DatePicker.name]:DatePicker
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					jduser:'0',
					name:'',
					orderStaus:'-1',
					date1:'',
					date2:'',
					profit:'-1'
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				//弹出框配置
				dialog:{
					title:'',
					Visible:false,
					width:'',
					dialogComponent:null
				},
				tableData:[], //表格数据
				addordercom:null,  //添加订单组件
				addPaymentcom:null,  //卖家付款组件
				hargebackccom:null,  //退单组件
				spreadcom:null,     //补退差价组件
				worklogcom:null,    //记事本组件
				dowloadcom:null,    //下载组件
				batchDownloadcom:null,    //批量下载组件
				logshow:false,
				loading:true,
				DifferencePricesToggle:false,
				DifferencePricesLoad:null,
				dialogVisible:false,
				orderno:'',
				Log:null,
				clientOrderState
			}
		},
		created() {
			this.search();
		},
		methods:{
			// 获取表格数据
			search(valdata=[]){
				//判断是否是分页传过来的参数
				if(valdata.length!=0){
					if(valdata[0]=="current"){
						this.pagination.current=valdata[1];
					}else if(valdata[0]=="size"){
						this.pagination.size=valdata[1];
					}
				}
				this.loading=true;
				let {OrderNo,name,orderStaus,date1,date2,profit}=this.fromorder;
				let {size,current}=this.pagination;
				this.$api.getTopProductList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"ddh": OrderNo,
					"hzsjname": name,
					"zt": orderStaus,
					"sjs":date1,
					"sje": date2,
					"iffs":profit
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			// 显示差价数据
			showmoney(orderno){
				if(this.DifferencePricesLoad==null){
					this.DifferencePricesLoad=()=>import('@/components/DifferencePrices');
				}
				this.DifferencePricesToggle=true;
				this.orderno=orderno
			},
			//前往测评产品管理页面
			goProduct(orderno){
				this.$router.push({path:'/addproduct', query: { orderno }})
				let item={
					path:'/addproduct?orderno='+orderno,
					name: '测评产品管理',
					icon: 'addproduct'
				}
				this.$store.commit('tagsView/selectMenu', item)
			},
			//添加测评订单
			addorder(){
				let addproductcom=this.addproductcom
				if(addproductcom==null){
					addproductcom=this.addproductcom=()=>import('@/components/ClientOrder/AddOrder.vue');
				}
				this.dialog={
					title:'添加测评订单',
					Visible:true,
					width:'450px',
					dialogComponent:addproductcom
				}
			},
			//下载订单
			dowload(orderno){
				let dowloadcom=this.dowloadcom
				if(dowloadcom==null){
					dowloadcom=this.dowloadcom=()=>import('@/components/ClientOrder/dowload.vue');
				}
				this.dialog={
					title:'下载订单表格数据',
					Visible:true,
					width:'70%',
					dialogComponent:dowloadcom
				}
				this.orderno=orderno
			},
			//批量下载订单
			batchDownload(){
				let batchDownloadcom=this.batchDownloadcom
				if(batchDownloadcom==null){
					batchDownloadcom=this.batchDownloadcom=()=>import('@/components/ClientOrder/BatchDownload.vue');
				}
				this.dialog={
					title:'下载订单表格数据',
					Visible:true,
					width:'70%',
					dialogComponent:batchDownloadcom
				}
			},
			//隐藏弹出框
			dialogToggle(type=false){
				this.dialog={
					title:'',
					Visible:false,
					width:'',
					dialogComponent:null
				}
				if(type) this.search();
			},
			//卖家付款
			addPayment(orderno){
				let addPaymentcom=this.addPaymentcom
				if(addPaymentcom==null){
					addPaymentcom=this.addPaymentcom=()=>import('@/components/ClientOrder/AddPayment.vue');
				}
				this.dialog={
					title:'新增收款',
					Visible:true,
					width:'300px',
					dialogComponent:addPaymentcom
				}
				this.orderno=orderno;
			},
			//退单
			chargeback(orderno){
				let hargebackccom=this.hargebackccom
				if(hargebackccom==null){
					hargebackccom=this.hargebackccom=()=>import('@/components/ClientOrder/Chargeback.vue');
				}
				this.dialog={
					title:'退单退款',
					Visible:true,
					width:'600px',
					dialogComponent:addPaymentcom
				}
				this.orderno=orderno
			},
			// 记事本
			worklog(orderno){
				let worklogcom=this.worklogcom
				if(worklogcom==null){
					worklogcom=this.worklogcom=()=>import('@/components/ClientOrder/Worklog.vue');
				}
				this.dialog={
					title:'记事本',
					Visible:true,
					width:'600px',
					dialogComponent:worklogcom
				}
				this.orderno=orderno
			},
			//补退差价
			spread(orderno){
				let spreadcom=this.spreadcom
				if(spreadcom==null){
					spreadcom=this.spreadcom=()=>import('@/components/ClientOrder/Spread.vue');
				}
				this.dialog={
					title:'补退差价',
					Visible:true,
					width:'600px',
					dialogComponent:spreadcom
				}
				this.orderno=orderno
			},
			//删除测评产品
			delOrder(orderno){
				this.$alert('确认要删除该订单吗?', '删除提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(()=>{
					this.$api.delTOPCPOrder({topordernos:orderno}).then(res=>{
						if(res>0){
							this.$message.success('删除成功!')
							this.tableData=this.tableData.filter(n=>n.orderno!=orderno);
						}else{
							this.$message.warning('删除失败!')
						}
						
					}).catch(xhr=>{
						this.$message.warning('删除失败!')
					})
				}).catch(()=>{
					
				})
			},
			//提交财务审核
			review(orderno){
				this.$prompt('您确认该订单测评产品已添加完成并要提交财务审核?', '提交提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  inputPlaceholder:'财务备注'
				}).then((txt)=>{
					let remark=txt.value==null?'':txt.value;
					this.$api.comitTOPCPOrder({toporderno:orderno,remark}).then(res=>{
						console.log(res);
						if(res.rescode>0){
							this.$message.success('提交成功!')
							this.tableData.forEach((n,i)=>{
								if(n.orderno==orderno){
									Object.assign(this.tableData[i],{
										zt:1,
										ztstr:'等待财务审核'
									});
								}
							})
						}else{
							this.$message.warning('提交失败!')
						}
					}).catch(xhr=>{
						this.$message.warning('提交失败!')
					})
					
				}).catch(()=>{
					
				})
			},
			//显示操作日志
			showLog(orderno){
				this.dialogVisible=true;
				this.orderno=orderno;
				if(this.Log==null){
					this.Log=()=>import('@/components/Log/index.vue')
				}
			},
			//隐藏操作日志
			closeDialog(){
				this.dialogVisible=false;
			},
			//利润
			profit(row, column, cellValue, index){
				return (row.sskmoney-row.fkmoney).toFixed(2)
			},
			getSummaries(param){
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
				  if (index === 0) {
					sums[index] = '合计';
					return;
				  }
				  const values = data.map(item => Number(item[column.property]));
				  if (!values.every(value => isNaN(value))) {
					sums[index] = values.reduce((prev, curr) => {
					  const value = Number(curr);
					  if (!isNaN(value)) {
						return prev + curr;
					  } else {
						return prev;
					  }
					}, 0);
				  }
				});
				sums[7]=sums[5]-sums[6];
				sums.forEach((item,index)=>{
					if(!isNaN(item)){
						sums[index]=item.toFixed(2)
						
					}
				})
				return sums;
			}
		}
	})
</script>

<style>
</style>
