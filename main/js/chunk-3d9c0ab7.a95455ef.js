(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d9c0ab7","chunk-31777e0e"],{"404a":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"copyimg"},[a("span",{directives:[{name:"show",rawName:"v-show",value:""==e.imagesrc,expression:"imagesrc==''"}]},[e._v("图片粘贴区")]),a("img",{staticClass:"copyimg-img",class:e.imgwidth?"widthauto":"heightauto",attrs:{id:"codeimg",src:e.imagesrc},on:{load:e.loadimg}})]),a("div",{staticClass:"clear-img"},[a("el-button",{attrs:{type:"text"},on:{click:e.empty}},[e._v("清空")])],1)])},s=[],n=(a("c975"),{name:"PaseImage",props:{imgsrc:{type:String,default:""}},data:function(){return{imagesrc:"",imgwidth:!0}},mounted:function(){this.imagesrc=this.imgsrc,this.setPasteImg("codeimg")},methods:{setPasteImg:function(e){var t="";document.addEventListener("paste",(function(a){if(a.clipboardData||a.originalEvent){var r=a.clipboardData||a.originalEvent.clipboardData;if(r.items){for(var s,n=0;n<r.items.length;n++)-1!==r.items[n].type.indexOf("image")&&(s=r.items[n].getAsFile());var i=new FileReader;i.onload=function(a){t=a.target.result,document.getElementById(e).setAttribute("src",t)},i.readAsDataURL(s)}}}))},loadimg:function(e){e.path[0].clientHeight>e.path[0].clientWidth?this.imgwidth=!0:this.imgwidth=!1,this.imagesrc=document.getElementById("codeimg").getAttribute("src"),this.$emit("getImgSrc",this.imagesrc)},empty:function(){this.imagesrc="",this.$emit("getImgSrc",this.imagesrc)}},watch:{imgsrc:function(e,t){this.imagesrc=e}}}),i=n,o=(a("ae37"),a("2877")),l=Object(o["a"])(i,r,s,!1,null,null,null);t["default"]=l.exports},"5a49":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"spread",attrs:{model:e.spread,rules:e.spreadRule,"label-width":"80px","label-position":"top"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"补退差价",prop:"type"}},[a("el-radio-group",{attrs:{size:"small"},model:{value:e.spread.type,callback:function(t){e.$set(e.spread,"type",t)},expression:"spread.type"}},[a("el-radio",{attrs:{label:"0",border:""}},[e._v("补差价")]),a("el-radio",{attrs:{label:"1",border:""}},[e._v("退差价")])],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"金额(小数点保留两位)",prop:"money"}},[a("el-input",{model:{value:e.spread.money,callback:function(t){e.$set(e.spread,"money",t)},expression:"spread.money"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"渠道",prop:"channel"}},[a("el-select",{attrs:{placeholder:"请选择渠道"},model:{value:e.spread.channel,callback:function(t){e.$set(e.spread,"channel",t)},expression:"spread.channel"}},[a("el-option",{attrs:{label:"微信",value:"0"}}),a("el-option",{attrs:{label:"支付宝",value:"1"}}),a("el-option",{attrs:{label:"银行转账",value:"2"}}),a("el-option",{attrs:{label:"PayPal",value:"3"}})],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"账号",prop:"account"}},[a("el-input",{model:{value:e.spread.account,callback:function(t){e.$set(e.spread,"account",t)},expression:"spread.account"}})],1)],1),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"截图",prop:"imgsrc"}},[a("PaseImage",{attrs:{imgsrc:e.spread.imgsrc},on:{getImgSrc:e.getImgSrc}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{model:{value:e.spread.remark,callback:function(t){e.$set(e.spread,"remark",t)},expression:"spread.remark"}})],1)],1),a("el-col",{staticStyle:{"text-align":"center"},attrs:{span:24}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.btnloading},on:{click:function(t){return e.submitForm("spread")}}},[e._v("立即提交")])],1)],1)],1)],1)},s=[],n=a("404a"),i={name:"Sellerpayment",components:{PaseImage:n["default"]},props:{orderno:{type:String,default:""}},data:function(){return{spread:{type:"",money:"",channel:"",account:"",remark:"",imgsrc:""},spreadRule:{type:[{required:!0,message:"请选择收款方式",trigger:"change"}],money:[{required:!0,message:"请输入实收款金额",trigger:"blur"},{pattern:/^\d+(\.\d+)?$/,message:"实收款金额必须为数字",trigger:"blur"}],channel:[{required:!0,message:"请选择渠道",trigger:"change"}]},btnloading:!1,toporderno:""}},mounted:function(){this.toporderno=this.orderno},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;""==t.spread.account&&""==t.spread.imgsrc?t.$message({type:"warning",message:"收款账户或二维码不能都为空!"}):(t.btnloading=!0,t.axios.post("/Handler/CPManageSystem.ashx?cmd=comitMakeUpTopOrderMoney",t.qs.stringify({toporderno:t.toporderno,remark:t.spread.remark,ordertype:t.spread.type,ordermoney:t.spread.money,skaccount:t.spread.account,sktype:t.spread.channel,_img64:t.spread.imgsrc})).then((function(e){e.data.rescode>0?(t.$message({type:"success",message:"提交成功"}),t.$emit("dialogToggle"),t.resetForm()):t.$message({type:"warning",message:e.data.resdesc}),t.btnloading=!1})).catch((function(e){t.$message({type:"warning",message:"提交失败"}),t.btnloading=!1})))}))},resetForm:function(){this.$refs.spread.resetFields()},getImgSrc:function(e){this.spread.imgsrc=e}},watch:{orderno:function(e,t){this.toporderno=e}}},o=i,l=a("2877"),c=Object(l["a"])(o,r,s,!1,null,null,null);t["default"]=c.exports},6689:function(e,t,a){},ae37:function(e,t,a){"use strict";var r=a("6689"),s=a.n(r);s.a}}]);