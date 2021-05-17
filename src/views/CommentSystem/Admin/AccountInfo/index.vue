<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromAccount" class="demo-form-inline">
		  <el-form-item label="员工姓名">
		    <el-input v-model="fromAccount.name" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item label="角色">
		    <el-select v-model="fromAccount.user" @focus="handGetRoleList">
				   <el-option  label="全部" value=""></el-option>
				   <el-option v-for="item in roleList" :label="item.rolename" :value="item.roleid" :key="item.roleid"></el-option>
				 </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<div>
			<el-button type="primary"  @click="setAccountInfo()" size="small">新建员工信息</el-button>
		</div>
		<div class="tableMag">
		<!-- 表格数据 -->
		  <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
		      <el-table-column prop="uname" label="员工姓名" min-width="3%" />
		      <el-table-column prop="jsid" label="角色" :formatter="userid" min-width="5%" />
		      <el-table-column prop="udlname" label="登陆名" min-width="6%" />
		  		 
		  		 <el-table-column prop="cjsj" label="创建时间" min-width="6%" />
		  		 <el-table-column prop="xgsj" label="修改时间" min-width="5%" />
		  		 <el-table-column prop="zt" label="状态" min-width="6%" >
					 <template slot-scope="scope">
						 <el-switch v-model="scope.row.zt" active-value="1" inactive-value="0" active-text="启用" inactive-text="禁用" @change="activation(scope.row.uid)"></el-switch>
					 </template>
				 </el-table-column>
				 <el-table-column prop="bz" label="备注" min-width="5%" />
		      <el-table-column fixed="right" label="操作" min-width="7%" >
		        <template slot-scope="scope">
		  			 <el-button type="text" size="small" @click="setAccountInfo(scope.row.uid)">编辑</el-button>
		  			 <el-button type="text" size="small" @click="resetPass(scope.row.uid)">重置密码</el-button>
					 <template v-if="scope.row.jsid!=3">
						<!-- <el-button v-if="scope.row.zt=='0'" type="text" size="small" @click="activation(scope.row.uid)">激活</el-button>
						 <el-button v-else type="text" size="small" @click="activation(scope.row.uid)">设为无效</el-button> -->
						 <el-button type="text" size="small" @click="delUser(scope.row.uid)">删除</el-button>
					 </template>
		        </template>
		      </el-table-column>
		    </el-table>
			</div>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  <el-dialog title="添加用户信息" :visible.sync="dialogUserInfo" width="400px">
			  <component :is="userinfo" :userID="userID" :roleList="roleList" @dialogUserInfoToggle="dialogUserInfoToggle"></component>
		  </el-dialog>
	</div>
</template>

<script>
	import {Form,FormItem,Select,Option,Input,Table,TableColumn,Switch,Dialog} from 'element-ui'
	import {cmdEncrypt} from "@/assets/js/RSAz.js"
	import Pagination from "@/components/Pagination"
	import {mapGetters,mapActions} from 'vuex'
	export default({
		name:'AccountInfo',
		components:{
			Pagination,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Select.name]:Select,
			[Option.name]:Option,
			[Input.name]:Input,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Switch.name]:Switch,
			[Dialog.name]:Dialog
		},
		data(){
			return{
				fromAccount:{
					name:'',
					user:''
				},
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:true,
				dialogUserInfo:false,
				userID:'',
				userinfo:null
			}
		},
		computed:{
			...mapGetters([
				'roleList'
			])
		},
		created() {
			this.handGetRoleList();
			this.search();
		},
		methods:{
			//获取角色列表
			handGetRoleList(){
				if(this.roleList.length==0){
					this.getRoleList()
				}
			},
			//获取表格数据
			search(valdata=[]){
				//判断是否是分页传过来的参数
				if(valdata.length!=0){
					if(valdata[0]=="current"){
						this.pagination.current=valdata[1];
					}else if(valdata[0]=="size"){
						this.pagination.size=valdata[1];
					}
				}
				this.loading=true;
				let {name,user}=this.fromAccount;
				let {size,current}=this.pagination;
				this.$api.getCPUserList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"uname":name,
					"ujs":user
				}).then(res=>{
					if(res.results!=0){
						this.tableData=res.rows;
						this.pagination.total=res.results;
					}
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr)
					this.loading=false;
				})
			},
			//添加编辑用户信息
			setAccountInfo(uid=''){
				this.userID=uid;
				this.dialogUserInfo=true;
				if(this.userinfo==null){
					this.userinfo=()=>import('@/components/Admin/SetUserInfo.vue');
				}
			},
			//关闭弹窗
			dialogUserInfoToggle(){
				this.dialogUserInfo=false;
				this.search()
			},
			//重置密码
			resetPass(userid){
				this.$alert('您确定要重置该员工账号登陆密码吗?', '重置提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(async ()=>{
					let newpass = Math.floor(Math.random() * 999999) + "";
					try{
						let keystr=await this.$api.rsaKey();
						if(keystr.rescode==0){
							pass = cmdEncrypt(newpass, keystr.strPublicKeyExponent, keystr.strPublicKeyModulus);
						}else{
							return ;
						}
						this.$api.modifyCPUserPassword().then(res=>{
							if(res.rescode>0){
								this.$alert('重置成功，新密码:'+newpass, '新密码', {
								  confirmButtonText: '确定'
								  })
							}else{
								this.$message.warning('重置密码失败!')
							}
						})
					}catch(e){
						this.$message.warning('重置密码失败!')
					}
				}).catch(()=>{
					
				})
			},
			//激活
			activation(userid){
				this.$api.JhCPUser({userid}).then(res=>{
					if(res>0){
						this.$message.success('切换成功!')
					}else{
						this.$message.warning('切换失败!')
					}
				}).catch(err=>{
					this.$message.warning('切换失败!')
				})
			},
			//删除
			delUser(uIDs){
				this.$alert('确认要删除选中的员工账号吗?', '删除提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(()=>{
					this.$api.delCPUsers({uIDs}).then(res=>{
						if(res>0){
							this.$message.success('删除成功!')
							this.tableData=this.tableData.filter(n=>n.uid!=uIDs)
						}else{
							this.$message.warning('删除失败,可能原因：该员工已操作过相关订单信息将无法删除!')
						}
					}).catch(xhr=>{
						this.$message.warning('删除失败!')
					})
					
				}).catch(()=>{
					
				})
			},
			//用户ID格式化
			userid(row, column){
				let roleList=this.roleList;
				for(let i=0;i<roleList.length;i++){
					if(row.jsid==roleList[i].roleid){
						return roleList[i].rolename
					}
				}
			},
			...mapActions([
				'getRoleList'
			])
		}
	})
</script>

<style>
</style>
