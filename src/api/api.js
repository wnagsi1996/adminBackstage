import {get,post,upload} from '@/request/http.js'

const api={
	//登录
	login(params={}){
		return get('/Handler/WebHandler.ashx?cmd=Login',params)
	},
	//加密
	rsaKey(){
		return get('/Handler/RSAKey.ashx?cmd=CreateRSAKey');
	},
	//管理员获取当月数据
	getManagerTotalData(){
		return get('/Handler/CPManageSystem.ashx?cmd=getManagerTotalTotalData')
	},
	//管理员获取当月订单详细数据
	getCurMonthCPOrderDetailNums(){
		return get('/Handler/CPManageSystem.ashx?cmd=getCurMonthCPOrderDetailNums')
	},
	//获取卖家成员列表
	getMJUserList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMJUserList',params)
	},
	// 获取卖家端人员本月数据
	getMJCurMonthCPOrderDetailNums(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMJCurMonthCPOrderDetailNums',params)
	},
	//获取买家端成员列表
	getMMJUserList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMMJUserList',params)
	},
	//获取买家端人员本月数据
	getMMJCurMonthCPOrderDetailNums(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMMJCurMonthCPOrderDetailNums',params)
	},
	//获取全部成员列表
	getCPMMJUserList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPMMJUserList',params)
	},
	//获取汇率信息
	getUSDRate(){
		return get('/Handler/CPManageSystem.ashx?cmd=getUSDRate')
	},
	// 设置汇率
	setUSDRate(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=setUSDRate',params)
	},
	//卖家客户管理列表
	getHZBusinessList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getHZBusinessList',params)
	},
	//删除商家账户
	delHZSJ(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=delHZSJ',params)
	},
	//获取单个商家信息
	getSellerInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getHzsjInfo',params)
	},
	//添加或编辑商家信息
	addOrEditCPHzsj(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addOrEditCPHzsj',params)
	},
	//管理员获取客户订单（总单）
	getGLproductList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getGLproductList',params)
	},
	//订单日志
	getCPLogList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPLogList',params)
	},
	//订单详情
	getCPOrderDetailInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailInfo',params)
	},
	//子订单列表
	getCPOrderDetailList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailList',params)
	},
	//修改订单状态（管理员）
	resetCPOrderDetailState(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=resetCPOrderDetailState',params)
	},
	//财务处理进度列表
	getCWOrderDetailList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCWOrderDetailList',params)
	},
	//操作财务列表已读
	doCWBackRecord(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=doCWBackRecord',params)
	},
	//管理员操作日志
	getGLCPLogList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getGLCPLogList',params)
	},
	//中介列表
	getCPAgentLists(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPAgentLists',params)
	},
	// 删除测评中介
	delCPAgent(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=delCPAgent',params)
	},
	//创建测评中介
	addCPAgent(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=addCPAgent',params)
	},
	//编辑测评中介
	editCPAgent(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=editCPAgent',params)
	},
	//中介佣金挂账列表
	getAgentOverDraftList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getAgentOverDraftList',params)
	},
	//中介佣金登记损失
	agentOverDraftToUserOutMoney(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=agentOverDraftToUserOutMoney',params)
	},
	//月份目标列表
	getUserPlantList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getUserPlantList',params)
	},
	//创建月份目标
	addUserPlant(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addUserPlant',params)
	},
	//编辑月份目标
	editUserPlant(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=editUserPlant',params)
	},
	//用户列表
	getCPUserList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPUserList',params)
	},
	//激活用户账户
	JhCPUser(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=JhCPUser',params)
	},
	//删除用户账户
	delCPUsers(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=delCPUsers',params)
	},
	//重置用户密码
	modifyCPUserPassword(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=modifyCPUserPassword',params)
	},
	//获取角色列表
	getCPRoles(){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPRoles')
	},
	//获取用户信息
	getCPUserInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPUserInfo',params)
	},
	//添加或编辑用户信息
	addOrEditCPUser(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addOrEditCPUser',params)
	},
	//测评月份区间数据
	getMonthCPDataList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMonthCPDataList',params)
	},
	//修改登录密码
	modifyPasswordByCurUser(params={}){
		return post('/Handler/ManageHandler.ashx?cmd=modifyPasswordByCurUser',params)
	},
	//测评黑名单列表
	getCPHMDList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPHMDList',params)
	},
	//删除黑名单
	delCPHMD(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=delCPHMD',params)
	},
	//添加黑名单
	addCPHMD(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addCPHMD',params)
	},
	//编辑黑名单
	editCPHMD(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=editCPHMD',params)
	},
	//获取财务待审核数据
	getCWWaitDoRecordNum(){
		return get('/Handler/CPManageSystem.ashx?cmd=getCWWaitDoRecordNum')
	},
	//获取财务首页今日相关数据
	getCurDayCWTotalTotalData(){
		return get('/Handler/CPManageSystem.ashx?cmd=getCurDayCWTotalTotalData')
	},
	//财务首页月份每一天数据
	getCurMonthCPOrderDetailNums(){
		return get('/Handler/CPManageSystem.ashx?cmd=getCurMonthCPOrderDetailNums')
	},
	//获取买家端人员本月数据
	getMMJCurMonthCPOrderDetailNums(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMMJCurMonthCPOrderDetailNums',params)
	},
	//获取卖家端人员本月数据
	getMJCurMonthCPOrderDetailNums(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMJCurMonthCPOrderDetailNums',params)
	},
	//财务审核订单列表
	getCWOrderDetailList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCWOrderDetailList',params)
	},
	//财务审核
	doCWDetail(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=doCWDetail',params)
	},
	//损失金额列表
	getUserOutMoneyList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getUserOutMoneyList',params)
	},
	//添加损失金额
	addUserOutMoney(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addUserOutMoney',params)
	},
	//月份支出管理列表
	getMonthOutLayList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMonthOutLayList',params)
	},
	//删除月份信息
	delMonthOutLay(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=delMonthOutLay',params)
	},
	//添加月份支出信息
	addMonthOutLay(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=addMonthOutLay',params)
	},
	//编辑月份支出信息
	editMonthOutLay(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=editMonthOutLay',params)
	},
	// 利润日志列表
	getProfitLogList(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=getProfitLogList',params)
	},
	//利润提取
	comitProfitTQ(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=comitProfitTQ',params)
	},
	//获取利润列表
	getMonthProfitList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMonthProfitList',params)
	},
	//获取利润数据
	getTotalProfit(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getTotalProfit',params)
	},
	//买家端首页汇总数据
	getMMJTotalData(){
		return get('/Handler/CPManageSystem.ashx?cmd=getMMJTotalData')
	},
	//买家端数据汇总折线图
	getMMJCurMonthCPOrderDetailNums_CurUser(){
		return get('/Handler/CPManageSystem.ashx?cmd=getMMJCurMonthCPOrderDetailNums_CurUser')
	},
	//获取留评订单(首页)
	getNotLPOrderNum(){
		return get('/Handler/CPManageSystem.ashx?cmd=getNotLPOrderNum')
	},
	//接单
	jdCPOrderDetail(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=jdCPOrderDetail',params)
	},
	//取消接单
	cancelJDCPOrderDetail(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=cancelJDCPOrderDetail',params)
	},
	//批量接单
	jdCPOrderDetail_PL(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=jdCPOrderDetail_PL',params)
	},
	//绑定刷手
	setCPOrderDetailSDUserName(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=setCPOrderDetailSDUserName',params)
	},
	//取消中介绑定
	deleteCPOrderDetailAgent(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=deleteCPOrderDetailAgent',params)
	},
	//取消批量接单
	cancelJDCPOrderDetail_PL(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=cancelJDCPOrderDetail_PL',params)
	},
	//获取中介列表
	getCPAgentList(){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPAgentList')
	},
	//设置测评中介
	setCPOrderDetailAgent(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=setCPOrderDetailAgent',params)
	},
	//获取测评下单信息
	getCPOrderDetailXDInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailXDInfo',params)
	},
	//提交测评下单信息
	setCPOrderDetailXDInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=setCPOrderDetailXDInfo',params)
	},
	//下载表格数据
	getExportCPOrderDetailList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getExportCPOrderDetailList',params)
	},
	//获取退单数据
	getBackProductMoney(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getBackProductMoney',params)
	},
	//退款提交
	backProductFK(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=backProductFK',params)
	},
	//提交返款
	comitProductFK(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=comitProductFK',params)
	},
	//中介佣金返款列表
	getCPOrderDetailList_MMJ(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailList_MMJ',params)
	},
	//搜索中介佣金
	searchBuyerZJYJ(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=searchBuyerZJYJ',params)
	},
	//获取中介最大佣金抵扣
	getAgentOverDraftMaxMoney(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getAgentOverDraftMaxMoney',params)
	},
	//中介佣金返款(批量)
	comitBuyerZJYJFK(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=comitBuyerZJYJFK',params)
	},
	//佣金返款
	comitCPOrderDetailYJFK(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=comitCPOrderDetailYJFK',params)
	},
	//上传订单
	uploadcporderexcel(params={}){
		return upload('/Handler/CPManageSystem.ashx?cmd=uploadcporderexcel',params)
	},
	//上传留评
	uploadcpreviewexcel(params={}){
		return upload('/Handler/CPManageSystem.ashx?cmd=uploadcpreviewexcel',params)
	},
	//待留评列表
	getCPOrderDetailList_MJWLP(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailList_MJWLP',params)
	},
	//获取测订单留评信息
	getCPOrderDetailLPInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailLPInfo',params)
	},
	//设置留评信息
	setCPOrderDetailLPInfo(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=setCPOrderDetailLPInfo',params)
	},
	//未留评
	doNotLPOrder(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=doNotLPOrder',params)
	},
	//佣金回款
	comitPayTopOrderMoney(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=comitPayTopOrderMoney',params)
	},
	//获取财务订单进度查询
	getCWOrderDetailList_MMJ(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCWOrderDetailList_MMJ',params)
	},
	//财务驳回已读操作
	doCWBackRecord(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=doCWBackRecord',params)
	},
	//卖家首页汇总数据
	getMJTotalData(){
		return get('/Handler/CPManageSystem.ashx?cmd=getMJTotalData')
	},
	//卖家首页数据
	getMJCurMonthCPOrderDetailNums_CurUser(){
		return get('/Handler/CPManageSystem.ashx?cmd=getMJCurMonthCPOrderDetailNums_CurUser')
	},
	//卖家获取测评总单列表
	getTopProductList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getTopProductList',params)
	},
	delTOPCPOrder(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=delTOPCPOrder',params)
	},
	//订单提交财务审核
	comitTOPCPOrder(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=comitTOPCPOrder',params)
	},
	//搜索商家
	getHzsjListBySjname(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getHzsjListBySjname',params)
	},
	//创建订单
	addCPTopOrder(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addCPTopOrder',params)
	},
	//订单收款
	comitPayTopOrderMoney(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=comitPayTopOrderMoney',params)
	},
	//下载总订单
	getMJExportCPOrderDetailList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMJExportCPOrderDetailList',params)
	},
	//退单退款
	comitOrderGoBack(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=comitOrderGoBack',params)
	},
	//补退差价
	comitMakeUpTopOrderMoney(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=comitMakeUpTopOrderMoney',params)
	},
	//获取记事本
	getCPTopWorkLog(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPTopWorkLog',params)
	},
	//添加记事本
	addCPTopWorkLog(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addCPTopWorkLog',params)
	},
	//获取总单测评信息
	getCPTopOrderInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPTopOrderInfo',params)
	},
	//获取总单测评产品订单列表
	getCPOrderList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderList',params)
	},
	//一键放单
	getKeyWordCanFDNum(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getKeyWordCanFDNum',params)
	},
	//删除测评产品单
	delCPOrder(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=delCPOrder',params)
	},
	//产品单子表格列表
	getCPOrderDetailListByCpOrderno(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailListByCpOrderno',params)
	},
	//取消放单
	cancelFDCPOrderDetail(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=cancelFDCPOrderDetail',params)
	},
	//批量取消放单
	cancelFDCPOrderDetail_PL(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=cancelFDCPOrderDetail_PL',params)
	},
	//获取可退产品单得子单单数
	getCPOrderCanBackNum(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderCanBackNum',params)
	},
	//卖家端退单提交
	comitOrderGoBack(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=comitOrderGoBack',params)
	},
	//设置放单时间
	setCPDetailPlanFD(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=setCPDetailPlanFD',params)
	},
	//编辑放单要求
	editCPOrderDetail(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=editCPOrderDetail',params)
	},
	//获取留评免评数量、
	getCPOrderCanBackNum(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderCanBackNum',params)
	},
	//更新免评留评信息
	comitUpdateCPOrderMpLPNum(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=comitUpdateCPOrderMpLPNum',params)
	},
	//设置关键词放单数量
	setKeyWordFDNum(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=setKeyWordFDNum',params)
	},
	//追加订单
	appendCPOrder(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=appendCPOrder',params)
	},
	//添加测评产品订单
	addProduct(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=addProduct',params)
	},
	//获取测评产品订单信息
	getCPOrderInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderInfo',params)
	},
	//审核下单信息
	doSHXDInfo(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=doSHXDInfo',params)
	},
	//下载订单表格数据（子订单）
	getMJExportCPOrderDetailList_waitsh(params={}){
		return post('/Handler/CPManageSystem.ashx?cmd=getMJExportCPOrderDetailList_waitsh',params)
	},
	//获取留评列表
	getCPOrderDetailList_MJ(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailList_MJ',params)
	},
	//确认留评
	setCPOrderDetailReadLP(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=setCPOrderDetailReadLP',params)
	},
	//未留评
	returnCPOrderDetailLP(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=returnCPOrderDetailLP',params)
	},
	//获取合作商家列表
	getHzsjList(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getHzsjList',params)
	},
	//获取月份汇总数据（管理员）
	getMonthCPOrderDetailNums(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMonthCPOrderDetailNums',params)
	},
	//获取卖家端月份数据
	getMJMonthCPOrderDetailNums(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMJMonthCPOrderDetailNums',params)
	},
	//获取买家端月份数据
	getMMJMonthCPOrderDetailNums(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getMMJMonthCPOrderDetailNums',params)
	},
	//财务月份数据汇总1
	getCWTotalMonthData1(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCWTotalMonthData1',params)
	},
	//财务月份数据汇总2
	getCWTotalMonthData2(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCWTotalMonthData2',params)
	},
	//显示补退差价
	getSCOrderListBT(params={}){
		return get('/Handler/CPManageSystem.ashx?cmd=getCWTotalMonthData2',params)
	}
	
}

export default api