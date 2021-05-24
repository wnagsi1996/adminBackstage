<template>
	<div class="sd-detail-info">
		<h3>{{list.name}}</h3>
		<div class="sd-detail-item" v-for="(item,index) in list.desc" :key="index">
			<span>{{item.text}}:</span>
			<span>{{item.value}}</span>
		</div>
	</div>
</template>

<script>
	export default({
		name:'TitleAndInfo',
		props:{
			list:Object
		}
	})
</script>

<style scoped>
	.sd-detail-info h3{text-align: center;margin-top: 15px;font-weight: normal;color: #1989FA;}
	.sd-detail-item{display: flex;padding:10px 0}
	.sd-detail-item span{width: 50%;}
	.sd-detail-item span:last-child{text-align: right;color: red;}
</style>
