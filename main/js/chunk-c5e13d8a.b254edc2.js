(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5e13d8a"],{"0038":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v(t._s(t._f("ordernofilter")(this.ordernodata))+" "),n("i",{staticClass:"el-icon-document-copy",on:{click:function(e){return t.copyorderno()}}})])])},r=[],a={name:"OrderCopy",props:{orderno:{type:String,default:""}},data:function(){return{ordernodata:""}},mounted:function(){this.ordernodata=this.orderno},methods:{copyorderno:function(){var t=document.createElement("input");t.value=this.ordernodata,document.body.appendChild(t),t.select(),document.execCommand("Copy"),this.$message({message:"复制成功",type:"success"}),t.remove()}},filters:{ordernofilter:function(t){var e,n;return t.length>10?(e=t.substring(0,5),n=t.substring(t.length-5,t.length),e+"..."+n):t}},watch:{orderno:function(t,e){this.ordernodata=t}}},i=a,l=n("2877"),d=Object(l["a"])(i,o,r,!1,null,null,null);e["a"]=d.exports},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"14c3":function(t,e,n){var o=n("c6b6"),r=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var a=n.call(t,e);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==o(t))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},2850:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.withdraw}},[t._v("批量撤回")]),n("div",{staticClass:"tableMag"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingChildren,expression:"loadingChildren"}],staticStyle:{width:"100%"},attrs:{data:t.tableDataChildren,border:"",stripe:""},on:{"selection-change":t.changeFun},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-table-column",{attrs:{type:"selection",width:"55",selectable:t.checkboxT,disabled:"true"},on:{"selection-change":t.changeFun}}),n("el-table-column",{attrs:{label:"序号",type:"index",index:t.indexMethod,"min-width":"5%"}}),n("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("copyorderno",{attrs:{orderno:t.row.orderno}})]}}],null,!0)}),n("el-table-column",{attrs:{prop:"price",label:"客单价","min-width":"5%"}}),n("el-table-column",{attrs:{prop:"ztstr",label:"订单状态","min-width":"4%"}}),n("el-table-column",{attrs:{prop:"ordertypestr",label:"订单类别","min-width":"4%"}}),n("el-table-column",{attrs:{prop:"jduser",label:"接单人员","min-width":"4%"}}),n("el-table-column",{attrs:{prop:"plantfddate",label:"计划放单时间","min-width":"7%"}}),n("el-table-column",{attrs:{prop:"fddate",label:"实际放单时间","min-width":"7%"}}),n("el-table-column",{attrs:{prop:"jddate",label:"接单时间","min-width":"7%"}}),n("el-table-column",{attrs:{prop:"xdOrderno",label:"购买单号","min-width":"7%"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"7%"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.zt?[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.edit(e.row.orderno)}}},[t._v("放单")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.backOrder(e.row.orderno)}}},[t._v("退单")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.setFDdate(e.row.orderno)}}},[t._v("设定放单时间")])]:t._e(),"1"==e.row.zt?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.recall(e.row.orderno)}}},[t._v("撤回放单")]):t._e(),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.handleLogClick(e.row)}}},[t._v("查看详情")])]}}],null,!0)})]}}])})],1),n(t.log,{tag:"component",attrs:{logorderno:t.logorderno,logshow:t.logshow},on:{handleLogClick:t.handleLogClick}}),n("Pagination",{staticClass:"pagination",attrs:{pagination:t.pagination},on:{search:t.search}}),n("el-dialog",{attrs:{title:t.dialogAddProduct.title,visible:t.dialogAddProduct.toggle,width:t.dialogAddProduct.width,"modal-append-to-body":!1},on:{"update:visible":function(e){return t.$set(t.dialogAddProduct,"toggle",e)}}},[n(t.dialogAddProduct.dialogContent,{tag:"component",attrs:{orderno:t.puborderno},on:{dialogToggle:t.dialogToggle}})],1)],1)},r=[],a=(n("4de4"),n("d3b7"),n("ac1f"),n("841c"),n("333d")),i=n("0038"),l={components:{Pagination:a["a"],copyorderno:i["a"]},props:{childrenOrderNo:{type:String,default:""}},data:function(){return{tableDataChildren:[],loadingChildren:!0,loading:!1,pagination:{total:0,size:20,current:1},dialogAddProduct:{toggle:!1,title:"",width:"",dialogContent:null},puborderno:"",setdatecom:null,editordercom:null,backOrderItem:null,log:null,logorderno:"",logshow:!1,multipleSelection:[]}},mounted:function(){this.search()},methods:{search:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=e.length&&("current"==e[0]?this.pagination.current=e[1]:"size"==e[0]&&(this.pagination.size=e[1])),this.loadingChildren=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailListByCpOrderno",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,orderno:this.childrenOrderNo}}).then((function(e){t.pagination.total=e.data.results,t.tableDataChildren=e.data.rows,t.loadingChildren=!1})).catch((function(t){}))},handleLogClick:function(t){this.logshow?this.logshow=!1:(this.logorderno=t.orderno,this.logshow=!0,null==this.log&&(this.log=function(){return n.e("chunk-c59ed1d4").then(n.bind(null,"9621"))}))},recall:function(t){var e=this;this.axios.get("/Handler/CPManageSystem.ashx?cmd=cancelFDCPOrderDetail&orderno="+t).then((function(t){t.data>0?(e.$message({type:"success",message:"撤回成功!"}),e.search()):e.$message({type:"warning",message:"撤回失败!"})})).catch((function(t){}))},backOrder:function(t){this.puborderno=t,this.dialogAddProduct.toggle=!0,this.dialogAddProduct.width="50%",this.dialogAddProduct.title="追加订单",null==this.backOrderItem&&(this.backOrderItem=function(){return n.e("chunk-3478c338").then(n.bind(null,"83b4"))}),this.dialogAddProduct.dialogContent=this.backOrderItem},edit:function(t){this.puborderno=t,this.dialogAddProduct.toggle=!0,this.dialogAddProduct.width="50%",this.dialogAddProduct.title="放单",null==this.editordercom&&(this.editordercom=function(){return n.e("chunk-917b524a").then(n.bind(null,"9af3"))}),this.dialogAddProduct.dialogContent=this.editordercom},setFDdate:function(t){this.puborderno=t,this.dialogAddProduct.toggle=!0,this.dialogAddProduct.width="400px",this.dialogAddProduct.title="设置放单时间",null==this.setdatecom&&(this.setdatecom=function(){return n.e("chunk-2d0be1b7").then(n.bind(null,"2f9f"))}),this.dialogAddProduct.dialogContent=this.setdatecom},dialogToggle:function(){this.dialogAddProduct.width="",this.puborderno="",this.dialogAddProduct.title="",this.dialogAddProduct.toggle=!1,this.dialogAddProduct.dialogContent=null,this.search()},indexMethod:function(t){return t+1},changeFun:function(t){this.multipleSelection=t},withdraw:function(){var t=this,e=[];this.multipleSelection.filter((function(t){return e.push(t.rid)}));var n=e.toString();""==n?this.$message({type:"warning",message:"请选择批量数据"}):(this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=cancelFDCPOrderDetail_PL&rids="+n).then((function(e){e.data>0?(t.$message({type:"success",message:"撤回成功!"}),t.search()):t.$message({type:"warning",message:"撤回失败!"}),t.loading=!1})).catch((function(e){t.$message({type:"warning",message:"撤回失败!"}),t.loading=!1})))},checkboxT:function(t,e){return"1"==t.zt}}},d=l,s=n("2877"),c=Object(s["a"])(d,o,r,!1,null,null,null);e["a"]=c.exports},"333d":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.pagination.total>t.pagination.size,expression:"pagination.total>pagination.size"}],attrs:{background:"","current-page":t.pagination.current,"page-sizes":t.pagination.sizes,"page-size":t.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:t.pagination.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},r=[],a={name:"Pagination",props:{pagination:{type:Object,default:function(){return{size:20,current:0,total:0,sizes:[20,50,100,200]}}}},methods:{handleSizeChange:function(t){var e=["size",t];this.$emit("search",e)},handleCurrentChange:function(t){var e=["current",t];this.$emit("search",e)}}},i=a,l=n("2877"),d=Object(l["a"])(i,o,r,!1,null,null,null);e["a"]=d.exports},"517a":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"tableMag"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:"","show-summary":""},on:{"expand-change":t.tableChildren}},[n("el-table-column",{attrs:{type:"expand",lazy:""}},[n("TableChildren",{attrs:{childrenOrderNo:t.childrenOrderNo}})],1),n("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",index:t.indexMethod,"min-width":"5%"}}),n("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("copyorderno",{attrs:{orderno:t.row.orderno}})]}}])}),n("el-table-column",{attrs:{prop:"pimg",label:"图片","min-width":"3%"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("a",{attrs:{href:t.row.purl,target:"_blank"}},[n("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover",content:t.row.ptitle}},[n("img",{staticStyle:{width:"50px"},attrs:{slot:"reference",src:t.row.pimg},slot:"reference"})])],1)]}}])}),n("el-table-column",{attrs:{prop:"cpnum",label:"订单总数","min-width":"6%"}}),n("el-table-column",{attrs:{prop:"lpnum",label:"留评单数","min-width":"5%"}}),n("el-table-column",{attrs:{prop:"mpnum",label:"免评单数","min-width":"5%"}}),n("el-table-column",{attrs:{prop:"successNum",label:"已完成单数","min-width":"5%"}}),n("el-table-column",{attrs:{prop:"ylpnum",label:"已留评单数","min-width":"5%"}}),n("el-table-column",{attrs:{prop:"skmoney",label:"应收金额","min-width":"5%"}}),n("el-table-column",{attrs:{prop:"fkmoney",label:"已返款金额","min-width":"5%"}}),n("el-table-column",{attrs:{prop:"ztstr",label:"订单状态","min-width":"8%"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"7%"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.zt||"3"==e.row.zt?[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.setProduct(e.row.orderno,1)}}},[t._v("修改下单要求")])]:t._e(),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.send(e.row.orderno)}}},[t._v("一键放单")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.handleLogClick(e.row)}}},[t._v("查看详情")])]}}])})],1)],1),n("Pagination",{staticClass:"pagination",attrs:{pagination:t.pagination},on:{search:t.search}}),n(t.log,{tag:"component",attrs:{logorderno:t.logorderno,logshow:t.logshow},on:{handleLogClick:t.handleLogClick}}),n("el-dialog",{attrs:{title:t.dialogAddProduct.title,visible:t.dialogAddProduct.toggle,width:t.dialogAddProduct.width},on:{"update:visible":function(e){return t.$set(t.dialogAddProduct,"toggle",e)}}},[n(t.dialogAddProduct.dialogContent,{tag:"component",attrs:{orderno:t.puborderno,dataObj:t.dialogAddProduct.dataObj},on:{dialogToggle:t.dialogToggle}})],1)],1)},r=[],a=(n("d3b7"),n("ac1f"),n("841c"),n("333d")),i=n("0038"),l=n("2850"),d={name:"AddProduct",components:{Pagination:a["a"],copyorderno:i["a"],TableChildren:l["a"]},data:function(){return{orderno:"",tableData:[],tableDataChildren:[],childrenOrderNo:"",puborderno:"",pagination:{total:0,size:20,current:1},loading:!0,orderInfo:new Object,log:null,logorderno:"",batchsendcom:null,logshow:!1,dialogAddProduct:{toggle:!1,title:"",width:"",dataObj:{},dialogContent:null},addProductItem:null}},mounted:function(){this.search()},methods:{search:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=e.length&&("current"==e[0]?this.pagination.current=e[1]:"size"==e[0]&&(this.pagination.size=e[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPOrderList",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,toporderno:""}}).then((function(e){t.pagination.total=e.data.results,t.tableData=e.data.rows,t.loading=!1})).catch((function(t){}))},tableChildren:function(t){this.childrenOrderNo=t.orderno},setProduct:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.puborderno=t,this.dialogAddProduct.width="50%",0==e?(this.dialogAddProduct.title="添加产品","0"==this.orderInfo.state||"3"==this.orderInfo.state?this.dialogAddProduct.dataObj.state=1:this.dialogAddProduct.dataObj.state=0):this.dialogAddProduct.title="编辑产品",this.dialogAddProduct.toggle=!0,null==this.addProductItem&&(this.addProductItem=function(){return n.e("chunk-f996d6fa").then(n.bind(null,"5408"))}),this.dialogAddProduct.dialogContent=this.addProductItem},handleLogClick:function(t){this.logshow?this.logshow=!1:(this.logorderno=t.orderno,this.logshow=!0,null==this.log&&(this.log=function(){return n.e("chunk-23612381").then(n.bind(null,"47aa"))}))},indexMethod:function(t){return t+1},dialogToggle:function(){this.dialogAddProduct.width="",this.puborderno="",this.dialogAddProduct.title="",this.dialogAddProduct.toggle=!1,this.dialogAddProduct.dialogContent=null,this.dialogAddProduct.dataObj={},this.search()},send:function(t){var e=this;this.axios.get("/Handler/CPManageSystem.ashx?cmd=getKeyWordCanFDNum&orderno="+t).then((function(o){0==o.data.results?e.$message({type:"warning",message:"没有可放单的订单"}):(e.dialogAddProduct.width="600px",e.puborderno=t,e.dialogAddProduct.title="一键放单",e.dialogAddProduct.toggle=!0,null==e.batchsendcom&&(e.batchsendcom=function(){return n.e("chunk-0e551397").then(n.bind(null,"9339"))}),e.dialogAddProduct.dialogContent=e.batchsendcom,e.dialogAddProduct.dataObj=o.data.rows)})).catch((function(t){}))}}},s=d,c=(n("e576"),n("2877")),u=Object(c["a"])(s,o,r,!1,null,"eb8a5c96",null);e["default"]=u.exports},"841c":function(t,e,n){"use strict";var o=n("d784"),r=n("825a"),a=n("1d80"),i=n("129f"),l=n("14c3");o("search",1,(function(t,e,n){return[function(e){var n=a(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,n):new RegExp(e)[t](String(n))},function(t){var o=n(e,t,this);if(o.done)return o.value;var a=r(t),d=String(this),s=a.lastIndex;i(s,0)||(a.lastIndex=0);var c=l(a,d);return i(a.lastIndex,s)||(a.lastIndex=s),null===c?-1:c.index}]}))},9263:function(t,e,n){"use strict";var o=n("ad6d"),r=n("9f7f"),a=RegExp.prototype.exec,i=String.prototype.replace,l=a,d=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),s=r.UNSUPPORTED_Y||r.BROKEN_CARET,c=void 0!==/()??/.exec("")[1],u=d||c||s;u&&(l=function(t){var e,n,r,l,u=this,g=s&&u.sticky,h=o.call(u),p=u.source,f=0,m=t;return g&&(h=h.replace("y",""),-1===h.indexOf("g")&&(h+="g"),m=String(t).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==t[u.lastIndex-1])&&(p="(?: "+p+")",m=" "+m,f++),n=new RegExp("^(?:"+p+")",h)),c&&(n=new RegExp("^"+p+"$(?!\\s)",h)),d&&(e=u.lastIndex),r=a.call(g?n:u,m),g?r?(r.input=r.input.slice(f),r[0]=r[0].slice(f),r.index=u.lastIndex,u.lastIndex+=r[0].length):u.lastIndex=0:d&&r&&(u.lastIndex=u.global?r.index+r[0].length:e),c&&r&&r.length>1&&i.call(r[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(r[l]=void 0)})),r}),t.exports=l},"9f7f":function(t,e,n){"use strict";var o=n("d039");function r(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=o((function(){var t=r("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=o((function(){var t=r("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},ac1f:function(t,e,n){"use strict";var o=n("23e7"),r=n("9263");o({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},d784:function(t,e,n){"use strict";n("ac1f");var o=n("6eeb"),r=n("d039"),a=n("b622"),i=n("9263"),l=n("9112"),d=a("species"),s=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),c=function(){return"$0"==="a".replace(/./,"$0")}(),u=a("replace"),g=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),h=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,u){var p=a(t),f=!r((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),m=f&&!r((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[d]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!f||!m||"replace"===t&&(!s||!c||g)||"split"===t&&!h){var b=/./[p],w=n(p,""[t],(function(t,e,n,o,r){return e.exec===i?f&&!r?{done:!0,value:b.call(e,n,o)}:{done:!0,value:t.call(n,e,o)}:{done:!1}}),{REPLACE_KEEPS_$0:c,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:g}),x=w[0],v=w[1];o(String.prototype,t,x),o(RegExp.prototype,p,2==e?function(t,e){return v.call(t,this,e)}:function(t){return v.call(t,this)})}u&&l(RegExp.prototype[p],"sham",!0)}},e576:function(t,e,n){"use strict";var o=n("e8e5"),r=n.n(o);r.a},e8e5:function(t,e,n){}}]);