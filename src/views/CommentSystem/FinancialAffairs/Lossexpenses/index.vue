<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="人员">
		    <el-select v-model="fromorder.username" placeholder="" @focus="getUserList()">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option v-for="item in allUserList" :label="item.username" :value="item.userid" :key="item.userid"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="损失选择">
		    <el-select v-model="fromorder.loss" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option label="损失金额" value="0"></el-option>
		      <el-option label="追回损失" value="1"></el-option>
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
			<el-button type="primary"  @click="add()" size="small">新建</el-button>
		</div>
		
		<!-- 表格数据 -->
		<div class="tableMag">
			<el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
			    <el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
			    <el-table-column prop="username" label="人员" min-width="6%" />
			    <el-table-column prop="money" label="金额" min-width="5%" />
			    <el-table-column prop="outtype" label="损失选择" min-width="6%" >
					<template slot-scope="scope">
						<p v-if="scope.row.outtype=='0'">损失金额</p>
						<p v-else>追回损失</p>
					</template>
				</el-table-column>
				 <el-table-column prop="insertdate" label="创建时间" min-width="8%" />
				 <el-table-column prop="remark" label="备注" min-width="30%" />
			  </el-table>
		</div>
		
		<!-- 分页 -->
		<Pagination class="pagination" @search="search" :pagination="pagination" />
		
		<!-- 添加损失 -->
		<el-dialog title="添加损失" :visible.sync="dialog.Visible" width="350px"  >
			<component :is="dialog.dialogComponent" @dialogToggle="dialogToggle"/>
		</el-dialog>
	</div>
</template>

<script>
	import {Form,FormItem,Table,TableColumn,Select,Option,DatePicker,Col,Dialog} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'Lossexpenses',
		components:{
			Pagination,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Select.name]:Select,
			[Option.name]:Option,
			[DatePicker.name]:DatePicker,
			[Col.name]:Col,
			[Dialog.name]:Dialog
		},
		data(){
			return{
				fromorder:{
					username:'-1',
					loss:'-1',
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
				loading:false,
				dialog:{
					Visible:false,
					dialogComponent:null
				}
				
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
			// 新建
			add(){
				this.dialog.Visible=true;
				if(this.dialog.dialogComponent==null){
					this.dialog.dialogComponent=()=>import('@/components/AddLoss');
				}
			},
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
				let {username,date1,date2,loss}=this.fromorder;
				this.$api.getUserOutMoneyList({
					"pageSize": this.pagination.size,                         //页面大小
					"pageNum":this.pagination.current-1,   //页码
					"userid": username,
					"sjs": date1,
					"sje": date2,
					"outtype": loss
				}).then(res=>{
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
			dialogToggle(){
				this.dialog.Visible=false;
				this.search()
			},
			...mapActions([
				'getAllUserList'
			])
		}
	})
</script>

<style>
</style>
