(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2304e2"],{ec5c:function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("el-form",{ref:"order",attrs:{model:e.order,rules:e.orderRule,"label-width":"80px","label-position":"top"}},[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"回款渠道",prop:"channel"}},[t("el-select",{attrs:{placeholder:"请选择收款方式"},model:{value:e.order.channel,callback:function(r){e.$set(e.order,"channel",r)},expression:"order.channel"}},[t("el-option",{attrs:{label:"微信",value:"0"}}),t("el-option",{attrs:{label:"支付宝",value:"1"}}),t("el-option",{attrs:{label:"银行转账",value:"2"}}),t("el-option",{attrs:{label:"PayPal",value:"3"}})],1)],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"回款金额",prop:"money"}},[t("el-input",{model:{value:e.order.money,callback:function(r){e.$set(e.order,"money",r)},expression:"order.money"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"备注",prop:"remark"}},[t("el-input",{model:{value:e.order.remark,callback:function(r){e.$set(e.order,"remark",r)},expression:"order.remark"}})],1)],1),t("el-col",{staticStyle:{"text-align":"center"},attrs:{span:24}},[t("el-form-item",[t("el-button",{attrs:{type:"primary",loading:e.btnloading},on:{click:function(r){return e.submitForm("order")}}},[e._v("立即提交")])],1)],1)],1)],1)},o=[],a={name:"Sellerpayment",props:{orderno:{type:String,default:""}},data:function(){return{order:{money:"",channel:"",remark:""},orderRule:{money:[{required:!0,message:"请输入回款金额",trigger:"blur"},{pattern:/^\d+(\.\d+)?$/,message:"回款金额必须为数字",trigger:"blur"}],channel:[{required:!0,message:"请选择回款方式",trigger:"change"}]},btnloading:!1,neworderno:""}},mounted:function(){this.neworderno=this.orderno},methods:{submitForm:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return!1;r.btnloading=!0,r.axios.get("/Handler/CPManageSystem.ashx?cmd=comitPayTopOrderMoney",{params:{toporderno:r.neworderno,remark:r.order.remark,ordermoney:r.order.money,sktype:r.order.channel}}).then((function(e){e.data.rescode>0?(r.$message({type:"success",message:"提交成功"}),r.$emit("dialogToggle"),r.resetForm()):r.$message({type:"warning",message:e.data.resdesc}),r.btnLoading=!1})).catch((function(e){r.$message({type:"warning",message:"提交失败"}),r.btnLoading=!1}))}))},resetForm:function(){this.$refs.order.resetFields()}},watch:{orderno:function(e,r){this.neworderno=e}}},l=a,s=t("2877"),i=Object(s["a"])(l,n,o,!1,null,null,null);r["default"]=i.exports}}]);