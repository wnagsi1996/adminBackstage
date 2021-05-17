<template>
	<div>
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
	import {Table,TableColumn,Popover} from 'element-ui'
	export default({
		name:'downloadTable',
		components:{
			Pagination,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Popover.name]:Popover
		},
		props:{
			orderno:{
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
					"size":500,
					"current":1
				},
				loading:true,
				productTable:[]  //下载的表格数据
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
				let {size,current}=this.pagination;
				this.$api.getMJExportCPOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": this.orderno,
					"sjs":'',
					"sje":'',
					"sjid":'-1'
				}).then(res=>{console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
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
		},
		watch:{
			orderno(newVal,oldVal){
				this.search();
			}
		}
	})
</script>

<style>
</style>
