<template>
	<div id='logcontent' class='logcontent' v-loading="loading">
	  <div id='logcontentTxt' v-if="logListData.length>0">
		  <div class='log-cen' v-for="(log,index) in logListData" :key="index"  >
			  <div class='log-cen-top'>
				  <p><span>操作人:</span>{{log.czusername}}</p>
				  <p><span>时间:</span>{{log.czdatetime}}</p>
			  </div>
			  <div class='log-cen-bottom'>
				  <p><span>行为:</span>{{log.cztype}}</p>
				  <p><span>日志:</span>{{log.czremark}}
					  <el-popover v-if="log.fkimgurl!=''" trigger="hover" placement="top">
						  <img :src="log.fkimgurl" />
						  <i slot="reference" class="el-icon-picture"></i>
					  </el-popover>
				  </p>
			  </div>
		  </div>
		 <!-- 分页 -->
		 <Pagination @search="search" :pagination="pagination" />
	  </div>
	</div>
</template>

<script>
	import {Popover} from 'element-ui'
	import Pagination from "@/components/Pagination"
	export default({
		name:'Log',
		props:{
			logorderno:{
				type:String,
				default:''
			}
		},
		components:{
			[Popover.name]:Popover,
			Pagination
		},
		data(){
			return{
				dialogVisible:false,  //弹出框显示隐藏
				logListData:[],  //分页数据
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:true
			}
		},
		created() {
			this.dialogVisible=this.logshow;
			this.search();
		},
		methods:{
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
					if(res!=""){
						this.logListData=res.rows;
						this.pagination.total=res.results
					}
					this.loading=false;
				}).catch(err=>{
					console.log(err);
					this.$message.warning('数据获取失败')
				})
			},
		},
		watch:{
			logorderno(newVal,oldVal){
				this.pagination.current=1;
				this.search();
			}
		}
	})
</script>

<style scoped>
	.log-cen:first-child{margin:0 auto 20px}
	.log-cen{margin:20px auto;padding:20px 0 0 0;}
	.log-cen-top p{display:inline-block;}
	.log-cen-top p:first-child{width:200px;}
	.log-cen-top p span,.log-cen-bottom p span{font-weight:bold;}
</style>
