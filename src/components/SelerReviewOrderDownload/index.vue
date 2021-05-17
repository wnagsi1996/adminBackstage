<template>
	<div>
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="fromorder" class="demo-form-inline">
			<el-form-item label="创建时间">
				<el-col :span="11">
					<el-form-item prop="date1">
						<el-date-picker type="datetime" placeholder="开始时间" v-model="fromorder.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col class="line" :span="1">-</el-col>
				<el-col :span="11">
					<el-form-item prop="date2">
						<el-date-picker type="datetime" placeholder="结束时间" v-model="fromorder.date2" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-form-item label="订单类型">
					<el-select v-model="fromorder.orderType" placeholder="">
						<el-option label="全部" value="-1"></el-option>
						<el-option label="免评单" value="0"></el-option>
						<el-option label="留评单" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户" prop="name">
					<el-select v-model="fromorder.name" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="clearloading">
						<el-option v-for="item in sellerdata" :key="item.id" :label="item.cname" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form-item>
			<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-button type="primary" @click="downTable">下载订单表格</el-button>
		<div class="tableMag">
			<el-table id="example" :data="tableData" border stripe v-loading="loading" style="width: 100%">
				<el-table-column prop="xdOrderno" label="单号" min-width="6%" />
				<el-table-column prop="ProductImgUrl" label="图片" min-width="4%">
					<template slot-scope="scope">
						<img slot="reference" :src="scope.row.ProductImgUrl" style="width: 50px;" />
					</template>
				</el-table-column>
				<el-table-column prop="productdj" label="产品价格" min-width="4%" />
				<el-table-column prop="realproductdj" label="下单价格" min-width="4%" />
				<el-table-column prop="xddate" label="下单时间" min-width="6%" />
				<el-table-column prop="ordertypetxt" label="订单类型" min-width="4%" />
			</el-table>
		</div>

		<!-- 分页 -->
	</div>
</template>

<script>
	/** column数据的说明 */
	//1.title为column的标题
	//2.key为column对应的key
	//3.type默认是text，若为图片格式type为image , 并且可以设置图片的宽高

	const column = [{
			title: '单号',
			key: 'xdOrderno',
			type: 'text'
		},
		{
			title: '图片',
			key: 'ProductImgUrl',
			type: 'image',
			widta: '100px',
			height: '100px'
		},
		{
			title: '产品价格',
			key: 'productdj',
			type: 'text'
		},
		{
			title: '下单价格',
			key: 'realproductdj',
			type: 'text'
		},
		{
			title: '下单时间',
			key: 'xddate',
			type: 'text'
		},
		{
			title: '订单类型',
			key: 'ordertypetxt',
			type: 'text'
		}
	]

	//import Pagination from "@/components/Pagination"
	import table2excel from 'js-table2excel'
	import {
		Form,
		FormItem,
		Col,
		DatePicker,
		Select,
		Option,
		Table,
		TableColumn
	} from 'element-ui'
	export default ({
		name: 'downloadTable',
		components: {
			[Form.name]: Form,
			[FormItem.name]: FormItem,
			[Col.name]: Col,
			[DatePicker.name]: DatePicker,
			[Select.name]: Select,
			[Option.name]: Option,
			[Table.name]: Table,
			[TableColumn.name]: TableColumn
		},
		data() {
			return {
				tableData: [],
				loading: false,
				clearloading: false,
				productTable: [], //下载的表格数据
				sellerdata: [],
				fromorder: {
					name: '',
					date1: '',
					date2: '',
					orderType: '-1'
				}
			}
		},
		methods: {
			// 获取表格数据
			search() {
				this.loading = true;
				let {
					orderType,
					date1,
					date2,
					name
				} = this.fromorder;
				this.$api.getMJExportCPOrderDetailList_waitsh({
					"ordertype": orderType,
					"sjs": date1,
					"sje": date2,
					"sjid": name
				}).then(res => {
					res.rows.forEach(n => n.ordertypetxt = n.ordertype == '0' ? '免评单' : '留评单')
					this.tableData = res.rows;
					this.loading = false;
				}).catch(xhr => {
					console.log(xhr);
				})
			},
			//搜索商家
			remoteMethod(sjname) {
				//console.log(val);
				if (sjname !== '') {
					this.clearloading = true;
					this.$api.getHzsjListBySjname({
						sjname
					}).then(res => {
						//console.log(res);
						if (res != '') {
							this.sellerdata = res;
							this.clearloading = false;
						}
					}).catch(xhr => {
						console.log(xhr)
					})
				} else {
					this.sellerdata = [];
				}
			},
			//下载表格数据
			downTable() {
				let tableData = this.tableData;
				if (tableData.length == 0) {
					this.$message.warning('表格数据为空')
				} else {
					//第三个参数是表格名
					table2excel(column, tableData, "订单表格数据.xls")
				}
			}
		}
	})
</script>

<style>
</style>
