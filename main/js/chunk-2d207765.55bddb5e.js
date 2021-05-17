(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d207765"],{a143:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"order",attrs:{model:e.order,rules:e.orderRule,"label-width":"80px","label-position":"top"}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"客户",prop:"name"}},[r("el-select",{attrs:{filterable:"",remote:"",placeholder:"请输入关键词","remote-method":e.remoteMethod,loading:e.loading},model:{value:e.order.name,callback:function(t){e.$set(e.order,"name",t)},expression:"order.name"}},e._l(e.sellerdata,(function(e){return r("el-option",{key:e.id,attrs:{label:e.cname,value:e.id}})})),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"选择中介",prop:"intermediary"}},[r("el-select",{attrs:{placeholder:"请选择中介"},model:{value:e.order.intermediary,callback:function(t){e.$set(e.order,"intermediary",t)},expression:"order.intermediary"}},[r("el-option",{attrs:{label:"不指定",value:"0"}}),e._l(e.agentdata,(function(e){return r("el-option",{key:e.rid,attrs:{label:e.name,value:e.rid}})}))],2)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"支付选择",prop:"paySel"}},[r("el-select",{attrs:{placeholder:"请选择支付选择"},on:{change:e.paySel},model:{value:e.order.paySel,callback:function(t){e.$set(e.order,"paySel",t)},expression:"order.paySel"}},[r("el-option",{attrs:{label:"全额支付",value:"0"}}),r("el-option",{attrs:{label:"见单号返",value:"1"}}),r("el-option",{attrs:{label:"预付定金",value:"2"}})],1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"收款方式",prop:"channel"}},[r("el-select",{attrs:{placeholder:"请选择收款方式"},model:{value:e.order.channel,callback:function(t){e.$set(e.order,"channel",t)},expression:"order.channel"}},[r("el-option",{attrs:{label:"微信",value:"0"}}),r("el-option",{attrs:{label:"支付宝",value:"1"}}),r("el-option",{attrs:{label:"银行转账",value:"2"}})],1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"汇率",prop:"rate"}},[r("el-input",{model:{value:e.order.rate,callback:function(t){e.$set(e.order,"rate",t)},expression:"order.rate"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"当前实际收款金额(人民币)",prop:"money"}},[r("el-input",{model:{value:e.order.money,callback:function(t){e.$set(e.order,"money",t)},expression:"order.money"}})],1)],1),r("el-col",{staticStyle:{"text-align":"center"},attrs:{span:24}},[r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.btnloading},on:{click:function(t){return e.submitForm("order")}}},[e._v("立即创建")]),r("el-button",{on:{click:function(t){return e.resetForm("order")}}},[e._v("重置")])],1)],1)],1)],1)},n=[],l=(r("b0c0"),{name:"AddOrder",data:function(){return{order:{name:"",intermediary:"0",paySel:"",channel:"",rate:"",money:""},orderRule:{name:[{required:!0,message:"请选择客户",trigger:"change"}],intermediary:[{required:!0,message:"请选择中介",trigger:"change"}],paySel:[{required:!0,message:"请选择支付选择",trigger:"change"}],channel:[{required:!0,message:"请选择收款方式",trigger:"change"}],rate:[{required:!0,message:"请输入汇率",trigger:"blur"},{pattern:/^\d+(\.\d+)?$/,message:"汇率必须为数字",trigger:"blur"}],money:[{required:!0,message:"请输入实收款金额",trigger:"blur"},{pattern:/^\d+(\.\d+)?$/,message:"实收款金额必须为数字",trigger:"blur"}]},loading:!1,sellerdata:[],agentdata:[],btnloading:!1}},mounted:function(){this.getAgent()},methods:{remoteMethod:function(e){var t=this;""!==e?(this.loading=!0,setTimeout((function(){t.axios.get("/Handler/CPManageSystem.ashx?cmd=getHzsjListBySjname&sjname="+e).then((function(e){""!=e.data&&(t.sellerdata=e.data,t.loading=!1)})).catch((function(e){}))}),200)):this.sellerdata=[]},getAgent:function(){var e=this;this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPAgentList").then((function(t){""!=t.data&&(e.agentdata=t.data.rows)})).catch((function(e){}))},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.btnloading=!0,t.axios.get("/Handler/CPManageSystem.ashx?cmd=addCPTopOrder",{params:{hzsjid:t.order.name,sktype:t.order.channel,sktypeinfo:t.order.paySel,selAgent:t.order.intermediary,rmb2us:t.order.rate,realskTotalMoney:t.order.money}}).then((function(e){if(1==e.data.rescode){t.$message({type:"success",message:"创建成功"}),t.$emit("dialogToggle"),t.resetForm(),t.$router.push({path:"/addproduct",query:{orderno:e.data.resdesc}});var r={path:"/addproduct?orderno="+e.data.resdesc,name:"测评产品管理",icon:"addproduct"};t.$store.commit("tagsView/selectMenu",r)}else t.$message({type:"warning",message:e.data.resdesc});t.btnLoading=!1})).catch((function(e){t.$message({type:"warning",message:"客户测评订单创建失败"}),t.btnLoading=!1}))}))},resetForm:function(){this.$refs.order.resetFields()},paySel:function(e){1==e&&(this.order.money=0)}}}),o=l,s=r("2877"),i=Object(s["a"])(o,a,n,!1,null,null,null);t["default"]=i.exports}}]);