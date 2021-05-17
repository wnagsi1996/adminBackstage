<template>
	<div class="bodybj">
		<div class="prompt public-statue" v-if="promptdata.srnum!=0 && promptdata.zcnum!=0">
			<p v-if="promptdata.srnum!=0">您有{{promptdata.srnum}}单收款待确认<a @click="pushOpen">前往</a></p>
			<p v-if="promptdata.zcnum!=0">您有{{promptdata.zcnum}}单返款待处理<a  @click="pushOpenFK">前往</a></p>
		</div>
		<el-row>
			<el-col :span="16">
				<el-row>
					<el-col :span="6" v-for="(item,index) in todaydesc" :key="index">
						<InfoDisplay :infoData="item" />
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="8">
				<el-row>
					<el-col :span="12">
						<div class="public-statue month-total">
							<div class="month-total-item">
								<h4>本月接单</h4>
								<p>{{monthtotaldata[0]+monthtotaldata[1]}}</p>
								<span>免:{{monthtotaldata[0]}} 留:{{monthtotaldata[1]}}</span>
							</div>
							<div class="month-total-item">
								<h4>本月退单</h4>
								<p>{{monthtotaldata[4]+monthtotaldata[5]}}</p>
								<span>免:{{monthtotaldata[4]}} 留:{{monthtotaldata[5]}}</span>
							</div>
						</div>
					</el-col>
					<el-col :span="12" v-if="monthtotaldata.length>0">
						<div class="public-statue month-total">
							<div class="month-total-item">
								<h4>本月刷单</h4>
								<p>{{monthtotaldata[2]+monthtotaldata[3]}}</p>
								<span>免:{{monthtotaldata[2]}} 留:{{monthtotaldata[3]}}</span>
							</div>
							<div class="month-total-item">
								<h4>本月退单</h4>
								<p>{{monthtotaldata[6]+monthtotaldata[7]}}</p>
								<span>免:{{monthtotaldata[6]}} 留:{{monthtotaldata[7]}}</span>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!-- 折线图 -->
		<div class="month-line public-statue">
			<ve-line v-if='Object.keys(monthLineData).length > 0' :data="monthLineData" class="line"></ve-line>
		</div>
		
		<!-- 卖家端成员数据详情 -->
		<div class="public-statue userdesc-data">
			<div class="today-title">
				<h5>卖家端成员数据详情</h5>
			</div>
			<UserMonthInfo :userList="selerUserList" :userListInfo="seleUserListInfo" :pagination="pagination" @getSelerinfodata="getSelerinfodata" @getSelerUser="getSelerUser" />
		</div>
		
		<!-- 买家端成员数据详情 -->
		<div class="public-statue userdesc-data">
			<div class="today-title">
				<h5>买家端成员数据详情</h5>
			</div>
			<UserMonthInfo :userList="buyerUserList" :userListInfo="buyerUserListInfo" :pagination="buyerpagination" @getSelerinfodata="getBuyerinfodata" @getSelerUser="getBuyerUser" />
		</div>
	</div>
</template>

