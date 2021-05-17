<template>
	<div>
		<el-button type="primary" @click="downTable">下载子单表格</el-button>
		<el-button type="primary" @click="downTable1">下载产品表格</el-button>
		<div class="tableMag">
			<el-table id="example" :data="tableData" border stripe v-loading="loading" style="width: 100%">
			    <el-table-column prop="rid" label="RID" min-width="4%" />
			    <el-table-column prop="StoreName" label="Store name" min-width="6%" />
			    <el-table-column prop="Brand" label="Brand name" min-width="6%" />
			    <el-table-column prop="Asin" label="ASIN" min-width="6%" />
			    <el-table-column prop="price" label="Price" min-width="6%" />
			    <el-table-column prop="ProductUrl" label="The products link" min-width="10%" />
				 <el-table-column prop="pimg" label="图片" min-width="3%">
					 <template slot-scope="scope">
						<a :href="scope.row.ProductUrl" target='_blank'>
							 <el-popover placement="right" width="200" trigger="hover">
								<img slot="reference" :src="scope.row.ProductImgUrl" style="width: 50px;" />
							</el-popover>
						</a>
					 </template>
				 </el-table-column>
			    <el-table-column prop="quantity" label="order quantity" min-width="4%" />
			    <el-table-column prop="KeyWord" label="KeyWord" min-width="4%" />
			    <el-table-column prop="xdyq" label="Special request" min-width="5%" />
			  </el-table>
		</div>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
	</div>
</template>

<script>
	import {Table,TableColumn,Popover} from 'element-ui'
	/** column数据的说明 */
	//1.title为column的标题
	//2.key为column对应的key
	//3.type默认是text，若为图片格式type为image , 并且可以设置图片的宽高
	
	  const column = [
		{
		  title: 'RID', 
		  key: 'rid',
		  type: 'text'
		},
		{
		  title: 'Store name', 
		  key: 'StoreName',
		  type: 'text'
		},
		{
		  title: 'Brand name', 
		  key: 'Brand',
		  type: 'text'
		},
		{
		  title: 'ASIN', 
		  key: 'Asin',
		  type: 'text'
		},
		{
		  title: 'Price', 
		  key: 'price',
		  type: 'text'
		},
		{
		  title: 'The products link', 
		  key: 'ProductUrl',
		  type: 'text'
		},
		{
		  title: 'image',
		  key: 'ProductImgUrl',
		  type: 'image',
		  widta:'100px',
		  height:'100px'
		},
		{
		  title: 'order quantity',
		  key: 'quantity',
		  type: 'text'
		},
		{
		  title: 'KeyWord',
		  key: 'KeyWord',
		  type: 'text'
		},
		{
		  title: 'Special request',
		  key: 'xdyq',
		  type: 'text'
		}
	  ]
	
	import Pagination from "@/components/Pagination"
	// import FileSaver from 'file-saver'
	// import XLSX from 'xlsx'
	import table2excel from 'js-table2excel'
	export default({
		name:'downloadTable',
		components:{
			Pagination,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Popover.name]:Popover,
		},
		props:{
			rids:{
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
				let {current,size}=this.pagination
				this.$api.getExportCPOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"rids": this.rids
				}).then(res=>{
					if(res.rescode!=0){
						this.pagination.total=res.results;
						let rows=res.rows;
						rows.forEach(item=>{
							item.rid='is'+item.rid;
							item.quantity=1;
						});
						this.tableData=rows;
					}else{
						this.$message.warning(res.resdesc);
					}
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//下载表格数据
			downTable(){
				  //第三个参数是表格名
				  table2excel(column, this.tableData, "放单表格.xls")
			},
			downTable1(){
				let newtable=this.tableData;
				const productTable=[];  // 缓存产品单下载
				for (const t of newtable) {
					
					// 检查缓存中是否已经存在
					if (productTable.find(c => c.Asin === t.Asin && c.KeyWord === t.KeyWord)) {
						//遍历哪个对象进行数量加1
						productTable.filter((item)=>{
							if(item.Asin === t.Asin && item.KeyWord === t.KeyWord){
								item.quantity++;
							}
						})
						// 已经存在说明以前记录过，现在这个就是多余的，直接忽略
						continue;
					}
					// 不存在就说明以前没遇到过，把它记录下来
					productTable.push(t);
				}
				// 记录结果就是过滤后的结果
				//console.log(productTable)
				
				column.filter(item => item.key!='rid' )
				//第三个参数是表格名
				table2excel(column, productTable, "放单表格.xls")
			}
		}
	})
</script>

<style>
</style>
