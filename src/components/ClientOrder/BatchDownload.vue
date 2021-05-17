<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
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
		  <el-form-item label="客户" prop="name">
		    <el-select
		        v-model="fromorder.name"
		        filterable
		        remote
		        placeholder="请输入关键词"
		        :remote-method="remoteMethod"
		        :loading="clearloading">
		        <el-option
		          v-for="item in sellerdata"
		          :key="item.id"
		          :label="item.cname"
		          :value="item.id">
		        </el-option>
		      </el-select>
		  </el-form-item>
		  </el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-button type="primary" @click="downTable">下载订单表格</el-button>
		<div class="tableMag">
			<el-table id="example" :data="tableData" border stripe v-loading="loading" style="width: 100%">
			    <el-table-column prop="xdOrderno" label="单号" min-width="6%" />
			    <el-table-column prop="ProductImgUrl" label="图片" min-width="4%" >
					<template slot-scope="scope">
						<a :href="scope.row.ProductUrl" target='_blank'>
							 <el-popover placement="right" width="200" trigger="hover" :content="scope.row.ProductTitle">
								<img slot="reference" :src="scope.row.ProductImgUrl" style="width: 50px;" />
							</el-popover>
						</a>
					</template>
				</el-table-column>
			    <el-table-column prop="realproductdj" label="价格" min-width="4%" />
			    <el-table-column prop="realxddate" label="下单时间" min-width="6%" />
			    <el-table-column prop="lpstate" label="是否上评" min-width="4%" >
					<template slot-scope="scope">
						<p v-if="scope.row.lpstate!='0'">已留评</p>
						<p v-else>未留评</p>
					</template>
				</el-table-column>
			    <el-table-column prop="lpurl" label="留评链接" min-width="10%" />
			  </el-table>
		</div>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
	</div>
</template>

<script>
	
	/** column数据的说明 */
	//1.title为column的标题
	//2.key为column对应的key
	//3.type默认是text，若为图片格式type为image , 并且可以设置图片的宽高
	
	  const column = [
		{
		  title: '单号', 
		  key: 'xdOrderno',
		  type: 'text'
		},
		{
		  title: '图片', 
		  key: 'ProductImgUrl',
		  type: 'image',
		  widta:'100px',
		  height:'100px'
		},
		{
		  title: '价格', 
		  key: 'realproductdj',
		  type: 'text'
		},
		{
		  title: '下单时间', 
		  key: 'realxddate',
		  type: 'text'
		},
		{
		  title: '是否上评', 
		  key: 'lpstate',
		  type: 'text'
		},
		{
		  title: '留评链接', 
		  key: 'lpurl',
		  type: 'text'
		}
	  ]
	
	import Pagination from "@/components/Pagination"
	import table2excel from 'js-table2excel'
	import {Form,FormItem,Row,Col,DatePicker,Select,Option,Table,TableColumn,Popover} from 'element-ui'
	export default({
		name:'downloadTable',
		components:{
			Pagination,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[DatePicker.name]:DatePicker,
			[Select.name]:Select,
			[Option.name]:Option,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Popover.name]:Popover
		},
		data(){
			return{
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":500,
					"current":1
				},
				loading:true,
				clearloading:false,
				productTable:[]  ,//下载的表格数据
				sellerdata:[],
				fromorder:{
					name:'',
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
				let {date1,date2,name}=this.fromorder;
				let {size,current}=this.pagination;
				this.$api.getMJExportCPOrderDetailList({
					"pageSize":size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": '',
					"sjs":date1,
					"sje":date2,
					"sjid":name
				}).then(res=>{console.log(res)
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//搜索商家
			remoteMethod(val){
				//console.log(val);
				if(val!==''){
					this.clearloading=true;
					setTimeout(() => {
						this.$api.getHzsjListBySjname({sjname:val}).then(res=>{
							//console.log(res);
							if(res!=''){
								this.sellerdata=res;
								this.clearloading=false;
							}
						}).catch(xhr=>{
							console.log(xhr)
						})
					},200)
				}else{
					this.sellerdata=[];
				}
			},
			//下载表格数据
			downTable(){
				  if(this.tableData.length==0){
				  	this.$message({
				  		type: 'warning',
				  		message:'表格数据为空'
				  	});
				  }else{
				  	//第三个参数是表格名
				  	table2excel(column, this.tableData, "订单表格数据.xls")
				  }
			}
		}
	})
</script>

<style>
</style>
