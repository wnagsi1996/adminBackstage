<template>
	<div class="username">
		<div class="userdata-left">
			<div class="userdata-left-a">
				<a v-for="(item,index) in userList.rows" :key="item.userid" :class="item.userid==SelerCheck?'check':''" @click="selUser(item.userid)">{{item.username}}</a>
			</div>
			
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :pager-count="5"
			  :page-size="pagination.size"
			  :hide-on-single-page="true"
			  @current-change="hankChang"
			  :total="pagination.total">
			</el-pagination>
		</div>
		<div class="userdesc-info">
			<div class="userdesc-info-two" v-if="userListInfo.length>0 && Object.keys(userListInfo[0]).length>0">
				<h5>今日数据</h5>
				<div class="userdesc-info-day">
					<ul>
						<li v-if="userListInfo[0].dayjdmpnum!=undefined">
							<p>接单: {{userListInfo[0].dayjdmpnum+userListInfo[0].dayjdlpnum}}</p>
							<span>免: {{userListInfo[0].dayjdmpnum}}/留: {{userListInfo[0].dayjdlpnum}}</span>
						</li>
						<li v-if="userListInfo[0].daytdmpnum!=undefined">
							<p>卖家退单: {{userListInfo[0].daytdmpnum+userListInfo[0].daytdlpnum}}</p>
							<span>免: {{userListInfo[0].daytdmpnum}}/留: {{userListInfo[0].daytdlpnum}}</span>
						</li>
						<li v-if="userListInfo[0].daysdmpnum!=undefined">
							<p>刷单: {{userListInfo[0].daysdmpnum+userListInfo[0].daysdmpnum}}</p>
							<span>免: {{userListInfo[0].daysdmpnum}}/留: {{userListInfo[0].daysdlpnum}}</span>
						</li>
						<li v-if="userListInfo[0].daycdmpnum!=undefined">
							<p>买家退单: {{userListInfo[0].daycdmpnum+userListInfo[0].daycdmpnum}}</p>
							<span>免: {{userListInfo[0].daycdmpnum}}/留: {{userListInfo[0].daycdlpnum}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="userdesc-info-two" v-if="userListInfo.length>0">
				<h5>本月数据</h5>
				<div class="userdesc-info-day">
					<ul>
						<li v-if="userListInfo[1].monthjdmpnum!=undefined">
							<p>接单: {{userListInfo[1].monthjdmpnum+userListInfo[1].monthjdlpnum}}</p>
							<span>免: {{userListInfo[1].monthjdmpnum}}/留: {{userListInfo[1].monthjdlpnum}}</span>
						</li>
						<li v-if="userListInfo[1].monthtdmpnum!=undefined">
							<p>卖家退单: {{userListInfo[1].monthtdmpnum+userListInfo[1].monthtdlpnum}}</p>
							<span>免: {{userListInfo[1].monthtdmpnum}}/留: {{userListInfo[1].monthtdlpnum}}</span>
						</li>
						<li v-if="userListInfo[1].monthsdmpnum!=undefined">
							<p>刷单: {{userListInfo[1].monthsdmpnum+userListInfo[1].monthsdlpnum}}</p>
							<span>免: {{userListInfo[1].monthsdmpnum}}/留: {{userListInfo[1].monthsdlpnum}}</span>
						</li>
						<li v-if="userListInfo[1].monthcdmpnum!=undefined">
							<p>买家退单: {{userListInfo[1].monthcdmpnum+userListInfo[1].monthcdmpnum}}</p>
							<span>免: {{userListInfo[1].monthcdmpnum}}/留: {{userListInfo[1].monthcdlpnum}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="userdata-content">
			<ve-line :data="userListInfo[2]" class="line"></ve-line>
		</div>
	</div>
</template>

<script>
	import {Pagination} from 'element-ui'
	import VeLine from 'v-charts/lib/line'
	export default({
		name:'UserMonthInfo',
		components:{
			[VeLine.name]:VeLine,
			[Pagination.name]:Pagination,
		},
		props:{
			userList:{
				type:Object,
				default:new Object()
			},
			userListInfo:{
				type:Array,
				default:new Array()
			},
			pagination:{
				type:Object,
				default:new Object()
			}
		},
		data(){
			return{
				newUserList:{},
				newUserListInfo:[],
				SelerCheck:0
			}
		},
		mounted() {
			this.getCheck();
			
		},
		methods:{
			getCheck(){
				if(Object.keys(this.userList).length > 0){
					this.SelerCheck=this.userList.rows[0].userid;
					this.pagination.total=this.userList.results
				}
				
			},
			//选中用户
			selUser(userid){
				this.SelerCheck=userid
				this.$emit("getSelerinfodata",userid)
			},
			//分页变化
			hankChang(val){console.log(val)
				this.pagination.index=val-1;
				this.$emit("getSelerUser",this.pagination);
			}
		},
		watch:{
			userList(newVal,oldVal){
				this.getCheck();
			}
		}
	})
</script>

<style scoped>
	.username{display: flex;margin-top: 10px;height: 420px;}
	.userdata-left{width: 240px;}
	.userdata-left a{width:40%;height:34px;line-height:34px;text-align:center;margin:10px 5%;display: inline-block;border-radius: 5px; box-shadow: 0 0 2px #ccc;cursor: pointer;}
	.userdata-left a.check{background-color: #1989FA;color:#fff}
	.userdata-content{flex: 1;}
	.userdesc-info{width:300px;}
	.userdesc-info-two{box-shadow: 0 0 2px #ccc;padding:10px;border-radius: 3px;margin:10px 20px 20px}
	.userdesc-info-two>h5{text-align: center;font-weight: normal;font-size: 16px;padding-bottom: 10px;}
	.userdesc-info-day ul li{height:30px;line-height: 30px;}
	.userdesc-info-day ul li p{display:inline-block;width: 50%;color: #666;}
	.userdesc-info-day ul li span{color:#666}
</style>
