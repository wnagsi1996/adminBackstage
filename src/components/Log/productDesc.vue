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
								<p>产品单价：</p><span>${{orderDetailData.productdj}}</span>
							</div>
							<div class='lihalf'>
								<p>产品单价+PP手续费：</p><span>${{orderDetailData.productdj}}</span>
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
								<p>汇率：</p><span>{{orderDetailData.RMB2US}}</span>
							</div>
							<template v-if="orderDetailData.CouponCode!=''">
								<div class='lihalf'>
									<p>折扣码：</p><span>{{orderDetailData.CouponCode}}</span>
								</div>
							</template>
							<div class='lihalf'>
								<p>订单状态：</p><span>{{orderDetailData.state}}</span>
							</div>
							<div class='lihalf'>
								<p>留评单数：</p><span>{{orderDetailData.lpnum}}</span>
							</div>
							<div class='lihalf'>
								<p>免评单数：</p><span>{{orderDetailData.mpnum}}</span>
							</div>
							<div class='lihalf'>
								<p>应收金额：</p><span>{{orderDetailData.sktotalmoney}}</span>
							</div>
							<div class='lihalf'>
								<p>收款渠道：</p><span>{{orderDetailData.sktype}}</span>
							</div>
							<div class='lihalf'>
								<p>收款类型：</p><span>{{orderDetailData.sktypeinfo}}</span>
							</div>
							<div class='lihalf'>
								<p>完成订单数：</p><span>{{orderDetailData.suceessNum}}</span>
							</div>
							<div class='lihalf'>
								<p>完成留评订单数：</p><span>{{orderDetailData.alreadylpnum}}</span>
							</div>
							<div class='lihalf'>
								<p>测评佣金：</p><span>{{orderDetailData.cpyj}}</span>
							</div>
							<div class='lihalf'>
								<p>返款金额：</p><span>{{orderDetailData.fktotalmoney}}</span>
							</div>
							<div class='lihalf'>
								<p>创建时间：</p><span>{{orderDetailData.insertdate}}</span>
							</div>
							<div class='lihalf'>
								<p>更新时间：</p><span>{{orderDetailData.updatedate}}</span>
							</div>
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
	import{Dialog,Link} from 'element-ui'
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
				this.$api.getCPOrderInfo({orderno}).then(res=>{
					console.log(res)
					this.orderDetailData=res;
					this.loading=false;
				}).catch(err=>{
					console.log(err);
					this.$message.warning('订单详情数据获取失败')
				})
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
					console.log(res);
					if(res!=""){
						this.logListData=res.rows;
						this.pagination.total=res.results
					}
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//查看日志
			viewLog(){
				// if(this.logListData.length==0){
				// 	this.search();
				// }
				if(this.loadLog==null){
					this.loadLog=() => import('@/components/Log/index.vue');
				}
			}
		},
		filters:{
			//是否追加订单
			addflag(val){
				return val==0?'否':'是';
			},
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
