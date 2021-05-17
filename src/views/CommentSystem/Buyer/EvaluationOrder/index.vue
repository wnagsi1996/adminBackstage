<template>
	<div>
		<!-- 搜索条件  -待测评订单-->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="购买单号">
		    <el-input v-model="fromorder.xdorderno" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="订单类别">
		    <el-select v-model="fromorder.orderType" placeholder="">
		      <el-option v-for="(item,index) in orderType" :key="index" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="ASIN">
		    <el-input v-model="fromorder.asin" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="去向中介">
		    <el-select v-model="fromorder.agent" placeholder="" @focus="getAgent">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option v-for="item in buyerAgentList" :label="item.name" :key="item.rid" :value="item.rid"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="去向个人">
		    <el-input v-model="fromorder.txtbuyer" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="接单时间">
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
			<el-button type="primary" @click="download">批量下载</el-button>
			<el-button type="primary" @click="upload">批量导入订单</el-button>
			<el-button type="danger" @click="BatchCancelReview">批量取消</el-button>
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
				 <el-table-column prop="rid" label="RID" min-width="3%">
					<template slot-scope="scope">
				 		<p>is{{scope.row.rid}}</p> 
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
				<el-table-column prop="mjusername" label="放单人员" min-width="5%" />
			    <el-table-column prop="ztstr" label="订单状态" min-width="5%" />
			    <el-table-column prop="ordertypestr" label="订单类别" min-width="6%" />
				<el-table-column prop="asin" label="ASIN" min-width="5%" />
				 <el-table-column prop="zjname" label="去向（中介或个人）" min-width="5%" />
				 <el-table-column prop="StoreName" label="店铺" min-width="5%" />
				 <el-table-column prop="KeyWord" label="关键词" min-width="5%" />
				 <el-table-column prop="xdyq" label="下单要求" min-width="8%" />
				 
				 <!-- <el-table-column prop="xdOrderno" label="购买单号" min-width="5%" /> -->
			    <el-table-column fixed="right" label="操作" min-width="12%" >
			      <template slot-scope="scope">
			        <!-- <el-button v-if="scope.row.zt=='1'" @click="review(scope.row.orderno,'1',scope.row.realprice)" type="text" size="small">接单</el-button> -->
					<template v-if="scope.row.zt=='2' || scope.row.zt=='5'">
						 <el-button @click="cancelOrder($event,scope.row,scope.$index)" type="text" size="small">取消接单</el-button>
						 <el-button @click="uploadorderno(scope.row.orderno)" type="text" size="small">提交测评信息</el-button>
						 <template v-if="scope.row.mmjzjid != '' && scope.row.mmjzjid != '0'">
							 <el-button @click="cancelAgent(scope.row.orderno,'0',scope.row.realprice)" type="text" size="small">取消中介绑定</el-button>
						 </template>
						 <template v-else>
							 <el-button @click="bindUser(scope.row.orderno)" type="text" size="small">绑定个人刷手</el-button>
							 <el-button @click="bindAgent(scope.row.rid)" type="text" size="small">绑定中介</el-button>
						 </template>
					</template>
					<el-button @click="handleLogClick(scope.row.orderno)" type="text" size="small">查看详情</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  

		  <!-- 公共弹窗组件 -->
		  <el-dialog :title="dialog.title" :visible.sync="dialog.Visible" :width="dialog.width"  >
			  <component :is="dialog.dialogComponent" :orderno="orderno" :rids="rids" @dialogToggle="dialogToggle"/>
		  </el-dialog>
		  
		  <!-- 日志 -->
		  <component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick" />

	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Dialog,Table,TableColumn,Button,Form,FormItem,Row,Col,DatePicker,Option,Input,Select,Popover} from 'element-ui'
	import {orderType} from '@/assets/js/orderState.js'
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'EvaluationOrder',
		components:{
			Pagination,
			copyorderno,
			[Dialog.name]:Dialog,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[DatePicker.name]:DatePicker,
			[Option.name]:Option,
			[Input.name]:Input,
			[Select.name]:Select,
			[Popover.name]:Popover
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					xdorderno:'',
					orderType:'-1',
					agent:'-1',
					asin:'',
					txtbuyer:'',
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
				loading:true,
				agentcom:null,  //绑定中介组件
				uploadOrdercom:null,  //上传订单信息组件
				uploadFilecom:null,  //批量上传订单组件
				downloadTablecom:null,  //批量下载表格组件
				dialogVisible:false,
				orderno:'',
				rids:'',  //传给绑定中介用
				multipleSelection:[]  ,//选中的数据
				orderType
			}
		},
		computed:{
			...mapGetters([
				'buyerAgentList'
			])
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
				let {OrderNo,xdorderno,agent,orderType,asin,date1,date2,txtbuyer}=this.fromorder;
				let {size,current}=this.pagination;
				this.$api.getCPOrderDetailList({
					pageSize: size,                         //页面大小
					pageNum:current-1,   //页码
					orderno: OrderNo,
					xdorderno,
					zjID: agent,
					type: orderType,
					asin,
					sjs:date1,
					sje: date2,
					buyer: txtbuyer,
					state:'2,5'
				}).then(res=>{
					// console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//隐藏弹出框
			dialogToggle(val=''){
				//布尔值要刷新表格
				if(typeof val =='boolean'){
					this.search();
				}else if(typeof val == 'string' && val.includes(',')){ //传过来得值是字符串并且是rids得，代表是刚绑定完中介，刷新表格并且弹出下载表格得界面
					this.search();
					this.rids=val;
					this.downloadTable();
					return;
				}
				//除了下载表格，其他都关闭弹出框
				this.dialog={
					title:'',
					Visible:false,
					width:'',
					rids:'',
					orderno:''
				}
			},
			//绑定个人刷手信息
			bindUser(orderno){
				this.$prompt('绑定个人刷手', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消'
				}).then(({ value }) => {
					this.$api.setCPOrderDetailSDUserName({orderno,sdusername:value}).then(res=>{
				  	if(res.rescode>0){
						this.$message.success(res.resdesc)
						let tableData=this.tableData;
						tableData.forEach((item,index)=>{
							if(item.orderno==orderno){
								this.tableData[index].zjname=value==''?'':`个人:${value}`
							}
						})
				  	}else{
						this.$message.warning(res.resdesc)
					}
				  }).catch(xhr=>{
				  	console.log(xhr)
					this.$message.warning('绑定失败')
				  })
				}).catch(() => {
     
				});
			},
			//获取中介列表
			getAgent(){
				if(this.buyerAgentList.length==0){
					this.getBuyerAgentList()
				}
			},
			//绑定中介
			bindAgent(rids){
				this.getAgent();
				this.rids=rids;
				let agentcom=this.agentcom
				if(agentcom==null){
					agentcom=this.agentcom=() => import('@/components/Buyer/BindAgent.vue');
				}
				this.dialog={
					title:'绑定中介',
					Visible:true,
					width:'300px',
					dialogComponent:agentcom
				}
			},
			//取消中介绑定
			cancelAgent(orderno){
				this.$api.deleteCPOrderDetailAgent({orderno}).then(res=>{
					if(res.rescode>0){
						this.$message.success(res.resdesc)
						let tableData=this.tableData;
						tableData.forEach((item,index)=>{
							if(item.orderno==orderno){
								Object.assign(this.tableData[index],{zjname:'',mmjzjid:''});
							}
						})
					}else{
						this.$message.warning(res.resdesc)
					}
				}).catch(xhr=>{
					this.$message.warning('取消失败')
					console.log(xhr);
				})
			},
			//上传订单信息
			uploadorderno(orderno){
				this.orderno=orderno;
				let uploadOrdercom=this.uploadOrdercom;
				if(uploadOrdercom==null){
					uploadOrdercom=this.uploadOrdercom=() => import('@/components/Buyer/UploadOrderInfo.vue');
				}
				this.dialog={
					title:'上传测评订单',
					Visible:true,
					width:'500px',
					dialogComponent:uploadOrdercom
				}
				
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
			// 取消接单
			cancelOrder(data,row,index){
				//console.log(index);
				this.$api.cancelJDCPOrderDetail({orderno:row.orderno}).then(res=>{
					if(res.rescode>0){
						this.$message.success('取消成功!')
						this.tableData.splice(index, 1)
					}else{
						this.$message.warning('取消失败!')
					}
				}).catch(xhr=>{
					this.$message.warning('取消失败!')
				})
			},
			//获取选中
			changeFun (val) {
			  this.multipleSelection = val // 返回的是选中的列的数组集合
			},
			// 批量下载弹出绑定中介
			download(){
				//console.log(this.multipleSelection);
				let arr=[]
				this.multipleSelection.filter(item=>{
					return arr.push(item.rid);
				})
				let arrStr=arr.toString();
				if(arrStr!=''){
					this.bindAgent(arrStr)
				}else{
					this.$message.warning('请选择下载数据!')
				}
			},
			//批量下载表格
			downloadTable(){
				let downloadTablecom=this.downloadTablecom
				if(downloadTablecom==null){
					downloadTablecom=this.downloadTablecom=() => import('@/components/Buyer/downloadTable.vue');
				}
				this.dialog={
					title:'下载表格',
					Visible:true,
					width:'80%',
					dialogComponent:downloadTablecom
				}
			},
			// 批量上传
			upload(){
				let uploadFilecom=this.uploadFilecom
				if(uploadFilecom==null){
					uploadFilecom=this.uploadFilecom=() => import('@/components/UploadFile');
				}
				this.dialog={
					title:'批量导入订单',
					Visible:true,
					width:'500px',
					dialogComponent:uploadFilecom
				}
				this.orderno='order'
			},
			//批量取消接单
			BatchCancelReview(){
				let arr=[]
				this.multipleSelection.filter(item=>{
					return arr.push(item.rid);
				})
				let arrStr=arr.toString();
				if(arrStr==''){
					this.$message.warning('请选择批量数据!')
				}else{
					this.$api.cancelJDCPOrderDetail_PL({rids:arrStr}).then(res=>{
						if(res.rescode>0){
							this.$message.success('取消成功!')
							this.search();
						}else{
							this.$message.warning('取消失败!')
						}
					}).catch(xhr=>{
						this.$message.warning('取消失败!')
					})
				}
			},
			...mapActions([
				'getBuyerAgentList'
			])
		}
	})
</script>

<style>
</style>
