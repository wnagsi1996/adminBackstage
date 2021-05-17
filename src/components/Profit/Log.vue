<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
			<el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="类别">
			<el-select v-model="fromorder.updatetype" placeholder="">
			  <el-option label="全部" value="-1"></el-option>
			  <el-option label="测评结束" value="0"></el-option>
			  <el-option label="提取" value="1"></el-option>
			  <el-option label="利润变更" value="2"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="创建时间" v-if="month==''">
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
			<el-table-column prop="toporderno" label="订单号" min-width="5%">
				 <template slot-scope="scope">
					 <copyorderno :orderno="scope.row.toporderno" v-if="scope.row.toporderno" />  
				 </template>
			 </el-table-column>
			<el-table-column prop="profit" label="利润" min-width="3%" />
			<el-table-column prop="updatetype" label="类别" min-width="4%" >
				<template slot-scope="scope">
					<p>{{scope.row.updatetype | type}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="profitdatetime" label="时间" min-width="6%" />
			<el-table-column prop="remark" label="备注" min-width="9%" />
			 <!-- <el-table-column prop="username" label="操作人员" min-width="3%" /> -->
		  </el-table>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		</div>
		
	</div>
</template>

<script>
	import{Form,FormItem,Row,Col,Input,Select,Option,Table,TableColumn,DatePicker} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	export default({
		name:'Profit-Log',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option,
			[Row.name]:Row,
			[Col.name]:Col,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[DatePicker.name]:DatePicker,
			[Input.name]:Input
		},
		props:{
			month:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:false,
				//搜索内容
				fromorder:{
					OrderNo:'',
					updatetype:'-1',
					date1:'',
					date2:''
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
				let {updatetype,OrderNo,date1,date2}=this.fromorder;
				let {current,size}=this.pagination;
				this.$api.getProfitLogList({
					pageNum:current-1,
					pageSize:size,
					updatetype,
					toporderno:OrderNo,
					sjs:date1,
					sje:date2,
					month:this.month,
					userid:-1
				}).then(res=>{
					 //console.log(res)
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr)
				})
			}
		},
		filters:{
			type(val){
				let status=''
				switch(val){
					case 0:
						status='测评结束';
						break;
					case 1:
						status='提取';
						break;
					case 2:
						status= '利润变更';
						break;
				};
				return status
			}
		},
		watch:{
			month(newVal,oldVal){
				this.search('1');
			}
		}
	})
</script>

<style scoped>
	.pagination{text-align: right;float: none;}
</style>
