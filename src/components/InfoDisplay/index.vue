<template>
	<div class="public-statue month-finance">
		<h5>{{infoData.title}}</h5>
		<p>{{infoData.money}}</p>
		<span v-if="infoData.txt">{{infoData.txt}}</span>
	</div>
</template>

<script>
	export default({
		name:'InfoDisplay',
		props:{
			infoData:Object
		}
	})
</script>

<style scoped>
	.public-statue{background-color: #fff;margin: 15px;padding: 10px;border-radius: 3px;box-shadow: 0 0 20px #DCDFE6;}
</style>
