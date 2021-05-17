<template>
	<div>
		 <!-- 搜索条件 -->
		 <el-form :inline="true" :model="fromorder" class="demo-form-inline">
		   <el-form-item label="订单号">
		     <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		   </el-form-item>
		   <el-form-item label="放单人员">
		     <el-select v-model="fromorder.fduser" @focus="getFdUserList">
			 <el-option label="全部" value="0"></el-option>
			   <el-option v-for="user in sellerUserList" :label="user.username" :key="user.userid" :value="user.userid"></el-option>
			 </el-select>
		   </el-form-item>
		   <el-form-item label="接单人员">
		     <el-select v-model="fromorder.jduser" @focus="getJdUserList">
				<el-option label="全部" value="0"></el-option>
		        <el-option v-for="user in buyerUserList" :label="user.username" :key="user.userid" :value="user.userid"></el-option>
		     </el-select>
		   </el-form-item>
		   <el-form-item label="订单类型">
		     <el-select v-model="fromorder.orderTyoe" placeholder="">
		       <el-option label="全部" value="-1"></el-option>
		       <el-option label="留评" value="1"></el-option>
		       <el-option label="免评" value="0"></el-option>
		     </el-select>
		   </el-form-item>
		   <el-form-item label="留评状态">
		     <el-select v-model="fromorder.reviewStatus" placeholder="">
		       <el-option label="全部" value="-1"></el-option>
		       <el-option label="已留评" value="1"></el-option>
		       <el-option label="未留评" value="0"></el-option>
		     </el-select>
		   </el-form-item>
		   <el-form-item label="订单状态">
		     <el-select v-model="fromorder.orderStaus" placeholder="">
				 <!--订单状态码：'',0,1,2,3,4,5,8,9,10,11,12-->
		       <el-option v-for="(item,index) in orderState" :key="index" :label="item.text" :value="item.value"></el-option>
		     </el-select>
		   </el-form-item>
		   <el-form-item label="购买单号">
		     <el-input v-model="fromorder.buyOrderNo" placeholder=""></el-input>
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
		 
		 <!-- 表格数据 -->
		   <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
		       <el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
		       <el-table-column prop="orderno" label="订单号" min-width="6%">
		   		 <template slot-scope="scope">
		   			 <copyorderno :orderno="scope.row.orderno" />  
		   		 </template>
		   	 </el-table-column>
		       <el-table-column prop="ProductImgUrl" label="图片" min-width="3%">
		   		 <template slot-scope="scope">
		   			<a :href="scope.row.ProductUrl" target='_blank'>
		   				 <el-popover placement="right" width="200" trigger="hover" :content="scope.row.ProductTitle">
		   					<img slot="reference" :src="scope.row.ProductImgUrl" style="width: 50px;" />
		   				</el-popover>
		   			</a>
		   		 </template>
		   	 </el-table-column>
		       <el-table-column prop="price" label="客单价" min-width="3%" />
		       <el-table-column prop="ztstr" label="订单状态" min-width="5%" />
		       <el-table-column prop="cjsj" label="创建时间" min-width="6%" />
		   		 <el-table-column prop="mjusername" label="放单人员" min-width="5%" />
		   		 <el-table-column prop="fddate" label="放单时间" min-width="6%" />
		   		 <el-table-column prop="jduser" label="接单人员" min-width="5%" />
		   		 <el-table-column prop="jddate" label="接单时间" min-width="6%" />
		   		 <el-table-column prop="xdOrderno" label="购买单号" min-width="8%" />
		       <el-table-column fixed="right" label="操作" min-width="7%" >
		         <template slot-scope="scope">
		           <el-button @click="handleLogClick(scope.row.orderno)" type="text" size="small">查看详情</el-button>
		   			 <el-button v-if="scope.row.zt==='4' || scope.row.zt==='12'" @click="modifystatus(scope.row.orderno)" type="text" size="small">修改状态</el-button>
		         </template>
		       </el-table-column>
		     </el-table>
		   <!-- 分页 -->
		   <Pagination class="pagination" @search="search" :pagination="pagination" />
		   <!-- 日志 -->
		   <component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick"></component>
		   
	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Form,formItem,Input,Select,Option,Table,TableColumn,Button,Row,Col,DatePicker,Popover} from 'element-ui'
	import {mapGetters,mapActions} from 'vuex'
	import {orderState} from '@/assets/js/orderState.js'  //引入订单状态
	export default({
		name:'AllOrder',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[formItem.name]:formItem,
			[Input.name]:Input,
			[Select.name]:Select,
			[Option.name]:Option,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Button.name]:Button,
			[Row.name]:Row,
			[Col.name]:Col,
			[Popover.name]:Popover,
			[DatePicker.name]:DatePicker
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					fduser:'0',
					jduser:'0',
					orderTyoe:'-1',
					reviewStatus:'-1',
					orderStaus:' ',
					buyOrderNo:'',
					date1:'',
					date2:''
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				tableData:[], //表格数据
				loading:true  ,//表格加载
				log:null  ,   //放日志组件
				logorderno:""  ,  //给日志组件传的单号
				logshow:false   ,//控制日志组件显示隐藏
				orderState:orderState  //订单状态
			}
		},
		computed:{
			...mapGetters([
				'sellerUserList',
				'buyerUserList'
			])
		},
		created() {
			this.search();
		},
		methods:{
			//获取接单成员列表
			getJdUserList(){
				if(this.buyerUserList.length==0){
					this.getBuyerUserList()
				}
			},
			//获取放单成员列表
			getFdUserList(){
				if(this.sellerUserList.length=="0"){
					this.getSellerUserList()
				}
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
				let {OrderNo,orderTyoe,orderStaus,buyOrderNo,date1,date2,jduser,fduser,reviewStatus}=this.fromorder;
				this.$api.getCPOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"iflp": orderTyoe,
					"state": orderStaus,
					"xdorderno": buyOrderNo,
					"sjs":date1,
					"sje": date2,
					"mjuserid":jduser,
					"mmjuserid": fduser,
					"lpstate":reviewStatus
				}).then(res=>{
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
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
			//弹出确认订单修改
			modifystatus(orderno){
				this.$alert('您确认要把该订单状态改成【已接单】状态？', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(()=>{
					this.orderstatus(orderno)
				});
			},
			// 修改订单状态
			orderstatus(orderno){
				this.$api.resetCPOrderDetailState({orderno}).then(res=>{
					if(res=="0"){
						this.$message.warning('修改失败')
					}else{
						this.$message.success('修改成功')
						this.tableData.forEach((n,i)=>{
							if(n.orderno==orderno){
								Object.assign(this.tableData[i],{ztstr:'已接单',zt:'2'});
							}
						})
					}
				}).catch(err=>{
					this.$message.warning('修改失败')
				})
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			},
			...mapActions([
				'getSellerUserList',
				'getBuyerUserList'
			])
		}
	})
</script>

<style scoped>
</style>
