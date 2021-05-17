<template>
	<div style="min-height:730px; height:100%">
	    <div id="particles-js"></div>
	  </div>
</template>

<script>
	import particlesJs from "particles.js"
	import particlesConfig from "./particles.json"
	export default({
		name:'Particles',
		data(){
			return{
				
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			init(){
				particlesJS("particles-js", particlesConfig);
				document.body.style.overflow = "hidden";
			}
		}
	})
</script>

<style scoped>
	#particles-js{
	  width: 100%;
	  height: 100%;
	  background-color: #040925;
	  background-size: cover;
	  background-position: 50% 50%;
	  background-repeat: no-repeat;
	}
</style>
