(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8456fb4a"],{"0038":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("p",[e._v(e._s(e._f("ordernofilter")(this.ordernodata))+" "),r("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyorderno()}}})])])},o=[],n={name:"OrderCopy",props:{orderno:{type:String,default:""}},data:function(){return{ordernodata:""}},mounted:function(){this.ordernodata=this.orderno},methods:{copyorderno:function(){var e=document.createElement("input");e.value=this.ordernodata,document.body.appendChild(e),e.select(),document.execCommand("Copy"),this.$message({message:"复制成功",type:"success"}),e.remove()}},filters:{ordernofilter:function(e){var t,r;return e.length>10?(t=e.substring(0,5),r=e.substring(e.length-5,e.length),t+"..."+r):e}},watch:{orderno:function(e,t){this.ordernodata=e}}},i=n,l=r("2877"),s=Object(l["a"])(i,a,o,!1,null,null,null);t["a"]=s.exports},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,r){var a=r("c6b6"),o=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var n=r.call(e,t);if("object"!==typeof n)throw TypeError("RegExp exec method returned something other than an Object or null");return n}if("RegExp"!==a(e))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(e,t)}},"251c":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.fromorder}},[r("el-form-item",{attrs:{label:"订单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.OrderNo,callback:function(t){e.$set(e.fromorder,"OrderNo",t)},expression:"fromorder.OrderNo"}})],1),r("el-form-item",{attrs:{label:"收入渠道"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.channel,callback:function(t){e.$set(e.fromorder,"channel",t)},expression:"fromorder.channel"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"微信",value:"0"}}),r("el-option",{attrs:{label:"支付宝",value:"1"}}),r("el-option",{attrs:{label:"银行卡",value:"2"}}),r("el-option",{attrs:{label:"PayPal",value:"3"}})],1)],1),r("el-form-item",{attrs:{label:"订单状态"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.orderStaus,callback:function(t){e.$set(e.fromorder,"orderStaus",t)},expression:"fromorder.orderStaus"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"待确认",value:"0"}}),r("el-option",{attrs:{label:"已确认",value:"1"}}),r("el-option",{attrs:{label:"已驳回",value:"2"}})],1)],1),r("el-form-item",{attrs:{label:"收入货币"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.currency,callback:function(t){e.$set(e.fromorder,"currency",t)},expression:"fromorder.currency"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"人民币",value:"0"}}),r("el-option",{attrs:{label:"美元",value:"1"}})],1)],1),r("el-form-item",{attrs:{label:"订单类别"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.orderType,callback:function(t){e.$set(e.fromorder,"orderType",t)},expression:"fromorder.orderType"}},[r("el-option",{attrs:{label:"全部",value:" "}}),r("el-option",{attrs:{label:"接单收款",value:"0"}}),r("el-option",{attrs:{label:"退补差价",value:"4"}}),r("el-option",{attrs:{label:"追加订单收款",value:"6"}}),r("el-option",{attrs:{label:"卖家付款",value:"9"}})],1)],1),r("el-form-item",{attrs:{label:"创建时间"}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date1"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.fromorder.date1,callback:function(t){e.$set(e.fromorder,"date1",t)},expression:"fromorder.date1"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date2"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.fromorder.date2,callback:function(t){e.$set(e.fromorder,"date2",t)},expression:"fromorder.date2"}})],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),r("div",{staticClass:"tableMag"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[r("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("copyorderno",{attrs:{orderno:e.row.orderno}})]}}])}),r("el-table-column",{attrs:{prop:"rattypestr",label:"收入渠道","min-width":"6%"}}),r("el-table-column",{attrs:{prop:"currencystr",label:"收入货币","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"ordermoney",label:"收款金额","min-width":"6%"}}),r("el-table-column",{attrs:{prop:"fqusername",label:"提交人员","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"fqdate",label:"提交时间","min-width":"8%"}}),r("el-table-column",{attrs:{prop:"ztstr",label:"订单状态","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[""!=t.row.shremark||""!=t.row.fqremark?[r("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover"}},[r("div",[""!=t.row.fqremark?r("div",[r("h4",[e._v("提交备注")]),r("p",[e._v(e._s(t.row.fqremark))])]):e._e(),""!=t.row.shremark?r("div",[r("br"),r("h4",[e._v("审核备注")]),r("p",[e._v(e._s(t.row.shremark))])]):e._e()]),r("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v(e._s(t.row.ztstr))])],1),""!=t.row.fkimgurl?r("i",{staticClass:"el-icon-picture-outline fkIMG",on:{click:function(r){return e.fkimg(t.row.fkimgurl)}}}):e._e()]:[r("p",[e._v(e._s(t.row.ztstr)+" "),""!=t.row.fkimgurl?r("span",{staticStyle:{cursor:"pointer"}},[r("i",{staticClass:"el-icon-picture-outline",on:{click:function(r){return e.fkimg(t.row.fkimgurl)}}})]):e._e()])]]}}])}),r("el-table-column",{attrs:{prop:"bustypestr",label:"订单类别","min-width":"5%"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"==t.row.zt?[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.comitsh(t.row.rid,"1",t.row.orderno,t.row.currency)}}},[e._v("确认")]),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.comitsh(t.row.rid,"2",t.row.orderno)}}},[e._v("驳回")])]:e._e()]}}])})],1)],1),r("Pagination",{staticClass:"pagination",attrs:{pagination:e.pagination},on:{search:e.search}}),r("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){return e.$set(e.dialog,"dialogVisible",t)}}},[r("el-form",{ref:"item",attrs:{model:e.item,rules:e.itemRules,"label-width":"80px","label-position":"top"}},[r("el-row",{attrs:{gutter:20}},["1"==e.dialog.currency?r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"收入人民币",prop:"rmbtxt"}},[r("el-input",{model:{value:e.item.rmbtxt,callback:function(t){e.$set(e.item,"rmbtxt","string"===typeof t?t.trim():t)},expression:"item.rmbtxt"}})],1)],1):e._e(),r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{model:{value:e.item.remark,callback:function(t){e.$set(e.item,"remark","string"===typeof t?t.trim():t)},expression:"item.remark"}})],1)],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.submit}},[e._v("确定")])],1)],1)],1)},o=[],n=(r("4de4"),r("ac1f"),r("841c"),r("333d")),i=r("0038"),l={name:"Audit",components:{Pagination:n["a"],copyorderno:i["a"]},data:function(){return{fromorder:{OrderNo:"",channel:"-1",orderStaus:"0",currency:"-1",orderType:"",date1:"",date2:""},pagination:{total:0,size:20,current:1},tableData:[],loading:!0,dialog:{title:"",dialogVisible:!1,orderno:"",currency:"",rid:"",state:""},item:{rmbtxt:"",remark:""},itemRules:{rmbtxt:[{pattern:/^\d+(\.\d+)?$/,message:"人民币金额必须为数字"}]},btnLoading:!1}},mounted:function(){this.search()},methods:{search:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=t.length&&("current"==t[0]?this.pagination.current=t[1]:"size"==t[0]&&(this.pagination.size=t[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCWOrderDetailList",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,orderno:this.fromorder.OrderNo,ordertype:0,currency:this.fromorder.channel,txtaccount:"",zt:this.fromorder.orderStaus,bustype:this.fromorder.orderType,xdOrderno:"",ifauto:-1,sjs:this.fromorder.date1,sje:this.fromorder.date2}}).then((function(t){e.pagination.total=t.data.results,e.tableData=t.data.rows,e.loading=!1})).catch((function(e){}))},comitsh:function(e,t,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o="";o="2"==t?"您确定要驳回该订单吗?":"您确认该笔款项已到账?","1"!=a&&(this.item.rmbtxt=0),this.dialog.title=o,this.dialog.rid=e,this.dialog.state=t,this.dialog.dialogVisible=!0,this.dialog.orderno=r,this.dialog.currency=a},submit:function(){var e=this;this.$refs.item.validate((function(t){if(t){if("1"==e.dialog.currency&&0==e.item.rmbtxt)return e.$message({type:"warning",message:"收入人民币不能为0!"}),!1;e.btnLoading=!0,e.axios.post("/Handler/CPManageSystem.ashx?cmd=doCWDetail",e.qs.stringify({rids:e.dialog.rid,shremark:e.item.remark,cwstate:e.dialog.state,realrmbmoney:e.item.rmbtxt,_img64:""})).then((function(t){1==t.data.rescode?(e.$message({type:"success",message:t.data.resdesc}),e.tableData=e.tableData.filter((function(t){return t.rid!=e.dialog.rid})),e.resetForm(),e.handleClose()):e.$message({type:"warning",message:t.data.resdesc}),e.btnLoading=!1})).catch((function(t){e.$message({type:"warning",message:"添加失败"}),e.btnLoading=!1}))}}))},resetForm:function(){this.$refs.item.resetFields()},handleClose:function(){this.dialog.title="",this.dialog.rid="",this.dialog.state="",this.dialog.dialogVisible=!1,this.dialog.orderno="",this.dialog.currency=""}}},s=l,c=r("2877"),d=Object(c["a"])(s,a,o,!1,null,null,null);t["default"]=d.exports},"333d":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.pagination.total>e.pagination.size,expression:"pagination.total>pagination.size"}],attrs:{background:"","current-page":e.pagination.current,"page-sizes":e.pagination.sizes,"page-size":e.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},o=[],n={name:"Pagination",props:{pagination:{type:Object,default:function(){return{size:20,current:0,total:0,sizes:[20,50,100,200]}}}},methods:{handleSizeChange:function(e){var t=["size",e];this.$emit("search",t)},handleCurrentChange:function(e){var t=["current",e];this.$emit("search",t)}}},i=n,l=r("2877"),s=Object(l["a"])(i,a,o,!1,null,null,null);t["a"]=s.exports},"841c":function(e,t,r){"use strict";var a=r("d784"),o=r("825a"),n=r("1d80"),i=r("129f"),l=r("14c3");a("search",1,(function(e,t,r){return[function(t){var r=n(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,r):new RegExp(t)[e](String(r))},function(e){var a=r(t,e,this);if(a.done)return a.value;var n=o(e),s=String(this),c=n.lastIndex;i(c,0)||(n.lastIndex=0);var d=l(n,s);return i(n.lastIndex,c)||(n.lastIndex=c),null===d?-1:d.index}]}))},9263:function(e,t,r){"use strict";var a=r("ad6d"),o=r("9f7f"),n=RegExp.prototype.exec,i=String.prototype.replace,l=n,s=function(){var e=/a/,t=/b*/g;return n.call(e,"a"),n.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=o.UNSUPPORTED_Y||o.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],u=s||d||c;u&&(l=function(e){var t,r,o,l,u=this,p=c&&u.sticky,m=a.call(u),f=u.source,g=0,h=e;return p&&(m=m.replace("y",""),-1===m.indexOf("g")&&(m+="g"),h=String(e).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==e[u.lastIndex-1])&&(f="(?: "+f+")",h=" "+h,g++),r=new RegExp("^(?:"+f+")",m)),d&&(r=new RegExp("^"+f+"$(?!\\s)",m)),s&&(t=u.lastIndex),o=n.call(p?r:u,h),p?o?(o.input=o.input.slice(g),o[0]=o[0].slice(g),o.index=u.lastIndex,u.lastIndex+=o[0].length):u.lastIndex=0:s&&o&&(u.lastIndex=u.global?o.index+o[0].length:t),d&&o&&o.length>1&&i.call(o[0],r,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(o[l]=void 0)})),o}),e.exports=l},"9f7f":function(e,t,r){"use strict";var a=r("d039");function o(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=a((function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=a((function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,r){"use strict";var a=r("23e7"),o=r("9263");a({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},d784:function(e,t,r){"use strict";r("ac1f");var a=r("6eeb"),o=r("d039"),n=r("b622"),i=r("9263"),l=r("9112"),s=n("species"),c=!o((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),u=n("replace"),p=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),m=!o((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,u){var f=n(e),g=!o((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),h=g&&!o((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[s]=function(){return r},r.flags="",r[f]=/./[f]),r.exec=function(){return t=!0,null},r[f](""),!t}));if(!g||!h||"replace"===e&&(!c||!d||p)||"split"===e&&!m){var b=/./[f],v=r(f,""[e],(function(e,t,r,a,o){return t.exec===i?g&&!o?{done:!0,value:b.call(t,r,a)}:{done:!0,value:e.call(r,t,a)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),x=v[0],y=v[1];a(String.prototype,e,x),a(RegExp.prototype,f,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}u&&l(RegExp.prototype[f],"sham",!0)}}}]);