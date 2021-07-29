<template>
	<div class="bodybj" v-loading="loading">
		<div class="sel-month">
			<div class="sel-month-info">月份汇总数据查询：当前月份:{{month}}</div>
			<div class="sel-month-inp">
				<el-date-picker v-model="month" type="month" placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
				<el-button type="primary" @click="search">查询</el-button>
			</div>
		</div>
		<div>
			<el-row>
				<el-col :span="8">
					<div class="one-today public-statue">
						<div class="today-title">
							<h5>本月数据</h5>
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
		<div class="public-statue userdata user-auto">
			<div class="today-title">
				<h5>卖家端</h5>
			</div>
			<div>
				<el-row :gutter="20">
					<el-col :span="6" v-for="(item,index) in selerUserData" :key="index">
						<div class="seler-user">
							<h5>{{item[0]}}</h5>
							<ul>
								<!-- <li>
									<p>新增产品：</p>
									<span>{{item[5]}}</span>
								</li> -->
								<li>
									<p>接单：</p>
									<em>(免：{{item[1]}}  留：{{item[2]}})</em>
									<span>{{Number(item[1])+Number(item[2])}}</span>
								</li>
								<li>
									<p>卖家退单：</p>
									<em>(免：{{item[3]}}  留：{{item[4]}})</em>
									<span>{{Number(item[3])+Number(item[4])}}</span>
								</li>
								<li>
									<p>刷单：</p>
									<em>(免：{{item[9]}}  留：{{item[10]}})</em>
									<span>{{Number(item[9])+Number(item[10])}}</span>
								</li>
								<li>
									<p>买家退单：</p>
									<em>(免：{{item[11]}}  留：{{item[12]}})</em>
									<span>{{Number(item[11])+Number(item[12])}}</span>
								</li>
								<li>
									<p>损失金额</p>
									<span>{{item[19]}}</span>
								</li>
								<!-- <li>
									<p>薪资</p>
									<span class="wage-txt">{{item[20]}}</span>
								</li> -->
							</ul>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="public-statue userdata user-auto">
			<div class="today-title">
				<h5>买家端</h5>
			</div>
			<div>
				<el-row :gutter="20">
					<el-col :span="6" v-for="(item,index) in buyerUserData" :key="index">
						<div class="seler-user">
							<h5>{{item[0]}}</h5>
							<ul>
								<li>
									<p>刷单：</p>
									<em>(免：{{item[1]}}  留：{{item[2]}})</em>
									<span>{{Number(item[1])+Number(item[2])}}</span>
								</li>
								<li>
									<p>中介刷单数：</p>
									<em>(免：{{item[8]}}  留：{{item[9]}})</em>
									<span>{{Number(item[3])}}</span>
								</li>
								<li>
									<p>个人刷单数：</p>
									<em>(免：{{item[12]}}  留：{{item[13]}})</em>
									<span>{{Number(item[4])}}</span>
								</li>
								<li>
									<p>退单：</p>
									<em>(免：{{item[6]}}  留：{{item[7]}})</em>
									<span>{{Number(item[6])+Number(item[7])}}</span>
								</li>
								<li>
									<p>中介退单：</p>
									<em>(免：{{item[10]}}  留：{{item[11]}})</em>
									<span>{{Number(item[10])+Number(item[11])}}</span>
								</li>
								<li>
									<p>个人退单：</p>
									<em>(免：{{item[14]}}  留：{{item[15]}})</em>
									<span>{{Number(item[14])+Number(item[15])}}</span>
								</li>
								<li>
									<p>损失金额</p>
									<span>{{item[16]}}</span>
								</li>
								<li>
									<p>自费金额</p>
									<span>{{item[17]}}</span>
								</li>
								<!-- <li>
									<p>薪资</p>
									<span class="wage-txt">{{item[17]}}</span>
								</li> -->
							</ul>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		
		
		<div class="public-statue userdesc-data">
			<div class="today-title">
				<h5>卖家端成员数据详情</h5>
			</div>
			<UserMonthInfo :userList="selerUserList" :userListInfo="seleUserListInfo" :pagination="pagination" @getSelerinfodata="getSelerinfodata" @getSelerUser="getSelerUser" />
		</div>
		<div class="public-statue userdesc-data">
			<div class="today-title">
				<h5>买家端成员数据详情</h5>
			</div>
			<UserMonthInfo :userList="buyerUserList" :userListInfo="buyerUserListInfo" :pagination="buyerpagination" @getSelerinfodata="getBuyerinfodata" @getSelerUser="getBuyerUser" />
		</div>
		
		<div class="public-statue">
			<div class="today-title">
				<h5>本月盈利</h5>
			</div>
			<div>
				<div class="monthprofit">
					<ul>
						<li>收入金额</li>
						<li>-</li>
						<li>产品费返款</li>
						<li>-</li>
						<li>退单退款</li>
						<li>-</li>
						<li>佣金返款</li>
						<li>-</li>
						<li>退差价</li>
						<li>-</li>
						<li>损失金额</li>
						<li>-</li>
						<li>其他支出</li>
						<li>=</li>
						<li>利润</li>
					</ul>
					<ul>
						<li><el-input v-model="profitattr[0]" readonly="readonly" /></li>
						<li>-</li>
						<li><el-input v-model="profitattr[1]" readonly="readonly" /></li>
						<li>-</li>
						<li><el-input v-model="profitattr[8]" value="" readonly="readonly" /></li>
						<li>-</li>
						<li><el-input v-model="profitattr[2]" value="" readonly="readonly" /></li>
						<li>-</li>
						<li><el-input v-model="profitattr[3]" value="" readonly="readonly" /></li>
						<li>-</li>
						<li><el-input v-model="profitattr[4]" value="" readonly="readonly" /></li>
						<li>-</li>
						<li><el-input v-model="profitattr[5]" value="" readonly="readonly" /></li>
						<li>=</li>
						<li><el-input v-model="profitattr[6]" value="" readonly="readonly" /></li>
					</ul>
					<h5>其他支出说明：</h5>
					<p>{{profitattr[7]}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UserMonthInfo from '@/components/AdminHome/UserMonthInfo.vue'
	import VeLine from 'v-charts/lib/line'
	import OrderModule from '@/components/AdminHome/OrderModule.vue'
	import {DatePicker,Row,Col,Input} from 'element-ui'
	import InfoDisplay from '@/components/InfoDisplay'
	export default({
		name:'MonthSummary',
		components:{
			[VeLine.name]:VeLine,
			[DatePicker.name]:DatePicker,
			[Row.name]:Row,
			[Col.name]:Col,
			[Input.name]:Input,
			OrderModule,
			UserMonthInfo,
			InfoDisplay
		},
		data(){
			return{
				month:'',
				monthOrderData:[],
				monthfince:[],
				selerUserData:[],
				buyerUserData:[],
				profitattr:[],
				loading:true,
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
				buyerUserListInfo:[] ,//买家端人员详细数据,
				sellerUserId:'',  //选中卖家端用户id
				buyerUserId:''  ,//选中买家端用户id
				zfMoneyTotal:0  //自费总金额
			}
		},
		created() {
			let nowDate = new Date();
			let nowMonth = nowDate.getMonth();
			let nowYear = nowDate.getFullYear();
			if (nowMonth == "0") {
				nowYear = eval(nowYear) - 1;
				nowMonth = 12;
			}
			nowMonth = nowMonth < 9 ? "0" + nowMonth : nowMonth;
			let month = nowYear + "-" + nowMonth;
			this.month=month;
			this.getdata2(month)
			
			
			this.getSelerUser();
			this.getBuyerUser();
		},
		methods:{
			getdata1(month){
				this.$api.getCWTotalMonthData1({month}).then(data=>{
					// console.log(res);
					//本月数据
					this.monthOrderData=[  
						{  
							'title':'本月接单',
							'lpnum':data.monthlpnum,
							'mpnum':data.monthmpnum 
						},
						{
							'title':'本月商家退单',
							'lpnum':data.monthtdlpnum,
							'mpnum':data.monthtdmpnum
						},
						{
							'title':'本月刷单',
							'lpnum':data.monthsdlpnum,
							'mpnum':data.monthsdmpnum
						},
						{
							'title':'本月买家退单',
							'lpnum':data.monthcdlpnum,
							'mpnum':data.monthcdmpnum
						}
					]
					
					let skmoney=(data.monthsktotalmoney).toFixed(2); //本月收款金额
					let fkpmoney=(data.monthwxfktotalmoney+data.monthppfktotalmoney+data.monthyyfktotalmoney+data.monthzfbfktotalmoney).toFixed(2); //本月产品费返款
					let fkyjmoney=(data.monthzfbyjfktotalmoney + data.monthyyyjfktotalmoney + data.monthppyjfktotalmoney + data.monthwxyjfktotalmoney).toFixed(2); //本月佣金返款
					let fktkmoney=(data.monthtdtktotalmoney).toFixed(2); //本月退款
					let fkcjmoney=(data.monthtcjtotalmoney).toFixed(2); //本月退差价
					let fktcjmoney=(data.monthbcjtotalmoney).toFixed(2); //本月补差价
					let outmoney=(data.outmoney).toFixed(2); //本月损失金额
					let outhermoney=eval(data.monthOutLay).toFixed(2); //本月其他支出
					let profit=(skmoney-fkpmoney-fktkmoney-fkyjmoney-fkcjmoney-outmoney-outhermoney).toFixed(2)  //利润
					let remark=data.monthOutLayRemark //备注
					
					
					const monthfince=[
						{
							'title':'本月收款金额',
							'money':skmoney
						},
						{
							'title':'本月产品费返款',
							'money':fkpmoney
						},
						{
							'title':'本月佣金返款',
							'money':fkyjmoney
						},
						{
							'title':'本月退差价',
							'money':fkcjmoney,
							'txt':`单数：${data.monthtcjnum }`
						},
						{
							'title':'本月补差价',
							'money':fktcjmoney,
							'txt':`单数：${data.monthbcjnum }`
						},
						{
							'title':'本月损失(人民币)/自费金额(美元)',
							'money':`${outmoney} / ${this.zfMoneyTotal}`
						}
					];
					this.monthfince=monthfince;
					this.profitattr=[skmoney,fkpmoney,fkyjmoney,fkcjmoney,outmoney,outhermoney,profit,remark,fktkmoney]
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			getdata2(month){
				this.$api.getCWTotalMonthData2({month}).then(res=>{
					//console.log(res);
					let sellerUserData=[];
					
					res.sellerdata.forEach(item=>{
						let attr=item.userdata.split(',');
						
						let outmoney=0;
						
						res.outmoneydata.forEach(attrdata=>{
							if(attrdata.userid==item.userid){
								outmoney=eval(attrdata.userdata).toFixed(2);
							}
						})
						attr.push(outmoney);
						
						// //计算薪资
						// let zmpnum = attr[9] - attr[11] - (attr[13] - attr[15]) - attr[17];  //总的免评单
						// let zlpnum = attr[10] - attr[12] - (attr[14] - attr[16]) - attr[18];  //总的留评单
						// let totalnum = eval(zmpnum) + eval(zlpnum);
						// let mpmoney = 0;
						// let lpmoney = 0;
						// let showtxt = "";
						// if (totalnum < 1032) {
						// 	showtxt = "有底薪方案";
						// } else if (1032 <= totalnum < 1500) {
						// 	mpmoney = zmpnum * 1.38;
						// 	lpmoney = zlpnum * 3.875;
						// } else if (1500 <= totalnum < 1999) {
						// 	mpmoney = zmpnum * 1.43;
						// 	lpmoney = zlpnum * 4;
						// } else if (2000 <= totalnum < 2999) {
						// 	mpmoney = zmpnum * 1.47;
						// 	lpmoney = zlpnum * 4.125;
						// } else if (3000 <= totalnum < 4999) {
						// 	mpmoney = zmpnum * 1.52;
						// 	lpmoney = zlpnum * 4.25;
						// } else {
						// 	mpmoney = zmpnum * 1.56;
						// 	lpmoney = zlpnum * 4.375;
						// }
						// if (showtxt == '') {
						// 	showtxt = mpmoney + lpmoney;
						// 	showtxt = eval(showtxt).toFixed(2);
						// }
						// attr.push(showtxt);
						
						sellerUserData.push(attr);
					});
					this.selerUserData=sellerUserData;
					
					let buyerUserData=[];
					var zfMoneyTotal=0
					res.buyerdata.forEach(item=>{
						let attr=item.userdata.split(',');
						
						let outmoney=0;
						let savemoneydata=0;
						res.outmoneydata.forEach(attrdata=>{
							if(attrdata.userid==item.userid){
								outmoney=Number(attrdata.userdata).toFixed(2);
							}
						})
						res.savemoneydata.forEach(attrdata=>{
							if(attrdata.userid==item.userid){
								savemoneydata=Number(attrdata.userdata).toFixed(2);
								zfMoneyTotal+=Number(savemoneydata);
							}
						})
						attr.push(outmoney,savemoneydata);

						buyerUserData.push(attr);
					});
					
					this.zfMoneyTotal=zfMoneyTotal;
					this.getdata1(month)
					this.buyerUserData=buyerUserData;
					this.loading=false;
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
				}).catch(xhr=>{
					
				})
			},
			//获取卖家端人员本月数据
			getSelerinfodata(rid){
				this.buyerUserId=rid;
				if(this.selerAllUserInfo[rid]!=undefined){
					this.selerUserInfoData(this.selerAllUserInfo[rid]);
				}else{
					this.$api.getMJMonthCPOrderDetailNums({userid:rid,month:this.month}).then(res=>{
						if(res!=''){
							this.selerAllUserInfo[rid]=res.monthViews;
							this.selerUserInfoData(res.monthViews);
						}
					}).catch(xhr=>{
						
					})
				}
			},
			//解析卖家端用户数据
			selerUserInfoData(data){
				//let jdnum,tdnum,sdnum,cdnum,date; //构建折射图数据所需字段
				//let dayjdlpnum,dayjdmpnum,daytdlpnum,daytdmpnum,daysdlpnum,daysdmpnum,daycdlpnum,daycdmpnum;  //今日数据
				let monthjdlpnum=0,monthjdmpnum=0,monthtdlpnum=0,monthtdmpnum=0,monthsdlpnum=0,monthsdmpnum=0,monthcdlpnum=0,monthcdmpnum=0; //本月数据
				let daydata={},monthdata={}; //今日数据
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
				monthdata={
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
					this.buyerpagination={
						index:newpagination.index,
						size:newpagination.size
					}
				}
				
				let {index,size}=this.buyerpagination;
				this.$api.getMMJUserList({pageindex:index,len:size}).then(res=>{
					if(res!=''){
						this.buyerUserList=res;
						let rid=res.rows[0].userid
						this.getBuyerinfodata(rid);
					}
				}).catch(xhr=>{
					
				})
			},
			//获取买家端人员本月数据
			getBuyerinfodata(rid){
				this.sellerUserId=rid;
				if(this.buyerAllUserInfo[rid]!=undefined){
					this.buyerUserInfoData(this.buyerAllUserInfo[rid]);
				}else{
					this.$api.getMMJMonthCPOrderDetailNums({userid:rid,month:this.month}).then(res=>{
						if(res!=''){
							this.buyerAllUserInfo[rid]=res.monthViews;
							this.buyerUserInfoData(res.monthViews);
						}
					}).catch(xhr=>{
						
					})
				}
			},
			//买家端人员数据解析
			buyerUserInfoData(data){
				let sdnum,cdnum,date; //构建折射图数据所需字段
				//let dayjdlpnum,dayjdmpnum,daytdlpnum,daytdmpnum,daysdlpnum,daysdmpnum,daycdlpnum,daycdmpnum;  //今日数据
				let monthsdlpnum=0,monthsdmpnum=0,monthcdlpnum=0,monthcdmpnum=0; //本月数据
				let daydata={},monthdata={}; //今日数据
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
						daydata={
							daysdlpnum:item.lpnum,
							daysdmpnum:item.mpnum,
							daycdlpnum:item.clpnum,
							daycdmpnum:item.cmpnum
						}
					}
					
					monthsdlpnum+=item.lpnum;
					monthsdmpnum+=item.mpnum;
					monthcdlpnum+=item.clpnum;
					monthcdmpnum+=item.cmpnum;
					
				});
				monthdata={
					monthsdlpnum,
					monthsdmpnum,
					monthcdlpnum,
					monthcdmpnum
				}
				
				this.buyerUserListInfo=[];
				this.buyerUserListInfo.push(daydata,monthdata,selerUserInfo);
			},
			search(){
				let month=this.month;
				this.buyerAllUserInfo={};
				this.selerAllUserInfo={}
				this.loading=true;
				this.getdata1(month)
				this.getdata2(month)
				this.getBuyerinfodata(this.sellerUserId);
				this.getSelerinfodata(this.buyerUserId);
			}
		}
	})
</script>

<style scoped>
	@import url("../../../../assets/css/summary.css");
</style>
