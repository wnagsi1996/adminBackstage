<template>
	<div class="bodybj">
		<el-row>
			 <el-col :span="8">
				<div class="one-today public-statue">
					<div class="today-title">
						<h5>当天数据</h5>
					</div>
					<div class="today-desc">
						<OrderModule v-if="summaryOrderData.length>0" :orderdata="summaryOrderData[0]"/>
					</div>
				</div> 
			 </el-col>
			 <el-col :span="8">
				<div class="one-today public-statue">
					<div class="today-title">
						<h5>当月数据</h5>
					</div>
					<div class="today-desc">
						<OrderModule v-if="summaryOrderData.length>0" :orderdata="summaryOrderData[1]"/>
					</div>
				</div> 
			 </el-col>
			 <el-col :span="4">
				 <div class="one-today public-statue">
				  	<div class="today-title">
				  		<h5>进度条</h5>
				  	</div>
				 	<div class="today-desc">
				 		<el-row :gutter="20" v-if="Object.keys(aimsdata).length >0">
				 			<el-col :span="24">
				 				<div class="today-desc-total">
				 					<p>本月目标：{{aimsdata.aims}}，接单：{{aimsdata.jdnum}}，退单:{{aimsdata.tdnum}}，实际完成:{{aimsdata.jdnum-aimsdata.tdnum}}</p>
				 					<el-progress  v-if="!isNaN(aimsdata.percentage) && aimsdata.aims!=0" :color="aimsdata.percentage | progressbarColor" class="progress" type="circle" :percentage="aimsdata.percentage>100?100:Number(aimsdata.percentage)"></el-progress>
				 				</div>
				 			</el-col>
				 		</el-row>
				 	</div>
				 </div>
			 </el-col>
			 <el-col :span="4">
				 <div class="one-today">
					 <div class="public-statue two-auto month-finance">
						 <h5>待刷产品</h5>
						 <p>{{twodata[2]}}</p>
					 </div>
					 <div class="public-statue two-auto month-finance">
						 <h5>待刷订单</h5>
						 <p v-if="twodata.length>0" style="font-size: 30px;">{{twodata[0]+twodata[1]}}</p>
						 <span style="margin-top: 0;">免：{{twodata[0]}},留：{{twodata[1]}}</span>
					 </div>
					 <div class="public-statue two-auto month-finance">
						 <h5>损失金额</h5>
						 <p>{{outmoney}}</p>
					 </div>
				 </div>
			 </el-col>
		</el-row>
		<el-row>
			<el-col :span="6" v-for="(item,index) in module" :key="index">
				<div class="public-statue month-finance" @click="pushlink(item)">
					<h5>{{item.title}}</h5>
					<p>{{item.money}}</p>
					<span v-if="item.txt">{{item.txt}}</span>
				</div>
			</el-col>
		</el-row>
		<!-- 折线图 -->
		<div class="month-line public-statue">
			<ve-line v-if='Object.keys(monthLineData).length > 0' :data="monthLineData" class="line"></ve-line>
		</div>
	</div>
</template>

