<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="订单号">
		    <el-input v-model="fromorder.OrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="购买单号">
		    <el-input v-model="fromorder.BuyOrderNo" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="收款账户">
		    <el-input v-model="fromorder.account" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="支出渠道">
		    <el-select v-model="fromorder.channel" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="支出货币">
		    <el-select v-model="fromorder.currency" placeholder="">
		      <el-option v-for="item in currencyType" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="fromorder.orderStaus" placeholder="">
		      <el-option v-for="item in cwOrderState" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="自动返款">
		    <el-select v-model="fromorder.auto" placeholder="">
		      <el-option label="全部" value="-1"></el-option>
		      <el-option label="是" value="1"></el-option>
		      <el-option label="否" value="0"></el-option>
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
			    <el-table-column prop="rattypestr" label="支出渠道" min-width="5%" />
			    <el-table-column prop="currencystr" label="支出货币" min-width="5%" />
			    <el-table-column prop="ifauto" label="自动返款" min-width="4%" >
					<template slot-scope="scope">
						<p v-if="scope.row.ifauto==0">否</p>
						<p v-else>是</p>
					</template>
				</el-table-column>
				<el-table-column prop="ordermoney" label="订单金额" min-width="5%">
					<template slot-scope="scope">
						<template v-if="scope.row.currency == '1' && scope.row.ordertype == '1'">
							<el-tooltip class="item" effect="dark" placement="right">
							  <div slot="content">原始金额 {{scope.row.oldordermoney}}乘{{scope.row.usdrate}}得出来的金额</div>
							  <p>{{scope.row.ordermoney}}</p>
							</el-tooltip>
						</template>
						<template v-else>
							<p>{{scope.row.ordermoney}}</p>
						</template>
					</template>
				</el-table-column>
				 <el-table-column prop="realmoney" label="实际支出金额" min-width="5%" />
				 <el-table-column prop="rat" label="支出账号" min-width="5%">
					 <template slot-scope="scope">
						 <div v-if="scope.row.receiveAccountQRCodeUrl!=''">
							 <span>{{scope.row.rat}}</span>
							 <i class="el-icon-picture-outline" @click="showImg(scope.row.receiveAccountQRCodeUrl)"></i>
						 </div>
						 <div v-else>{{scope.row.rat}}</div>
					 </template>
				 </el-table-column>
				 <el-table-column prop="fqusername" label="提交人员" min-width="5%" />
				 <el-table-column prop="fqdate" label="提交时间" min-width="8%" />
				 <el-table-column prop="xdOrderno" label="亚马逊单号" min-width="5%" />
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
				 <el-table-column prop="bustypestr" label="订单类别" min-width="5%" />
				 <!-- <el-table-column prop="shdate" label="处理时间" min-width="8%" /> -->
			    <el-table-column fixed="right" label="操作" min-width="6%" >
			      <template slot-scope="scope">
					  <template v-if="scope.row.zt=='0' || scope.row.zt=='4'">
						  <el-button @click="comitsh(scope.row.rid,'1',scope.row.rattype,scope.row.realmoney,scope.row.orderno)" type="text" size="small">确认返款</el-button>
						  <el-button @click="comitsh(scope.row.rid,'2',scope.row.rattype,scope.row.realmoney,scope.row.orderno)" type="text" size="small">驳回</el-button>
						  <el-button v-if="scope.row.rattype=='3'" @click="autoRebat(scope.row.orderno)" type="text" size="small">自动返款</el-button>
						  <el-button v-if="scope.row.fkimgurl!=''" @click="fkimg(scope.row.fkimgurl)" type="text" size="small">查看付款截图</el-button>
					  </template>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		
		<!-- 分页 -->
		<Pagination class="pagination" @search="search" :pagination="pagination" />
		
		<!-- 弹出框 -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" width="350px" :before-close="resetForm">
		  <el-form ref="item" :model="item" :rules="itemRunles" label-width="80px" label-position="top">
		  	<el-row :gutter="20">
		  	  <template v-if="dialog.cwstate!='2'">
				  <el-col :span="24" v-if="dialog.price==''">
					 <el-form-item label="支出人民币" prop="rmbtxt">
					  <el-input v-model.trim="item.rmbtxt"></el-input>
					</el-form-item>
				  </el-col>
				  <el-col :span="24">
					 <el-form-item label="返款截图" prop="remark">
					  <component :is="isPaseImage" :imgsrc="item.imgurl" @getImgSrc="getImgSrc"></component>
					</el-form-item>
				  </el-col>
			  </template>
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
	import {Form,FormItem,Input,Row,Col,Dialog,DatePicker,Table,TableColumn,Popover,Select,Option,Tooltip} from 'element-ui'
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy" 
	import {paymentType,cwOrderState,cwOrderType,currencyType} from '@/assets/js/orderState.js'
	let ordernum=['','3','4','5','7,8']; //要显示得订单状态
	export default({
		name:'Expenditure',
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
			[Option.name]:Option,
			[Tooltip.name]:Tooltip
		},
		data(){
			return{
				fromorder:{
					OrderNo:'',
					BuyOrderNo:'',
					account:'',
					channel:'-1',
					orderStaus:'0',
					auto:'-1',
					currency:'-1',
					orderType:' ',
					date1:'',
					date2:''
				},
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				tableData:[] ,//表格数据
				loading:true,
				item:{
					rmbtxt:'',
					imgurl:'',
					remark:''
				},
				itemRunles:{
					rmbtxt:[
						{ pattern:/^\d+(\.\d+)?$/, message: '人民币金额必须为数字' }
					]
				},
				dialog:{
					title:'',
					dialogVisible:false,
					orderno:'',
					rattype:'',
					rid:'',
					cwstate:'',
					price:''
				},
				btnLoading:false,
				isPaseImage:null,
				paymentType,
				cwOrderState,
				cwOrderType:cwOrderType.filter(n=>ordernum.includes(n.value)),
				currencyType
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
				let {OrderNo,channel,currency,account,orderStaus,orderType,BuyOrderNo,auto,date1,date2}=this.fromorder;
				let {size,current}=this.pagination
				this.$api.getCWOrderDetailList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"orderno": OrderNo,
					"ordertype": 1,
					"currency": currency,
					"rattype": channel,
					"txtaccount": account,
					"zt": orderStaus,
					"bustype": orderType,
					"xdOrderno": BuyOrderNo,
					"ifauto": auto,
					"sjs":date1,
					"sje": date2
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
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
			},
			//显示返款留言
			showRemark(title){
				this.$alert(title, {
				  dangerouslyUseHTMLString: true,
				  showConfirmButton:false
				}).then(()=>{
					
				}).catch(()=>{
					
				});
			},
			//订单处理
			comitsh(rid, cwstate, rattype, price, orderno){
				let title;
				if(cwstate=="2"){
					title='您确定要驳回该订单吗?'
				}else{
					title='您确认该订单已返款?'
				}
				this.dialog={
					rid,
					title,
					cwstate,
					orderno,
					rattype,
					price,
					dialogVisible:true
				}
				this.item.rmbtxt=price;
				if(this.isPaseImage==null){
					this.isPaseImage=() => import('@/components/PaseImage');
				}
			},
			//提交
			submit(){
				this.$refs.item.validate((valid) => {
					if(valid){
						let {cwstate,rid}=this.dialog;
						let {rmbtxt,remark,imgurl}=this.item;
						if(cwstate!='2'){
							if(rmbtxt==0){
								this.$message.warning('支出人民币不能为0!')
								return false
							}
						}else{
							this.item.rmbtxt=rmbtxt=0
						}
						
						this.btnLoading=true;
						this.$api.doCWDetail({
							rids:rid,
							shremark:remark,
							cwstate,
							realrmbmoney:rmbtxt,
							_img64:imgurl
						}).then(res=>{
							console.log(res);
							if(res.rescode==1){
								this.$message.success(res.resdesc)
								this.tableData=this.tableData.filter(n=>n.rid!=rid)
								this.resetForm();
							}else{
								this.$message.warning(res.resdesc)
							}
							this.btnLoading=false;
						}).catch(xhr=>{console.log(xhr)
							this.$message.warning('添加失败')
							this.btnLoading=false;
						})
					}
				})
			},
			//重置表单
			resetForm(){
				this.dialog.dialogVisible=false
				this.$refs.item.resetFields();
				this.item={
					imgurl:'',
					remark:'',
					rmbtxt:''
				}
			},
			getImgSrc(val){
				this.item.imgurl=val
			}
		}
	})
</script>

<style>
</style>
