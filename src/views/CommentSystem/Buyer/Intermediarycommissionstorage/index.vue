<template>
	<div>
		<!-- 搜索条件 -中介佣金挂账-->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="中介名称">
		    <el-input v-model="fromorder.name" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderType" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option label="未处理" value="0"></el-option>
		      <el-option label="已抵扣" value="1"></el-option> <!--已抵扣中介佣金返款-->
		      <el-option label="已回款" value="2"></el-option>  <!--中介已返款-->
		      <el-option label="已登记为员工损失" value="3"></el-option>  <!--已由财务登记-->
		      <el-option label="回款等待审核" value="4"></el-option>  <!--汇款等待财务审核-->
		      <el-option label="抵扣等待审核" value="5"></el-option>
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
			    <el-table-column prop="zjname" label="中介名称" min-width="6%" />
				<el-table-column prop="zjlxfs" label="中介联系方式" min-width="6%" />
				<el-table-column prop="statestr" label="状态" min-width="6%" />
			    <el-table-column prop="username" label="操作人员" min-width="5%" />
			    <el-table-column prop="usdmoney" label="挂账美元" min-width="6%" />
			    <el-table-column prop="rmbmoney" label="挂账人民币" min-width="6%" />
			    <el-table-column prop="usdmoney_real" label="实际回款美元" min-width="6%" />
			    <el-table-column prop="rmbmoney_real" label="实际回款人民币" min-width="6%" />
			    <el-table-column prop="insertdate" label="挂账时间" min-width="6%" />
				 <el-table-column prop="dodate" label="处理时间" min-width="8%" />
			    <el-table-column fixed="right" label="操作" min-width="8%" >
			      <template slot-scope="scope">
					<el-button v-if="scope.row.state=='0'" @click="uploadorderno(scope.row.orderno)" type="text" size="small">发起回款</el-button>
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
	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Dialog,Table,TableColumn,Form,FormItem,Row,Col,DatePicker,Option,Input,Select,Popover} from 'element-ui'
	export default({
		name:'Intermediarycommissionstorage',
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
					name:'',
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
				loading:true,
				orderno:'',
				//弹出框配置
				dialog:{
					title:'',
					Visible:false,
					width:'',
					dialogComponent:null
				}
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
				let {OrderNo,name,date1,date2,orderType}=this.fromorder
				let {current,size}=this.pagination;
				this.$api.getAgentOverDraftList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"zjname": name,
					"sjs":date1,
					"sje": date2,
					"mjuserid": '-1',
					"state":orderType
				}).then(res=>{
					console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//上传回款
			uploadorderno(orderno){
				this.orderno=orderno;
				if(this.dialog.dialogComponent==null){
					this.dialog.dialogComponent=() => import('@/components/AgentTransfer');
				}
				Object.assign(this.dialog,{
					title:'发起回款审核',
					Visible:true,
					width:'500px'
				})
			},
			//关闭弹出框
			dialogToggle(type=false){
				this.dialog={
					title:'',
					Visible:false,
					width:''
				}
				if(type){
					this.search()
				}
			}
		}
	})
</script>

<style>
</style>