<script>
	import OrderModule from '@/components/AdminHome/OrderModule.vue'
	import VeLine from 'v-charts/lib/line'
	import {Row,Col,Progress} from 'element-ui'
	export default({
		name:'Home',
		components:{
			[VeLine.name]:VeLine,
			[Row.name]:Row,
			[Col.name]:Col,
			[Progress.name]:Progress,
			OrderModule
		},
		data(){
			return{
				summaryOrderData:[]   ,//今日汇总和本月汇总数据
				aimsdata:{},  //目标
				monthLineData:{}  ,//月份折线图数据
				module:[],
				twodata:[],
				outmoney:''
			}
		},
		created() {
			this.getdata()
			this.getdata1()
		},
		methods:{
			getdata(){
				this.$api.getMJTotalData().then(data=>{
					this.module=[
						{
							'title':'单号待审核',
							'money':data.waitshnum,
							'path':'/revieworder',
							'name':'单号待审核',
							'param':'1'
						},
						{
							'title':'等待财务处理',
							'money':data.waitcwshnum,
							'path':'/financialaudittrail',
							'name':'财务处理进度查询',
							'param':'1'
						},
						{
							'title':'最新留评订单',
							'money':data.newlpnum,
							'path':'/commentnotification',
							'name':'最新留评单',
							'param':'1'
						},
						{
							'title':'财务驳回',
							'money':data.backcwshnum,
							'path':'/financialaudittrail',
							'name':'财务处理进度查询',
							'param':'1'
						},
						{
							'title':'今日收款总金额',
							'money':data.todaysktotalmoney,
							'param':'0'
						},
						{
							'title':'今日退差价/今日补差价',
							'money':`${data.todaytcjtotalmoney} / ${data.todaybcjtotalmoney}`,
							'txt':`单数:${data.todaytcjnum} / ${data.todaybcjnum}`,
							'param':'0'
						},
						{
							'title':'今日新增卖家',
							'money':data.todaynewmjnum,
							'param':'0'
						},
						{
							'title':'今日新增产品',
							'money':data.todaynewproductnum,
							'param':'0'
							//'txt':`单数:${data.todaybcjnum}`
						}
					];
					
					this.twodata.push(data.lsdsmpnum,data.lsdslpnum,data.lsdscpnum);
				})
			},
			getdata1(){
				this.$api.getMJCurMonthCPOrderDetailNums_CurUser().then(res=>{
					//今日接单免评/留评/刷单免评/留评/卖家退单免评/留评/买家退单免评/留评
					let todayJdMpNum,todayJdLpNum,todaySdMpNum,todaySdLpNum,todayTdMpNum,todayTdLpNum,todayCdMpNum,todayCdLpNum;
					
					//月份接单免评/留评/刷单免评/留评/卖家退单免评/留评/买家退单免评/留评
					let monthJdMpNum=0,monthJdLpNum=0,monthSdMpNum=0,monthSdLpNum=0,monthTdMpNum=0,monthTdLpNum=0,monthCdMpNum=0,monthCdLpNum=0;		
					
					//月份折线图数据
					let LineColumns=['日期','接单','卖家退单','刷单','买家退单']; //折线图标题
					let LineRow=[]; //折线图数据
					
					if(res!=''){
						res.monthViews.forEach(item=>{
							monthJdMpNum+=item.jdmpnum;
							monthJdLpNum+=item.jdlpnum;
							monthSdMpNum+=item.tdsdmpnum;
							monthSdLpNum+=item.tdsdlpnum;
							monthTdMpNum+=item.tdmpnum;
							monthTdLpNum+=item.tdlpnum;
							monthCdMpNum+=item.tdcdmpnum;
							monthCdLpNum+=item.tdcdlpnum;
							if(item.ifcurday==1){
								todayJdMpNum=item.jdmpnum;
								todayJdLpNum=item.jdlpnum;
								todaySdMpNum=item.tdsdmpnum;
								todaySdLpNum=item.tdsdlpnum;
								todayTdMpNum=item.tdmpnum;
								todayTdLpNum=item.tdlpnum;
								todayCdMpNum=item.tdcdmpnum;
								todayCdLpNum=item.tdcdlpnum;
							}
							
							LineRow.push({
								"日期":item.day.slice(5),
								"接单":item.jdmpnum+item.jdlpnum,
								"卖家退单":item.tdmpnum+item.tdlpnum,
								"刷单":item.tdsdmpnum+item.tdsdlpnum,
								"买家退单":item.tdcdmpnum+item.tdcdlpnum
							})
						})
					
					//今日数据
					const todayData=[  
						{  
							'title':'今日接单',
							'lpnum':todayJdLpNum,
							'mpnum':todayJdMpNum
						},
						{
							'title':'今日商家退单',
							'lpnum':todayTdLpNum,
							'mpnum':todayTdMpNum
						},
						{
							'title':'今日刷单',
							'lpnum':todaySdLpNum,
							'mpnum':todaySdMpNum
						},
						{
							'title':'今日买家退单',
							'lpnum':todayCdLpNum,
							'mpnum':todayCdMpNum
						}
					];
					
					//本月数据
					const monthData=[  
						{  
							'title':'本月接单',
							'lpnum':monthJdLpNum,
							'mpnum':monthJdMpNum
						},
						{
							'title':'本月商家退单',
							'lpnum':monthTdLpNum,
							'mpnum':monthTdMpNum
						},
						{
							'title':'本月刷单',
							'lpnum':monthSdLpNum,
							'mpnum':monthSdMpNum
						},
						{
							'title':'本月买家退单',
							'lpnum':monthCdLpNum,
							'mpnum':monthCdMpNum
						}
					]
					let percentage=Number((((monthJdLpNum+monthJdMpNum)-(monthTdLpNum+monthTdMpNum))/res.monthPlantNum*100).toFixed(2))
					//目标汇总数据
					this.aimsdata={
						'aims':res.monthPlantNum,
						'jdnum':monthJdLpNum+monthJdMpNum,
						'tdnum':monthTdLpNum+monthTdMpNum,
						'percentage':percentage<0?0:percentage
					}
					
					this.summaryOrderData.push(todayData,monthData);

					Object.assign(this.monthLineData,{
						columns:LineColumns,
						rows:LineRow
					});
					
					this.outmoney=res.outmoney;
					
					}else{
						console.log('数据加载失败')
					}
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			pushlink(item){
				//console.log(item);
				if(item.param=='1'){
					if(item.title=='财务驳回'){
						this.$router.push({ path: item.path ,query: { type: '2' }})
					}else if(item.title=='等待财务处理'){
						this.$router.push({ path: item.path ,query: { type: '0' }})
					}else{
						this.$router.push({ path: item.path })
					}
					
					this.$store.commit('tagsView/selectMenu', item)
				}
				
			}
		}
	})
</script>

<style>
	@import url("../../../../assets/css/summary.css");
</style>
