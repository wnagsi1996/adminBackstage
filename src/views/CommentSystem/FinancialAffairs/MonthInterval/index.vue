<template>
	<div class="bodybj" v-loading="loading">
		<div class="sel-month">
			<div class="sel-month-info">当前查询月份: <span v-show="months!='' && monthe!=''">{{months}} - {{monthe}}</span></div>
			<div class="sel-month-inp" style="width: auto;">
				<el-date-picker v-model="months" type="month" placeholder="开始月份" value-format="yyyy-MM"></el-date-picker> - 
				<el-date-picker v-model="monthe" type="month" placeholder="结束月份" value-format="yyyy-MM"></el-date-picker>
				<el-button type="primary" @click="search">查询</el-button>
			</div>
		</div>
		<div v-if="monthdata.length>0">
			<div>
				<el-row>
					<el-col :span="24">
						<el-row>
							<el-col :span="6" v-for="(item,index) in monthTotal" :key="index">
								<InfoDisplay :infoData="item" />
							</el-col>
						</el-row>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<div class="one-today public-statue">
							<div class="today-title">
								<h5>订单数据</h5>
							</div>
							<div class="today-desc">
								<OrderModule :orderdata="monthOrderData"/>
							</div>
						</div> 
					</el-col>
					<el-col :span="16">
						<el-row>
							<el-col :span="8" v-for="(item,index) in monthfince" :key="index">
								<InfoDisplay :infoData="item" />
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
			<div class="month-item">
				<div class="month-item-desc" v-for="(item,index) in monthdata" :key="index">
					<div class="month-item-desc-title" :class="item.ifcurmonth?'check':''">{{item.month}}</div>
					<div class="seler-user month-info">
						<ul>
							<li>
								<p>接单：</p>
								<em>(免：{{item.jdmpnum}}  留：{{item.jdlpnum}})</em>
								<span>{{item.jdmpnum+item.jdlpnum}}</span>
							</li>
							<li>
								<p>卖家退单：</p>
								<em>(免：{{item.tdmpnum}}  留：{{item.tdlpnum}})</em>
								<span>{{item.tdmpnum+item.tdlpnum}}</span>
							</li>
							<li>
								<p>刷单：</p>
								<em>(免：{{item.sdmpnum}}  留：{{item.sdlpnum}})</em>
								<span>{{item.sdmpnum+item.sdlpnum}}</span>
							</li>
							<li>
								<p>买家退单：</p>
								<em>(免：{{item.cdmpnum}}  留：{{item.cdlpnum}})</em>
								<span>{{item.cdmpnum+item.cdlpnum}}</span>
							</li>
							<li>
								<p>损失金额</p>
								<span>{{item.ssje}}</span>
							</li>
							<li>
								<p>总单单数</p>
								<span>{{item.zdds}}</span>
							</li>
							<li>
								<p>收款</p>
								<span>{{item.zsk}}</span>
							</li>
							<li>
								<p>返款</p>
								<span>{{item.zfk}}</span>
							</li>
							<li>
								<p>营业收入</p>
								<span>{{(item.zsk-item.zfk-item.ssje).toFixed(2)}}</span>
							</li>
							<li>
								<p>其他支出</p>
								<span>{{item.qtzc}}</span>
							</li>
							<li>
								<p>利润</p>
								<span>{{(item.zsk-item.zfk-item.ssje-item.qtzc).toFixed(2)}}</span>
							</li>
						</ul>
					</div>
				</div>
				<template v-if="addnull>0">
					<div class="listnull" v-for="item in addnull" :key="'null'+item"></div>
				</template>
				
			</div>
		</div>
		<div v-else class="month-not">
			{{infoTxt}}
		</div>
	</div>
</template>

