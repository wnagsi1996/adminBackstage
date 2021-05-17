<template>
	<div>
		<div class="tableMag">
			<!-- 表格数据 -->
			<el-table :data="tableData" border stripe show-summary v-loading="loading" style="width: 100%" @expand-change="tableChildren">
				<el-table-column type="expand" lazy>
					<TableChildren :childrenOrderNo="childrenOrderNo" />
				</el-table-column>
				<el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
			    <el-table-column prop="orderno" label="订单号" min-width="6%">
					 <template slot-scope="scope">
						 <copyorderno :orderno="scope.row.orderno" />  
					 </template>
				 </el-table-column>
				 <el-table-column prop="pimg" label="图片" min-width="3%">
					 <template slot-scope="scope">
						<a :href="scope.row.purl" target='_blank'>
							 <el-popover placement="right" width="200" trigger="hover" :content="scope.row.ptitle">
								<img slot="reference" :src="scope.row.pimg" style="width: 50px;" />
							</el-popover>
						</a>
					 </template>
				 </el-table-column>
			    <el-table-column prop="cpnum" label="订单总数" min-width="6%" />
			    <el-table-column prop="lpnum" label="留评单数" min-width="5%" />
				 <el-table-column prop="mpnum" label="免评单数" min-width="5%" />
				 <el-table-column prop="successNum" label="已完成单数" min-width="5%" />
				 <el-table-column prop="ylpnum" label="已留评单数" min-width="5%" />
				 <el-table-column prop="skmoney" label="应收金额" min-width="5%" />
				 <el-table-column prop="fkmoney" label="已返款金额" min-width="5%" />
				 <el-table-column prop="ztstr" label="订单状态" min-width="8%" />
			    <el-table-column fixed="right" label="操作" min-width="7%" >
			      <template slot-scope="scope">
					  <template v-if="scope.row.zt == '0' || scope.row.zt == '3'">
						  <el-button @click="setProduct(scope.row.orderno,1)" type="text" size="small">修改下单要求</el-button>
				      </template>
					<el-button @click="send(scope.row.orderno)" type="text" size="small">一键放单</el-button>
					<el-button @click="handleLogClick(scope.row)" type="text" size="small">查看详情</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  <!-- 日志 -->
		  <component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick" />
		  <!-- 弹出框 -->
		  <el-dialog :title="dialogAddProduct.title" :visible.sync="dialogAddProduct.toggle" :width="dialogAddProduct.width">
			  <component :is="dialogAddProduct.dialogContent" :orderno="puborderno" :dataObj="dialogAddProduct.dataObj"  @dialogToggle="dialogToggle" ></component>
		  </el-dialog>
	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	//import AddProductItem from "@/components/AddProduct/AddProductItem.vue"  //添加/编辑产品
	import TableChildren from "@/components/AddProduct/TableChildren.vue"   //子表格
	import {Table,TableColumn,Dialog,Popover} from 'element-ui'
	export default({
		name:'WaitingOrder',
		components:{
			Pagination,
			copyorderno,
			//AddProductItem,
			TableChildren,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Dialog.name]:Dialog,
			[Popover.name]:Popover
		},
		data(){
			return{
				orderno:'',
				tableData:[],  //产品表格数据
				tableDataChildren:[],   //子表格数据
				childrenOrderNo:'',  //子表格订单号
				puborderno:'',  //公共订单号（各个弹出框使用）
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:true,   //表格加载
				orderInfo:new Object ,//订单数据
				log:null  ,   //放日志组件
				logorderno:""  ,  //给日志组件传的单号
				batchsendcom:null, //一键退单组件
				logshow:false   ,//控制日志组件显示隐藏
				//弹出框
				dialogAddProduct:{
					'toggle':false,
					'title':'',
					'width':'',
					'dataObj':{},    //传状态/汇率/客户订单
					dialogContent:null //弹出框放的内容
				},
				addProductItem:null ,//添加/编辑产品
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
				let {current,size}=this.pagination;
				this.$api.getCPOrderList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"toporderno": ''
				}).then(res=>{
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//打开子表格
			tableChildren(row){
				this.childrenOrderNo=row.orderno;
			},
			//添加/编辑产品
			setProduct(orderno='',title=0){
				let state=this.orderInfo.state;
				let orderState='',ptitle='';
				this.puborderno=orderno;
				if(title==0){
					ptitle='添加产品';
					if(state=='0'|| state=='3'){
						orderState=1; //正常添加1  追加产品0
					}else{
						orderState=0; //正常添加1  追加产品0
					}
				}else{
					ptitle='编辑产品';
				}
				let addProductItem=this.addProductItem;
				if(addProductItem==null){
					addProductItem=this.addProductItem=()=>import('@/components/AddProduct/AddProductItem.vue')
				}
				let obj={
					title:ptitle,
					toggle:true,
					width:'70%',
					dialogContent:addProductItem
				};
				
				Object.assign(this.dialogAddProduct,obj);
				Object.assign(this.dialogAddProduct.dataObj,{orderState});
			},
			//显示订单详细/日志
			handleLogClick(row) {
				if(this.logshow){
					this.logshow=false;
				}else{
					this.logorderno=row.orderno;
					this.logshow=true;
					if(this.log==null){
						this.log=() => import('@/components/Log/productDesc.vue');
					}
				}
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			},
			//关闭弹出框
			dialogToggle(type=false){
				let obj={
					width:'',
					title:'',
					toggle:false,
					dataObj:{},
					dialogContent:null
				}
				Object.assign(this.dialogAddProduct,obj);
				this.puborderno='';
				if(type) this.search();
			},
			//一键放单
			send(orderno){
				this.$api.getKeyWordCanFDNum({orderno}).then(res=>{
					//console.log(res);
					if(res.results==0){
						this.$message.warning('没有可放单的订单')
					}else{
						this.puborderno=orderno;
						let batchsendcom=this.batchsendcom
						if(batchsendcom==null){
							batchsendcom=this.batchsendcom=()=>import('@/components/AddProduct/BatchSend.vue')
						}
						let obj={
							toggle:true,
							width:'600px',
							title:'一键放单',
							dialogContent:batchsendcom,
							dataObj:res.rows
						}
						Object.assign(this.dialogAddProduct,obj)
					}
				}).catch(xhr=>{
					console.log(xhr);
				})
			}
		}
	})
</script>

<style scoped>
	.order-info{float: right;}
	.order-info-desc p{margin: 15px 0;}
	.order-info-desc p span{width:100px;font-weight: bold;padding-right: 5px;display: inline-block;}
</style>
