(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fee6c9a4"],{"0038":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("p",[e._v(e._s(e._f("ordernofilter")(this.ordernodata))+" "),r("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyorderno()}}})])])},a=[],o={name:"OrderCopy",props:{orderno:{type:String,default:""}},data:function(){return{ordernodata:""}},mounted:function(){this.ordernodata=this.orderno},methods:{copyorderno:function(){var e=document.createElement("input");e.value=this.ordernodata,document.body.appendChild(e),e.select(),document.execCommand("Copy"),this.$message({message:"复制成功",type:"success"}),e.remove()}},filters:{ordernofilter:function(e){var t,r;return e.length>10?(t=e.substring(0,5),r=e.substring(e.length-5,e.length),t+"..."+r):e}},watch:{orderno:function(e,t){this.ordernodata=e}}},l=o,i=r("2877"),s=Object(i["a"])(l,n,a,!1,null,null,null);t["a"]=s.exports},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,r){var n=r("c6b6"),a=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var o=r.call(e,t);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"333d":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.pagination.total>e.pagination.size,expression:"pagination.total>pagination.size"}],attrs:{background:"","current-page":e.pagination.current,"page-sizes":e.pagination.sizes,"page-size":e.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},a=[],o={name:"Pagination",props:{pagination:{type:Object,default:function(){return{size:20,current:0,total:0,sizes:[20,50,100,200]}}}},methods:{handleSizeChange:function(e){var t=["size",e];this.$emit("search",t)},handleCurrentChange:function(e){var t=["current",e];this.$emit("search",t)}}},l=o,i=r("2877"),s=Object(i["a"])(l,n,a,!1,null,null,null);t["a"]=s.exports},"841c":function(e,t,r){"use strict";var n=r("d784"),a=r("825a"),o=r("1d80"),l=r("129f"),i=r("14c3");n("search",1,(function(e,t,r){return[function(t){var r=o(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,e,this);if(n.done)return n.value;var o=a(e),s=String(this),c=o.lastIndex;l(c,0)||(o.lastIndex=0);var u=i(o,s);return l(o.lastIndex,c)||(o.lastIndex=c),null===u?-1:u.index}]}))},9263:function(e,t,r){"use strict";var n=r("ad6d"),a=r("9f7f"),o=RegExp.prototype.exec,l=String.prototype.replace,i=o,s=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=a.UNSUPPORTED_Y||a.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=s||u||c;d&&(i=function(e){var t,r,a,i,d=this,p=c&&d.sticky,m=n.call(d),f=d.source,h=0,g=e;return p&&(m=m.replace("y",""),-1===m.indexOf("g")&&(m+="g"),g=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(f="(?: "+f+")",g=" "+g,h++),r=new RegExp("^(?:"+f+")",m)),u&&(r=new RegExp("^"+f+"$(?!\\s)",m)),s&&(t=d.lastIndex),a=o.call(p?r:d,g),p?a?(a.input=a.input.slice(h),a[0]=a[0].slice(h),a.index=d.lastIndex,d.lastIndex+=a[0].length):d.lastIndex=0:s&&a&&(d.lastIndex=d.global?a.index+a[0].length:t),u&&a&&a.length>1&&l.call(a[0],r,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(a[i]=void 0)})),a}),e.exports=i},"9f7f":function(e,t,r){"use strict";var n=r("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=n((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,r){"use strict";var n=r("23e7"),a=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},d784:function(e,t,r){"use strict";r("ac1f");var n=r("6eeb"),a=r("d039"),o=r("b622"),l=r("9263"),i=r("9112"),s=o("species"),c=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=o("replace"),p=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),m=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,d){var f=o(e),h=!a((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),g=h&&!a((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[s]=function(){return r},r.flags="",r[f]=/./[f]),r.exec=function(){return t=!0,null},r[f](""),!t}));if(!h||!g||"replace"===e&&(!c||!u||p)||"split"===e&&!m){var v=/./[f],x=r(f,""[e],(function(e,t,r,n,a){return t.exec===l?h&&!a?{done:!0,value:v.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),b=x[0],y=x[1];n(String.prototype,e,b),n(RegExp.prototype,f,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}d&&i(RegExp.prototype[f],"sham",!0)}},e9e3:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.fromorder}},[r("el-form-item",{attrs:{label:"订单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.OrderNo,callback:function(t){e.$set(e.fromorder,"OrderNo",t)},expression:"fromorder.OrderNo"}})],1),r("el-form-item",{attrs:{label:"中介名称"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.agentname,callback:function(t){e.$set(e.fromorder,"agentname",t)},expression:"fromorder.agentname"}})],1),r("el-form-item",{attrs:{label:"人员"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.username,callback:function(t){e.$set(e.fromorder,"username",t)},expression:"fromorder.username"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),e._l(e.userList,(function(e){return r("el-option",{key:e.userid,attrs:{label:e.username,value:e.userid}})}))],2)],1),r("el-form-item",{attrs:{label:"订单状态"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.status,callback:function(t){e.$set(e.fromorder,"status",t)},expression:"fromorder.status"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"未处理",value:"0"}}),r("el-option",{attrs:{label:"已抵扣",value:"1"}}),r("el-option",{attrs:{label:"已回款",value:"1"}}),r("el-option",{attrs:{label:"已登记为员工损失",value:"1"}}),r("el-option",{attrs:{label:"回款等待审核",value:"1"}}),r("el-option",{attrs:{label:"抵扣等待审核",value:"1"}})],1)],1),r("el-form-item",{attrs:{label:"创建时间"}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date1"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.fromorder.date1,callback:function(t){e.$set(e.fromorder,"date1",t)},expression:"fromorder.date1"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date2"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.fromorder.date2,callback:function(t){e.$set(e.fromorder,"date2",t)},expression:"fromorder.date2"}})],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),r("div",{staticClass:"tableMag"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[r("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",index:e.indexMethod,"min-width":"5%"}}),r("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("copyorderno",{attrs:{orderno:e.row.orderno}})]}}])}),r("el-table-column",{attrs:{prop:"zjname",label:"中介名称","min-width":"6%"}}),r("el-table-column",{attrs:{prop:"zjlxfs",label:"中介联系方式","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"statestr",label:"状态","min-width":"4%"}}),r("el-table-column",{attrs:{prop:"username",label:"操作人员","min-width":"4%"}}),r("el-table-column",{attrs:{prop:"usdmoney",label:"挂账美元","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"rmbmoney",label:"挂账人民币","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"usdmoney_real",label:"实际回款美元","min-width":"6%"}}),r("el-table-column",{attrs:{prop:"rmbmoney_real",label:"实际回款人民币","min-width":"6%"}}),r("el-table-column",{attrs:{prop:"insertdate",label:"挂账时间","min-width":"8%"}}),r("el-table-column",{attrs:{prop:"dodate",label:"处理时间","min-width":"8%"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"==t.row.state?r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.collection(t.row.rid)}}},[e._v("登记损失")]):e._e(),""!=t.row.remark?r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.remark(t.row.remark)}}},[e._v("备注")]):e._e()]}}])})],1)],1),r("Pagination",{staticClass:"pagination",attrs:{pagination:e.pagination},on:{search:e.search}})],1)},a=[],o=(r("ac1f"),r("841c"),r("333d")),l=r("0038"),i={name:"Lossexpenses",components:{Pagination:o["a"],copyorderno:l["a"]},data:function(){return{fromorder:{OrderNo:"",agentname:"",username:"-1",status:"-1",date1:"",date2:""},pagination:{total:0,size:20,current:1},tableData:[],userList:[],loading:!1}},mounted:function(){this.search(),this.getUserList()},methods:{search:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=t.length&&("current"==t[0]?this.pagination.current=t[1]:"size"==t[0]&&(this.pagination.size=t[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getAgentOverDraftList",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,zjname:this.fromorder.agentname,sjs:this.fromorder.date1,sje:this.fromorder.date2,state:this.fromorder.status,orderno:this.fromorder.OrderNo,mjuserid:this.fromorder.username}}).then((function(t){e.pagination.total=t.data.results,e.tableData=t.data.rows,e.loading=!1})).catch((function(e){}))},getUserList:function(){var e=this;0==this.userList.length&&this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPMMJUserList&pageindex=0&len=50").then((function(t){0!=t.data.rows.length&&(e.userList=t.data.rows)})).catch((function(e){}))},indexMethod:function(e){return e+1},collection:function(e){var t=this;this.$confirm("您确定要把该笔记录登记为员工损失吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.axios.get("/Handler/CPManageSystem.ashx?cmd=agentOverDraftToUserOutMoney&rid="+e).then((function(e){e.data>0?(t.$message({type:"success",message:"登记成功!"}),t.search()):t.$message({type:"warning",message:"登记失败!"})}))}))},remark:function(e){this.$alert(e,"备注")}}},s=i,c=r("2877"),u=Object(c["a"])(s,n,a,!1,null,null,null);t["default"]=u.exports}}]);