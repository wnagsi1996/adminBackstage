<template>
	<div>
		<el-pagination v-show="pagination.total>pagination.size"
			 background
			 @size-change="handleSizeChange"
			 @current-change="handleCurrentChange"
			 :current-page="pagination.current"
			 :page-sizes="pagination.sizes"
			 :page-size="pagination.size"
			 layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total">
		</el-pagination>
	</div>
</template>

<script>
	import {Pagination} from 'element-ui'
	export default({
		name:'Pagination',
		props:{
			pagination:{
				type:Object,
				default() {
					return {
						size:20,
						current:0,
						total:0,
						sizes:[20, 50, 100, 200]
					}
				}
			}
		},
		components:{
			[Pagination.name]:Pagination
		},
		methods:{
			handleSizeChange(val) {
				let valdata=['size',val];
				this.$emit('search',valdata);
			},
			handleCurrentChange(val) {
				let valdata=['current',val];
				this.$emit('search',valdata);
			},
		}
	})
</script>

<style>
</style>
