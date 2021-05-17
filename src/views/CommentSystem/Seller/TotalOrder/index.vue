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
		      <el-option v-for="(item,index) in orderType" :key="index" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="留评状态">
		    <el-select v-model="fromorder.reviewStatus" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option label="已留评" value="1"></el-option>
		      <el-option label="未留评" value="0"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderStaus" placeholder="">
		      <el-option v-for="(item,index) in orderState" :key="index" :label="item.text" :value="item.value"></el-option>
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
			    <el-table-column prop="price" label="客单价" min-width="6%" />
			    <el-table-column prop="ztstr" label="订单状态" min-width="5%" />
			    <el-table-column prop="ordertypestr" label="是否留评" min-width="6%" >
					<template slot-scope="scope">
						<span>{{scope.row.ordertypestr}}</span>
						<el-link v-if="scope.row.lpurl!=''" type="primary" target="_blank" :href="scope.row.lpurl"><i class="el-icon-paperclip"></i></el-link>
						<i v-else-if="scope.row.lpimgurl!=''" class="el-icon-picture"  @click="showReviewImg(scope.row.lpimgurl)" :underline="false"></i>
					</template>
				</el-table-column>
				 <el-table-column prop="jduser" label="接单人员" min-width="5%" />
				 <el-table-column prop="xdOrderno" label="购买单号" min-width="5%" />
				 <el-table-column prop="realprice" label="购买金额" min-width="5%" />
				 <el-table-column prop="realxddate" label="购买时间" min-width="5%" />
				 <el-table-column prop="cjsj" label="创建时间" min-width="8%" />
			    <el-table-column fixed="right" label="操作" min-width="12%" >
			      <template slot-scope="scope">
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
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Form,FormItem,Select,Option,DatePicker,Input,Table,TableColumn,Popover,Col} from 'element-ui'
	import {orderState,orderType} from '@/assets/js/orderState.js'
	export default({
		name:'TotalOrder',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option,
			[DatePicker.name]:DatePicker,
			[Input.name]:Input,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Col.name]:Col,
			[Popover.name]:Popover
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					xdOrderNo:'',
					orderType:'-1',
					reviewStatus:'-1',
					orderStaus:'',
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
				Log:null,
				orderState,
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
				let {size,current}=this.pagination;
				let {OrderNo,orderStaus,orderType,reviewStatus,date1,date2,xdOrderNo}=this.fromorder;
				this.$api.getCPOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"state": orderStaus,
					"iflp": orderType,
					"lpstate":reviewStatus,
					"sjs":date1,
					"sje": date2,
					"xdorderno": xdOrderNo,
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//显示订单详细/日志
			handleLogClick(orderno) {
				if(this.logshow){
					this.logshow=false;
				}else{
					this.logorderno=orderno
					this.logshow=true;
					if(this.log==null){
						this.log=() => import('@/components/Log/LogDesc.vue');
					}
				}
			},
			//显示留评截图
			showReviewImg(imgsrc){
				this.$alert('<img src='+imgsrc+'>', '留评截图', {
				  dangerouslyUseHTMLString: true
				}).then(()=>{
					
				}).catch(()=>{
					
				});
			}
		}
	})
</script>

<style>
</style>
