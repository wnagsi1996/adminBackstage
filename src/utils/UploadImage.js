//获取粘贴板上的图片
function setPasteImg(id) {
	//粘贴事件
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
					var base64 = evt.target.result;console.log(id);
					document.getElementById(id).setAttribute('src', base64);
				}
				render.readAsDataURL(blob);
			}
		}
	})
}

export {setPasteImg}