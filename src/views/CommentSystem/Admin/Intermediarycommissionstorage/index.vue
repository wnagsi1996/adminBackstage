<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="中介名称">
		    <el-input v-model="fromorder.agentname" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="人员">
		    <el-select v-model="fromorder.username" placeholder="" @focus="getUserList">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option v-for="item in allUserList" :label="item.username" :value="item.userid" :key="item.userid"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.status" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option label="未处理" value="0"></el-option>
		      <el-option label="已抵扣" value="1"></el-option><!--已抵扣中介佣金返款-->
		      <el-option label="已回款" value="1"></el-option><!--中介已返还-->
		      <el-option label="已登记为员工损失" value="1"></el-option><!--已由财务登记-->
		      <el-option label="回款等待审核" value="1"></el-option><!--汇款等待财务审核-->
		      <el-option label="抵扣等待审核" value="1"></el-option>
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
			    <el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
			    <el-table-column prop="orderno" label="订单号" min-width="6%">
			    	 <template slot-scope="scope">
			    		 <copyorderno :orderno="scope.row.orderno" />  
			    	 </template>
			     </el-table-column>
			    <el-table-column prop="zjname" label="中介名称" min-width="6%" />
			    <el-table-column prop="zjlxfs" label="中介联系方式" min-width="5%" />
			    <el-table-column prop="statestr" label="状态" min-width="4%" />
			    <el-table-column prop="username" label="操作人员" min-width="4%" />
			    <el-table-column prop="usdmoney" label="挂账美元" min-width="5%" />
			    <el-table-column prop="rmbmoney" label="挂账人民币" min-width="5%" />
			    <el-table-column prop="usdmoney_real" label="实际回款美元" min-width="6%" />
			    <el-table-column prop="rmbmoney_real" label="实际回款人民币" min-width="6%" />
			    <el-table-column prop="insertdate" label="挂账时间" min-width="8%" />
			    <el-table-column prop="dodate" label="处理时间" min-width="8%" />
				 <el-table-column fixed="right" label="操作" min-width="5%" >
				   <template slot-scope="scope">
					   <el-button v-if="scope.row.state=='0'" @click="collection(scope.row.rid)" type="text" size="small">登记损失</el-button>
					   <el-button v-if="scope.row.remark!=''" @click="remark(scope.row.remark)" type="text" size="small">备注</el-button>
				   </template>
				 </el-table-column>
			  </el-table>
		</div>
		
		<!-- 分页 -->
		<Pagination class="pagination" @search="search" :pagination="pagination" />
	</div>
</template>

<script>
	import {Form,FormItem,Input,Select,Option,Col,DatePicker,Table,TableColumn} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'Lossexpenses',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option,
			[Col.name]:Col,
			[DatePicker.name]:DatePicker,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
		},
		data(){
			return{
				fromorder:{
					OrderNo:'',
					agentname:'',
					username:'-1',
					status:'-1',
					date1:'',
					date2:''
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				tableData:[],
				loading:false
			}
		},
		computed:{
			...mapGetters([
				'allUserList'
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
				let {size,current}=this.pagination;
				let {agentname,date1,date2,status,OrderNo,username}=this.fromorder;
				this.$api.getAgentOverDraftList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"zjname": agentname,
					"sjs": date1,
					"sje": date2,
					"state": status,
					"orderno": OrderNo,
					"mjuserid": username
				}).then(res=>{
					console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			// 获取全部操作人员
			getUserList(){
				if(this.allUserList.length==0){
					this.getAllUserList()
				}
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			},
			collection(rid){
				this.$confirm('您确定要把该笔记录登记为员工损失吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$api.agentOverDraftToUserOutMoney({rid}).then(res=>{
					  if(res>0){
						  this.$message.success('登记成功!')
						  this.search();
					  }else{
						  this.$message.warning('登记失败!')
					  }
				  }).catch(err=>{
					  this.$message.warning('登记失败!')
				  })
				});
			},
			//弹出备注
			remark(txt){
				this.$alert(txt, '备注');
			},
			...mapActions([
				'getAllUserList'
			])
		}
	})
</script>

<style>
</style>
