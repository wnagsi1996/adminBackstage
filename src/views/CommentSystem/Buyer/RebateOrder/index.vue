<template>
	<div>
		<!-- 搜索条件  -待返款订单-->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="购买单号">
		    <el-input v-model="fromorder.xdorderno" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="订单类别">
		    <el-select v-model="fromorder.orderType" placeholder="">
		      <el-option v-for="(item,index) in orderType" :key="index" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderStaus" placeholder="">
		      <el-option label="全部" value="4,8,12"></el-option>
		      <el-option v-for="(item,index) in orderState" :key="index" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="去向中介">
		    <el-select v-model="fromorder.agent" placeholder="" @focus="getAgent">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option v-for="item in buyerAgentList" :label="item.name" :key="item.rid" :value="item.rid"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="去向个人">
		    <el-input v-model="fromorder.txtbuyer" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="接单时间">
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
		<div class="tableMag">
			<el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
			    <el-table-column prop="orderno" label="订单号" min-width="6%">
					 <template slot-scope="scope">
						 <copyorderno :orderno="scope.row.orderno" />  
					 </template>
				 </el-table-column>
				 <el-table-column prop="pimg" label="图片" min-width="3%">
					 <template slot-scope="scope">
						<a :href="scope.row.ProductUrl" target='_blank'>
							 <el-popover placement="right" width="200" trigger="hover" :content="scope.row.ProductTitle">
								<img slot="reference" :src="scope.row.ProductImgUrl" style="width: 50px;" />
							</el-popover>
						</a>
					 </template>
				 </el-table-column>
			    <el-table-column prop="price" label="客单价" min-width="4%" />
			    <!-- <el-table-column prop="producttype" label="类别" min-width="5%" /> -->
			    <el-table-column prop="mjusername" label="放单人员" min-width="5%" />
			    <el-table-column prop="ztstr" label="订单状态" min-width="5%" />
			    <el-table-column prop="ordertypestr" label="订单类别" min-width="6%" />
				 <el-table-column prop="zjname" label="去向（中介或个人）" min-width="5%" />
				 <el-table-column prop="fktype" label="返款渠道" min-width="5%" >
					 <template slot-scope="scope">
						 <p v-if="scope.row.fktype==0">微信</p>
						 <p v-else-if="scope.row.fktype==1">支付宝</p>
						 <p v-else-if="scope.row.fktype==2">银行转账</p>
						 <p v-else-if="scope.row.fktype==3">PayPal</p>
					 </template>
			     </el-table-column>
				 <el-table-column prop="fkaccount" label="返款账号" min-width="5%">
				  <template slot-scope="scope">
				 	 <div v-if="scope.row.fkaccountQRCodeUrl!=''">
				 		 <span>{{scope.row.fkaccount}}</span>
				 		 <i class="el-icon-picture-outline" @click="showImg(scope.row.fkaccountQRCodeUrl)"></i>
				 	 </div>
				 	 <div v-else>{{scope.row.fkaccount}}</div>
				  </template>
				 </el-table-column>
				 <el-table-column prop="realprice" label="买家提供价格" min-width="5%" />
				 <el-table-column prop="realproductdj_mj" label="卖家核实价格" min-width="5%" />
				 <el-table-column prop="jddate" label="接单时间" min-width="8%" />
				 <el-table-column prop="xdOrderno" label="购买单号" min-width="5%" />
			    <el-table-column fixed="right" label="操作" min-width="5%" >
			      <template slot-scope="scope">
			        <el-button v-if="scope.row.zt!='8'" @click="rebate(scope.row.orderno,scope.row.zt,scope.row.realproductdj_mj)" type="text" size="small">提交返款</el-button>
					<el-button @click="handleLogClick(scope.row.orderno)" type="text" size="small">查看详情</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		  
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />

		  <!-- 公共弹窗组件 -->
		  <el-dialog :title="dialog.title" :visible.sync="dialog.Visible" :width="dialog.width"  >
			  <component :is="dialog.dialogComponent" :orderno="orderno" :Rebatedata="Rebatedata" @dialogToggle="dialogToggle"/>
		  </el-dialog>
		  
		  <!-- 日志 -->
		  <component :is="log" :logorderno="logorderno" :logshow="logshow" @handleLogClick="handleLogClick" />

	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {Dialog,Table,TableColumn,Form,FormItem,Row,Col,DatePicker,Option,Input,Select,Popover} from 'element-ui'
	import {mapGetters,mapActions} from 'vuex'
	import {orderType,orderState} from '@/assets/js/orderState.js'
	let statenNum=['4','8','12'];
	export default({
		name:'RebateOrder',
		components:{
			Pagination,
			copyorderno,
			[Dialog.name]:Dialog,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Row.name]:Row,
			[Col.name]:Col,
			[DatePicker.name]:DatePicker,
			[Option.name]:Option,
			[Input.name]:Input,
			[Select.name]:Select,
			[Popover.name]:Popover
		},
		data(){
			return{
				//搜索内容
				fromorder:{
					OrderNo:'',
					xdorderno:'',
					orderType:'-1',
					orderStaus:'4,8,12',
					agent:'-1',
					txtbuyer:'',
					date1:'',
					date2:''
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				//弹出框配置
				dialog:{
					title:'',
					Visible:false,
					width:'',
					dialogComponent:null
				},
				tableData:[], //表格数据
				log:null  ,   //放日志组件
				logorderno:""  ,  //给日志组件传的单号
				logshow:false   ,//控制日志组件显示隐藏
				loading:true,
				agentdata:[],  //中介数据
				Rebatecom:null,  //提交返款组件
				dialogVisible:false,
				orderno:'',
				Rebatedata:{},
				orderType,
				orderState:orderState.filter(n=>statenNum.includes(n.value))
			}
		},
		computed:{
			...mapGetters([
				'buyerAgentList'
			])
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
				let {OrderNo,xdorderno,agent,orderType,date1,date2,txtbuyer,orderStaus}=this.fromorder;
				let {size,current}=this.pagination
				this.$api.getCPOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"xdorderno":xdorderno,
					"zjID": agent,
					"iflp": orderType,
					"sjs":date1,
					"sje": date2,
					"buyer": txtbuyer,
					"state": orderStaus
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//隐藏弹出框
			dialogToggle(type){
				this.dialog={
					title:'',
					Visible:false,
					width:''
				}
				if(type) this.search();
			},
			//获取中介列表
			getAgent(){
				if(this.buyerAgentList.length==0){
					this.getBuyerAgentList()
				}
			},
			//提交返款
			rebate(orderno,state,usmoney){
				
				this.$api.getCPOrderDetailXDInfo({orderno}).then(res=>{console.log(res)
					if(res!=''){
						if(res.fkimgurl=='' && res.fkaccount==''){  //返款二维码或者账户都为空直接弹出
							this.Rebatedata={usmoney};
							this.rebateshow(orderno);
						}else{
							this.Rebatedata={
								fktype: res.fktype,
								fkaccount:res.fkaccount,
								fkremark:res.fkremark,
								fkimgurl:res.fkimgurl,
								usmoney
							}
							 if(state=='12'){  //返款被驳回也是直接弹出
								//this.Rebatedata=res;
								this.rebateshow(orderno);
							}else{
								this.$api.comitProductFK({
									orderno,
									"remark":res.fkremark,
									"skaccount":res.fkaccount,
									"oldfkimgurl":'',
									"sktype":res.fktype,
									realproductfkmoney:usmoney,
									"_img64":res.fkimgurl
								}).then(resstr=>{
									//console.log(resstr);
									if(resstr.rescode>0){
										this.$message.success('提交成功!')
									}else{
										this.$message.warning('提交失败!')
									}
								}).catch(xhr=>{
									this.$message.warning('提交失败!')
								})
							}
						}
					}
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//弹出返款的组件
			rebateshow(orderno){
				this.orderno=orderno;
				let Rebatecom=this.Rebatecom
				if(Rebatecom==null){
					Rebatecom=this.Rebatecom=() => import('@/components/Rebate');
				}
				this.dialog={
					title:'返款',
					Visible:true,
					width:'500px',
					dialogComponent:Rebatecom
				}
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
			//显示返款二维码
			showImg(imgsrc){
				this.$alert('<img style="width:300px" src='+imgsrc+' />', {
				  dangerouslyUseHTMLString: true,
				  showConfirmButton:false
				}).then(()=>{
					
				}).catch(()=>{
					
				});
			},
			...mapActions([
				'getBuyerAgentList'
			])
		}
	})
</script>

<style>
</style>
