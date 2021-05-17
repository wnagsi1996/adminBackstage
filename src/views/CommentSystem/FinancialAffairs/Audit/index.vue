<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="收入渠道">
		    <el-select v-model="fromorder.channel" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderStaus" placeholder="">
		       <el-option v-for="item in cwOrderState" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="收入货币">
		    <el-select v-model="fromorder.currency" placeholder="">
		      <el-option v-for="item in currencyType" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单类别">
		    <el-select v-model="fromorder.orderType" placeholder="">
		       <el-option v-for="item in cwOrderType" :key="item.value" :label="item.text" :value="item.value"></el-option>
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
			    <el-table-column prop="rattypestr" label="收入渠道" min-width="6%" />
			    <el-table-column prop="currencystr" label="收入货币" min-width="5%" />
			    <el-table-column prop="ordermoney" label="收款金额" min-width="6%" />
				 <el-table-column prop="fqusername" label="提交人员" min-width="5%" />
				 <el-table-column prop="fqdate" label="提交时间" min-width="8%" />
				 <el-table-column prop="ztstr" label="订单状态" min-width="5%" >
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
				 
				 <el-table-column prop="bustypestr" label="订单类别" min-width="5%" >
				 </el-table-column>
				 <!-- <el-table-column prop="shdate" label="处理时间" min-width="8%" /> -->
			    <el-table-column fixed="right" label="操作" min-width="6%" >
			      <template slot-scope="scope">
					  <template v-if="scope.row.zt=='0'">
						  <el-button @click="comitsh(scope.row.rid,'1',scope.row.orderno,scope.row.currency)" type="text" size="small">确认</el-button>
						  <el-button @click="comitsh(scope.row.rid,'2',scope.row.orderno)" type="text" size="small">驳回</el-button>
					  </template>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		
		<!-- 分页 -->
		<Pagination class="pagination" @search="search" :pagination="pagination" />
		
		<!-- 弹出框 -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" width="30%" :before-close="handleClose">
		  <el-form ref="item" :model="item" :rules="itemRules" label-width="80px" label-position="top">
		  	<el-row :gutter="20">
		  	  <el-col :span="24" v-if="dialog.currency=='1'">
		  		 <el-form-item label="收入人民币" prop="rmbtxt">
		  		  <el-input v-model.trim="item.rmbtxt"></el-input>
		  		</el-form-item>
		  	  </el-col>
		  	  <el-col :span="24">
		  		 <el-form-item label="备注" prop="remark">
		  		  <el-input v-model.trim="item.remark"></el-input>
		  		</el-form-item>
		  	  </el-col>
			</el-row>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submit" :loading="btnLoading">确定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import {Form,FormItem,Input,Row,Col,Dialog,DatePicker,Table,TableColumn,Popover,Select,Option} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {paymentType,currencyType,cwOrderState,cwOrderType} from '@/assets/js/orderState.js'
	let orderTypenum=['','0','4','6','9']; //要显示得订单类型
	let orderStatenum=['-1','0','1','2']; //要显示得订单状态
	export default({
		name:'Audit',
		components:{
			Pagination,
			copyorderno,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Row.name]:Row,
			[Col.name]:Col,
			[Dialog.name]:Dialog,
			[DatePicker.name]:DatePicker,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Popover.name]:Popover,
			[Select.name]:Select,
			[Option.name]:Option
		},
		data(){
			return{
				fromorder:{
					OrderNo:'',
					channel:'-1',
					orderStaus:'0',
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
				dialog:{
					title:'',
					dialogVisible:false,
					orderno:'',
					currency:'',
					rid:'',
					state:''
				},
				item:{
					rmbtxt:'',
					remark:''
				},
				itemRules:{
					rmbtxt:[
						{ pattern:/^\d+(\.\d+)?$/, message: '人民币金额必须为数字' }
					]
				},
				btnLoading:false,
				paymentType,
				currencyType,
				cwOrderState:cwOrderState.filter(n=>orderStatenum.includes(n.value)),
				cwOrderType:cwOrderType.filter(n=>orderTypenum.includes(n.value))
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
				let {OrderNo,channel,orderStaus,orderType,date1,date2,currency}=this.fromorder
				let {size,current}=this.pagination
				this.$api.getCWOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"ordertype": 0,
					"currency": currency,
					"txtaccount": '',
					"zt": orderStaus,
					"bustype": orderType,
					"xdOrderno": '',
					"rattype": channel,
					"ifauto": -1,
					"sjs":date1,
					"sje": date2
				}).then(res=>{
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//打开弹出层
			comitsh(rid,state,orderno,currency=''){
				let title='';
				if(state=="2"){
					title='您确定要驳回该订单吗?'
				}else{
					title='您确认该笔款项已到账?'
				}
				if(currency!='1'){
					this.item.rmbtxt=0
				}
				this.dialog={
					title,
					rid,
					state,
					orderno,
					currency,
					dialogVisible:true
				}
			},
			//提交
			submit(){
				this.$refs.item.validate((valid) => {
					if(valid){
						let {currency,rid,state}=this.dialog;
						let {rmbtxt,remark}=this.item;
						if(currency=='1' && rmbtxt==0){
							this.$message.warning('收入人民币不能为0!')
							return false
						}
						
						this.btnLoading=true;
						this.$api.doCWDetail({
							rids:rid,
							shremark:remark,
							cwstate:state,
							realrmbmoney:rmbtxt,
							_img64:''
						}).then(res=>{console.log(res)
							if(res.rescode==1){
								this.$message.success(res.resdesc)
								this.tableData=this.tableData.filter(n=>n.rid!=rid)
								this.resetForm();
								this.handleClose();
							}else{
								this.$message.warning(res.resdesc)
							}
							this.btnLoading=false;
						}).catch(err=>{console.log(err)
							this.$message.warning('添加失败!')
							this.btnLoading=false;
						})
					}
				})
			},
			//重置表单
			resetForm(){
				this.$refs.item.resetFields();
			},
			//关闭弹出层
			handleClose(){
				this.dialog={
					title:'',
					rid:'',
					state:'',
					orderno:'',
					currency:'',
					dialogVisible:false
				}
			}
		}
	})
</script>

<style>
</style>
