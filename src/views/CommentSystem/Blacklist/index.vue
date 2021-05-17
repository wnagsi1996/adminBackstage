<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
		  <el-form-item label="关键词">
		    <el-input v-model="fromorder.keyword" placeholder=""></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		
		<div>
			<el-button type="primary"  @click="setBlackInfo()" size="small">新建黑名单信息</el-button>
		</div>
		<div class="tableMag">
		<!-- 表格数据 -->
		  <el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
			  <el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
		      <el-table-column prop="amazonpage" label="亚马逊页面" min-width="5%">
				  <template slot-scope="scope">
					  <span class= "col-cont" v-html="showDate(scope.row.amazonpage)" ></span >
				  </template>
			  </el-table-column>
		      <el-table-column prop="country" label="国家" min-width="3%">
				<template slot-scope="scope">
				  <span class= "col-cont" v-html="showDate(scope.row.country)" ></span >
			   </template>
			  </el-table-column>
		      <el-table-column prop="email" label="邮箱" min-width="6%">
		  		 <template slot-scope="scope">
		  		 	<span class= "col-cont" v-html="showDate(scope.row.email)" ></span >
		  		  </template>
		  	  </el-table-column>
			  <el-table-column prop="fbpage" label="FB页面" min-width="6%" >
			    <template slot-scope="scope">
					<span class= "col-cont" v-html="showDate(scope.row.fbpage)" ></span >
			    </template>
			  </el-table-column>
		  	  <el-table-column prop="insertdate" label="创建时间" min-width="5%" >
			    <template slot-scope="scope">
			    	<span class= "col-cont" v-html="showDate(scope.row.insertdate)" ></span >
			    </template>
			  </el-table-column>
				 <el-table-column prop="firstname" label="昵称" min-width="5%" >
					<template slot-scope="scope">
						 <span class= "col-cont" v-html="showDate(scope.row.firstname + scope.row.lastname)" ></span >
				     </template>
				 </el-table-column>
				<el-table-column prop="remark" label="备注" min-width="10%" >
				  <template slot-scope="scope">
				  	<span class= "col-cont" v-html="showDate(scope.row.remark)" ></span >
				  </template>
				</el-table-column>
				 <el-table-column prop="remark" label="微信" min-width="4%" >
				   <template slot-scope="scope">
				   	<span class= "col-cont" v-html="showDate(scope.row.weixin)" ></span >
				   </template>
				 </el-table-column>
				 <el-table-column prop="username" label="添加人" min-width="4%" >
				   <template slot-scope="scope">
				   	<span class= "col-cont" v-html="showDate(scope.row.username)" ></span >
				   </template>
				 </el-table-column>
		      <el-table-column fixed="right" label="操作" min-width="4%" >
		        <template slot-scope="scope">
					 <template v-if="scope.row.ifupdate==1">
						<el-button type="text" size="small" @click="setBlackInfo(scope.row)">编辑</el-button>
						 <el-button type="text" size="small" @click="delBlackUser(scope.row.rid)">删除</el-button>
					 </template>
		        </template>
		      </el-table-column>
		    </el-table>
			</div>
		  <!-- 分页 -->
		  <Pagination class="pagination" @search="search" :pagination="pagination" />
		  
		  <!-- 公共弹窗组件 -->
		  <el-dialog :title="dialog.title" :visible.sync="dialog.Visible" width="500px"  >
		  		<component :is="dialog.dialogComponent" :userInfo="dialog.userInfo" @dialogToggle="dialogToggle"/>
		  </el-dialog>
	</div>
</template>

<script>
	import {Form,FormItem,Table,TableColumn,Dialog,Input} from 'element-ui'
	import Pagination from "@/components/Pagination"
	export default({
		name:'BlackList',
		components:{
			Pagination,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Dialog.name]:Dialog,
			[Input.name]:Input,
		},
		data(){
			return{
				fromorder:{
					keyword:''
				},
				tableData:[],
				loading:false,
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				dialog:{
					title:'',
					Visible:false,
					dialogComponent:null,
					userInfo:{}
				}
			}
		},
		created() {
			this.search()
		},
		methods:{
			// 获取表格数据
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
				this.$api.getCPHMDList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"keyword": this.fromorder.keyword
				}).then(res=>{
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			setBlackInfo(userInfo={}){
				let title='';
				if(Object.keys(userInfo).length==0){
					title='新增黑名单用户';
				}else{
					title='编辑黑名单用户';
				}
				if(this.dialog.dialogComponent==null){
					this.dialog.dialogComponent=()=>import('@/components/BlackUser')
				}
				Object.assign(this.dialog,{title,userInfo,Visible:true})
			},
			//删除黑名单
			delBlackUser(rid){
				this.$alert('确认要删除该黑名单用户吗?', '删除提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(()=>{
					this.$api.delCPHMD({rid}).then(res=>{
						if(res.rescode>0){
							this.$message.success('删除成功!')
							this.tableData=this.tableData.filter(n=>n.rid!=rid)
						}else{
							this.$message.warning('删除失败!')
						}
					}).catch(xhr=>{
						this.$message.warning('删除失败!')
					})
					
				}).catch(()=>{
					
				})
			},
			showDate(val) {
				val = val + '';
				let keyword=this.fromorder.keyword
				if ( val.indexOf(keyword) !== - 1 && keyword !== '') {
					return val.replace(keyword, '<font color="red">' + keyword + '</font>')
				} else {
					return val
				}
			},
			//关闭弹出框
			dialogToggle(type=false){
				Object.assign(this.dialog,{title:'',Visible:false});
				if(type) this.search();
				
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			}
		}
	})
</script>

<style>
</style>
