<template>
	<div>
		<div v-if="summary.productdj>summary.realproductdj">
			<h3>有{{results}}单购买单价和原始接单价格发生变化，总计需要退给卖家产品费${{(summary.productdj-summary.realproductdj).toFixed(2)}}</h3>
		</div>
		<div v-else>
			<h3>有{{results}}单购买单价和原始接单价格发生变化，总计需要退给卖家产品费${{(summary.realproductdj-summary.productdj).toFixed(2)}}</h3>
		</div>
		<el-table :data="tableData" border stripe v-loading="loading" style="width: 100%">
			<el-table-column prop="ProductImgUrl" label="图片" min-width="3%">
				<template slot-scope="scope">
					<img slot="reference" :src="scope.row.ProductImgUrl" style="width: 25px;" />
				</template>
			</el-table-column>
			<el-table-column prop="productdj" label="原始单价" min-width="5%" />
			<el-table-column prop="realproductdj" label="购买单价" min-width="5%" />
		</el-table>
	</div>
</template>

<script>
	export default({
		name:'DifferencePrices',
		props:{
			orderno:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				tableData:[],
				loading:true,
				summary:[],
				results:0
			}
		},
		created() {
			this.gettabledata();
		},
		methods:{
			gettabledata(){
				this.loading=true
				this.$api.getSCOrderListBT({
					pageindex:0,
					len:50,
					orderno:this.orderno
				}).then(res=>{
					//console.log(res);
					this.tableData=res.rows;
					this.summary=res.summary;
					this.results=res.results
					this.loading=false
				}).catch(xhr=>{
					console.log(xhr);
				})
			}
		},
		watch:{
			orderno(newVal,oldVal){
				this.gettabledata();
			}
		}
	})
</script>

<style>
</style>
