<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
			<el-form-item label="客户名称">
			  <el-input v-model="fromorder.username" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="客户联系方式">
			  <el-input v-model="fromorder.contact" placeholder=""></el-input>
			</el-form-item>
		  <el-form-item label="卖家端成员" >
			  <el-select v-model="fromorder.name" @focus="hankName">
				<el-option  label="全部" value="0"></el-option>
				<el-option v-for="item in sellerUserList" :label="item.username" :value="item.userid" :key="item.userid" :loading="userloading"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<div class="tableMag">
		<!-- 表格数据 -->
		  <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
		     <el-table-column prop="rid" label="客户ID" min-width="4%" />
		      <el-table-column prop="sjname" label="客户名称" min-width="4%" />
		  	  <el-table-column prop="SJLXR" label="客户联系人" min-width="6%" />
		  	  <el-table-column prop="SJLXFS" label="客户联系方式" min-width="5%" />
		  	  <el-table-column prop="sjcjsj" label="创建时间" min-width="5%" />
		  	  <el-table-column prop="mjusername" label="归属卖家端" min-width="5%" />
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
		  
		  <el-dialog title="编辑商家信息" :visible.sync="dialogSellerinfo" width="350px">
		  	 <component :is="sellerinfo" :sellerID="sellerID" @dialogSellerinfoToggle="search"></component>
		  </el-dialog>

	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Form,FormItem,Table,TableColumn,Button,Dialog,Option,Select,Input} from 'element-ui'
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'Business',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Table.name]:Table,
			[Dialog.name]:Dialog,
			[Option.name]:Option,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option,
			[TableColumn.name]:TableColumn,
			[Button.name]:Button
		},
		data(){
			return{
				fromorder:{
					username:'',
					contact:'',
					name:'0'
				},
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:true,
				userloading:true,
				sellerinfo:null,
				dialogSellerinfo:false,
				sellerID:''
			}
		},
		computed:{
			...mapGetters([
				'sellerUserList'  //卖家端用户
			])
		},
		created() {
			this.search();
		},
		methods:{
			search(valdata=[]){
				this.dialogSellerinfo=false;
				if(valdata.length!=0){
					if(valdata[0]=="current"){
						this.pagination.current=valdata[1];
					}else if(valdata[0]=="size"){
						this.pagination.size=valdata[1];
					}
				}
				this.loading=true;
				let {username,contact,name}=this.fromorder;
				let {size,current}=this.pagination;
				this.$api.getHZBusinessList({
					"pageSize": size,    //页面大小
					"pageNum":current-1,   //页码
					"sjname":username,
					"sjlxfs":contact,
					"mjuserid":name
				}).then(res=>{
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
				if(this.sellerUserList.length==0){
					this.userloading=true;
					this.getSellerUserList().then(()=> {this.userloading=false;})
				}
			},
			//显示返款二维码
			showImg(imgsrc){
				this.$alert('<img style="width:300px" src="imgsrc" />', {
				  dangerouslyUseHTMLString: true,
				  showConfirmButton:false
				});
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
							this.tableData=this.tableData.filter(n=>n.rid!=rid)
						}else{
							this.$message.warning('删除失败,可能原因：该员工已操作过相关订单信息将无法删除!')
						}
					}).catch(err=>{
						this.$message.warning('删除失败!')
					})
				}).catch(err=>{
					this.$message.warning('删除失败!')
				})
			},
			...mapActions([
				'getSellerUserList'  //获取卖家端用户数据
			])
		}
	})
</script>

<style>
</style>
