<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromAccount" class="demo-form-inline">
		  <el-form-item label="中介名称">
		    <el-input v-model="fromAccount.name" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<div>
			<el-button type="primary"  @click="setAgentInfo()" size="small">新建中介信息</el-button>
		</div>
		<div class="tableMag">
		<!-- 表格数据 -->
		  <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
		      <el-table-column prop="rid" label="中介ID" min-width="3%" />
		      <el-table-column prop="name" label="中介名称"min-width="5%" />
		      <el-table-column prop="sktypestr" label="收款渠道" min-width="6%" />
			  <el-table-column prop="skaccount" label="收款账号" min-width="6%" >
				<template slot-scope="scope">
				  <p>{{scope.row.skaccount}}
				  <el-popover placement="right" width="300" trigger="click">
					<img style="max-width: 300px;" :src="scope.row.fkImgUrl" />
					<i v-if="scope.row.fkImgUrl!=''" slot="reference" class="el-icon-picture-outline"></i>
				  </el-popover>
				  </p>
				</template>
			  </el-table-column>
		  	  <el-table-column prop="lxfs" label="联系方式" min-width="5%" />
		  	  <el-table-column prop="agenttype" label="哪一端" :formatter="agenttype" min-width="5%" />
		  	  <el-table-column prop="mjusername" label="创建人员" min-width="5%" />
		  	  <el-table-column prop="insertdate" label="创建时间" min-width="5%" />
		      <el-table-column fixed="right" label="操作" min-width="7%" >
		        <template slot-scope="scope">
		  			 <el-button type="text" size="small" @click="setAgentInfo(scope.row)">编辑</el-button>
					 <el-button type="text" size="small" @click="delAgent(scope.row.rid)">删除</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
			</div>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  <el-dialog title="中介信息" :visible.sync="dialogAgentinfo" width="560px">
			  <component :is="agentinfo" :agentdes="agentdes" @dialogAgentinfoToggle="dialogAgentinfoToggle"></component>
		  </el-dialog>
	</div>
</template>

<script>
	import {Form,FormItem,Input,Table,TableColumn,Popover,Dialog} from 'element-ui'
	import Pagination from "@/components/Pagination"
	export default({
		name:'Intermediary',
		components:{
			Pagination,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Input.name]:Input,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Popover.name]:Popover,
			[Dialog.name]:Dialog
		},
		data(){
			return{
				fromAccount:{
					name:''
				},
				tableData:[],
				loading:false,
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				agentinfo:null,
				agentdes:{},
				dialogAgentinfo:false
			}
		},
		created() {
			this.search()
		},
		methods:{
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
				let {size,current}=this.pagination;
				this.$api.getCPAgentLists({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"zjname": this.fromAccount.name
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			//设置中介弹出框
			setAgentInfo(agentdes={}){
				this.agentdes=agentdes;
				this.dialogAgentinfo=true;
				if(this.agentinfo==null){
					this.agentinfo=()=>import('@/components/Agent');
				}
			},
			//删除中介
			delAgent(zjid){
				this.$alert('确认要删除选中的中介吗?', '删除提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(()=>{
					this.$api.delCPAgent({zjid}).then(res=>{
						if(res>0){
							this.$message.success('删除成功!')
							this.tableData=this.tableData.filter(n=>n.rid!=zjid)
						}else{
							this.$message.warning('删除失败,可能原因：该中介已操作过相关订单信息将无法删除!')
						}
					}).catch(xhr=>{
						this.$message.warning('删除失败!')
					})
				}).catch(()=>{
					
				})
			},
			// 创建中介角色格式化
			agenttype(row){
				return row.agenttype == 0?'买家端中介':'卖家端中介'
			},
			// 给子组件回调关闭弹出框重新加载表格
			dialogAgentinfoToggle(){
				this.dialogAgentinfo=false;
				this.search();
			}
		}
	})
</script>

<style>
</style>
