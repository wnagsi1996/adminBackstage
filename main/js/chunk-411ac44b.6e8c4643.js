(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-411ac44b"],{"0038":function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("p",[e._v(e._s(e._f("ordernofilter")(this.ordernodata))+" "),r("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyorderno()}}})])])},n=[],a={name:"OrderCopy",props:{orderno:{type:String,default:""}},data:function(){return{ordernodata:""}},mounted:function(){this.ordernodata=this.orderno},methods:{copyorderno:function(){var e=document.createElement("input");e.value=this.ordernodata,document.body.appendChild(e),e.select(),document.execCommand("Copy"),this.$message({message:"复制成功",type:"success"}),e.remove()}},filters:{ordernofilter:function(e){var t,r;return e.length>10?(t=e.substring(0,5),r=e.substring(e.length-5,e.length),t+"..."+r):e}},watch:{orderno:function(e,t){this.ordernodata=e}}},l=a,i=r("2877"),s=Object(i["a"])(l,o,n,!1,null,null,null);t["a"]=s.exports},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,r){var o=r("c6b6"),n=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var a=r.call(e,t);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==o(e))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},"333d":function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.pagination.total>e.pagination.size,expression:"pagination.total>pagination.size"}],attrs:{background:"","current-page":e.pagination.current,"page-sizes":e.pagination.sizes,"page-size":e.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},n=[],a={name:"Pagination",props:{pagination:{type:Object,default:function(){return{size:20,current:0,total:0,sizes:[20,50,100,200]}}}},methods:{handleSizeChange:function(e){var t=["size",e];this.$emit("search",t)},handleCurrentChange:function(e){var t=["current",e];this.$emit("search",t)}}},l=a,i=r("2877"),s=Object(i["a"])(l,o,n,!1,null,null,null);t["a"]=s.exports},"841c":function(e,t,r){"use strict";var o=r("d784"),n=r("825a"),a=r("1d80"),l=r("129f"),i=r("14c3");o("search",1,(function(e,t,r){return[function(t){var r=a(this),o=void 0==t?void 0:t[e];return void 0!==o?o.call(t,r):new RegExp(t)[e](String(r))},function(e){var o=r(t,e,this);if(o.done)return o.value;var a=n(e),s=String(this),c=a.lastIndex;l(c,0)||(a.lastIndex=0);var d=i(a,s);return l(a.lastIndex,c)||(a.lastIndex=c),null===d?-1:d.index}]}))},9263:function(e,t,r){"use strict";var o=r("ad6d"),n=r("9f7f"),a=RegExp.prototype.exec,l=String.prototype.replace,i=a,s=function(){var e=/a/,t=/b*/g;return a.call(e,"a"),a.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=n.UNSUPPORTED_Y||n.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],u=s||d||c;u&&(i=function(e){var t,r,n,i,u=this,p=c&&u.sticky,f=o.call(u),m=u.source,h=0,g=e;return p&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),g=String(e).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==e[u.lastIndex-1])&&(m="(?: "+m+")",g=" "+g,h++),r=new RegExp("^(?:"+m+")",f)),d&&(r=new RegExp("^"+m+"$(?!\\s)",f)),s&&(t=u.lastIndex),n=a.call(p?r:u,g),p?n?(n.input=n.input.slice(h),n[0]=n[0].slice(h),n.index=u.lastIndex,u.lastIndex+=n[0].length):u.lastIndex=0:s&&n&&(u.lastIndex=u.global?n.index+n[0].length:t),d&&n&&n.length>1&&l.call(n[0],r,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(n[i]=void 0)})),n}),e.exports=i},"9f7f":function(e,t,r){"use strict";var o=r("d039");function n(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=o((function(){var e=n("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=o((function(){var e=n("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,r){"use strict";var o=r("23e7"),n=r("9263");o({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},d6b5:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.fromorder}},[r("el-form-item",{attrs:{label:"订单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.OrderNo,callback:function(t){e.$set(e.fromorder,"OrderNo",t)},expression:"fromorder.OrderNo"}})],1),r("el-form-item",{attrs:{label:"购买单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.xdOrderNo,callback:function(t){e.$set(e.fromorder,"xdOrderNo",t)},expression:"fromorder.xdOrderNo"}})],1),r("el-form-item",{attrs:{label:"订单类型"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.orderType,callback:function(t){e.$set(e.fromorder,"orderType",t)},expression:"fromorder.orderType"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"免评单",value:"0"}}),r("el-option",{attrs:{label:"留评单",value:"1"}})],1)],1),r("el-form-item",{attrs:{label:"留评状态"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.reviewStatus,callback:function(t){e.$set(e.fromorder,"reviewStatus",t)},expression:"fromorder.reviewStatus"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"已留评",value:"1"}}),r("el-option",{attrs:{label:"未留评",value:"0"}})],1)],1),r("el-form-item",{attrs:{label:"订单状态"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.orderStaus,callback:function(t){e.$set(e.fromorder,"orderStaus",t)},expression:"fromorder.orderStaus"}},[r("el-option",{attrs:{label:"全部",value:" "}}),r("el-option",{attrs:{label:"等待放单",value:"0"}}),r("el-option",{attrs:{label:"等待接单",value:"1"}}),r("el-option",{attrs:{label:"已接单",value:"2"}}),r("el-option",{attrs:{label:"下单待审核",value:"3"}}),r("el-option",{attrs:{label:"确认已下单",value:"4"}}),r("el-option",{attrs:{label:"审核未下单",value:"5"}}),r("el-option",{attrs:{label:"等待返款",value:"8"}}),r("el-option",{attrs:{label:"已返款",value:"9"}}),r("el-option",{attrs:{label:"退单等待财务退款",value:"10"}}),r("el-option",{attrs:{label:"退单成功",value:"11"}}),r("el-option",{attrs:{label:"返款被驳回",value:"12"}})],1)],1),r("el-form-item",{attrs:{label:"创建时间"}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date1"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.fromorder.date1,callback:function(t){e.$set(e.fromorder,"date1",t)},expression:"fromorder.date1"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date2"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.fromorder.date2,callback:function(t){e.$set(e.fromorder,"date2",t)},expression:"fromorder.date2"}})],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),r("div",{staticClass:"tableMag"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[r("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("copyorderno",{attrs:{orderno:e.row.orderno}})]}}])}),r("el-table-column",{attrs:{prop:"pimg",label:"图片","min-width":"3%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("a",{attrs:{href:e.row.ProductUrl,target:"_blank"}},[r("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover",content:e.row.ProductTitle}},[r("img",{staticStyle:{width:"50px"},attrs:{slot:"reference",src:e.row.ProductImgUrl},slot:"reference"})])],1)]}}])}),r("el-table-column",{attrs:{prop:"price",label:"客单价","min-width":"6%"}}),r("el-table-column",{attrs:{prop:"ztstr",label:"订单状态","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"ordertypestr",label:"是否留评","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.ordertypestr))]),""!=t.row.lpurl?r("el-link",{attrs:{type:"primary",target:"_blank",href:t.row.lpurl}},[r("i",{staticClass:"el-icon-paperclip"})]):""!=t.row.lpimgurl?r("i",{staticClass:"el-icon-picture",attrs:{underline:!1},on:{click:function(r){return e.showReviewImg(t.row.lpimgurl)}}}):e._e()]}}])}),r("el-table-column",{attrs:{prop:"jduser",label:"接单人员","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"xdOrderno",label:"购买单号","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"realprice",label:"购买金额","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"realxddate",label:"购买时间","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"cjsj",label:"创建时间","min-width":"8%"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"12%"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.handleLogClick(t.row.orderno)}}},[e._v("查看详情")])]}}])})],1)],1),r("Pagination",{staticClass:"pagination",attrs:{pagination:e.pagination},on:{search:e.search}}),r(e.log,{tag:"component",attrs:{logorderno:e.logorderno,logshow:e.logshow},on:{handleLogClick:e.handleLogClick}})],1)},n=[],a=(r("d3b7"),r("ac1f"),r("841c"),r("333d")),l=r("0038"),i={name:"ClientOrder",components:{Pagination:a["a"],copyorderno:l["a"]},data:function(){return{fromorder:{OrderNo:"",xdOrderNo:"",orderType:"-1",reviewStatus:"-1",orderStaus:" ",date1:"",date2:""},pagination:{total:0,size:20,current:1},dialog:{title:"",Visible:!1,width:"",dialogComponent:null},tableData:[],log:null,logorderno:"",logshow:!1,reviewcom:null,loading:!0,DifferencePricesToggle:!1,DifferencePricesLoad:null,dialogVisible:!1,row:new Object,Log:null}},mounted:function(){this.search()},methods:{search:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=t.length&&("current"==t[0]?this.pagination.current=t[1]:"size"==t[0]&&(this.pagination.size=t[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailList",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,orderno:this.fromorder.OrderNo,state:this.fromorder.orderStaus,iflp:this.fromorder.orderType,lpstate:this.fromorder.reviewStatus,sjs:this.fromorder.date1,sje:this.fromorder.date2,xdorderno:this.fromorder.xdOrderNo}}).then((function(t){e.pagination.total=t.data.results,e.tableData=t.data.rows,e.loading=!1})).catch((function(e){}))},handleLogClick:function(e){this.logshow?this.logshow=!1:(this.logorderno=e,this.logshow=!0,null==this.log&&(this.log=function(){return r.e("chunk-c59ed1d4").then(r.bind(null,"9621"))}))},showReviewImg:function(e){this.$alert("<img src="+e+">","留评截图",{dangerouslyUseHTMLString:!0}).then((function(){})).catch((function(){}))}}},s=i,c=r("2877"),d=Object(c["a"])(s,o,n,!1,null,null,null);t["default"]=d.exports},d784:function(e,t,r){"use strict";r("ac1f");var o=r("6eeb"),n=r("d039"),a=r("b622"),l=r("9263"),i=r("9112"),s=a("species"),c=!n((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),u=a("replace"),p=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),f=!n((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,u){var m=a(e),h=!n((function(){var t={};return t[m]=function(){return 7},7!=""[e](t)})),g=h&&!n((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[s]=function(){return r},r.flags="",r[m]=/./[m]),r.exec=function(){return t=!0,null},r[m](""),!t}));if(!h||!g||"replace"===e&&(!c||!d||p)||"split"===e&&!f){var v=/./[m],b=r(m,""[e],(function(e,t,r,o,n){return t.exec===l?h&&!n?{done:!0,value:v.call(t,r,o)}:{done:!0,value:e.call(r,t,o)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),x=b[0],w=b[1];o(String.prototype,e,x),o(RegExp.prototype,m,2==t?function(e,t){return w.call(e,this,t)}:function(e){return w.call(e,this)})}u&&i(RegExp.prototype[m],"sham",!0)}}}]);