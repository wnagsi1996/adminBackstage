<template>
	<div class="bodybj" v-loading="bodyLoading">
		<div>
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
				 <el-col :span="8">
					 <div class="one-today public-statue">
					 	<div class="today-title">
					 		<h5>进度条</h5>
					 	</div>
						<div class="today-desc">
							<el-row :gutter="20" v-if="summarytotalData.length!=0">
								<el-col :span="11">
									<div class="today-desc-total">
										<h4>卖家端</h4>
										<p>本月目标：{{summarytotalData[1].aims}}，接单：{{summarytotalData[1].jdnum}}，退单:{{summarytotalData[1].tdnum}}，实际完成:{{summarytotalData[1].jdnum-summarytotalData[1].tdnum}}</p>
										<el-progress class="progress" type="circle" :color="summarytotalData[1].SelerPercentage | progressbarColor" :percentage="summarytotalData[1].SelerPercentage"></el-progress>
									</div>
								</el-col>
								<el-col :span="11">
									<div class="today-desc-total">
										<h4>买家端</h4>
										<p>本月目标：{{summarytotalData[0].aims}}，刷单：{{summarytotalData[0].sdnum}}，退单:{{summarytotalData[0].cdnum}}，实际完成:{{summarytotalData[0].sdnum-summarytotalData[0].cdnum}}</p>
										<el-progress class="progress" type="circle" :color="summarytotalData[0].BuyerPercentage | progressbarColor" :percentage="summarytotalData[0].BuyerPercentage"></el-progress>
									</div>
								</el-col>
								<el-col :span="2">
									<div class="setting">
										<el-tooltip class="item" effect="dark" content="设置返款手续费和汇率" placement="left-start">
											<i class="el-icon-printer" @click="settingFess"></i>
										</el-tooltip>
										<el-tooltip class="item" effect="dark" content="刷新" placement="left-start">
											<i class="el-icon-refresh-left" @click="refresh()"></i>
										</el-tooltip>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				 </el-col>
			</el-row>
			
			
			<el-row>
				<el-col :span="20">
					<!-- 本月折线图 -->
					<div class="month-line public-statue">
						<ve-line v-if='Object.keys(monthLineData).length > 0' :data="monthLineData" class="line"></ve-line>
					</div>	
				</el-col>
				<el-col :span="4">
					<div class="month-line public-statue">
						<div class="buyer-order-desc" v-if="summarytotalData.length!=0">
							<h4>本月刷单</h4>
							<ul>
								<li><span>中介：</span><span>{{summarytotalData[0].sdnum_zj}}</span></li>
								<li><span>个人：</span><span>{{summarytotalData[0].sdnum-summarytotalData[0].sdnum_zj}}</span></li>
							</ul>
							<h4 class="back">本月退单</h4>
							<ul>
								<li><span>中介：</span><span>{{summarytotalData[0].cdnum_zj}}</span></li>
								<li><span>个人：</span><span>{{summarytotalData[0].cdnum-summarytotalData[0].cdnum_zj}}</span></li>
							</ul>
						</div>
					</div>
				</el-col>
			</el-row>
				
			
			
			<!-- 五个模块的汇总数据 -->
			<div class="total-summary" v-if="Object.keys(totalDataInfo).length > 0">
				<div class="summary5">
					<div class="summary5-left">
						<h5>待刷订单</h5>
						<p>{{totalDataInfo.totalwaitmpordernum+totalDataInfo.totalwaitlpordernum}}</p>
						<span>免：{{totalDataInfo.totalwaitmpordernum}}，留：{{totalDataInfo.totalwaitlpordernum}}</span>
					</div>
					<div class="summary5-right">
						<i class="el-icon-document"></i>
					</div>
				</div>
				<div class="summary5">
					<div class="summary5-left">
						<h5>待刷产品</h5>
						<p>{{totalDataInfo.totalwaitproductnum}}</p>
					</div>
					<div class="summary5-right">
						<i class="el-icon-suitcase"></i>
					</div>
				</div>
				<div class="summary5">
					<div class="summary5-left">
						<h5>未收金额（人民币）</h5>
						<p>{{totalDataInfo.wskmoney}}</p>
					</div>
					<div class="summary5-right">
						<i class="el-icon-money"></i>
					</div>
				</div>
				<div class="summary5">
					<div class="summary5-left">
						<h5>理论应返款最低金额（美金）</h5>
						<p>{{totalDataInfo.minyfmoney}}</p>
					</div>
					<div class="summary5-right">
						<i class="el-icon-goblet-square"></i>
					</div>
				</div>
				<div class="summary5">
					<div class="summary5-left">
						<h5>理论应返款最大金额（美金）</h5>
						<p>{{totalDataInfo.maxyfmoney}}</p>
					</div>
					<div class="summary5-right">
						<i class="el-icon-goblet-square-full"></i>
					</div>
				</div>
			</div>
			
			<!-- 买卖家端截至本月汇总数据 -->
			<el-row>
				<el-col :span="12">
					<div class="usermonth public-statue">
						<div class="today-title">
							<h5>卖家端</h5>
						</div>
						<div class="usermonth1">
							<div class="usermonth-info-desc" v-if="selerInfo.length!=0" v-for="(item,index) in selerInfo" :key='index'>
								<div class="usermonth-desc-left">
									<p>{{item.username}}</p>
								</div>
								<div class="usermonth-desc-center">
									<div class="usermonth-desc-data"><span>总待刷产品:</span>{{item.totalproductnum}}</div>
									<div class="usermonth-desc-data"><span>总待刷订单:</span>{{item.totalorder}}</div>
									<div class="usermonth-desc-data"><span>本月目标:</span>{{item.plantnum}}</div>
									<div class="usermonth-desc-data"><span>本月接单:</span>{{item.jdnum}}</div>
									<div class="usermonth-desc-data"><span>本月退单:</span>{{item.tdnum}}</div>
									<div class="usermonth-desc-data"><span>本月刷单:</span>{{item.sdnum}}</div>
									<div class="usermonth-desc-data"><span>本月撤单:</span>{{item.cdnum}}</div>
									<div class="usermonth-desc-data"><span>本月损失:</span>{{item.outmoney}}</div>
								</div>
								<div class="usermonth-desc-right" v-if="item.plantnum!=0">
									<el-progress v-if="!isNaN(item.proportion)" type="circle" :color="item.proportion | progressbarColor" :percentage="item.proportion>100?100:item.proportion" :width="80"></el-progress>
								</div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="usermonth public-statue">
						<div class="today-title">
							<h5>买家端</h5>
						</div>
						<div class="usermonth1">
							<div class="usermonth-info-desc" v-if="buyerInfo.length!=0" v-for="(item,index) in buyerInfo" :key='index'>
								<div class="usermonth-desc-left">
									<p>{{item.username}}</p>
								</div>
								<div class="usermonth-desc-center">
									<div class="usermonth-desc-data"><span>本月目标:</span>{{item.plantnum}}</div>
									<div class="usermonth-desc-data"><span>今日接单:</span>{{item.jdnum}}</div>
									<div class="usermonth-desc-data"><span>本月刷单:</span>{{item.sdnum}}</div>
									<div class="usermonth-desc-data"><span>本月撤单:</span>{{item.cdnum}}</div>
									<div class="usermonth-desc-data"><span>本月中介刷单:</span>{{item.sdnum_zj}}</div>
									<div class="usermonth-desc-data"><span>本月个人刷单:</span>{{item.sdnum-item.sdnum_zj}}</div>
									<div class="usermonth-desc-data"><span>本月中介撤单:</span>{{item.cdnum_zj}}</div>
									<div class="usermonth-desc-data"><span>本月个人撤单:</span>{{item.cdnum-item.cdnum_zj}}</div>
									<div class="usermonth-desc-data"><span>本月损失:</span>{{item.outmoney}}</div>
								</div>
								<div class="usermonth-desc-right" v-if="item.plantnum!=0">
									<el-progress v-if="!isNaN(item.proportion)" type="circle" :color="item.proportion | progressbarColor" :percentage="item.proportion>100?100:item.proportion" :width="80"></el-progress>
								</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			
			<!-- 买卖家端本月数据走势图 -->
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
		</div>
		
		<!-- 弹出框设置返款手续费和汇率 -->
		<el-dialog title="设置返款手续费和汇率" :visible.sync="dialogVisible" width="30%">
		  <div>
			  <el-form ref="formLabelAlign" label-width="80px" :rules="formLabelAlignRules" :model="formLabelAlign">
			    <el-form-item label="手续费">
			      <el-input v-model="formLabelAlign.fess"></el-input>
			    </el-form-item>
			    <el-form-item label="汇率">
			      <el-input v-model="formLabelAlign.exchange"></el-input>
			    </el-form-item>
			  </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="settingPrimary">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import UserMonthInfo from '@/components/AdminHome/UserMonthInfo.vue'
	import OrderModule from '@/components/AdminHome/OrderModule.vue'
	import VeLine from 'v-charts/lib/line'
	import {Form,Row,Col,Dialog,FormItem,Input,Tooltip,Progress} from 'element-ui'
	export default({
		name:'Home',
		components:{
			[VeLine.name]:VeLine,
			OrderModule,
			UserMonthInfo,
			[Form.name]:Form,
			[Row.name]:Row,
			[Col.name]:Col,
			[Dialog.name]:Dialog,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Tooltip.name]:Tooltip,
			[Progress.name]:Progress
		},
		data(){
			return{
				summaryOrderData:[]   ,//今日汇总和本月汇总数据
				summarytotalData:[]   ,//目标汇总
				monthLineData:{}  ,//月份折线图数据
				totalDataInfo:{},   //五个模块数据
				selerInfo:[],    //卖家成员本月数据
				buyerInfo:[]   ,//买家成员本月数据
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
				bodyLoading:true, //加载状态
				buyerAllUserInfo:{}, //买家各个成员数据
				buyerUserList:{},//买家端人员列表
				buyerUserListInfo:[] ,//买家端人员详细数据
				formLabelAlign:{
					fess:'',
					exchange:''
				},
				dialogVisible:false,
				formLabelAlignRules:{
					fess:[
						{ required: true, message: '请输入返款手续费', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '返款手续费必须为数字' }
					],
					exchange:[
						{ required: true, message: '请输入汇率', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '汇率必须为数字' }
					]
				},
				
			}
		},
		async created() {
			await this.getdata();
			await this.getdata1();
			await this.getSelerUser();
			await this.getBuyerUser();
			//this.bodyLoading=false;
			setInterval(()=>{
				this.refresh()
			},600000);
		},
		methods:{
			getdata(){
				this.$api.getManagerTotalData().then(data=>{
					//console.log(res);
					//买家端目标/卖家端目标
					let	BuyermonthAims=0,SellermonthAims=0;
					//接单/卖家退单/刷单/买家退单/刷单中介/撤单中介
					let jdNum=0,tdNum=0,sdNum=0,cdNum=0,sdNum_zj=0,cdNum_zj=0;
					//买家完成百分比/卖家百分比
					let BuyerPercentage,SelerPercentage;
					
					let selerInfo=[],buyerInfo=[];
					
					//遍历买家数据
					data.curmonthsdtdnums.forEach(n=>{  
						BuyermonthAims+=n.plantnum;
						sdNum+=n.sdnum;
						cdNum+=n.cdnum;
						sdNum_zj+=n.sdnum_zj;
						cdNum_zj+=n.cdnum_zj;
						
						//遍历买家目标
						data.todaybuyerjdnums.forEach(nn=>{
							let outmoneydata=0;
							//遍历买家损失金额成员
							data.outmoneydata.forEach(nnn=>{
								if (nnn.userid == n.userid){
									outmoneydata = eval(nnn.userdata);
								}
							})
							if (n.username == nn.username) {
								let proportion=eval(((n.sdnum-n.cdnum)/n.plantnum*100).toFixed(2));
								buyerInfo.push({
									'username':n.username,
									'plantnum':n.plantnum,
									'jdnum':nn.jdnum,
									'sdnum':n.sdnum,
									'sdnum_zj':n.sdnum_zj,
									'cdnum':n.cdnum,
									'cdnum_zj':n.cdnum_zj,
									'outmoney':outmoneydata.toFixed(2),
									'proportion':proportion<0?0:proportion
								})
							}
						})
					});
					BuyerPercentage=eval(((sdNum-cdNum)/BuyermonthAims*100).toFixed(2));
					
					this.buyerInfo=buyerInfo;
					//遍历卖家数据
					data.curmonthjdtdnums.forEach(n=>{
						SellermonthAims+=n.plantnum;
						jdNum+=n.jdnum;
						tdNum+=n.tdnum;
						//遍历卖家待刷产品和订单
						data.totalsellerwaitnums.forEach(nn=>{
							let outmoneydata=0;
							//遍历卖家损失金额的成员
							data.outmoneydata.forEach(nnn=>{
								 if (nnn.userid == n.userid){
									 outmoneydata = eval(nnn.userdata);
								 }                
							})
							if (n.username == nn.username) {
								let proportion=eval(((n.jdnum-n.tdnum)/n.plantnum*100).toFixed(2));
								selerInfo.push({
									'username':n.username,
									'totalproductnum':nn.jdpnum,
									'totalorder':nn.jdnum,
									'plantnum':n.plantnum,
									'jdnum':n.jdnum,
									'tdnum':n.tdnum,
									'sdnum':n.sdnum,
									'cdnum':n.cdnum,
									'outmoney':outmoneydata.toFixed(2),
									'proportion':proportion<0?0:proportion
								})
							}
						})
						
					});
					SelerPercentage=eval(((jdNum-tdNum)/SellermonthAims*100).toFixed(2));
					//console.log(selerInfo)
					this.selerInfo=selerInfo;
					
					//生成目标信息展示数据
					this.summarytotalData.push({
						'aims':BuyermonthAims,
						'sdnum':sdNum,
						'sdnum_zj':sdNum_zj,
						'cdnum':cdNum,
						'cdnum_zj':cdNum_zj,
						'BuyerPercentage':BuyerPercentage<0?0:BuyerPercentage
					},{
						'aims':SellermonthAims,
						'jdnum':jdNum,
						'tdnum':tdNum,
						'SelerPercentage':SelerPercentage<0?0:SelerPercentage
					});
					console.log(this.summarytotalData)
					//构造5个模块的数据
					const totaldatainfo={
						'totalwaitmpordernum':data.totalwaitmpordernum,
						'totalwaitlpordernum':data.totalwaitlpordernum,
						'totalwaitproductnum':data.totalwaitproductnum,
						'wskmoney':data.wskmoney,
						'minyfmoney':data.minyfmoney,
						'maxyfmoney':data.maxyfmoney
					};
					this.totalDataInfo=totaldatainfo;
				}).catch(xhr=>{
					console.log(xhr)
				})

			},
			//月份每一天数据
			getdata1(){
				this.$api.getCurMonthCPOrderDetailNums().then(data=>{
					//console.log(res);
					//今日接单免评/留评/刷单免评/留评/卖家退单免评/留评/买家退单免评/留评
					let todayJdMpNum,todayJdLpNum,todaySdMpNum,todaySdLpNum,todayTdMpNum,todayTdLpNum,todayCdMpNum,todayCdLpNum;
					
					//月份接单免评/留评/刷单免评/留评/卖家退单免评/留评/买家退单免评/留评
					let monthJdMpNum=0,monthJdLpNum=0,monthSdMpNum=0,monthSdLpNum=0,monthTdMpNum=0,monthTdLpNum=0,monthCdMpNum=0,monthCdLpNum=0;		
					
					//月份折线图数据
					let LineColumns=['日期','接单','卖家退单','刷单','买家退单']; //折线图标题
					let LineRow=[]; //折线图数据
					
					if(data!=''){
						data.monthViews.forEach(item=>{
							monthJdMpNum+=item.jdmpnum;
							monthJdLpNum+=item.jdlpnum;
							monthSdMpNum+=item.sdmpnum;
							monthSdLpNum+=item.sdlpnum;
							monthTdMpNum+=item.tdmpnum;
							monthTdLpNum+=item.tdlpnum;
							monthCdMpNum+=item.cdmpnum;
							monthCdLpNum+=item.cdlpnum;
							if(item.ifcurday==1){
								todayJdMpNum=item.jdmpnum;
								todayJdLpNum=item.jdlpnum;
								todaySdMpNum=item.sdmpnum;
								todaySdLpNum=item.sdlpnum;
								todayTdMpNum=item.tdmpnum;
								todayTdLpNum=item.tdlpnum;
								todayCdMpNum=item.cdmpnum;
								todayCdLpNum=item.cdlpnum;
							}
							
							let date = item.day.slice(5);
							
							LineRow.push({
								"日期":date,
								"接单":item.jdmpnum+item.jdlpnum,
								"卖家退单":item.tdmpnum+item.tdlpnum,
								"刷单":item.sdmpnum+item.sdlpnum,
								"买家退单":item.cdmpnum+item.cdlpnum
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
					
					this.summaryOrderData.push(todayData,monthData);

					this.monthLineData.columns=LineColumns;
					this.monthLineData.rows=LineRow;
					
					}else{
						console.log('数据加载失败')
					}
				}).catch(xhr=>{
					console.log(xhr)
				})
			},
			getSelerUser(newpagination){
				if(newpagination){
					this.pagination.index=newpagination.index;
					this.pagination.size=newpagination.size;
				}
				this.$api.getMJUserList({pageindex:this.pagination.index,len:this.pagination.size}).then(data=>{
					if(data!=''){
						this.selerUserList=data;
						let rid=data.rows[0].userid
						this.getSelerinfodata(rid);
					}
				}).catch(xhr=>{
					
				})
			},
			//获取卖家端人员本月数据
			getSelerinfodata(rid){
				if(this.selerAllUserInfo[rid]!=undefined){
					this.selerUserInfoData(this.selerAllUserInfo[rid]);
				}else{
					this.$api.getMJCurMonthCPOrderDetailNums({userid:rid}).then(data=>{
					if(data!=''){
						this.selerAllUserInfo[rid]=data.monthViews;
						this.selerUserInfoData(data.monthViews);
					}
					}).catch(xhr=>{
						
					})
				}
			},
			//解析卖家端用户数据
			selerUserInfoData(data){
				let jdnum,tdnum,sdnum,cdnum,date; //构建折射图数据所需字段
				//let dayjdlpnum,dayjdmpnum,daytdlpnum,daytdmpnum,daysdlpnum,daysdmpnum,daycdlpnum,daycdmpnum;  //今日数据
				let monthjdlpnum=0,monthjdmpnum=0,monthtdlpnum=0,monthtdmpnum=0,monthsdlpnum=0,monthsdmpnum=0,monthcdlpnum=0,monthcdmpnum=0; //本月数据
				let daydata={},monthdata={}; //今日数据
				let selerUserInfo={
					columns:['日期','接单','卖家退单','刷单','买家退单'],
					rows:[]
				}
				data.forEach(item=>{
					jdnum=item.jdlpnum+item.jdmpnum;
					tdnum=item.tdlpnum+item.tdmpnum;
					sdnum=item.tdsdlpnum+item.tdsdmpnum;
					cdnum=item.tdcdlpnum+item.tdcdmpnum;
					date = item.day.slice(5);
					
					selerUserInfo.rows.push({
						'日期':date,
						'接单':jdnum,
						'卖家退单':tdnum,
						'刷单':sdnum,
						'买家退单':cdnum
					});
					
					
					if(item.ifcurday==1){  //判断是否是今日
						daydata.dayjdlpnum=item.jdlpnum;
						daydata.dayjdmpnum=item.jdmpnum;
						daydata.daytdlpnum=item.tdlpnum;
						daydata.daytdmpnum=item.tdmpnum;
						daydata.daysdlpnum=item.tdsdlpnum;
						daydata.daysdmpnum=item.tdsdmpnum;
						daydata.daycdlpnum=item.tdcdlpnum;
						daydata.daycdmpnum=item.tdcdmpnum;
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
				
				monthdata.monthjdlpnum=monthjdlpnum
				monthdata.monthjdmpnum=monthjdmpnum
				monthdata.monthtdlpnum=monthtdlpnum
				monthdata.monthtdmpnum=monthtdmpnum
				monthdata.monthsdlpnum=monthsdlpnum
				monthdata.monthsdmpnum=monthsdmpnum
				monthdata.monthcdlpnum=monthcdlpnum
				monthdata.monthcdmpnum=monthcdmpnum
				
				this.seleUserListInfo=[];
				this.seleUserListInfo.push(daydata,monthdata,selerUserInfo);
			},
			//获取买家端用户列表
			getBuyerUser(newpagination){
				if(newpagination){
					this.buyerpagination.index=newpagination.index;
					this.buyerpagination.size=newpagination.size;
				}
				this.$api.getMMJUserList({pageindex:this.buyerpagination.index,len:this.buyerpagination.size}).then(res=>{
					if(res!=''){
						this.buyerUserList=res;
						let rid=res.rows[0].userid
						this.getBuyerinfodata(rid);
					}
					this.bodyLoading=false;
				}).catch(err=>{
					this.bodyLoading=false;
				})
			},
			//获取买家端人员本月数据
			getBuyerinfodata(rid){
				if(this.buyerAllUserInfo[rid]!=undefined){
					this.buyerUserInfoData(this.buyerAllUserInfo[rid]);
				}else{
					//this.axios.get('/Handler/CPManageSystem.ashx?cmd=getMMJCurMonthCPOrderDetailNums&userid=' + rid).then(res=>{
					this.$api.getMMJCurMonthCPOrderDetailNums({userid:rid}).then(res=>{
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
					sdnum=item.lpnum+item.mpnum;
					cdnum=item.clpnum+item.cmpnum;
					date = item.day.slice(5);
					
					selerUserInfo.rows.push({
						'日期':date,
						'刷单':sdnum,
						'退单':cdnum
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
			
				monthdata.monthsdlpnum=monthsdlpnum
				monthdata.monthsdmpnum=monthsdmpnum
				monthdata.monthcdlpnum=monthcdlpnum
				monthdata.monthcdmpnum=monthcdmpnum
				
				this.buyerUserListInfo=[];
				this.buyerUserListInfo.push(daydata,monthdata,selerUserInfo);
			},
			//获取汇率信息
			settingFess(){
				this.dialogVisible=true
				this.$api.getUSDRate().then(res=>{
					//console.log(res);
					if(res!=''){
						let attr=res.split(',');
						this.formLabelAlign.fess=attr[0];
						this.formLabelAlign.exchange=attr[1];
					}else{
						this.$message({
							type: 'warning',
							message: '数据获取失败'
						});
					}
				}).catch(xhr=>{
					this.$message({
						type: 'warning',
						message: '数据获取失败'
					});
				})
			},
			//设置汇率
			settingPrimary(){
				this.$refs.formLabelAlign.validate(valid => {
					if(this.formLabelAlign.exchange>7.5 || this.formLabelAlign.exchange<6){
						this.$message({
							type: 'warning',
							message: '请输入6-7.5之间的汇率'
						});
					}else{
						this.$api.setUSDRate({usdrate:this.formLabelAlign.fess,usd2rmbrate:this.formLabelAlign.exchange}).then(res=>{
							if(res>0){
								this.$message({
									type: 'success',
									message: '设置成功'
								});
								this.dialogVisible=false;
							}else{
								this.$message({
									type: 'warning',
									message: '设置失败'
								});
							}
						}).catch(xhr=>{
							this.$message({
								type: 'warning',
								message: '设置失败'
							});
						})
					}
				})
			},
			//刷新页面
			async refresh(){
				this.bodyLoading=true
				await this.getdata();
				await this.getdata1();
				await this.getSelerUser();
				await this.getBuyerUser();
			}
		}
	})
</script>

<style>
	@import url("../../../../assets/css/summary.css");
	.buyer-order-desc h4{font-size: 16px;font-weight: normal;}
	.buyer-order-desc h4.back{margin-top: 28px;}
	.buyer-order-desc ul{margin-top: 8px;}
	.buyer-order-desc ul li{padding: 8px 0; display: flex;align-items: initial;}
	.buyer-order-desc ul li span{flex: 1;}
	.buyer-order-desc ul li span:last-child{text-align: right;color: #666;}
</style>
