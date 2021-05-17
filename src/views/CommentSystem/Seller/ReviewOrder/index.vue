<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="购买单号">
		    <el-input v-model="fromorder.xdOrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="订单类型">
		    <el-select v-model="fromorder.orderType" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option label="免评单" value="0"></el-option>
		      <el-option label="留评单" value="1"></el-option>
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
			<el-button type="primary"  @click="batchDownload()" size="small">批量下载</el-button>
		</div>
		<!-- 表格数据 -->
		<div class="tableMag">
			<el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
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
			    <el-table-column prop="price" label="客单价" min-width="3%" />
			    <el-table-column prop="ztstr" label="订单状态" min-width="5%" />
			    <el-table-column prop="ordertypestr" label="是否留评" min-width="4%" />
				 <el-table-column prop="jduser" label="接单人员" min-width="5%" />
				 <el-table-column prop="xdOrderno" label="购买单号" min-width="6%" />
				 <el-table-column prop="realprice" label="购买金额" min-width="3%" />
				 <el-table-column prop="realxddate" label="购买时间" min-width="6%" />
				 <el-table-column prop="cjsj" label="创建时间" min-width="6%" />
			    <el-table-column fixed="right" label="操作" min-width="8%" >
			      <template slot-scope="scope">
			        <el-button @click="review(scope.row.orderno,'1',scope.row.realprice)" type="text" size="small">审核通过</el-button>
			        <el-button @click="review(scope.row.orderno,'0',scope.row.realprice)" type="text" size="small">驳回</el-button>
					<el-button @click="handleLogClick(scope.row.orderno)" type="text" size="small">查看详情</el-button>
					
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  

		  <!-- 公共弹窗组件 -->
		  <el-dialog :title="dialog.title" :visible.sync="dialog.Visible" :width="dialog.width"  >
			  <component :is="dialog.dialogComponent" :rowData="rowData" @dialogToggle="dialogToggle"/>
		  </el-dialog>
		  
		  <!-- 日志 -->
		  <component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick" />

	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Form,FormItem,Select,Option,Input,DatePicker,Table,TableColumn,Popover,Col,Dialog} from 'element-ui'
	export default({
		name:'ReviewOrder',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option,
			[Input.name]:Input,
			[DatePicker.name]:DatePicker,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Col.name]:Col,
			[Dialog.name]:Dialog,
			[Popover.name]:Popover
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					xdOrderNo:'',
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
				//弹出框配置
				dialog:{
					title:'',
					Visible:false,
					width:'',
					dialogComponent:null
				},
				tableData:[], //表格数据
				log:null  ,   //放日志组件
				logorderno:""  ,  //给日志组件传的单号
				logshow:false   ,//控制日志组件显示隐藏
				reviewcom:null,  //审核订单组件
				loading:true,
				batchDownloadcom:null,    //批量下载组件
				rowData:{  //给子组件传值
					orderno:'',
					type:'',
					price:''
				},
				Log:null,
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
				let {size,current}=this.pagination;
				let {OrderNo,orderType,date1,date2,xdOrderNo}=this.fromorder;
				this.$api.getCPOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"state": "3",
					"iflp": orderType,
					"sjs":date1,
					"sje": date2,
					"mjuserid": -1,
					"mmjuserid": -1,
					"xdorderno": xdOrderNo
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//隐藏弹出框
			dialogToggle(type=false){
				Object.assign(this.dialog,{
					title:'',
					Visible:false,
					width:''
				});
				if(type) this.search();
				
			},
			//审核订单
			review(orderno,type,price){
				Object.assign(this.rowData,{
					orderno,
					type,
					price
				});
				let reviewcom=this.reviewcom;
				if(reviewcom==null){
					reviewcom=this.reviewcom=() => import('@/components/SellerReviewOrder');
				}
				Object.assign(this.dialog,{
					title:type=='1'?'审核订单':'驳回订单',
					Visible:true,
					width:'350px',
					dialogComponent:reviewcom
				})
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
			},
			//下载订单表格数据
			batchDownload(){
				let batchDownloadcom=this.batchDownloadcom
				if(batchDownloadcom==null){
					batchDownloadcom=this.batchDownloadcom=()=>import('@/components/SelerReviewOrderDownload');
				}
				Object.assign(this.dialog,{
					title:'下载订单表格数据',
					Visible:true,
					width:'70%',
					dialogComponent:batchDownloadcom
				})
			}
		}
	})
</script>

<style>
</style>
