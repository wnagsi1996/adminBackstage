<template>
	<div>
		<!-- 搜索条件 -等待接单库-->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="标题">
		    <el-input v-model="fromorder.title" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="ASIN">
		    <el-input v-model="fromorder.asin" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="订单类型">
		    <el-select v-model="fromorder.orderType" placeholder="">
		      <el-option v-for="(item,index) in orderType" :key="index" :label="item.text" :value="item.value"></el-option>
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
		
		<div>
			<el-button type="primary" @click="BatchReview">批量接单</el-button>
		</div>
		
		<!-- 表格数据 -->
		<div class="tableMag">
			<el-table :data="tableData" border stripe v-loading="loading" @selection-change="changeFun" style="width: 100%">
				<el-table-column type="selection" width="55" @selection-change="changeFun" />
			    <el-table-column prop="orderno" label="订单号" min-width="6%">
					 <template slot-scope="scope">
						 <copyorderno :orderno="scope.row.orderno" />  
					 </template>
				 </el-table-column>
				 <el-table-column prop="pimg" label="图片" min-width="3%">
					 <template slot-scope="scope">
						<a :href="scope.row.ProductUrl" target='_blank'>
							 <el-popover placement="right" width="200" trigger="hover" :content="scope.row.ProductTitle">
								<img slot="reference" :src="scope.row.ProductImgUrl" style="width: 50px;" />
							</el-popover>
						</a>
					 </template>
				 </el-table-column>
			    <el-table-column prop="price" label="客单价" min-width="6%" />
				<el-table-column prop="KeyWord" label="关键词" min-width="6%" />
				<el-table-column prop="StoreName" label="店铺" min-width="6%" />
			    <el-table-column prop="ztstr" label="订单状态" min-width="5%" />
			    <el-table-column prop="ordertypestr" label="是否留评" min-width="6%" />
				 <el-table-column prop="asin" label="ASIN" min-width="10%" />
				 <!-- <el-table-column prop="fddate" label="放单时间" min-width="8%" /> -->
				 <el-table-column prop="xdyq" label="下单要求" min-width="8%" />
				 <el-table-column prop="zt" label="接单操作" min-width="6%" >
					 <template slot-scope="scope">
						 <el-switch v-model="scope.row.zt" :active-value="2" :inactive-value="1" active-text="接单" inactive-text="取消" @change="review($event,scope.row,scope.$index)"></el-switch>
					 </template>
				 </el-table-column>
			    <el-table-column fixed="right" label="操作" min-width="8%" >
			      <template slot-scope="scope">
			        <!-- <el-button v-if="scope.row.zt=='1'" @click="review(scope.row.orderno,'1',scope.row.realprice)" type="text" size="small">接单</el-button>
			        <el-button v-if="scope.row.zt=='2'" @click="review(scope.row.orderno,'0',scope.row.realprice)" type="text" size="small">取消接单</el-button> -->
					<el-button @click="handleLogClick(scope.row.orderno)" type="text" size="small">查看详情</el-button>
					
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />

		  <!-- 日志 -->
		  <component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick" />

	</div>
</template>

<script>
	import {Form,FormItem,Input,Select,Option,DatePicker,Table,TableColumn,Switch,Popover,Col} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {orderType} from '@/assets/js/orderState.js'
	export default({
		name:'ReceiveOrder',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option,
			[DatePicker.name]:DatePicker,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Switch.name]:Switch,
			[Col.name]:Col,
			[Popover.name]:Popover
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					title:'',
					asin:'',
					orderType:'-1',
					date1:'',
					date2:''
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				tableData:[], //表格数据
				log:null  ,   //放日志组件
				logorderno:""  ,  //给日志组件传的单号
				logshow:false   ,//控制日志组件显示隐藏
				loading:true,
				orderno:'',
				multipleSelection:[]  ,//选中数据
				orderType
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
				let {OrderNo,orderType,title,date1,date2,asin}=this.fromorder;
				let {size,current}=this.pagination;
				this.$api.getCPOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"iflp": orderType,
					"ptitle": title,
					"sjs":date1,
					"sje": date2,
					"asin": asin,
					"state":"1"
				}).then(res=>{
					console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//接单
			review(data,row,index){
				let newdata=row;
				if(newdata.zt=='2'){
					this.$api.jdCPOrderDetail({orderno:row.orderno}).then(res=>{
						if(res.rescode>0){
							this.$message.success('接单成功')
							//console.log(newdata.zt);
						}else{
							this.$message.warning('接单失败')
							newdata.zt=newdata.zt=='2'?'1':'2'
						}
					}).catch(xhr=>{
						this.$message.warning('接单失败')
						newdata.zt=newdata.zt=='2'?'1':'2'
					})
				}else{
					this.$api.cancelJDCPOrderDetail({orderno:row.orderno}).then(res=>{
						if(res.rescode>0){
							this.$message.success('取消成功')
							//console.log(newdata.zt);
						}else{
							this.$message.warning('取消失败')
							newdata.zt=newdata.zt=='1'?'2':'1'
						}
					}).catch(xhr=>{
						this.$message.warning('取消失败')
						newdata.zt=newdata.zt=='1'?'2':'1'
					})
				}
			},
			//批量接单
			BatchReview(){
				let arr=[]
				this.multipleSelection.filter(item=>{
					return arr.push(item.rid);
				})
				let rids=arr.toString();
				if(rids==''){
					this.$message.warning('请选择批量数据')
				}else{
					this.$api.jdCPOrderDetail_PL({rids}).then(res=>{
						if(res.rescode>0){
							this.$message.success('接单成功')
							this.search();
						}else{
							this.$message.warning('接单失败')
						}
					}).catch(xhr=>{
						this.$message.warning('接单失败')
					})
				}
			},
			//获取选中
			changeFun (val) {
			  this.multipleSelection = val // 返回的是选中的列的数组集合
			},
			//显示订单详细/日志
			handleLogClick(orderno) {
				if(this.logshow){
					this.logshow=false;
				}else{
					this.logorderno=orderno;
					this.logshow=true;
					if(this.log==null){
						this.log=() => import('@/components/Log/LogDesc.vue');
					}
				}
			}
		}
	})
</script>

<style>
</style>