<script>
	import UserMonthInfo from '@/components/AdminHome/UserMonthInfo.vue'
	import VeLine from 'v-charts/lib/line'
	import {Row,Col} from 'element-ui'
	import InfoDisplay from '@/components/InfoDisplay'
	export default({
		name:'FiancialHome',
		components:{
			[VeLine.name]:VeLine,
			[Row.name]:Row,
			[Col.name]:Col,
			UserMonthInfo,
			InfoDisplay
		},
		data(){
			return{
				promptdata:[],  //待处理数据
				todaydesc:[],  //今日数据
				monthLineData:[],  //月份数据折线图
				monthtotaldata:[],  //本月接刷单数据
				selerAllUserInfo:{}  ,//卖家各个成员数据
				selerUserList:{},  //卖家端人员列表
				seleUserListInfo:[],  //卖家端人员详细数据
				pagination:{   //卖家端用户列表分页
					index:0,
					size:12,
					total:0
				},
				buyerpagination:{    //买家端用户列表分页
					index:0,
					size:12,
					total:0
				},
				buyerAllUserInfo:{}, //买家各个成员数据
				buyerUserList:{},//买家端人员列表
				buyerUserListInfo:[] ,//买家端人员详细数据
				bodyloading:0
			}
		},
		created() {
			this.prompt();
			this.getdata();
			this.getdata1();
			this.getSelerUser();
			this.getBuyerUser();
		},
		methods:{
			//获取待审核数据
			prompt(){
				this.$api.getCWWaitDoRecordNum().then(res=>{
					++this.bodyloading
					//console.log(res);
					if(res!=''){
						this.promptdata=res
					}
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			getdata(){
				this.$api.getCurDayCWTotalTotalData().then(data=>{
					//console.log(res);
					++this.bodyloading;
					let fktxt='',
					paypal=data.todayppfknum+data.todayppyjfknum,
					alipay=data.todayzfbfknum+data.todayzfbyjfknum,
					wechat=data.todaywxfknum+data.todaywxyjfknum,
					bc=data.todayyyfknum+data.todayyyyjfknum;
					if(paypal!=0){
						fktxt=`Paypal:${paypal} `
					}
					if(alipay!=0){
						fktxt+=`支付宝:${alipay} `
					}
					if(wechat!=0){
						fktxt+=`微信:${wechat} `
					}
					if(bc!=0){
						fktxt+=`银行卡:${bc}`
					}
					const monthfince=[
						{
							'title':'今日接单',
							'money':data.todaylpnum + data.todaympnum,
							'txt':`免:${data.todaympnum},留:${data.todaylpnum}`
						},
						{
							'title':'今日收款总金额',
							'money':(data.todaysktotalmoney).toFixed(2)
						},
						{
							'title':'今日支出总金额',
							'money':data.todayzctotalmoney,
							'txt':fktxt
						},
						{
							'title':'今日产品费返款',
							'money':(data.todayppfktotalmoney + data.todaywxfktotalmoney + data.todayyyfktotalmoney + data.todayzfbfktotalmoney).toFixed(2)
						},
						{
							'title':'今日退单',
							'money':data.todaytdlpnum + data.todaytdmpnum,
							'txt':`免:${data.todaytdmpnum},留:${data.todaytdlpnum}`
						},
						{
							'title':'今日退差价',
							'money':data.todaytcjtotalmoney,
							'txt':`单数:${data.todaytcjnum}`
						},
						{
							'title':'今日补差价',
							'money':data.todaybcjtotalmoney,
							'txt':`单数:${data.todaybcjnum}`
						},
						{
							'title':'今日佣金返款',
							'money':(data.todayppyjfktotalmoney + data.todaywxyjfktotalmoney + data.todayyyyjfktotalmoney + data.todayzfbyjfktotalmoney).toFixed(2)
							//'txt':`单数:${data.todaybcjnum}`
						}
					];
					this.todaydesc=monthfince
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			//月份每一天数据
			getdata1(){
				this.$api.getCurMonthCPOrderDetailNums().then(res=>{
					//console.log(res);
					++this.bodyloading
					
					//月份接单免评/留评/刷单免评/留评/卖家退单免评/留评/买家退单免评/留评
					let monthJdMpNum=0,monthJdLpNum=0,monthSdMpNum=0,monthSdLpNum=0,monthTdMpNum=0,monthTdLpNum=0,monthCdMpNum=0,monthCdLpNum=0;		
					
					//月份折线图数据
					let LineColumns=['日期','接单','卖家退单','刷单','买家退单']; //折线图标题
					let LineRow=[]; //折线图数据
					
					if(res!=''){
						res.monthViews.forEach(item=>{
							monthJdMpNum+=item.jdmpnum;
							monthJdLpNum+=item.jdlpnum;
							monthSdMpNum+=item.sdmpnum;
							monthSdLpNum+=item.sdlpnum;
							monthTdMpNum+=item.tdmpnum;
							monthTdLpNum+=item.tdlpnum;
							monthCdMpNum+=item.cdmpnum;
							monthCdLpNum+=item.cdlpnum;
							
							LineRow.push({
								"日期":item.day.slice(5),
								"接单":item.jdmpnum+item.jdlpnum,
								"卖家退单":item.tdmpnum+item.tdlpnum,
								"刷单":item.sdmpnum+item.sdlpnum,
								"买家退单":item.cdmpnum+item.cdlpnum
							})
						})
					this.monthLineData={
						columns:LineColumns,
						rows:LineRow
					}
					this.monthtotaldata=[monthJdMpNum,monthJdLpNum,monthSdMpNum,monthSdLpNum,monthTdMpNum,monthTdLpNum,monthCdMpNum,monthCdLpNum]
					
					}else{
						console.log('数据加载失败')
					}
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			getSelerUser(newpagination){
				if(newpagination){
					this.pagination={
						index:newpagination.index,
						size:newpagination.size
					}
				}
				
				let {index,size}=this.pagination;
				this.$api.getMJUserList({pageindex:index,len:size}).then(res=>{
					if(res!=''){
						this.selerUserList=res;
						let rid=res.rows[0].userid
						this.getSelerinfodata(rid);
					}
				})
				
			},
			//获取卖家端人员本月数据
			getSelerinfodata(userid){
				if(this.selerAllUserInfo[userid]!=undefined){
					this.selerUserInfoData(this.selerAllUserInfo[userid]);
				}else{
					this.$api.getMJCurMonthCPOrderDetailNums({userid}).then(res=>{
						if(res!=''){
							this.selerAllUserInfo[userid]=res.monthViews;
							this.selerUserInfoData(res.monthViews);
						}
					}).catch(xhr=>{
						
					})
				}
			},
			//解析卖家端用户数据
			selerUserInfoData(data){
				// let jdnum,tdnum,sdnum,cdnum,date; //构建折射图数据所需字段
				//let dayjdlpnum,dayjdmpnum,daytdlpnum,daytdmpnum,daysdlpnum,daysdmpnum,daycdlpnum,daycdmpnum;  //今日数据
				let monthjdlpnum=0,monthjdmpnum=0,monthtdlpnum=0,monthtdmpnum=0,monthsdlpnum=0,monthsdmpnum=0,monthcdlpnum=0,monthcdmpnum=0; //本月数据
				let daydata={}; //今日数据
				let selerUserInfo={
					columns:['日期','接单','卖家退单','刷单','买家退单'],
					rows:[]
				}
				data.forEach(item=>{
					
					selerUserInfo.rows.push({
						'日期':item.day.slice(5),
						'接单':item.jdlpnum+item.jdmpnum,
						'卖家退单':item.tdlpnum+item.tdmpnum,
						'刷单':item.tdsdlpnum+item.tdsdmpnum,
						'买家退单':item.tdcdlpnum+item.tdcdmpnum
					});
					
					
					if(item.ifcurday==1){  //判断是否是今日
						daydata={
							dayjdlpnum:item.jdlpnum,
							dayjdmpnum:item.jdmpnum,
							daytdlpnum:item.tdlpnum,
							daytdmpnum:item.tdmpnum,
							daysdlpnum:item.tdsdlpnum,
							daysdmpnum:item.tdsdmpnum,
							daycdlpnum:item.tdcdlpnum,
							daycdmpnum:item.tdcdmpnum
						}
					}
					
					monthjdlpnum+=item.jdlpnum;
					monthjdmpnum+=item.jdmpnum;
					monthtdlpnum+=item.tdlpnum;
					monthtdmpnum+=item.tdmpnum;
					monthsdlpnum+=item.tdsdlpnum;
					monthsdmpnum+=item.tdsdmpnum;
					monthcdlpnum+=item.tdcdlpnum;
					monthcdmpnum+=item.tdcdmpnum;
					
				});
				let monthdata={
					monthjdlpnum,
					monthjdmpnum,
					monthtdlpnum,
					monthtdmpnum,
					monthsdlpnum,
					monthsdmpnum,
					monthcdlpnum,
					monthcdmpnum
				}
				
				this.seleUserListInfo=[];
				this.seleUserListInfo.push(daydata,monthdata,selerUserInfo);
			},
			//获取买家端用户列表
			getBuyerUser(newpagination){
				if(newpagination){
					this.pagination={
						index:newpagination.index,
						size:newpagination.size
					}
				}
				let {index,size}=this.buyerpagination;
				this.$api.getMMJUserList({pageindex:index,len:size}).then(res=>{
					++this.bodyloading
					if(res!=''){
						this.buyerUserList=res;
						let rid=res.rows[0].userid
						this.getBuyerinfodata(rid);
					}
				}).catch(xhr=>{
					
				})
			},
			//获取买家端人员本月数据
			getBuyerinfodata(userid){
				if(this.buyerAllUserInfo[userid]!=undefined){
					this.buyerUserInfoData(this.buyerAllUserInfo[userid]);
				}else{
					this.$api.getMMJCurMonthCPOrderDetailNums({userid}).then(res=>{
						if(res!=''){
							this.buyerAllUserInfo[userid]=res.monthViews;
							this.buyerUserInfoData(res.monthViews);
						}
					}).catch(xhr=>{
						
					})
				}
			},
			//买家端人员数据解析
			buyerUserInfoData(data){
				//let sdnum,cdnum,date; //构建折射图数据所需字段
				//let dayjdlpnum,dayjdmpnum,daytdlpnum,daytdmpnum,daysdlpnum,daysdmpnum,daycdlpnum,daycdmpnum;  //今日数据
				let monthsdlpnum=0,monthsdmpnum=0,monthcdlpnum=0,monthcdmpnum=0; //本月数据
				let daydata={}; //今日数据
				let selerUserInfo={
					columns:['日期','刷单','退单'],
					rows:[]
				}
				data.forEach(item=>{
					selerUserInfo.rows.push({
						'日期':item.day.slice(5),
						'刷单':item.lpnum+item.mpnum,
						'退单':item.clpnum+item.cmpnum
					});
					
					
					if(item.ifcurday==1){  //判断是否是今日
						daydata.daysdlpnum=item.lpnum;
						daydata.daysdmpnum=item.mpnum;
						daydata.daycdlpnum=item.clpnum;
						daydata.daycdmpnum=item.cmpnum;
					}
					
					monthsdlpnum+=item.lpnum;
					monthsdmpnum+=item.mpnum;
					monthcdlpnum+=item.clpnum;
					monthcdmpnum+=item.cmpnum;
					
				});
				let monthdata={
					monthsdlpnum,
					monthsdmpnum,
					monthcdlpnum,
					monthcdmpnum
				}
				
				this.buyerUserListInfo=[];
				this.buyerUserListInfo.push(daydata,monthdata,selerUserInfo);
			},
			//打开收入审核页面
			pushOpen(){
				this.$router.push({path:'/audit'})
				let item={
					path:'/audit',
					name: '收入审核',
					icon: 'audit'
				}
				this.$store.commit('tagsView/selectMenu', item)
			},
			//打开支出处理页面
			pushOpenFK(){
				this.$router.push({path:'/expenditure'})
				let item={
					path:'/expenditure',
					name: '支出处理',
					icon: 'expenditure'
				}
				this.$store.commit('tagsView/selectMenu', item)
			}
		}
	})
</script>

<style scoped>
	@import url("../../../../assets/css/summary.css");
	.bodybj{background-color: #f7f7f7;margin: -20px;color: #222;overflow: hidden;font-size: 14px;}
	.month-total{height: 250px;}
	.month-finance{height: 100px;}
	.today-title>h5{font-size: 16px;font-weight: normal;}
	.month-line{height:350px;}
	.userdesc-data{height: 400px;}
	.month-total-item{text-align: center;margin-bottom: 40px;}
	.month-total-item h4{font-weight: normal;color: #666;}
	.month-total-item p{color: #1A86EE;font-size:36px;margin:5px 0;}
	.month-total-item span{color:#ccc;font-size:12px;}
	.prompt{height: auto;}
	.prompt p{padding-right: 40px;display: inline-block;}
	.prompt p a{padding-left: 10px;color: red;cursor: pointer;}
</style>
