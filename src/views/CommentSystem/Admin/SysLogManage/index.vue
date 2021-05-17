<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
			<el-form-item label="订单号">
			  <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="关键字">
			  <el-input v-model="fromorder.keyword" placeholder=""></el-input>
			</el-form-item>
		  <el-form-item label="操作人员" >
			  <el-select v-model="fromorder.name" @focus="hankName">
				<el-option  label="全部" value="-1"></el-option>
				<el-option v-for="item in allUserList" :label="item.username" :value="item.userid" :key="item.userid" :loading="userloading"></el-option>
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
		<div class="tableMag">
		<!-- 表格数据 -->
		  <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
		      <el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
		     <el-table-column prop="orderno" label="订单号" min-width="4%">
		     	 <template slot-scope="scope">
		     		 <copyorderno :orderno="scope.row.orderno" />  
		     	 </template>
		      </el-table-column>
		      <el-table-column prop="czusername" label="操作人" min-width="4%" />
		  	  <el-table-column prop="cztype" label="操作类型" min-width="6%" />
		  	  <el-table-column prop="czdatetime" label="操作时间" min-width="5%" />
		      <el-table-column prop="czremark" label="操作日志" min-width="20%" >
				  <template slot-scope="scope">
					  <p v-if="scope.row.fkimgurl!=''">{{scope.row.czremark}}
						<i class="el-icon-picture-outline" @click="showImg(scope.row.fkimgurl)"></i>
					  </p>
					  <p v-else>{{scope.row.czremark}}</p>
				  </template>
			  </el-table-column>
		    </el-table>
			</div>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />

	</div>
</template>

<script>
	import {Form,FormItem,Col,DatePicker,Select,Option,Table,TableColumn,Input} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'SysLogManage',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Col.name]:Col,
			[DatePicker.name]:DatePicker,
			[Select.name]:Select,
			[Option.name]:Option,
			[Table.name]:Table,
			[Input.name]:Input,
			[TableColumn.name]:TableColumn
		},
		data(){
			return{
				fromorder:{
					OrderNo:'',
					keyword:'',
					name:'-1',
					date1:'',
					date2:''
				},
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:true,
				userloading:false
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
				let {OrderNo,name,date1,date2,keyword}=this.fromorder;
				let {size,current}=this.pagination;
				this.$api.getGLCPLogList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno":OrderNo,
					"czuserid":name,
					"sczsjs":date1,
					"czsje":date2,
					"keyword":keyword
				}).then(res=>{console.log(res);
					if(res.results!=0){
						this.pagination.total=res.results;
						this.tableData=res.rows;
						this.loading=false;
					}
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			//判断是否需要加载全部操作人员
			hankName(){
				if(this.allUserList.length==0){
					this.getAllUserList()
				}
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			},
			//显示返款二维码
			showImg(imgsrc){
				this.$alert(`<img style="width:300px" src="${imgsrc}" />`, {
				  dangerouslyUseHTMLString: true,
				  showConfirmButton:false
				});
			},
			...mapActions([
				'getAllUserList'
			])
		}
	})
</script>

<style>
</style>
