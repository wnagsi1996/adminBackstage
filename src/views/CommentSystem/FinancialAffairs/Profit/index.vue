<template>
	<div>
		<el-row :gutter="40">
			<el-col :span="18">
				<!-- 搜索条件 -->
				<el-form :inline="true" :model="fromorder" class="demo-form-inline">
				  <el-form-item label="创建时间">
					  <el-row :gutter="20">
						  <el-col :span="11">
							<el-form-item prop="months">
							  <el-date-picker type="month" placeholder="开始时间" v-model="fromorder.months"  value-format="yyyy-MM" style="width: 100%;"></el-date-picker>
							</el-form-item>
						  </el-col>
						  <el-col class="line" :span="1">-</el-col>
						  <el-col :span="11">
							<el-form-item prop="monthe">
							  <el-date-picker type="month" placeholder="结束时间" v-model="fromorder.monthe"  value-format="yyyy-MM" style="width: 100%;"></el-date-picker>
							</el-form-item>
						  </el-col>
					  </el-row>
				   </el-form-item>
				  <el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				  </el-form-item>
				</el-form>
				<!-- 表格数据 -->
				<div class="tableMag">
				<el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
					<el-table-column prop="curmonth" label="月份" min-width="4%" />
					<el-table-column prop="profit" label="利润" min-width="4%" />
					<el-table-column prop="cjsj" label="创建时间" min-width="5%" />
					<el-table-column prop="bgsj" label="变更时间" min-width="5%" />
					 <el-table-column fixed="right" label="操作" min-width="2%" >
						 <template slot-scope="scope">
							 <el-button @click="hankLog(scope.row.curmonth)" type="text" size="small">详情</el-button>
						 </template>
					</el-table-column>
				  </el-table>
				</div>
				<!-- 分页 -->
				<Pagination class="pagination" @search="search" :pagination="pagination" />
			</el-col>
			<el-col :span="6">
				<div class="profit-total">
					<p>营业收入：<em>{{porfitTotal.totalprofit}}</em></p>
					<p>剩余金额：<em>{{porfitTotal.curjprofit}}</em></p>
					<p>应收账款：<em>{{porfitTotal.tqprofit}}</em></p>
					<div class="profit-total-btn">
						<el-button @click="hankUpload" type="primary" size="small">利润提取</el-button>
						<el-button @click="hankLog()" type="primary" size="small">利润日志</el-button>
					</div>
				</div>
				
			</el-col>
		</el-row>
		
		<!-- 公共弹窗组件 -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.Visible" :width="dialog.width"  >
			<component :is="dialog.dialogComponent" :month="month" @dialogToggle="dialogToggle"/>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from "@/components/Pagination"
	import copyorderno from "@/components/OrderCopy"
	import {Row,Col,Form,FormItem,Table,TableColumn,DatePicker,Dialog} from 'element-ui'
	
	export default({
		name:'Profit',
		components:{
			Pagination,
			copyorderno,
			[Row.name]:Row,
			[Col.name]:Col,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Dialog.name]:Dialog,
			[DatePicker.name]:DatePicker
		},
		data(){
			return{
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				//搜索内容
				fromorder:{
					months:'',
					monthe:''
				},
				//利润汇总
				porfitTotal:{
					curjprofit:0,  //当前利润
					tqprofit:0,  //已提取利润
					totalprofit:0  //总的利润
				},
				//弹出框配置
				dialog:{
					title:'',
					Visible:false,
					width:'',
					dialogComponent:null
				},
				month:'',
				profitcom:null, //利润日志组件
				profituploadcom:null //利润上传组件
			}
		},
		created(){
			this.search();
			this.getTotalProfit()
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
				let {months,monthe}=this.fromorder
				let {current,size}=this.pagination
				this.$api.getMonthProfitList({
					pageNum:current-1,
					pageSize:size,
					months,
					monthe
				}).then(res=>{
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			getTotalProfit(){
				this.$api.getTotalProfit().then(res=>{
					if(res.rescode==1){
						this.porfitTotal={
							curjprofit:res.curjprofit,
							tqprofit:res.tqprofit,
							totalprofit:res.curjprofit+res.tqprofit,
						}
					}
				}).catch(xhr=>{
					//console.log(xhr);
				})
			},
			//利润日志弹出框
			hankLog(month=''){
				let profitcom=this.profitcom
				if(profitcom==null){
					profitcom=this.profitcom=()=>import('@/components/Profit/Log.vue');
				}
				this.dialog={
					title:'利润日志',
					Visible:true,
					width:'70%',
					dialogComponent:profitcom
				}
				
				this.month=month;
			},
			//利润提取弹出框
			hankUpload(){
				let profituploadcom=this.profituploadcom
				if(profituploadcom==null){
					profituploadcom=this.profituploadcom=()=>import('@/components/Profit/uploadProfit.vue');
				}
				this.dialog={
					title:'利润提取',
					Visible:true,
					width:'300px',
					dialogComponent:profituploadcom
				}
			},
			//隐藏弹出框
			dialogToggle(type=false){
				this.dialog={
					title:'',
					Visible:false,
					width:'',
					dialogComponent:null
				}
				if(type){
					this.getTotalProfit();
				}
			}
		}
		
	})
</script>

<style scoped>
	.profit-total{padding: 10px 20px 20px;background-color: #b5ecff;border-radius: 10px;margin-top:76px}
	.profit-total p{padding:10px 0}
	.profit-total p em{color: #e41c1d;font-style: normal;}
	.profit-total-btn{margin-top: 10px;}
</style>
