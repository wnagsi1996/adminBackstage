<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromAccount" class="demo-form-inline">
		  <el-form-item label="操作人员" >
			  <el-select v-model="fromAccount.name" @focus="hankName">
				<el-option  label="全部" value="0"></el-option>
				<el-option v-for="item in allUserList" :label="item.username" :value="item.userid" :key="item.userid"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="月份">
		    <el-date-picker v-model="fromAccount.monthly" type="month" placeholder="选择月" />
		  </el-form-item>
		  <el-form-item label="分类">
		    <el-select v-model="fromAccount.user">
				   <el-option  label="全部" value="-1"></el-option>
				  <el-option  label="买家端" value="1"></el-option>
				  <el-option  label="卖家端" value="0"></el-option>
				 </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<div>
			<el-button type="primary"  @click="setMonthInfo()" size="small">新建月份目标</el-button>
		</div>
		<div class="tableMag">
		<!-- 表格数据 -->
		  <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
		      <el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
		      <el-table-column prop="username" label="人员名称" min-width="5%" />
		      <el-table-column prop="plantnum" label="目标单数" min-width="6%" />
		  	  <el-table-column prop="month" label="目标月份" min-width="6%" />
		  	  <el-table-column prop="usertype" label="类别" min-width="5%" :formatter="typeMethod" />
		      <el-table-column fixed="right" label="操作" min-width="7%" >
		        <template slot-scope="scope">
		  			 <el-button type="text" size="small" @click="setMonthInfo(scope.row)">编辑</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
			</div>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  <el-dialog title="月份目标" :visible.sync="dialogVisible" width="300px">
			  <SetMonthTarget :userMonthAims="userMonthAims" @dialogMonthToggle="dialogMonthToggle" />
		  </el-dialog>

	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import SetMonthTarget from "@/components/Admin/SetMonthTarget"
	import {Form,FormItem,Select,Option,Table,TableColumn,Dialog,DatePicker} from 'element-ui'
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'MonthlyGoal',
		components:{
			Pagination,
			SetMonthTarget,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Dialog.name]:Dialog,
			[DatePicker.name]:DatePicker
		},
		data(){
			return{
				fromAccount:{
					name:'0',
					monthly:'',
					selstate:'-1'
				},
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:true,
				userMonthAims:{},
				dialogVisible:false
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
			search(valdata=[]){
				if(valdata.length!=0){
					if(valdata[0]=="current"){
						this.pagination.current=valdata[1];
					}else if(valdata[0]=="size"){
						this.pagination.size=valdata[1];
					}
				}
				this.loading=true;
				let {monthly,selstate,name}=this.fromAccount;
				let {size:current}=this.pagination;
				this.$api.getUserPlantList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"month":monthly,
					"usertype":selstate,
					"userid":name
				}).then(res=>{
					if(res.results!=0){
						this.pagination.total=res.results;
						this.tableData=res.rows;
						this.loading=false;
					}
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr)
					this.loading=false;
				})
			},
			//设置月份目标
			setMonthInfo(row=''){
				if(row!=''){
					this.userMonthAims=row;
				}else{
					this.userMonthAims={};
				}
				this.dialogVisible=true
			},
			//判断是否需要加载全部操作人员
			hankName(){
				if(this.allUserList.length==0){
					this.getAllUserList();
				}
			},
			//关闭弹窗
			dialogMonthToggle(){
				this.dialogVisible=false;
				this.search()
			},
			//类别格式化
			typeMethod(row){
				return row.usertype == 0?'卖家端':'买家端'
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			},
			...mapActions([
				'getAllUserList'
			])
		}
	})
</script>

<style>
</style>
