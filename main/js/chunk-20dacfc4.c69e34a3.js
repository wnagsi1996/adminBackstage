(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20dacfc4"],{"0038":function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("p",[e._v(e._s(e._f("ordernofilter")(this.ordernodata))+" "),r("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyorderno()}}})])])},n=[],a={name:"OrderCopy",props:{orderno:{type:String,default:""}},data:function(){return{ordernodata:""}},mounted:function(){this.ordernodata=this.orderno},methods:{copyorderno:function(){var e=document.createElement("input");e.value=this.ordernodata,document.body.appendChild(e),e.select(),document.execCommand("Copy"),this.$message({message:"复制成功",type:"success"}),e.remove()}},filters:{ordernofilter:function(e){var t,r;return e.length>10?(t=e.substring(0,5),r=e.substring(e.length-5,e.length),t+"..."+r):e}},watch:{orderno:function(e,t){this.ordernodata=e}}},l=a,i=r("2877"),s=Object(i["a"])(l,o,n,!1,null,null,null);t["a"]=s.exports},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,r){var o=r("c6b6"),n=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var a=r.call(e,t);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==o(e))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},"32e2":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.fromorder}},[r("el-form-item",{attrs:{label:"订单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.OrderNo,callback:function(t){e.$set(e.fromorder,"OrderNo",t)},expression:"fromorder.OrderNo"}})],1),r("el-form-item",{attrs:{label:"购买单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.xdorderno,callback:function(t){e.$set(e.fromorder,"xdorderno",t)},expression:"fromorder.xdorderno"}})],1),r("el-form-item",{attrs:{label:"订单类别"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.orderType,callback:function(t){e.$set(e.fromorder,"orderType",t)},expression:"fromorder.orderType"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"免评单",value:"0"}}),r("el-option",{attrs:{label:"留评单",value:"1"}})],1)],1),r("el-form-item",{attrs:{label:"去向中介"}},[r("el-select",{attrs:{placeholder:""},on:{focus:e.getAgent},model:{value:e.fromorder.agent,callback:function(t){e.$set(e.fromorder,"agent",t)},expression:"fromorder.agent"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),e._l(e.agentdata,(function(e){return r("el-option",{key:e.rid,attrs:{label:e.name,value:e.rid}})}))],2)],1),r("el-form-item",{attrs:{label:"去向个人"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.txtbuyer,callback:function(t){e.$set(e.fromorder,"txtbuyer",t)},expression:"fromorder.txtbuyer"}})],1),r("el-form-item",{attrs:{label:"下单时间"}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date1"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.fromorder.date1,callback:function(t){e.$set(e.fromorder,"date1",t)},expression:"fromorder.date1"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date2"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.fromorder.date2,callback:function(t){e.$set(e.fromorder,"date2",t)},expression:"fromorder.date2"}})],1)],1)],1),r("el-form-item",{attrs:{label:"留评时间"}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date1"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.fromorder.lpdate1,callback:function(t){e.$set(e.fromorder,"lpdate1",t)},expression:"fromorder.lpdate1"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date2"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.fromorder.lpdate2,callback:function(t){e.$set(e.fromorder,"lpdate2",t)},expression:"fromorder.lpdate2"}})],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),r("div",[r("el-button",{attrs:{type:"primary"},on:{click:e.agentRebate}},[e._v("批量返款")])],1),r("div",{staticClass:"tableMag"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[r("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("copyorderno",{attrs:{orderno:e.row.orderno}})]}}])}),r("el-table-column",{attrs:{prop:"pimg",label:"图片","min-width":"3%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("a",{attrs:{href:e.row.ProductUrl,target:"_blank"}},[r("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover",content:e.row.ProductTitle}},[r("img",{staticStyle:{width:"50px"},attrs:{slot:"reference",src:e.row.ProductImgUrl},slot:"reference"})])],1)]}}])}),r("el-table-column",{attrs:{prop:"ordertypestr",label:"订单类别","min-width":"6%"}}),r("el-table-column",{attrs:{prop:"zjname",label:"去向（中介或个人）","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"xdyj",label:"下单佣金","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"!=t.row.iffkxdyj?r("p",[e._v(e._s(t.row.xdyjfkztstr))]):r("p",[e._v("已返款:"+e._s(t.row.xdyj))])]}}])}),r("el-table-column",{attrs:{prop:"lpyj",label:"留评佣金","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"!=t.row.iffklpyj?r("p",[e._v(e._s(t.row.lpyjfkztstr))]):r("p",[e._v("已返款:"+e._s(t.row.lpyj))])]}}])}),r("el-table-column",{attrs:{prop:"xddate",label:"下单时间","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"xdOrderno",label:"购买单号","min-width":"5%"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"==t.row.iffklpyj||"3"==t.row.iffklpyj||"0"==t.row.iffkxdyj||"3"==t.row.iffkxdyj?[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.rebateshow(t.row)}}},[e._v("佣金返款")])]:e._e(),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.handleLogClick(t.row.orderno)}}},[e._v("查看详情")])]}}])})],1)],1),r("Pagination",{staticClass:"pagination",attrs:{pagination:e.pagination},on:{search:e.search}}),r("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.Visible,width:e.dialog.width},on:{"update:visible":function(t){return e.$set(e.dialog,"Visible",t)}}},[r(e.dialog.dialogComponent,{tag:"component",attrs:{agentdata:e.agentdata,Rebatedata:e.Rebatedata},on:{dialogToggle:e.dialogToggle}})],1),r(e.log,{tag:"component",attrs:{logorderno:e.logorderno,logshow:e.logshow},on:{handleLogClick:e.handleLogClick}})],1)},n=[],a=(r("d3b7"),r("ac1f"),r("841c"),r("333d")),l=r("0038"),i={name:"ReviewOrder",components:{Pagination:a["a"],copyorderno:l["a"]},data:function(){return{fromorder:{OrderNo:"",xdorderno:"",orderType:"-1",agent:"-1",txtbuyer:"",date1:"",date2:"",lpdate1:"",lpdate2:""},pagination:{total:0,size:20,current:1},dialog:{title:"",Visible:!1,width:"",dialogComponent:null},tableData:[],log:null,logorderno:"",logshow:!1,loading:!0,agentdata:[],Rebatecom:null,agentcom:null,DifferencePricesToggle:!1,DifferencePricesLoad:null,dialogVisible:!1,orderno:"",Rebatedata:{}}},mounted:function(){this.search()},methods:{search:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=t.length&&("current"==t[0]?this.pagination.current=t[1]:"size"==t[0]&&(this.pagination.size=t[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailList_MMJ",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,orderno:this.fromorder.OrderNo,xdorderno:this.fromorder.xdorderno,zjID:this.fromorder.agent,type:this.fromorder.orderType,xdsjs:this.fromorder.date1,xdsje:this.fromorder.date2,lpsjs:this.fromorder.lpdate1,lpsje:this.fromorder.lpdate2,buyer:this.fromorder.txtbuyer}}).then((function(t){e.pagination.total=t.data.results,e.tableData=t.data.rows,e.loading=!1})).catch((function(e){}))},dialogToggle:function(){this.dialog.title="",this.dialog.Visible=!1,this.dialog.width="",this.search()},getAgent:function(){var e=this;0==this.agentdata.length&&this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPAgentList").then((function(t){""!=t.data&&(e.agentdata=t.data.rows)})).catch((function(e){}))},agentRebate:function(){this.getAgent(),this.dialog.title="中介佣金返款",this.dialog.Visible=!0,this.dialog.width="500px",null==this.agentcom&&(this.agentcom=function(){return r.e("chunk-66c11d1a").then(r.bind(null,"cb21"))}),this.dialog.dialogComponent=this.agentcom},rebateshow:function(e){this.Rebatedata=e,this.dialog.title="返款",this.dialog.Visible=!0,this.dialog.width="500px",null==this.Rebatecom&&(this.Rebatecom=function(){return r.e("chunk-267bc864").then(r.bind(null,"90b3"))}),this.dialog.dialogComponent=this.Rebatecom},handleLogClick:function(e){this.logshow?this.logshow=!1:(this.logorderno=e,this.logshow=!0,null==this.log&&(this.log=function(){return r.e("chunk-c59ed1d4").then(r.bind(null,"9621"))}))}}},s=i,d=r("2877"),c=Object(d["a"])(s,o,n,!1,null,null,null);t["default"]=c.exports},"333d":function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.pagination.total>e.pagination.size,expression:"pagination.total>pagination.size"}],attrs:{background:"","current-page":e.pagination.current,"page-sizes":e.pagination.sizes,"page-size":e.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},n=[],a={name:"Pagination",props:{pagination:{type:Object,default:function(){return{size:20,current:0,total:0,sizes:[20,50,100,200]}}}},methods:{handleSizeChange:function(e){var t=["size",e];this.$emit("search",t)},handleCurrentChange:function(e){var t=["current",e];this.$emit("search",t)}}},l=a,i=r("2877"),s=Object(i["a"])(l,o,n,!1,null,null,null);t["a"]=s.exports},"841c":function(e,t,r){"use strict";var o=r("d784"),n=r("825a"),a=r("1d80"),l=r("129f"),i=r("14c3");o("search",1,(function(e,t,r){return[function(t){var r=a(this),o=void 0==t?void 0:t[e];return void 0!==o?o.call(t,r):new RegExp(t)[e](String(r))},function(e){var o=r(t,e,this);if(o.done)return o.value;var a=n(e),s=String(this),d=a.lastIndex;l(d,0)||(a.lastIndex=0);var c=i(a,s);return l(a.lastIndex,d)||(a.lastIndex=d),null===c?-1:c.index}]}))},9263:function(e,t,r){"use strict";var o=r("ad6d"),n=r("9f7f"),a=RegExp.prototype.exec,l=String.prototype.replace,i=a,s=function(){var e=/a/,t=/b*/g;return a.call(e,"a"),a.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),d=n.UNSUPPORTED_Y||n.BROKEN_CARET,c=void 0!==/()??/.exec("")[1],u=s||c||d;u&&(i=function(e){var t,r,n,i,u=this,p=d&&u.sticky,f=o.call(u),g=u.source,h=0,m=e;return p&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),m=String(e).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==e[u.lastIndex-1])&&(g="(?: "+g+")",m=" "+m,h++),r=new RegExp("^(?:"+g+")",f)),c&&(r=new RegExp("^"+g+"$(?!\\s)",f)),s&&(t=u.lastIndex),n=a.call(p?r:u,m),p?n?(n.input=n.input.slice(h),n[0]=n[0].slice(h),n.index=u.lastIndex,u.lastIndex+=n[0].length):u.lastIndex=0:s&&n&&(u.lastIndex=u.global?n.index+n[0].length:t),c&&n&&n.length>1&&l.call(n[0],r,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(n[i]=void 0)})),n}),e.exports=i},"9f7f":function(e,t,r){"use strict";var o=r("d039");function n(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=o((function(){var e=n("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=o((function(){var e=n("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,r){"use strict";var o=r("23e7"),n=r("9263");o({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},d784:function(e,t,r){"use strict";r("ac1f");var o=r("6eeb"),n=r("d039"),a=r("b622"),l=r("9263"),i=r("9112"),s=a("species"),d=!n((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),c=function(){return"$0"==="a".replace(/./,"$0")}(),u=a("replace"),p=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),f=!n((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,u){var g=a(e),h=!n((function(){var t={};return t[g]=function(){return 7},7!=""[e](t)})),m=h&&!n((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[s]=function(){return r},r.flags="",r[g]=/./[g]),r.exec=function(){return t=!0,null},r[g](""),!t}));if(!h||!m||"replace"===e&&(!d||!c||p)||"split"===e&&!f){var b=/./[g],x=r(g,""[e],(function(e,t,r,o,n){return t.exec===l?h&&!n?{done:!0,value:b.call(t,r,o)}:{done:!0,value:e.call(r,t,o)}:{done:!1}}),{REPLACE_KEEPS_$0:c,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),v=x[0],y=x[1];o(String.prototype,e,v),o(RegExp.prototype,g,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}u&&i(RegExp.prototype[g],"sham",!0)}}}]);