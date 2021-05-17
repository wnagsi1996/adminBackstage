<template>
	<div>
		<!-- 搜索条件  -待审核订单-->
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
			    <el-table-column prop="price" label="客单价" min-width="4%" />
			    <!-- <el-table-column prop="producttype" label="类别" min-width="5%" /> -->
			    <el-table-column prop="mjusername" label="放单人员" min-width="5%" />
			    <el-table-column prop="ztstr" label="订单状态" min-width="5%" />
			    <el-table-column prop="ordertypestr" label="订单类别" min-width="6%" />
				 <el-table-column prop="zjname" label="去向（中介或个人）" min-width="5%" />
				 <el-table-column prop="jddate" label="接单时间" min-width="8%" />
				 <el-table-column prop="xdOrderno" label="购买单号" min-width="5%" />
			    <el-table-column fixed="right" label="操作" min-width="5%" >
			      <template slot-scope="scope">
			        <el-button v-if="scope.row.zt=='1'" @click="review(scope.row.orderno,'1',scope.row.realprice)" type="text" size="small">接单</el-button>
					<template v-if="scope.row.zt=='2' || scope.row.zt=='5'">
						 <el-button @click="cancelOrder($event,scope.row,scope.$index)" type="text" size="small">取消接单</el-button>
						 <el-button @click="uploadorderno(scope.row.orderno)" type="text" size="small">提交测评信息</el-button>
						 <template v-if="scope.row.mmjzjid != '' && scope.row.mmjzjid != '0'">
							 <el-button @click="review(scope.row.orderno,'0',scope.row.realprice)" type="text" size="small">取消中介绑定</el-button>
						 </template>
						 <template v-else>
							 <el-button @click="bindUser(scope.row.orderno)" type="text" size="small">绑定个人刷手</el-button>
							 <el-button @click="bindAgent(scope.row.orderno)" type="text" size="small">绑定中介</el-button>
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
			  <component :is="dialog.dialogComponent" :orderno="orderno" @dialogToggle="dialogToggle"/>
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
		name:'ReviewOrder',
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
				agentdata:[],  //中介数据
				agentcom:null,  //绑定中介组件
				uploadOrdercom:null,  //上传订单信息
				dialogVisible:false,
				orderno:'',
				Log:null,
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
				let {OrderNo,xdorderno,agent,orderType,date1,date2,txtbuyer}=this.fromorder;
				let {size,current}=this.pagination;
				this.$api.getCPOrderDetailList({
					pageSize: size,                         //页面大小
					pageNum:current-1,   //页码
					orderno: OrderNo,
					xdorderno,
					zjID: agent,
					type: orderType,
					sjs:date1,
					sje: date2,
					buyer: txtbuyer,
					state:'3'
				}).then(res=>{
					console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//隐藏弹出框
			dialogToggle(type=false){
				this.dialog={
					title:'',
					Visible:false,
					width:''
				}
				if(type) this.search();
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
			bindAgent(orderno){
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
			//上传订单信息
			uploadorderno(orderno){
				this.orderno=orderno;
				let uploadOrdercom=this.uploadOrdercom
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
				this.$api.cancelJDCPOrderDetail({orderno:row.orderno}).then(res=>{
					if(res.rescode>0){
						this.$message.success('取消成功')
						this.tableData.splice(index, 1)
					}else{
						this.$message.warning('取消失败')
					}
				}).catch(xhr=>{
					this.$message.warning('取消失败')
				})
			},
			...mapActions([
				'getBuyerAgentList'
			])
		}
	})
</script>

<style>
</style>
