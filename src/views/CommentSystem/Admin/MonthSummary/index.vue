<template>
	<div class="bodybj">
		<div class="sel-month">
			<div class="sel-month-info">月份汇总数据查询：当前月份:{{month}}</div>
			<div class="sel-month-inp">
				<el-date-picker v-model="month" type="month" placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
				<el-button type="primary" @click="search">查询</el-button>
			</div>
		</div>
		<el-row>
			<el-col :span="8">
				<div class="one-today public-statue">
					<div class="today-title">
						<h5>当月数据</h5>
					</div>
					<div class="today-desc">
						<OrderModule v-if="summaryOrderData.length>0" :orderdata="summaryOrderData" />
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
							<el-col :span="12">
								<div class="today-desc-total">
									<h4>卖家端</h4>
									<p>本月目标：{{summarytotalData[1].aims}}，接单：{{summarytotalData[1].jdnum}}，退单:{{summarytotalData[1].tdnum}}，实际完成:{{summarytotalData[1].jdnum-summarytotalData[1].tdnum}}</p>
									<el-progress class="progress" type="circle" :color="summarytotalData[1].SelerPercentage | progressbarColor"
									 :percentage="summarytotalData[1].SelerPercentage>100?100:Number(summarytotalData[1].SelerPercentage)"></el-progress>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="today-desc-total">
									<h4>买家端</h4>
									<p>本月目标：{{summarytotalData[0].aims}}，刷单：{{summarytotalData[0].sdnum}}，退单:{{summarytotalData[0].cdnum}}，实际完成:{{summarytotalData[0].sdnum-summarytotalData[0].cdnum}}</p>
									<el-progress class="progress" type="circle" :color="summarytotalData[0].BuyerPercentage | progressbarColor"
									 :percentage="summarytotalData[0].BuyerPercentage>100?100:Number(summarytotalData[0].BuyerPercentage)"></el-progress>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</el-col>
		</el-row>
		<!-- 折线图 -->
		<div class="month-line public-statue">
			<ve-line v-if='Object.keys(monthLineData).length > 0' :data="monthLineData" class="line"></ve-line>
		</div>

		<div class="public-statue userdesc-data">
			<div class="today-title">
				<h5>卖家端成员数据详情</h5>
			</div>
			<UserMonthInfo :userList="selerUserList" :userListInfo="seleUserListInfo" :pagination="pagination" @getSelerinfodata="getSelerinfodata"
			 @getSelerUser="getSelerUser" />
		</div>
		<div class="public-statue userdesc-data">
			<div class="today-title">
				<h5>买家端成员数据详情</h5>
			</div>
			<UserMonthInfo :userList="buyerUserList" :userListInfo="buyerUserListInfo" :pagination="buyerpagination"
			 @getSelerinfodata="getBuyerinfodata" @getSelerUser="getBuyerUser" />
		</div>
	</div>
</template>

