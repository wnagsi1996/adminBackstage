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
			    <el-table-column prop="ordertypestr" label="订单类别" min-width="5%" />
				 <el-table-column prop="jdusername" label="接单人员" min-width="5%" />
				 <el-table-column prop="xdorderno" label="购买单号" min-width="6%" />
				 <el-table-column prop="realprice" label="留评内容" min-width="5%" >
					 <template slot-scope="scope">
						 <el-link v-if="scope.row.lpimgurl=='' || scope.row.lpurl!=''" type="primary" target="_blank" :href="scope.row.lpurl">留评链接</el-link>
						 <el-button v-else-if="scope.row.lpimgurl!='' || scope.row.lpurl==''" type="text" @click="showReviewImg(scope.row.lpimgurl)" :underline="false">留评截图</el-button>
						 <template v-else>
							 <el-link type="primary" target="_blank" :href="scope.row.lpurl">留评链接</el-link>
							 <el-button type="text" @click="showReviewImg(scope.row.lpimgurl)" :underline="false">留评截图</el-button>
						 </template>
					 </template>
				 </el-table-column>
				 <el-table-column prop="lpdate" label="留评时间" min-width="8%" />
				 <el-table-column prop="reallpdate" label="上传留评时间" min-width="8%" />
			    <el-table-column fixed="right" label="操作" min-width="8%" >
			      <template slot-scope="scope">
			        <el-button @click="confirmReview(scope.row.orderno)" type="text" size="small">确认留评</el-button>
			        <el-button @click="cancelReview(scope.row.orderno)" type="text" size="small">未留评</el-button>
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
	import {Form,FormItem,Input,DatePicker,Table,TableColumn,Link,Popover,Col} from 'element-ui'
	export default({
		name:'CommentNotification',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[DatePicker.name]:DatePicker,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Link.name]:Link,
			[Col.name]:Col,
			[Popover.name]:Popover
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					xdOrderNo:'',
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
				dialogVisible:false
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
				let {OrderNo,date1,date2,xdOrderNo}=this.fromorder;
				this.$api.getCPOrderDetailList_MJ({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"state": "",
					"sjs":date1,
					"sje": date2,
					"xdorderno": xdOrderNo
				}).then(res=>{
					console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//确认留评
			confirmReview(orderno){
				this.$confirm('确认该订单已留评?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$api.setCPOrderDetailReadLP({orderno}).then(res=>{
				  	if(res.rescode>0){
						this.$message.success('确认成功!')
						this.search()
				  	}else{
						this.$message.warning('确认失败!')
					}
				  }).catch(xhr=>{
				  	this.$message.warning('确认失败!')
				  })
				})
			},
			//取消留评
			cancelReview(orderno){
				this.$confirm('该订单确认没留评?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$api.returnCPOrderDetailLP({orderno}).then(res=>{
				  	if(res.rescode>0){
						this.$message.success('取消成功!')
						this.search()
				  	}else{
						this.$message.warning('取消失败!')
					}
					
				  }).catch(xhr=>{
				  	this.$message.warning('取消失败!')
				  })
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
