<template>
	<div>
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
			<el-form-item label="创建时间">
			    <el-col :span="11">
			      <el-form-item prop="date1">
			        <el-date-picker type="month" value-format="yyyy-MM" placeholder="开始时间" v-model="fromorder.date1" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" :span="1">-</el-col>
			    <el-col :span="11">
			      <el-form-item prop="date2">
			        <el-date-picker type="month" value-format="yyyy-MM" placeholder="结束时间" v-model="fromorder.date2" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			 </el-form-item>
			 <el-form-item>
			   <el-button type="primary" @click="search">查询</el-button>
			 </el-form-item>
		</el-form>
		
		<div>
			<el-button type="primary" @click="edit()">新建</el-button>
		</div>
		
		<!-- 表格数据 -->
		<div class="tableMag">
			<el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
			    <el-table-column prop="date" label="序号" type="index" :index="indexMethod" min-width="5%" />
			    <el-table-column prop="month" label="月份" min-width="6%" />
			    <el-table-column prop="money" label="支出金额" min-width="5%" />
			    <el-table-column prop="insertdate" label="创建时间" min-width="6%" />
				<el-table-column prop="remark" label="备注" min-width="30%" />
				 <el-table-column prop="insertdate" label="操作" min-width="8%" >
					 <template slot-scope="scope">
						 <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
						 <el-button @click="del(scope.row.rid)" type="text" size="small">删除</el-button>
					 </template>
				 </el-table-column>
				 
			  </el-table>
		</div>
		
		<!-- 分页 -->
		<Pagination class="pagination" @search="search" :pagination="pagination" />
		
		<el-dialog title="设置返款手续费和汇率" :visible.sync="dialogVisible"  width="400px">
		  <div>
			  <el-form ref="formLabelAlign" label-width="80px" :rules="formLabelAlignRules" :model="formLabelAlign" label-position="top">
			    <el-form-item label="月份" prop="month">
			      <el-date-picker type="month" value-format="yyyy-MM" v-model="formLabelAlign.month" style="width: 100%;"></el-date-picker>
			    </el-form-item>
			    <el-form-item label="支出金额" prop="money">
			      <el-input v-model="formLabelAlign.money"></el-input>
			    </el-form-item>
				<el-form-item label="备注" prop="remark">
				  <el-input type="textarea" :rows="5" v-model="formLabelAlign.remark"></el-input>
				</el-form-item>
			  </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="settingPrimary" :loading="btnLoading">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	import {Form,FormItem,Input,Table,TableColumn,DatePicker,Col,Dialog} from 'element-ui'
	import Pagination from "@/components/Pagination"
	export default({
		name:'MonthlyExpenditure',
		components:{
			Pagination,
			[Form.name]:Form,
			[FormItem.name]:FormItem,
			[Table.name]:Table,
			[TableColumn.name]:TableColumn,
			[Input.name]:Input,
			[DatePicker.name]:DatePicker,
			[Dialog.name]:Dialog,
			[Col.name]:Col
		},
		data(){
			return{
				fromorder:{
					date1:'',
					date2:''
				},
				tableData:[],
				//分页配置
				pagination:{
					"total":0,
					"size":20,
					"current":1
				},
				loading:false,
				dialogVisible:false,
				btnLoading:false,
				formLabelAlign:{
					month:'',
					money:'',
					remark:'',
					rid:''
				},
				formLabelAlignRules:{
					month:[
						{ required: true, message: '请选择月份', trigger: 'blur' }
					],
					money:[
						{ required: true, message: '请输入支出金额', trigger: 'blur' },
						{ pattern:/^\d+(\.\d+)?$/, message: '支出金额必须为数字' }
					],
					remark:[
						{ required: true, message: '请添加备注', trigger: 'blur' }
					]
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
				let {date1,date2}=this.fromorder
				if(date1==null){
					this.fromorder.date1=date1=''
				}
				if(date2==null){
					this.fromorder.date2=date2=''
				}
				let {size:current}=this.pagination;
				this.$api.getMonthOutLayList({
					"pageSize": size,                         //页面大小
					"pageNum":current-1,   //页码
					"months": date1,
					"monethe": date2
				}).then(res=>{
					//console.log(res);
					this.pagination.total=res.results;
					this.tableData=res.rows;
					this.loading=false;
				}).catch(xhr=>{
					console.log(xhr);
				})
			},
			edit(row={}){
				this.dialogVisible=true
				if(Object.keys(row).length!=0){
					this.formLabelAlign=Object.assign(this.formLabelAlign,row)
				}else{
					this.resetForm()
				}
			},
			del(rid){
				this.$confirm('您确认要删除该月份的信息吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$api.delMonthOutLay({rid}).then(res=>{
						if (res == 0) {
							this.$message.warning('删除失败!')
						}else{
							this.$message.success('删除成功!')
							this.tableData=this.tableData.filter(n=>n.rid!=rid)
						}
					}).catch(xhr=>{
						this.$message.warning('删除失败!')
					})
				}).catch(() => {
					this.$message.info('已取消删除!')       
				});
			},
			settingPrimary(){
				this.$refs.formLabelAlign.validate((valid) => {
					if (valid) {
						this.btnLoading=true;
						let {rid,month,money,remark}=this.formLabelAlign
						if(rid=="" ||rid==undefined){
							this.$api.addMonthOutLay({
								month,
								outmoney:money,
								remark
							}).then(res=>{//console.log(res)
								if (res == 0) {
									this.$message.warning('添加失败!')
								}else{
									this.$message.success('添加成功!')
									this.dialogVisible=false
									this.search()
								}
								this.btnLoading=false
							}).catch(xhr=>{
								this.$message.warning('添加失败!');
								this.btnLoading=false
							})
						}else{
							this.$api.editMonthOutLay({
								month,
								outmoney:money,
								remark,
								rid
							}).then(res=>{
								if (res == 0) {
									this.$message.warning('编辑失败!')
								}else{
									this.$message.success('编辑成功!')
									this.dialogVisible=false
									this.search()
								}
								this.btnLoading=false
							}).catch(xhr=>{
								this.$message.warning('编辑失败!')
								this.btnLoading=false
							})
						}
					}
				})
			},
			//格式化序号
			indexMethod(index){
				 return index=index+1;
			},
			resetForm(){
				this.$nextTick(()=>{
					this.$refs.formLabelAlign.resetFields();
				})
			}
		}
	})
</script>

<style>
</style>
