<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="订单类别">
		    <el-select v-model="fromorder.channel" placeholder="">
		     <el-option v-for="item in orderCategory" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="货币类型">
		    <el-select v-model="fromorder.currency" placeholder="">
		      <el-option v-for="item in currencyType" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderStaus" placeholder="">
		      <el-option v-for="item in cwOrderState" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单类型">
		    <el-select v-model="fromorder.orderType" placeholder="">
				<!-- 订单类型码:'',0,3,4,5,6,7,8,9 -->
		      <el-option v-for="(item,index) in cwOrderType" :key="index" :label="item.text" :value="item.value"></el-option>
		    </el-select>
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
		<div class="tableMag">
			<el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
			    <el-table-column prop="orderno" label="订单号" min-width="6%">
					 <template slot-scope="scope">
						 <copyorderno :orderno="scope.row.orderno" />  
					 </template>
				 </el-table-column>
				 <el-table-column prop="bustypestr" label="订单类型" min-width="5%" />
			    <el-table-column prop="rattypestr" label="渠道" min-width="5%" />
			    <el-table-column prop="currencystr" label="货币" min-width="4%" />
				<el-table-column prop="rat" label="支出账号" min-width="7%">
				 <template slot-scope="scope">
					 <div v-if="scope.row.receiveAccountQRCodeUrl!=''">
						 <span>{{scope.row.rat}}</span>
						 <i class="el-icon-picture-outline" @click="showImg(scope.row.receiveAccountQRCodeUrl)"></i>
					 </div>
					 <div v-else>{{scope.row.rat}}</div>
				 </template>
				</el-table-column>
			    <el-table-column prop="ordermoney" label="金额" min-width="6%" >
					<template slot-scope="scope">
						<el-popover placement="right" width="200" trigger="hover"
						  :content="'原始金额' + scope.row.oldordermoney + '乘' + scope.row.usdrate + '得出来的金额'">
						   <el-button type="text" slot="reference">{{scope.row.ordermoney}} <i class="el-icon-chat-dot-round"></i></el-button>
						</el-popover>
					</template>
				 </el-table-column>
			    <el-table-column prop="realmoney" label="实际订单金额(人民币)" min-width="9%" />
				 <el-table-column prop="ztstr" label="订单状态" min-width="5%">
					 <template slot-scope="scope">
						 <template v-if="scope.row.shremark != '' || scope.row.fqremark != ''">
							 <el-popover placement="right" width="200" trigger="hover">
							   <div>
								   <div v-if="scope.row.fqremark != ''">
									   <h4>提交备注</h4>
									   <p>{{scope.row.fqremark}}</p>
								   </div>
								   
								   <div v-if="scope.row.shremark != ''">
									   <br/>
									   <h4>审核备注</h4>
									   <p>{{scope.row.shremark}}</p>
								   </div>
							   </div>
							    <el-button type="text" slot="reference">{{scope.row.ztstr}}</el-button>
						     </el-popover>
							 <i v-if="scope.row.fkimgurl!=''" class="el-icon-picture-outline fkIMG" @click="fkimg(scope.row.fkimgurl)"></i>
						 </template>
						 <template v-else>
							 <p>{{scope.row.ztstr}}
								<span v-if="scope.row.fkimgurl!=''" style="cursor: pointer;">
									<i class="el-icon-picture-outline" @click="fkimg(scope.row.fkimgurl)"></i>
								</span>
							 </p>
						 </template>
					 </template>
				 </el-table-column>
				 <el-table-column prop="fqdate" label="提交时间" min-width="8%" />
				 <el-table-column prop="shdate" label="处理时间" min-width="8%" />
			    <!-- <el-table-column fixed="right" label="操作" min-width="7%" >
			      <template slot-scope="scope">
						<el-switch v-if="scope.row.zt=='2'" v-model="scope.row.ifread" :active-value="1" :inactive-value="0" active-text="已读" inactive-text="未读" @change="cancel(scope.row.ifread,scope.row.orderno)"></el-switch>
				  </template>
			    </el-table-column> -->
			  </el-table>
		</div>
		
		<!-- 分页 -->
		<Pagination class="pagination" @search="search" :pagination="pagination" />
	</div>
</template>

<script>
	import {Form,Input,FormItem,Table,TableColumn,Select,Option,DatePicker,Popover,Switch,Col,Alert} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {cwOrderType,currencyType,cwOrderState,orderCategory} from '@/assets/js/orderState.js'  //引入订单状态/订单类型/货币类型/订单类别
	let orderStatenum=['-1','0','1','2']; //要显示得订单状态
	export default({
		name:'FinancialAuditTrail',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[Input.name]:Input,
			[FormItem.name]:FormItem,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Select.name]:Select,
			[Option.name]:Option,
			[DatePicker.name]:DatePicker,
			[Popover.name]:Popover,
			[Col.name]:Col,
			[Switch.name]:Switch,
			[Alert.name]:Alert
		},
		data(){
			return{
				fromorder:{
					OrderNo:'',
					channel:'-1',
					orderStaus:'-1',
					currency:'-1',
					orderType:'',
					date1:'',
					date2:''
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				tableData:[],
				loading:true,
				cwOrderType:cwOrderType ,//订单类型
				currencyType:currencyType  ,//货币类型
				cwOrderState:cwOrderState.filter(n=>orderStatenum.includes(n.value))  ,//订单状态
				orderCategory:orderCategory  //订单类别
			}
		},
		created() {
			this.search()
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
				let {OrderNo,channel,currency,orderStaus,date1,date2}=this.fromorder;
				let {size,current}=this.pagination
				this.$api.getCWOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"ordertype": channel,
					currency,
					"txtaccount":'',
					"zt": orderStaus,
					"sjs":date1,
					"sje": date2,
					"xdOrderno":'',
					"bustype":orderType,
					"ifauto":-1
				}).then(res=>{
					console.log(res);
					if(res.rows.length!=0){
						this.pagination.total=res.results;
						this.tableData=res.rows;
					}
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
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
			//显示付款截图
			fkimg(imgsrc){
				this.$alert('<img style="width:300px" src='+imgsrc+' />', {
				  dangerouslyUseHTMLString: true,
				  showConfirmButton:false
				}).then(()=>{
					
				}).catch(()=>{
					
				});
			}
		}
	})
</script>

<style scoped>
	.fkIMG{cursor: pointer;padding-left: 5px;vertical-align: middle;}
</style>
