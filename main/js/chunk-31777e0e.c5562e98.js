(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31777e0e"],{"404a":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"copyimg"},[e("span",{directives:[{name:"show",rawName:"v-show",value:""==t.imagesrc,expression:"imagesrc==''"}]},[t._v("图片粘贴区")]),e("img",{staticClass:"copyimg-img",class:t.imgwidth?"widthauto":"heightauto",attrs:{id:"codeimg",src:t.imagesrc},on:{load:t.loadimg}})]),e("div",{staticClass:"clear-img"},[e("el-button",{attrs:{type:"text"},on:{click:t.empty}},[t._v("清空")])],1)])},s=[],n=(e("c975"),{name:"PaseImage",props:{imgsrc:{type:String,default:""}},data:function(){return{imagesrc:"",imgwidth:!0}},mounted:function(){this.imagesrc=this.imgsrc,this.setPasteImg("codeimg")},methods:{setPasteImg:function(t){var i="";document.addEventListener("paste",(function(e){if(e.clipboardData||e.originalEvent){var a=e.clipboardData||e.originalEvent.clipboardData;if(a.items){for(var s,n=0;n<a.items.length;n++)-1!==a.items[n].type.indexOf("image")&&(s=a.items[n].getAsFile());var c=new FileReader;c.onload=function(e){i=e.target.result,document.getElementById(t).setAttribute("src",i)},c.readAsDataURL(s)}}}))},loadimg:function(t){t.path[0].clientHeight>t.path[0].clientWidth?this.imgwidth=!0:this.imgwidth=!1,this.imagesrc=document.getElementById("codeimg").getAttribute("src"),this.$emit("getImgSrc",this.imagesrc)},empty:function(){this.imagesrc="",this.$emit("getImgSrc",this.imagesrc)}},watch:{imgsrc:function(t,i){this.imagesrc=t}}}),c=n,r=(e("ae37"),e("2877")),m=Object(r["a"])(c,a,s,!1,null,null,null);i["default"]=m.exports},6689:function(t,i,e){},ae37:function(t,i,e){"use strict";var a=e("6689"),s=e.n(a);s.a}}]);