<template>
	<div>
		<!-- 搜索条件  -中介佣金返款-->
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
		  <el-form-item label="下单时间">
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
		   <el-form-item label="留评时间">
		       <el-col :span="11">
		         <el-form-item prop="date1">
		           <el-date-picker type="datetime" placeholder="开始时间" v-model="fromorder.lpdate1" style="width: 100%;"></el-date-picker>
		         </el-form-item>
		       </el-col>
		       <el-col class="line" :span="1">-</el-col>
		       <el-col :span="11">
		         <el-form-item prop="date2">
		           <el-date-picker type="datetime" placeholder="结束时间" v-model="fromorder.lpdate2" style="width: 100%;"></el-date-picker>
		         </el-form-item>
		       </el-col>
		    </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<div>
			<el-button type="primary" @click="agentRebate">批量返款</el-button>
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
			    <el-table-column prop="ordertypestr" label="订单类别" min-width="6%" />
				 <el-table-column prop="zjname" label="去向（中介或个人）" min-width="5%" />
				 <el-table-column prop="xdyj" label="下单佣金" min-width="5%" >
					 <template slot-scope="scope">
						 <p v-if="scope.row.iffkxdyj!='1'">{{scope.row.xdyjfkztstr}}</p>
						 <p v-else>已返款:{{scope.row.xdyj}}</p>
					 </template>
				 </el-table-column>
				 <el-table-column prop="lpyj" label="留评佣金" min-width="5%" >
					 <template slot-scope="scope">
						 <p v-if="scope.row.iffklpyj!='1'">{{scope.row.lpyjfkztstr}}</p>
						 <p v-else>已返款:{{scope.row.lpyj}}</p>
					 </template>
				 </el-table-column>
				 <el-table-column prop="xddate" label="下单时间" min-width="5%" />
				 <el-table-column prop="xdOrderno" label="购买单号" min-width="5%" />
			    <el-table-column fixed="right" label="操作" min-width="5%" >
			      <template slot-scope="scope">
					  <template v-if="scope.row.iffklpyj == '0' || scope.row.iffklpyj == '3' || scope.row.iffkxdyj == '0' || scope.row.iffkxdyj == '3'">
						  <el-button @click="rebateshow(scope.row)" type="text" size="small">佣金返款</el-button>
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
			  <component :is="dialog.dialogComponent" :Rebatedata="Rebatedata" @dialogToggle="dialogToggle"/>
		  </el-dialog>
		  
		  <!-- 日志 -->
		  <component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick" />

	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Dialog,Table,TableColumn,Form,FormItem,Row,Col,DatePicker,Option,Input,Select,Popover} from 'element-ui'
	import {orderType} from '@/assets/js/orderState.js'
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'AgentCommission',
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
					date2:'',
					lpdate1:'',
					lpdate2:''
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
				Rebatecom:null,  //提交返款组件
				agentcom:null,   //中介佣金返款
				dialogVisible:false,
				orderno:'',
				Rebatedata:{},
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
				let {OrderNo,xdorderno,agent,orderType,date1,date2,lpdate1,lpdate2,txtbuyer}=this.fromorder;
				let {current,size}=this.pagination;
				this.$api.getCPOrderDetailList_MMJ({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					xdorderno,
					"zjID": agent,
					"type": orderType,
					"xdsjs":date1,
					"xdsje": date2,
					"lpsjs":lpdate1,
					"lpsje": lpdate2,
					"buyer": txtbuyer
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
			//获取中介列表
			getAgent(){
				if(this.buyerAgentList.length==0){
					this.getBuyerAgentList()
				}
			},
			//中介佣金返款
			agentRebate(){
				this.getAgent();
				let agentcom=this.agentcom;
				if(agentcom==null){
					agentcom=this.agentcom=() => import('@/components/AgentRebate');
				}
				this.dialog={
					title:'中介佣金返款',
					Visible:true,
					width:'500px',
					dialogComponent:agentcom
				}
			},
			//弹出返款的组件
			rebateshow(row){
				let Rebatecom=this.Rebatecom
				if(Rebatecom==null){
					Rebatecom=this.Rebatecom=() => import('@/components/OrderCommission');
				}
				this.dialog={
					title:'返款',
					Visible:true,
					width:'500px',
					dialogComponent:Rebatecom
				}
				this.Rebatedata=row;
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
			...mapActions([
				'getBuyerAgentList'
			])
		}
	})
</script>

<style>
</style>
