<template>
	<div>
		<el-dialog title="订单详情" :visible.sync="dialogVisible" width="50%" @close="closeDialog" :modal-append-to-body="false" >
		  <div class="logviewscroll">
			  <div id='productview' class='productview' v-loading="loading">
					<ul>
						<li>
						  <p>产品标题：</p>
						  <span>
							  <el-link type="primary" target='_blank' :href="orderDetailData.ProductUrl">{{orderDetailData.ProductTitle}}</el-link>
						   </span>
						   <img :src="orderDetailData.ProductImgUrl" />
						</li>
						<li>
							<div class='lihalf' style='width:66%;'>
								<p>订单号：</p><span>{{orderDetailData.Orderno}}</span>
							</div>
							<div class='lihalf'>
								<p>RID：</p><span>is{{orderDetailData.rid}}</span>
							</div>
							<div class='lihalf'>
								<p>原始单价：</p><span>${{orderDetailData.productdj}}</span>
							</div>
							<template v-if="orderDetailData.KeyWord!=''">
								<div class='lihalf'>
									<p>关键词：</p><span>{{orderDetailData.KeyWord}}</span>
								</div>
								<div class='lihalf'>
									<p>关键词大概在第几行：</p><span>{{orderDetailData.KeyWordPage}}</span>
								</div>
							</template>
							<div class='lihalf'>
								<p>ASIN：</p><span>{{orderDetailData.Asin}}</span>
							</div>
							<div class='lihalf'>
								<p>品牌：</p><span>{{orderDetailData.Brand}}</span>
							</div>
							<div class='lihalf'>
								<p>店铺名称：</p><span>{{orderDetailData.StoreName}}</span>
							</div>
							<div class='lihalf'>
								<p>是否追加：</p><span>{{orderDetailData.addflag | addflag}}</span>
							</div>
							<div class='lihalf'>
								<p>订单状态：</p><span>{{orderDetailData.state}}</span>
							</div>
							<div class='lihalf'>
								<p>买家联系方式：</p><span>{{orderDetailData.fklxfs}}</span>
							</div>
							<template v-if="orderDetailData.CouponCode!=''">
								<div class='lihalf'>
									<p>折扣码：</p><span>{{orderDetailData.CouponCode}}</span>
								</div>
								<div class='lihalf'>
									<p>是否留评：</p><span>{{orderDetailData.ordertype}}</span>
								</div>
							</template>
							<template v-if="orderDetailData.ordertype==1">
								<div class='lihalf'>
									<p>留评状态：</p><span>{{orderDetailData.lpstate | reviewStatus}}</span>
								</div>
								<div class='lihalf'>
									<p>留评时间：</p><span>{{orderDetailData.lpdate}}</span>
								</div>
							</template>
							<div class='lihalf' v-if="orderDetailData.ifFB!=0">
								<p>是否需要Feedback：</p><span>是</span>
							</div>
							<div class='lihalf' v-if="orderDetailData.ifQA!=0">
								<p>是否需要是否需要QA：</p><span>是</span>
							</div>
							<div class='lihalf' v-if="orderDetailData.HelpFulUrl!=''">
								<p>点赞链接：</p><span><a target='_blank' :href="orderDetailData.HelpFulUrl">查看</a></span>
							</div>
							<div class='lihalf'>
								<p>创建时间：</p><span>{{orderDetailData.cjdate}}</span>
							</div>
							<div class='lihalf'>
								<p>放单人员：</p><span>{{orderDetailData.fdusername}}</span>
							</div>
							<div class='lihalf'>
								<p>放单时间：</p><span>{{orderDetailData.fddate}}</span>
							</div>
							<div class='lihalf'>
								<p>接单时间：</p><span>{{orderDetailData.jddate}}</span>
							</div>
							<div class='lihalf' v-if="orderDetailData.realproductdj!=''">
								<p>下单单价：</p><span>${{orderDetailData.realproductdj}}</span>
							</div>
							<div class='lihalf' v-else>
								<p>下单单价：</p><span>{{orderDetailData.realproductdj}}</span>
							</div>
							<div class='lihalf'>
								<p>购买单号：</p><span>{{orderDetailData.xdOrderno}}</span>
							</div>
							<div class='lihalf'>
								<p>下单时间：</p><span>{{orderDetailData.xddate}}</span>
							</div>
							<div class='lihalf'>
								<p>返款金额：</p><span>{{orderDetailData.fkmoney}}</span>
							</div>
							<div class='lihalf'>
								<p>中介佣金（卖家端）：</p><span>{{orderDetailData.zjmoneyRMB_mmj}}</span>
							</div>
							<div class='lihalf'>
								<p>中介佣金（买家端）：</p><span>{{intermediaryYJ}}</span>
							</div>
						</li>
						<li v-if="orderDetailData.FB!=''">
							<p>Feedback内容：</p><span>{{orderDetailData.FB}}</span>
						</li>
						<li v-if="orderDetailData.QA!=''">
							<p>QA内容：</p><span>{{orderDetailData.QA}}</span>
						</li>
						<li>
							<p>下单要求：</p><span>{{orderDetailData.xdyq}}</span>
						</li>
						<li>
							<p>备注：</p><span>{{orderDetailData.remark}}</span>
						</li>
					</ul>
			  </div>
			  <div id='logcontent' class='logcontent'>
				  <div class='logcontent-title'>
					  <h5>日志跟踪</h5>
					  <a id='viewlog' @click="viewLog">查看</a>
					  <component :is="loadLog" :logorderno="logorderno" />
				  </div>
			  </div>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {Dialog,Link} from 'element-ui'
	export default({
		name:'LogDesc',
		components:{
			[Dialog.name]:Dialog,
			[Link.name]:Link
		},
		props:{
			logorderno:{
				type:String,
				default:''
			},
			logshow:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				dialogVisible:false,  //弹出框显示隐藏
				orderDetailData:new Object,   //订单数据
				intermediaryYJ:0,  //买家端中介佣金
				logListData:[],  //分页数据
				loadLog:null,
				loading:true,
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
			}
		},
		created() {
			this.dialogVisible=this.logshow;
			this.getOrderInfo(this.logorderno);
			
		},
		methods:{
			//执行父元素的函数关闭
			closeDialog(){
				this.$emit('handleLogClick');
			},
			//获取订单详情
			getOrderInfo(orderno){
				this.loading=true;
				this.$api.getCPOrderDetailInfo({orderno}).then(res=>{
					this.orderDetailData=res;
					this.mjzjyj(res.zjmoneyRMB_mj,res.zjmoneyRMB_mjlp);
					this.loading=false;
				}).catch(err=>{
					console.log(err);
					this.$message({
						type:'warning',
						message:'订单详情数据获取出错'
					})
				})
			},
			//计算买家中介佣金
			mjzjyj(productyj,zjyj){
				if(productyj=="")
					productyj=0;
				if(zjyj=="")
					zjyj=0;
				this.intermediaryYJ=(Number.parseFloat(productyj)+Number.parseFloat(zjyj)).toFixed(2);
			},
			//获取订单日志
			search(valdata=[]){
				//判断是否是分页传过来的参数
				if(valdata.length!=0){
					if(valdata[0]=="current"){
						this.pagination.current=valdata[1];
					}else if(valdata[0]=="size"){
						this.pagination.size=valdata[1];
					}
				}
				this.$api.getCPLogList({
					"pageindex":this.pagination.current-1,
					"len":this.pagination.size,
					"orderno":this.logorderno
				}).then(res=>{
					//console.log(res);
					if(res.data!=""){
						this.logListData=res.rows;
						this.pagination.total=res.results
					}else{
						this.$message({
							type:'warning',
							message:'日志数据获取出错'
						})
					}
				}).catch(err=>{
					console.log(err);
					this.$message({
						type:'warning',
						message:'日志数据获取出错'
					})
				})
			},
			//查看日志
			viewLog(){
				if(this.loadLog==null){
					this.loadLog=() => import('@/components/Log/index.vue');
				}
			}
		},
		filters:{
			//是否追加订单
			addflag(val){
				if (val == 0)
					return "否";
				else
					return "是";
			},
			//订单状态
			reviewStatus(val){
				if(val==1)
					return "留评"
				else
					return "免评"
			}
		},
		watch:{
			logshow(newVal,oldVal){
				this.dialogVisible=newVal;
			},
			logorderno(newVal,oldVal){
				this.getOrderInfo(newVal);
				this.logListData=[];
				this.pagination.total=0
			}
		}
	})