<script>
	import UserMonthInfo from '@/components/AdminHome/UserMonthInfo.vue'
	import OrderModule from '@/components/AdminHome/OrderModule.vue'
	import VeLine from 'v-charts/lib/line'
	import {
		Row,
		Col,
		DatePicker,
		Progress
	} from 'element-ui'
	export default ({
		name: 'MonthSummary',
		components: {
			[VeLine.name]: VeLine,
			[Row.name]: Row,
			[Col.name]: Col,
			[DatePicker.name]: DatePicker,
			[Progress.name]: Progress,
			OrderModule,
			UserMonthInfo
		},
		data() {
			return {
				month: '',
				summaryOrderData: [], //本月汇总数据
				summarytotalData: [], //目标汇总
				monthLineData: {}, //月份折线图数据
				totalDataInfo: {}, //五个模块数据
				selerInfo: [], //卖家成员本月数据
				buyerInfo: [], //买家成员本月数据
				selerAllUserInfo: {}, //卖家各个成员数据
				selerUserList: {}, //卖家端人员列表
				seleUserListInfo: [], //卖家端人员详细数据
				pagination: { //卖家端用户列表分页
					index: 0,
					size: 12,
					total: 0
				},
				buyerpagination: { //买家端用户列表分页
					index: 0,
					size: 12,
					total: 0
				},
				buyerAllUserInfo: {}, //买家各个成员数据
				buyerUserList: {}, //买家端人员列表
				buyerUserListInfo: [], //买家端人员详细数据
				sellerUserId:'',  //选中卖家端用户id
				buyerUserId:''  //选中买家端用户id
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
			this.month = nowYear + "-" + nowMonth;
			this.getdata();
			this.getSelerUser();
			this.getBuyerUser();
		},
		methods: {
			getdata(month) {
				this.$api.getMonthCPOrderDetailNums({
					month: this.month
				}).then(res => {
					//console.log(res);
					//买家端目标/卖家端目标
					let BuyermonthAims = res.sellerPlantNum,
						SellermonthAims = res.buyerPlantNum;

					//月份接单免评/留评/刷单免评/留评/卖家退单免评/留评/买家退单免评/留评
					let monthJdMpNum = 0,
						monthJdLpNum = 0,
						monthSdMpNum = 0,
						monthSdLpNum = 0,
						monthTdMpNum = 0,
						monthTdLpNum = 0,
						monthCdMpNum = 0,
						monthCdLpNum = 0;

					//月份折线图数据
					let LineColumns = ['日期', '接单', '卖家退单', '刷单', '买家退单']; //折线图标题
					let LineRow = []; //折线图数据

					if (res != '') {
						res.monthViews.forEach(item => {
							monthJdMpNum += item.jdmpnum;
							monthJdLpNum += item.jdlpnum;
							monthSdMpNum += item.sdmpnum;
							monthSdLpNum += item.sdlpnum;
							monthTdMpNum += item.tdmpnum;
							monthTdLpNum += item.tdlpnum;
							monthCdMpNum += item.cdmpnum;
							monthCdLpNum += item.cdlpnum;

							let date = item.day.slice(5);

							LineRow.push({
								"日期": date,
								"接单": item.jdmpnum + item.jdlpnum,
								"卖家退单": item.tdmpnum + item.tdlpnum,
								"刷单": item.sdmpnum + item.sdlpnum,
								"买家退单": item.cdmpnum + item.cdlpnum
							})
						})


						//本月数据
						this.summaryOrderData = [{
								'title': '本月接单',
								'lpnum': monthJdLpNum,
								'mpnum': monthJdMpNum
							},
							{
								'title': '本月商家退单',
								'lpnum': monthTdLpNum,
								'mpnum': monthTdMpNum
							},
							{
								'title': '本月刷单',
								'lpnum': monthSdLpNum,
								'mpnum': monthSdMpNum
							},
							{
								'title': '本月买家退单',
								'lpnum': monthCdLpNum,
								'mpnum': monthCdMpNum
							}
						]
						Object.assign(this.monthLineData, {
							columns: LineColumns,
							rows: LineRow
						})

						//生成目标信息展示数据
						this.summarytotalData = [];
						this.summarytotalData.push({
							'aims': BuyermonthAims,
							'sdnum': monthSdLpNum + monthSdMpNum,
							'cdnum': monthCdLpNum + monthCdMpNum,
							'BuyerPercentage': (((monthSdLpNum + monthSdMpNum) - (monthCdLpNum + monthCdMpNum)) / BuyermonthAims * 100)
								.toFixed(2)
						}, {
							'aims': SellermonthAims,
							'jdnum': monthJdLpNum + monthJdMpNum,
							'tdnum': monthTdLpNum + monthTdMpNum,
							'SelerPercentage': (((monthJdLpNum + monthJdMpNum) - (monthTdLpNum + monthTdMpNum)) / BuyermonthAims * 100)
								.toFixed(2)
						});

					} else {
						console.log('数据加载失败')
					}
				}).catch(xhr => {
					console.log(xhr)
				})
			},
			getSelerUser(newpagination) {
				if (newpagination) {
					Object.assign(this.pagination, {
						index: newpagination.index,
						size: newpagination.size
					})
				}
				let {
					index,
					size
				} = this.pagination;
				this.$api.getMJUserList({
					pageindex: index,
					len: size
				}).then(res => {
					if (res != '') {
						this.selerUserList = res;
						let rid = res.rows[0].userid
						this.getSelerinfodata(rid);
					}
				}).catch(xhr => {

				})
			},
			//获取卖家端人员本月数据
			getSelerinfodata(rid) {
				this.sellerUserId=rid
				if (this.selerAllUserInfo[rid] != undefined) {
					this.selerUserInfoData(this.selerAllUserInfo[rid]);
				} else {
					this.$api.getMJMonthCPOrderDetailNums({
						userid: rid,
						month: this.month
					}).then(res => {
						if (res != '') {
							this.selerAllUserInfo[rid] = res.monthViews;
							this.selerUserInfoData(res.monthViews);
						}
					}).catch(xhr => {

					})
				}
			},
			//解析卖家端用户数据
			selerUserInfoData(data) {
				//let jdnum,tdnum,sdnum,cdnum,date; //构建折射图数据所需字段
				//let dayjdlpnum,dayjdmpnum,daytdlpnum,daytdmpnum,daysdlpnum,daysdmpnum,daycdlpnum,daycdmpnum;  //今日数据
				let monthjdlpnum = 0,
					monthjdmpnum = 0,
					monthtdlpnum = 0,
					monthtdmpnum = 0,
					monthsdlpnum = 0,
					monthsdmpnum = 0,
					monthcdlpnum = 0,
					monthcdmpnum = 0; //本月数据
				let daydata = {},
					monthdata = {}; //今日数据
				let selerUserInfo = {
					columns: ['日期', '接单', '卖家退单', '刷单', '买家退单'],
					rows: []
				}
				data.forEach(item => {
					selerUserInfo.rows.push({
						'日期': item.day.slice(5),
						'接单': item.jdlpnum + item.jdmpnum,
						'卖家退单': item.tdlpnum + item.tdmpnum,
						'刷单': item.tdsdlpnum + item.tdsdmpnum,
						'买家退单': item.tdcdlpnum + item.tdcdmpnum
					});

					if (item.ifcurday == 1) { //判断是否是今日
						daydata = {
							dayjdlpnum: item.jdlpnum,
							dayjdmpnum: item.jdmpnum,
							daytdlpnum: item.tdlpnum,
							daytdmpnum: item.tdmpnum,
							daysdlpnum: item.tdsdlpnum,
							daysdmpnum: item.tdsdmpnum,
							daycdlpnum: item.tdcdlpnum,
							daycdmpnum: item.tdcdmpnum
						}
					}

					monthjdlpnum += item.jdlpnum;
					monthjdmpnum += item.jdmpnum;
					monthtdlpnum += item.tdlpnum;
					monthtdmpnum += item.tdmpnum;
					monthsdlpnum += item.tdsdlpnum;
					monthsdmpnum += item.tdsdmpnum;
					monthcdlpnum += item.tdcdlpnum;
					monthcdmpnum += item.tdcdmpnum;

				});
				Object.assign(monthdata, {
					monthjdlpnum,
					monthjdmpnum,
					monthtdlpnum,
					monthtdmpnum,
					monthsdlpnum,
					monthsdmpnum,
					monthcdlpnum,
					monthcdmpnum
				})

				this.seleUserListInfo = [];
				this.seleUserListInfo.push(daydata, monthdata, selerUserInfo);
			},
			//获取买家端用户列表
			getBuyerUser(newpagination) {
				if (newpagination) {
					Object.assign(this.buyerpagination, {
						index: newpagination.index,
						size: newpagination.size
					})
				}
				let {
					index,
					size
				} = this.buyerpagination;
				this.$api.getMMJUserList({
					pageindex: index,
					len: size
				}).then(res => {
					if (res != '') {
						this.buyerUserList = res;
						let rid = res.rows[0].userid
						this.getBuyerinfodata(rid);
					}
				}).catch(xhr => {

				})
			},
			//获取买家端人员本月数据
			getBuyerinfodata(rid) {
				this.buyerUserId=rid
				if (this.buyerAllUserInfo[rid] != undefined) {
					this.buyerUserInfoData(this.buyerAllUserInfo[rid]);
				} else {
					this.$api.getMMJMonthCPOrderDetailNums({
						userid: rid,
						month: this.month
					}).then(res => {
						if (res != '') {
							this.buyerAllUserInfo[rid] = res.monthViews;
							this.buyerUserInfoData(res.monthViews);
						}
					}).catch(xhr => {

					})
				}
			},
			//买家端人员数据解析
			buyerUserInfoData(data) {
				//let sdnum,cdnum,date; //构建折射图数据所需字段
				//let dayjdlpnum,dayjdmpnum,daytdlpnum,daytdmpnum,daysdlpnum,daysdmpnum,daycdlpnum,daycdmpnum;  //今日数据
				let monthsdlpnum = 0,
					monthsdmpnum = 0,
					monthcdlpnum = 0,
					monthcdmpnum = 0; //本月数据
				let daydata = {},
					monthdata = {}; //今日数据
				let selerUserInfo = {
					columns: ['日期', '刷单', '退单'],
					rows: []
				}
				data.forEach(item => {
					selerUserInfo.rows.push({
						'日期': item.day.slice(5),
						'刷单': item.lpnum + item.mpnum,
						'退单': item.clpnum + item.cmpnum
					});

					if (item.ifcurday == 1) { //判断是否是今日
						daydata = {
							daysdlpnum: item.lpnum,
							daysdmpnum: item.mpnum,
							daycdlpnum: item.clpnum,
							daycdmpnum: item.cmpnum
						}
					}

					monthsdlpnum += item.lpnum;
					monthsdmpnum += item.mpnum;
					monthcdlpnum += item.clpnum;
					monthcdmpnum += item.cmpnum;
				});

				Object.assign(monthdata, {
					monthsdlpnum,
					monthsdmpnum,
					monthcdlpnum,
					monthcdmpnum
				})

				this.buyerUserListInfo = [];
				this.buyerUserListInfo.push(daydata, monthdata, selerUserInfo);
			},
			search() {
				this.buyerAllUserInfo={}
				this.selerAllUserInfo={}
				this.getdata();
				this.getBuyerinfodata(this.sellerUserId);
				this.getSelerinfodata(this.buyerUserId);
			}
		}
	})
</script>

<style scoped>
	@import url("../../../../assets/css/summary.css");
</style>