<script>
	import {DatePicker,Row,Col} from 'element-ui'
	import OrderModule from '@/components/AdminHome/OrderModule.vue'
	import InfoDisplay from '@/components/InfoDisplay'
	export default({
		name:'MonthInterval',
		components:{
			OrderModule,
			InfoDisplay,
			[DatePicker.name]:DatePicker,
			[Row.name]:Row,
			[Col.name]:Col
		},
		data(){
			return{
				months:'',  //开始月份
				monthe:'',  //结束月份
				monthdata:[],  //月份数据
				addnull:0   ,//解决最后一排数量不够自动向两端排列
				totaldata:{},
				monthOrderData:[],
				monthfince:[],
				loading:false,
				monthTotal:[],
				infoTxt:'点击月份搜索查看数据'
			}
		},
		created() {
			
		},
		methods:{
			search(){
				let months=this.months,monthe=this.monthe;
				if(months=='' && monthe==''){
					this.$message.warning('搜索月份不能为空!')
					return;
				}
				
				if(months=='' || months==null){
					this.months=months='2020-01';
				}
				if(monthe=='' || months==null){
					let nowDate = new Date();
					let nowMonth = nowDate.getMonth();
					let nowYear = nowDate.getFullYear();
					if (nowMonth == "0") {
						nowYear = eval(nowYear) - 1;
						nowMonth = 12;
					}
					nowMonth = nowMonth < 9 ? "0" + nowMonth : nowMonth;
					this.monthe=monthe = nowYear + "-" + nowMonth;
				}
				
				this.loading=true;
				this.$api.getMonthCPDataList({months,monthe}).then(res=>{
					//console.log(res);
					if(res!=''){
						let data=res.monthViews;
						if(data.length>0){
							// this.monthdata=[];
							this.monthdata=data;
							//计算还要补几个
							this.addnull=4-data.length%4;
							
							let totaldata={
								jdlpnum:0,
								jdmpnum:0,
								tdlpnum:0,
								tdmpnum:0,
								sdlpnum:0,
								sdmpnum:0,
								cdlpnum:0,
								cdmpnum:0,
								zdds:0,
								zfk:0,
								zsk:0,
								ssje:0,
								qtzc:0
							};
							data.forEach(item=>{
								totaldata.jdlpnum+=item.jdlpnum;
								totaldata.jdmpnum+=item.jdmpnum;
								totaldata.tdlpnum+=item.tdlpnum;
								totaldata.tdmpnum+=item.tdmpnum;
								totaldata.sdlpnum+=item.sdlpnum;
								totaldata.sdmpnum+=item.sdmpnum;
								totaldata.cdlpnum+=item.cdlpnum;
								totaldata.cdmpnum+=item.cdmpnum;
								totaldata.zdds+=item.zdds;
								totaldata.zfk+=item.zfk;
								totaldata.zsk+=item.zsk;
								totaldata.ssje+=item.ssje;
								totaldata.qtzc+=item.qtzc;
							});
							// this.totaldata=totaldata;
							this.totaldata=Object.assign({},totaldata)
							//console.log(totaldata.qtzc)
							//本月数据
							this.monthOrderData=[  
								{  
									'title':'接单',
									'lpnum':totaldata.jdlpnum,
									'mpnum':totaldata.jdmpnum 
								},
								{
									'title':'商家退单',
									'lpnum':totaldata.tdlpnum,
									'mpnum':totaldata.tdmpnum
								},
								{
									'title':'刷单',
									'lpnum':totaldata.sdlpnum,
									'mpnum':totaldata.sdmpnum
								},
								{
									'title':'买家退单',
									'lpnum':totaldata.cdlpnum,
									'mpnum':totaldata.cdmpnum
								}
							]
							
							let jdnum=(totaldata.jdlpnum+totaldata.jdmpnum)-(totaldata.tdlpnum+totaldata.tdmpnum);
							let sdnum=(totaldata.sdlpnum+totaldata.sdmpnum)-(totaldata.cdlpnum+totaldata.cdmpnum)
							
							const monthfince=[
								{
									'title':'收款',
									'money':(totaldata.zsk).toFixed(2)
								},
								{
									'title':'返款',
									'money':(totaldata.zfk).toFixed(2)
								},
								{
									'title':'损失金额',
									'money':(totaldata.ssje).toFixed(2)
								},
								{
									'title':'总单数',
									'money':totaldata.zdds,
									'txt':'商家下单且测评结束的总单数(次数)'
								},
								{
									'title':'其他支出',
									'money':(totaldata.qtzc).toFixed(2)
								}
							];
							this.monthfince=monthfince;
							
							this.monthTotal=[
								{
									'title':'接单',
									'money':jdnum,
									'txt':'扣除完退单的数量'
								},
								{
									'title':'刷单',
									'money':sdnum,
									'txt':'扣除完退单的数量'
								},
								{
									'title':'营业收入',
									'money':(totaldata.zsk-totaldata.zfk-totaldata.ssje).toFixed(2),
									'txt':'营业收入=收款-返款-损失金额'
								},
								{
									'title':'利润',
									'money':(totaldata.zsk-totaldata.zfk-totaldata.ssje-totaldata.qtzc).toFixed(2),
									'txt':'利润=收款-返款-损失金额-其他支出'
								}
							]
						}else{
							this.infoTxt='搜索的数据为空'
						}
					}else{
						this.infoTxt='搜索的数据出错'
						
					}
					this.loading=false;
				})
			}
		}
	})
</script>

<style scoped>
	@import url("../../../../assets/css/summary.css");
	.bodybj{min-height: 100%;}
	.month-item{width:99%;margin:0 auto;display: flex; flex-wrap: wrap;justify-content: space-between;}
	.month-item-desc{width:22%;background-color: #fff; border-radius: 5px;padding: 10px;margin:15px 0}
	.listnull{width:22%;padding: 10px;margin:15px 0}
	.month-item-desc-title{border-bottom: 1px solid #f7f7f7;padding-bottom:8px;font-size:16px}
	.check{color:#e41c1d;font-weight: bold;}
	.month-info{border:none;padding: 0 10px 0 0;margin-top: 5px;}
	.month-not{width: 100%;text-align: center;margin-top:15%;font-size:24px;color:#888}
</style>
