<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="接单人员">
		    <el-select v-model="fromorder.jduser" @focus="getJdUserList">
		  		<el-option label="全部" value="0"></el-option>
		       <el-option v-for="user in sellerUserList" :label="user.username" :key="user.userid" :value="user.userid"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="客户名称">
		    <el-input v-model="fromorder.name" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderStaus" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option v-for="item in orderstate" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="利润值">
		    <el-select v-model="fromorder.profit" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option label="非负数" value="0"></el-option>
		      <el-option label="负数" value="1"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="创建时间">
		      <el-col :span="11">
		        <el-form-item prop="date1">
		          <el-date-picker type="datetime" placeholder="开始时间" v-model="fromorder.date1" style="width: 100%;"></el-date-picker>
		        </el-form-item>
		      </el-col>
		      <el-col class="line" :span="1">-</el-col>
		      <el-col :span="11">
		        <el-form-item prop="date2">
		          <el-date-picker type="datetime" placeholder="结束时间" v-model="fromorder.date2" style="width: 100%;"></el-date-picker>
		        </el-form-item>
		      </el-col>
		   </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		
		<!-- 表格数据 -->
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
			 <el-table-column prop="sskmoney-fkmoney" label="当前利润" min-width="5%" :formatter="profit" />
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
			 <el-table-column prop="mjusername" label="卖家端" min-width="5%" />
		    <el-table-column fixed="right" label="操作" min-width="7%" >
		      <template slot-scope="scope">
		        <el-button v-if="scope.row.zt!='0'" @click="goProduct(scope.row.orderno)" type="text" size="small">测评产品管理</el-button>
				<el-button @click="showLog(scope.row.orderno)" type="text" size="small">查看日志</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  <!-- 补退差价数据 -->
		  <el-dialog title="差价数据" :visible.sync="DifferencePricesToggle" width="30%"  >
			  <component :is="DifferencePricesLoad" :orderno="orderno" />
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
	import {Dialog,Button,Table,TableColumn,Tooltip,Form,FormItem,Input,DatePicker,Select,Option,Col} from 'element-ui'
	import {mapGetters,mapActions} from 'vuex'
	import {clientOrderState} from '@/assets/js/orderState'
	export default({
		name:'ClientOrder',
		components:{
			Pagination,
			copyorderno,
			[Dialog.name]:Dialog,
			[Button.name]:Button,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Tooltip.name]:Tooltip,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[DatePicker.name]:DatePicker,
			[Select.name]:Select,
			[Option.name]:Option,
			[Col.name]:Col
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
				tableData:[], //表格数据
				logshow:false,
				loading:true,
				DifferencePricesToggle:false,
				DifferencePricesLoad:null,
				dialogVisible:false,
				orderno:'',
				Log:null,
				orderstate:clientOrderState
			}
		},
		computed:{
			...mapGetters([
				'sellerUserList'
			])
		},
		created() {
			this.search();
		},
		methods:{
			//获取接单成员列表
			getJdUserList(){
				if(this.sellerUserList.length==0){
					this.getSellerUserList()
				}
			},
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
				let {OrderNo,name,orderStaus,date1,date2,jduser,profit}=this.fromorder;
				let {size,current}=this.pagination
				this.$api.getGLproductList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"ddh": OrderNo,
					"hzsjname": name,
					"zt": orderStaus,
					"sjs":date1,
					"sje": date2,
					"mjuserid": jduser,
					"iffs":profit
				}).then(res=>{
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(err=>{
					console.log(err);
					this.$message({
						type:'error',
						message:'数据加载出错'
					})
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
				this.$router.push({path:'/addproduct', query: { orderno}});
				let item={
					path:'/addproduct?orderno='+orderno,
					name:'测评产品管理'
				}
				this.$store.commit('tagsView/selectMenu', item)
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
			},
			//store异步获取方法
			...mapActions([
				'getSellerUserList'
			])
		}
	})
</script>

<style>
</style>
