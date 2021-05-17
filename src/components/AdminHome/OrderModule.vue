<template>
	<el-row>
		<el-col :span="12" v-for="(item,index) in neworderdata" :key="index">
		  <div class="today-desc-title">
			  <h5>{{item.title}}</h5>
			  <p>{{item.lpnum+item.mpnum}}</p>
			  <div class="today-desc-info">
				  <span>免：{{item.mpnum}}</span>
				  <span>留：{{item.lpnum}}</span>
			  </div>
		  </div>
		</el-col>
	</el-row>
</template>

<script>
	import {Row,Col} from 'element-ui'
	export default({
		name:'OrderModule',
		props:{
			orderdata:{
				type:Array,
				default:new Array()
			}
		},
		components:{
			[Row.name]:Row,
			[Col.name]:Col
		},
		data(){
			return{
				neworderdata:[]
			}
		},
		created() {
			this.neworderdata=this.orderdata;
		},
		methods:{
			
		},
		watch:{
			orderdata(newVal,oldVal){
				this.neworderdata=newVal;
			}
		}
	})
</script>

<style scoped>
	.today-desc-title{text-align: center;margin: 25px 0;}
	.today-desc-title h5{font-weight: normal;color: #666666;font-size:14px;}
	.today-desc-title p{color:#1989FA;font-size: 36px;margin:10px 0 0}
	.today-desc-info span{font-size:12px;color:#ccc;padding:0 5px}
</style>