</script>

<style scoped>
	.productview ul{padding:10px;}
	.productview ul li{margin:12px auto;position:relative;}
	.productview ul li p{display:inline-block;font-weight:bold;margin:0}
	.productview ul li>p{vertical-align:top;}
	.productview ul li>span{width:calc(100% - 125px);vertical-align:top;}
	.productview ul li span{display:inline-block;}
	.productview ul li>img{width:50px;border-radius:5px;border:1px solid #ccc;position:absolute;top:0;right:0;}
	.lihalf{width:33%;height:20px;float:left;margin:8px 0;overflow:hidden; text-overflow:ellipsis; vertical-align:top;white-space: nowrap;}
	.logcontent{margin-top:10px;}
	.logcontent-title{height:30px;line-height:30px;position:relative;}
	.logcontent-title h5{border-bottom:1px solid #ccc;padding-bottom:5px;font-size:16px;font-weight:bold;}
	.logcontent-title a{position:absolute;top:-3px;right:0;cursor:pointer;}
	.log-cen{margin:20px auto;padding:20px 0 0 0;}
	.log-cen-top p{display:inline-block;}
	.log-cen-top p:first-child{width:200px;}
	.log-cen-top p span,.log-cen-bottom p span{font-weight:bold;}
	.logviewscroll{height: 60vh;overflow: auto;}
	.logviewscroll::-webkit-scrollbar {width: 5px; height: 1px;}
	.logviewscroll::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); background: #535353;}
	.logviewscroll::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);border-radius: 10px;background: #EDEDED;}

</style>
