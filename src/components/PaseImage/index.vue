<template>
	<div>
		<div class="copyimg">
		  <span v-show="imagesrc==''">图片粘贴区</span>
		  <img id="codeimg"  class="copyimg-img" :class="imgwidth?'widthauto':'heightauto'" :src="imagesrc" @load="loadimg" />
		</div>
		<div class="clear-img">
			<el-button type="text" @click="empty">清空</el-button>
		</div>
	</div>
</template>

<script>
	export default({
		name:'PaseImage',
		props:{
			imgsrc:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				imagesrc:this.imgsrc,
				imgwidth:true
			}
		},
		created() {
			this.setPasteImg('codeimg')
		},
		methods:{
			setPasteImg(id) {
				//粘贴事件
				var base64="";
				document.addEventListener('paste', function (event) {
					if (event.clipboardData || event.originalEvent) {
						var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
						if (clipboardData.items) {
							var blob;
							for (var i = 0; i < clipboardData.items.length; i++) {
								if (clipboardData.items[i].type.indexOf("image") !== -1) {
									blob = clipboardData.items[i].getAsFile();
								}
							}
							var render = new FileReader();
							render.onload = function (evt) {
								//输出base64编码
								base64 = evt.target.result;
								document.getElementById(id).setAttribute('src', base64);
							}
							render.readAsDataURL(blob);
						}
					}
				})
				
			},
			loadimg(even){
				if(even.path[0].clientHeight>even.path[0].clientWidth){
					this.imgwidth=true;
				}else{
					this.imgwidth=false;
				}
				this.imagesrc=document.getElementById('codeimg').getAttribute("src");
				this.$emit('getImgSrc',this.imagesrc)
			},
			empty(){
				this.imagesrc="";
				this.$emit('getImgSrc',this.imagesrc)
			}
		},
		watch:{
			imgsrc(newVal,oldVal){
				this.imagesrc=newVal;
			}
		}
	})
</script>

<style>
	.copyimg{width:150px;height:150px;line-height:150px;text-align:center;border-radius:5px;border:1px dashed #888;position:relative;display: inline-block;vertical-align:middle}
	.copyimg-img{width:100%;position:absolute;left:0;top:0}
	.heightauto{width: 100%;height: auto;}
	.widthauto{width: auto;height: 100%;}
	.clear-img{display: inline-block;margin-left: 10px;vertical-align: middle;}
</style>
