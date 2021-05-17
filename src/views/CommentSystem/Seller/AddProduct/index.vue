<template>
	<div>
		<div>
			<el-button type="primary"  @click="setProduct()">添加产品</el-button>
			<el-button v-if="orderInfo.state=='0'||orderInfo.state=='3'" type="primary" @click="review">提交财务审核</el-button>
				<el-popover placement="left" width="400" trigger="click">
				  <div class="order-info-desc">
					  <p><span>客户:</span>{{orderInfo.sjname}}</p>
					  <p><span>订单号:</span>{{orderInfo.orderno}}</p>
					  <p><span>支付方式:</span>{{orderInfo.sktype}}</p>
					  <p><span>支付选择:</span>{{orderInfo.sktypeinfo}}</p>
					  <p><span>汇率:</span>{{orderInfo.RMB2US}}</p>
					  <p><span>订单状态:</span>{{orderInfo.ddzt}}</p>
					  <p><span>客户联系方式:</span>{{orderInfo.sjlxfs}}</p>
				  </div>
				<el-button  slot="reference" class="order-info" size="small">订单信息</el-button>
				</el-popover>
		</div>
		<div class="tableMag">
			<!-- 表格数据 -->
			<el-table :data="tableData" border stripe show-summary v-loading="loading" style="width: 100%" @expand-change="tableChildren">
				<el-table-column type="expand" lazy>
					<!-- <TableChildren :childrenOrderNo="childrenOrderNo" /> -->
					<component :is="tableChildrenCom" :childrenOrderNo="childrenOrderNo"></component>
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
						  <el-button @click="setProduct(scope.row.orderno,1)" type="text" size="small">编辑</el-button>
						  <el-button @click="delOrder(scope.row.orderno)" type="text" size="small">删除</el-button>
						  <el-button v-if="scope.row.addflag==1" @click="delOrder(scope.row.orderno)" type="text" size="small">被拒原因</el-button>
				      </template>
					  <template v-if="scope.row.zt == '2'">
						  <el-button @click="appendOrder(scope.row.orderno)" type="text" size="small">追加订单</el-button>
						  <el-button @click="backOrder(scope.row.orderno)" type="text" size="small">退单</el-button>
						  <el-button @click="comments(scope.row.orderno)" type="text" size="small">更改留评/免评</el-button>
						  <el-button @click="send(scope.row.orderno)" type="text" size="small">一键放单</el-button>
						  <!-- <el-button @click="withdraw(scope.row.orderno)" type="text" size="small">一键撤单</el-button> -->
					  </template>
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
	// import TableChildren from "@/components/AddProduct/TableChildren.vue"   //子表格
	import {Popover,Table,TableColumn,Dialog} from 'element-ui'
	export default({
		name:'AddProduct',
		components:{
			Pagination,
			copyorderno,
			//AddProductItem,
			// TableChildren,
			[Popover.name]:Popover,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Dialog.name]:Dialog
		},
		data(){
			return{
				orderno:this.$route.query.orderno,
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
				appendProduct:null  ,//追加订单
				backOrderItem:null  ,//退单
				commentsItem:null  ,//更改免留评单
				batchsendcom:null, //一键退单组件
				tableChildrenCom:null,//子表格组件
			}
		},
		beforeRouteEnter(to,from,next) {
			let orderno=to.query.orderno;
			if(orderno=='' || orderno==undefined){
				next('/clientOrder')
			}else{
				next()
			}
		},
		created() {
			this.getOrderInfo(this.orderno);
			this.search();
		},
		mounted(){
			this.tableChildrenCom=()=>import('@/components/AddProduct/TableChildren.vue');
		},
		methods:{
			// 获取订单信息
			getOrderInfo(orderno){
				this.$api.getCPTopOrderInfo({orderno}).then(res=>{
					if(res!=""){
						this.orderInfo=res;
						Object.assign(this.dialogAddProduct.dataObj,{
							rate:res.RMB2US,  //汇率
							orderno:res.orderno //客户订单
						});
					}
				}).catch(xhr=>{
					console.log(xhr);
				})
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
				let {size,current}=this.pagination;
				this.$api.getCPOrderList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"toporderno": this.orderno
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
			//退单
			backOrder(orderno){
				this.puborderno=orderno;
				let backOrderItem=this.backOrderItem
				if(backOrderItem==null){
					backOrderItem=this.backOrderItem=()=>import('@/components/AddProduct/BackOrder.vue')
				}
				let obj={
					toggle:true,
					width:'50%',
					title:'退单',
					dialogContent:backOrderItem
				}
				Object.assign(this.dialogAddProduct,obj);
			},
			//更改免留评单
			comments(orderno){
				this.puborderno=orderno;
				let commentsItem=this.commentsItem
				if(commentsItem==null){
					commentsItem=this.commentsItem=()=>import('@/components/AddProduct/Comments.vue')
				}
				let obj={
					toggle:true,
					width:'400px',
					title:'更改免留评单',
					dialogContent:commentsItem
				}
				Object.assign(this.dialogAddProduct,obj);
			},
			//提交财务审核
			review(){
				this.$prompt('您确认该订单测评产品已添加完成并要提交财务审核?', '提交提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  inputPlaceholder:'财务备注'
				}).then((txt)=>{
					let remark=txt.value==null?'':txt.value
					this.$api.comitTOPCPOrder({toporderno:this.orderno,remark}).then(res=>{
						//console.log(res);
						if(res.rescode>0){
							this.$message.success('提交成功!')
							this.search()
						}else{
							this.$message.warning(res.resdesc)
						}
					}).catch(xhr=>{
						this.$message.warning('提交失败!')
					})
				}).catch(()=>{
					
				})
			},
			//追加订单
			appendOrder(orderno){
				this.puborderno=orderno;
				let appendProduct=this.appendProduct
				if(this.appendProduct==null){
					appendProduct=this.appendProduct=()=>import('@/components/AddProduct/AppendProduct.vue')
				}
				let obj={
					toggle:true,
					width:'50%',
					title:'追加订单',
					dialogContent:appendProduct
				}
				Object.assign(this.dialogAddProduct,obj);
			},
			//删除订单
			delOrder(orderno){
				this.$confirm('此操作将永久该产品信息, 是否继续?', '删除提醒', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					let ordernos="'"+orderno+"'";
					this.$api.delCPOrder({ordernos}).then(res=>{
						//console.log(res);
						if(res>0){
							this.$message.success('删除成功!');
							this.tableData=this.tableData.filter(n=>n.orderno!=orderno)
						}else{
							this.$message.warning('删除失败!')
						}
					}).catch(xhr=>{
						this.$message.warning('删除失败!')
					})
				}).catch(() => {
					this.$message.warning('已取消删除!')       
				});
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
					toggle:false,
					width:'',
					title:'',
					dialogContent:''
				}
				Object.assign(this.dialogAddProduct,obj)
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
