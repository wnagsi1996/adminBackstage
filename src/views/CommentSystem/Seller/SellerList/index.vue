<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromSeller" class="demo-form-inline">
		  <el-form-item label="商家名称">
		    <el-input v-model="fromSeller.name" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="商家联系方式">
		    <el-input v-model="fromSeller.contact" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<div>
			<el-button type="primary"  @click="setSellerInfo()" size="small">新建卖家信息</el-button>
		</div>
		<div class="tableMag">
		<!-- 表格数据 -->
		  <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
		      <el-table-column prop="rid" label="商家ID" min-width="3%" />
		      <el-table-column prop="sjname" label="商家名称"min-width="5%" />
		      <el-table-column prop="SJLXR" label="商家联系人" min-width="6%" />
			  <el-table-column prop="SJLXFS" label="商家联系方式" min-width="6%" />
		  	  <el-table-column prop="sjcjsj" label="创建时间" min-width="5%" />
		      <el-table-column fixed="right" label="操作" min-width="7%" >
		        <template slot-scope="scope">
		  			 <el-button type="text" size="small" @click="setSellerInfo(scope.row.rid)">编辑</el-button>
					 <el-button type="text" size="small" @click="delSeller(scope.row.rid)">删除</el-button>

		        </template>
		      </el-table-column>
		    </el-table>
			</div>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  <el-dialog title="添加商家信息" :visible.sync="dialogSellerinfo" width="350px">
			  <component :is="sellerinfo" :sellerID="sellerID" @dialogSellerinfoToggle="dialogSellerinfoToggle"></component>
		  </el-dialog>
	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import {Form,FormItem,Input,Table,TableColumn,Dialog} from 'element-ui'
	export default({
		name:'SellerList',
		components:{
			Pagination,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Dialog.name]:Dialog,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn
		},
		data(){
			return{
				fromSeller:{
					name:'',
					contact:''
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				tableData:[],
				loading:false,
				sellerinfo:null,
				dialogSellerinfo:false,
				sellerID:''
			}
		},
		created() {
			this.search()
		},
		methods:{
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
				let {name,contact}=this.fromSeller;
				this.$api.getHzsjList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"sjname": name,
					"sjlxfs": contact
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//设置商家信息
			setSellerInfo(rid=''){
				this.sellerID=rid;
				this.dialogSellerinfo=true;
				if(this.sellerinfo==null){
					this.sellerinfo=()=>import('@/components/Seller/index.vue');
				}
			},
			//删除商家
			delSeller(rid){
				this.$alert('确认要删除选中的商家账号吗?', '删除提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(()=>{
					this.$api.delHZSJ({rids:rid}).then(res=>{
						if(res>0){
							this.$message.success('删除成功!')
							// this.search()
							this.tableData=this.tableData.filter(n=>n.rid!=rid);
						}else{
							this.$message.warning('删除失败,可能原因：该商家已操作过相关订单信息将无法删除!')
						}
						
					}).catch(xhr=>{
						this.$message.warning('删除失败')
					})
					
				}).catch(()=>{
					
				})
			},
			dialogSellerinfoToggle(type=false){
				this.dialogSellerinfo=false;
				if(type) this.search()
			}
		}
	})
</script>

<style>
</style>
