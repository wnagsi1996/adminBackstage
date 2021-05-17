<template>
	<div>
		<el-button type="primary" @click="withdraw" :loading="loading">批量撤回</el-button>
		<div class="tableMag">
			<el-table :data="tableDataChildren" border stripe v-loading="loadingChildren" @selection-change="changeFun" style="width: 100%">
				<template slot-scope="scope">
					  <el-table-column type="selection" width="55" :selectable="checkboxT" disabled="true" @selection-change="changeFun" />
						<el-table-column label="序号" type="index" :index="indexMethod" min-width="5%" />
						<el-table-column prop="orderno" label="订单号" min-width="6%">
							 <template slot-scope="scope">
								 <copyorderno :orderno="scope.row.orderno" />  
							 </template>
						 </el-table-column>
						<el-table-column prop="price" label="客单价" min-width="5%" />
						 <el-table-column prop="ztstr" label="订单状态" min-width="4%" />
						 <el-table-column prop="ordertypestr" label="订单类别" min-width="4%" />
						 <el-table-column prop="jduser" label="接单人员" min-width="4%" />
						 <el-table-column prop="plantfddate" label="计划放单时间" min-width="7%" />
						 <el-table-column prop="fddate" label="实际放单时间" min-width="7%" />
						 <el-table-column prop="jddate" label="接单时间" min-width="7%" />
						 <el-table-column prop="xdOrderno" label="购买单号" min-width="7%" />
						 <el-table-column fixed="right" label="操作" min-width="7%" >
						   <template slot-scope="scope">
							   <template v-if="scope.row.zt=='0'">
								   <el-button @click="edit(scope.row.orderno)" type="text" size="small">放单</el-button>
								   <el-button @click="backOrder(scope.row.orderno)" type="text" size="small">退单</el-button>
								   <el-button @click="setFDdate(scope.row.orderno)" type="text" size="small">设定放单时间</el-button>
							   </template>
							   <el-button  v-if="scope.row.zt=='1'" @click="recall(scope.row.orderno)" type="text" size="small">撤回放单</el-button>
							   <el-button @click="handleLogClick(scope.row.orderno)" type="text" size="small">查看详情</el-button>
							</template>
						 </el-table-column>
				</template>
			</el-table>
		</div>
		<!-- 日志 -->
		<component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick"></component>
		
		<!-- 分页 -->
		<Pagination class="pagination" @search="search" :pagination="pagination" />
		
		<!-- 弹出框 -->
		<el-dialog :title="dialogAddProduct.title" :visible.sync="dialogAddProduct.toggle" :width="dialogAddProduct.width" :modal-append-to-body="false" >
			 <component :is="dialogAddProduct.dialogContent" :orderno="puborderno" @dialogToggle="dialogToggle" ></component>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Table,TableColumn,Dialog} from 'element-ui'
	export default({
		name:'TableChildren',
		components:{
			Pagination,
			copyorderno,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Dialog.name]:Dialog
		},
		props:{
			childrenOrderNo:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				tableDataChildren:[],
				loadingChildren:true,
				loading:false,
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				//弹出框
				dialogAddProduct:{
					'toggle':false,
					'title':'',
					'width':'',
					dialogContent:null //弹出框放的内容
				},
				puborderno:'',
				setdatecom:null,
				editordercom:null,
				backOrderItem:null,
				log:null  ,   //放日志组件
				logorderno:""  ,  //给日志组件传的单号
				logshow:false   ,//控制日志组件显示隐藏
				multipleSelection:[]  //选择数据
			}
		},
		created() {
			this.search();
		},
		methods:{
			//表格数据
			search(valdata=[]){
				//判断是否是分页传过来的参数
				if(valdata.length!=0){
					if(valdata[0]=="current"){
						this.pagination.current=valdata[1];
					}else if(valdata[0]=="size"){
						this.pagination.size=valdata[1];
					}
				}
				this.loadingChildren=true;
				let {size,current}=this.pagination;
				this.$api.getCPOrderDetailListByCpOrderno({
					"pageSize": size,       //页面大小
					"pageNum":current-1,   //页码
					"orderno": this.childrenOrderNo
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableDataChildren=res.rows;
					this.loadingChildren=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//显示订单详细/日志
			handleLogClick(orderno) {
				if(this.logshow){
					this.logshow=false;
				}else{
					this.logorderno=orderno;
					this.logshow=true;
					if(this.log==null){
						this.log=() => import('@/components/Log/LogDesc.vue');
					}
				}
			},
			//撤回放单
			recall(orderno){
				this.$api.cancelFDCPOrderDetail({orderno}).then(res=>{
					if(res>0){
						this.$message.success('撤回成功!')
						this.search();
					}else{
						this.$message.warning('撤回失败!')
					}
				}).catch(xhr=>{
					console.log(xhr);
					this.$message.warning('撤回失败!')
				})
			},
			//退单
			backOrder(orderno){
				this.puborderno=orderno;
				let backOrderItem=this.backOrderItem
				if(backOrderItem==null){
					backOrderItem=this.backOrderItem=()=>import('@/components/AddProduct/BackOrder.vue')
				}
				this.dialogAddProduct={
					width:'50%',
					title:'追加订单',
					toggle:true,
					dialogContent:backOrderItem
				}
			},
			//放单
			edit(orderno){
				this.puborderno=orderno;
				let editordercom=this.editordercom
				if(editordercom==null){
					editordercom=this.editordercom=()=>import('@/components/AddProduct/EditOrder.vue')
				}
				this.dialogAddProduct={
					width:'50%',
					title:'放单',
					toggle:true,
					dialogContent:editordercom
				}
			},
			//设置放单时间
			setFDdate(orderno){
				this.puborderno=orderno;
				let setdatecom=this.setdatecom
				if(setdatecom==null){
					setdatecom=this.setdatecom=()=>import('@/components/AddProduct/SetDate.vue')
				}
				this.dialogAddProduct={
					width:'400px',
					title:'设置放单时间',
					toggle:true,
					dialogContent:setdatecom
				}
			},
			//关闭弹出框
			dialogToggle(type=false){
				this.dialogAddProduct={
					width:'',
					title:'',
					toggle:false,
					dialogContent:null
				}
				this.puborderno='';
				if(type) this.search();
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			},
			//获取选中
			changeFun (val) {
			  this.multipleSelection = val // 返回的是选中的列的数组集合
			},
			//批量撤回
			withdraw(){
				let arr=[]
				this.multipleSelection.filter(item=>{
					return arr.push(item.rid);
				})
				let arrStr=arr.toString();
				if(arrStr==''){
					this.$message.warning('请选择批量数据!')
				}else{
					this.loading=true;
					this.$api.cancelFDCPOrderDetail_PL({rids:arrStr}).then(res=>{
						if(res>0){
							this.$message.success('撤回成功!')
							this.search();
						}else{
							this.$message.warning('撤回失败!')
						}
						this.loading=false;
					}).catch(xhr=>{
						this.$message.warning('撤回失败!')
						this.loading=false;
					})
				}
			},
			//多选是否能选择
			checkboxT(row,index){
				//console.log(row);
				if(row.zt=='1'){
					return true
				}else{
					return false
				}
			}
		}
	})
</script>

<style>
</style>
