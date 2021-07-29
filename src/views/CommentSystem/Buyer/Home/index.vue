<template>
	<div class="bodybj">
		<div class="prompt public-statue" v-if="reviewNum!=0">
			<p>您有{{reviewNum}}单待催评<a @click="pushOpen">前往</a></p>
		</div>
		<el-row>
			<el-col :span="8">
				<div class="one-today public-statue">
					<div class="today-title">
						<h5>本月数据</h5>
					</div>
					<div class="today-desc">
						<OrderModule v-if="todayData.length>0" :orderdata="todayData" />
					</div>
				</div>
			</el-col>
			<el-col :span="16">
				<el-row>
					<el-col :span="6">
						<div class="public-statue month-finance" @click="pushlink(item)">
							<h5>测评订单(中介/个人)</h5>
							<p>{{totalOrder}}</p>
							<span>{{totalOrderDesc}}</span>
						</div>
					</el-col>
					<el-col :span="6" v-for="(item,index) in module" :key="index">
						<div class="public-statue month-finance" @click="pushlink(item)">
							<h5>{{item.title}}</h5>
							<p>{{item.money}}</p>
							<span v-if="item.txt">{{item.txt}}</span>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!-- 折线图 -->
		<div class="month-line public-statue">
			<ve-line v-if='Object.keys(monthLineData).length > 0' :data="monthLineData" class="line"></ve-line>
		</div>

		<!-- 提醒需要催评 -->
		<el-dialog title="提醒" :visible.sync="dialogVisible" width="300px">
			<span>您有{{reviewNum}}订单需要催评</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="pushOpen">查看</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		Dialog,
		Row,
		Col
	} from 'element-ui'
	import OrderModule from '@/components/AdminHome/OrderModule.vue' //引入小模块
	import VeLine from 'v-charts/lib/line' //引入折线图组件
	import VueCookies from 'vue-cookies' //引入vue-cookies插件
	export default ({
		name: 'Home',
		components: {
			[VeLine.name]: VeLine,
			[Dialog.name]: Dialog,
			[Row.name]: Row,
			[Col.name]: Col,
			OrderModule
		},
		data() {
			return {
				todayData: [], //本月数据模块
				monthLineData: {}, //折线图
				module: [], //第一部分模块
				dialogVisible: false,
				reviewNum: 0, //待留评数量
				orderinfo: {}
			}
		},
		computed: {
			totalOrder() {
				const {
					monthSdLpNum_zj,
					monthSdMpNum_zj,
					monthSdLpNum_gr,
					monthSdMpNum_gr,
					monthTdLpNum_zj,
					monthTdMpNum_zj,
					monthTdLpNum_gr,
					monthTdMpNum_gr
				} = this.orderinfo;
				const zjNum=monthSdLpNum_zj+monthSdMpNum_zj-monthTdLpNum_zj-monthTdMpNum_zj;
				const grNum=monthSdLpNum_gr+monthSdMpNum_gr-monthTdLpNum_gr-monthTdMpNum_gr;
				return `${zjNum}/${grNum}`
			},
			totalOrderDesc(){
				const {
					monthSdLpNum_zj,
					monthSdMpNum_zj,
					monthSdLpNum_gr,
					monthSdMpNum_gr,
					monthTdLpNum_zj,
					monthTdMpNum_zj,
					monthTdLpNum_gr,
					monthTdMpNum_gr
				} = this.orderinfo;
				return `中介:留${monthSdLpNum_zj-monthTdLpNum_zj},免${monthSdMpNum_zj-monthTdMpNum_zj}/个人:留${monthSdLpNum_gr-monthTdLpNum_gr},免${monthSdMpNum_gr-monthTdMpNum_gr}`
			}
		},
		created() {
			this.getdata()
			this.getdata1()
			this.getReviewOrder()
		},
		methods: {
			getdata() {
				this.$api.getMMJTotalData().then(data => {
					this.module = [
						// {
						// 	'title':'待测评订单',
						// 	'money':data.waitcplpnum + data.waitcpmpnum,
						// 	'path':'/evaluationorder',
						// 	'txt':`免:${data.waitcpmpnum} 留：${data.waitcplpnum}`,
						// 	'name':'待测评订单',
						// 	'param':'1'
						// },
						// {
						// 	'title': '测评订单(中介/个人)',
						// 	'money': data.waitcplpnum + data.waitcpmpnum,
						// 	'txt': `免:${data.waitcpmpnum} 留：${data.waitcplpnum}`,
						// 	'name': '待测评订单'
						// },
						{
							'title': '待审核订单',
							'money': data.waitmjshnum,
							'path': '/orderreview',
							'name': '待审核订单',
							'param': '1'
						},
						{
							'title': '待返款订单',
							'money': data.waitfknum,
							'path': '/rebateorder',
							'name': '待返款订单',
							'param': '1'
						},
						// {
						// 	'title':'价格异常',
						// 	'money':data.priceycnum,
						// 	'path':'/rebateorder',
						// 	'name':'待返款订单',
						// 	'param':'1'
						// },
						{
							'title': '自费节省（美元）',
							'money': data.savemoney,
							'path': '/rebateorder',
							'name': '待返款订单',
							'param': '1'
						},
						{
							'title': '订单审核驳回',
							'money': data.bhmjshnum,
							'param': '0',
							'path': '/evaluationorder',
							'name': '待测评订单',
							'param': '1'
						},
						{
							'title': '损失金额',
							'money': data.outmoney,
							'param': '0'
						},
						{
							'title': '等待财务处理',
							'money': data.waitcwshnum,
							'path': '/financialaudittrail',
							'name': '财务处理进度查询',
							'param': '1'
						},
						{
							'title': '财务审核驳回',
							'money': data.backcwshnum,
							'path': '/financialaudittrail',
							'name': '财务处理进度查询',
							'param': '1'
						}
					];
				}).catch(xhr => {
					console.log(xhr);
				})
			},
			getdata1() {
				this.$api.getMMJCurMonthCPOrderDetailNums_CurUser().then(res => {
					//console.log(res);

					//今日刷单免评/留评/退单免评/留评
					let todaySdMpNum, todaySdLpNum, todayTdMpNum, todayTdLpNum;

					//本月刷单免评/留评/退单免评/留评/中介刷单留评/免评/个人刷单留评/免评/中介撤单留评/免评/个人撤单留评/免评
					let monthSdMpNum = 0,
						monthSdLpNum = 0,
						monthTdMpNum = 0,
						monthTdLpNum = 0,
						monthSdLpNum_zj = 0,
						monthSdMpNum_zj = 0,
						monthSdLpNum_gr = 0,
						monthSdMpNum_gr = 0,
						monthTdLpNum_zj = 0,
						monthTdMpNum_zj = 0,
						monthTdLpNum_gr = 0,
						monthTdMpNum_gr = 0;

					//月份折线图数据
					let LineColumns = ['日期', '刷单', '退单']; //折线图标题
					let LineRow = []; //折线图数据

					if (res != '') {
						res.monthViews.forEach(item => {
							monthSdMpNum += item.mpnum;
							monthSdLpNum += item.lpnum;
							monthTdMpNum += item.cmpnum;
							monthTdLpNum += item.clpnum;
							monthSdLpNum_zj += item.lpnum_zj;
							monthSdMpNum_zj += item.mpnum_zj;
							monthTdLpNum_zj += item.clpnum_zj;
							monthTdMpNum_zj += item.cmpnum_zj;
							if (item.ifcurday == 1) {
								todaySdMpNum = item.mpnum;
								todaySdLpNum = item.lpnum;
								todayTdMpNum = item.cmpnum;
								todayTdLpNum = item.clpnum;
							}

							// let date = item.day.slice(5);

							LineRow.push({
								"日期": item.day.slice(5),
								"刷单": item.mpnum + item.lpnum,
								"退单": item.cmpnum + item.clpnum
							})
						});
						monthSdLpNum_gr = monthSdLpNum - monthSdLpNum_zj;
						monthSdMpNum_gr = monthSdMpNum - monthSdMpNum_zj;
						monthTdLpNum_gr = monthTdLpNum - monthTdLpNum_zj;
						monthTdMpNum_gr = monthTdMpNum - monthTdMpNum_zj;
						this.orderinfo = Object.assign({}, this.orderinfo, {
							monthSdMpNum,
							monthSdLpNum,
							monthTdMpNum,
							monthTdLpNum,
							monthSdLpNum_zj,
							monthSdMpNum_zj,
							monthSdLpNum_gr,
							monthSdMpNum_gr,
							monthTdLpNum_zj,
							monthTdMpNum_zj,
							monthTdLpNum_gr,
							monthTdMpNum_gr
						})

						//今日数据
						this.todayData = [{
								'title': '今日刷单',
								'lpnum': todaySdLpNum,
								'mpnum': todaySdMpNum
							},
							{
								'title': '今日退单',
								'lpnum': todayTdLpNum,
								'mpnum': todayTdMpNum
							},
							{
								'title': '本月刷单',
								'lpnum': monthSdLpNum,
								'mpnum': monthSdMpNum
							},
							{
								'title': '本月退单',
								'lpnum': monthTdLpNum,
								'mpnum': monthTdMpNum
							}
						];
						//目标汇总数据
						// this.aimsdata={
						// 	'aims':res.data.monthPlantNum,
						// 	'jdnum':monthJdLpNum+monthJdMpNum,
						// 	'tdnum':monthTdLpNum+monthTdMpNum,
						// 	'percentage':(((monthJdLpNum+monthJdMpNum)-(monthTdLpNum+monthTdMpNum))/res.data.monthPlantNum*100).toFixed(2)
						// }


						this.monthLineData = {
							columns: LineColumns,
							rows: LineRow
						}
					} else {
						console.log('数据加载失败')
					}
				}).catch(xhr => {
					console.log(xhr)
				})
			},
			//获取留评订单数据
			getReviewOrder() {
				let lpnum = VueCookies.get('lpnum')
				this.$api.getNotLPOrderNum().then(res => {
					if (res.rescode == 1) {
						this.reviewNum = res.resdesc;
						if (lpnum == null) {
							VueCookies.set('lpnum', res.resdesc)
							this.dialogVisible = true
						}
					}
				}).catch(xhr => {

				})
			},
			//打开页面
			pushlink(item) {
				//console.log(item);
				if (item.param == '1') {
					if (item.title == '财务审核驳回') {
						this.$router.push({
							path: item.path,
							query: {
								type: '2'
							}
						})
					} else if (item.title == '等待财务处理') {
						this.$router.push({
							path: item.path,
							query: {
								type: '0'
							}
						})
					} else {
						this.$router.push({
							path: item.path
						})
					}
					this.$store.commit('tagsView/selectMenu', item)
				}

			},
			//打开待留评订单
			pushOpen() {
				this.dialogVisible = false
				let item = {
					path: '/commentorder',
					name: '待留评订单',
					icon: 'commentorder'
				}
				this.$router.push({
					path: item.path
				})
				this.$store.commit('tagsView/selectMenu', item)
			}
		}
	})
</script>

<style scoped>
	@import url("../../../../assets/css/summary.css");

	.prompt {
		height: auto;
	}

	.prompt p a {
		padding-left: 10px;
		color: red;
		cursor: pointer;
	}
</style>
