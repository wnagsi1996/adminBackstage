(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60f4257c"],{"0038":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("p",[t._v(t._s(t._f("ordernofilter")(this.ordernodata))+" "),o("i",{staticClass:"el-icon-document-copy",on:{click:function(e){return t.copyorderno()}}})])])},r=[],i={name:"OrderCopy",props:{orderno:{type:String,default:""}},data:function(){return{ordernodata:""}},mounted:function(){this.ordernodata=this.orderno},methods:{copyorderno:function(){var t=document.createElement("input");t.value=this.ordernodata,document.body.appendChild(t),t.select(),document.execCommand("Copy"),this.$message({message:"复制成功",type:"success"}),t.remove()}},filters:{ordernofilter:function(t){var e,o;return t.length>10?(e=t.substring(0,5),o=t.substring(t.length-5,t.length),e+"..."+o):t}},watch:{orderno:function(t,e){this.ordernodata=t}}},a=i,l=o("2877"),s=Object(l["a"])(a,n,r,!1,null,null,null);e["a"]=s.exports},1148:function(t,e,o){"use strict";var n=o("a691"),r=o("1d80");t.exports="".repeat||function(t){var e=String(r(this)),o="",i=n(t);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(o+=e);return o}},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"13d5":function(t,e,o){"use strict";var n=o("23e7"),r=o("d58f").left,i=o("a640"),a=o("ae40"),l=i("reduce"),s=a("reduce",{1:0});n({target:"Array",proto:!0,forced:!l||!s},{reduce:function(t){return r(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"14c3":function(t,e,o){var n=o("c6b6"),r=o("9263");t.exports=function(t,e){var o=t.exec;if("function"===typeof o){var i=o.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"333d":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.pagination.total>t.pagination.size,expression:"pagination.total>pagination.size"}],attrs:{background:"","current-page":t.pagination.current,"page-sizes":t.pagination.sizes,"page-size":t.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:t.pagination.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},r=[],i={name:"Pagination",props:{pagination:{type:Object,default:function(){return{size:20,current:0,total:0,sizes:[20,50,100,200]}}}},methods:{handleSizeChange:function(t){var e=["size",t];this.$emit("search",e)},handleCurrentChange:function(t){var e=["current",t];this.$emit("search",e)}}},a=i,l=o("2877"),s=Object(l["a"])(a,n,r,!1,null,null,null);e["a"]=s.exports},"408a":function(t,e,o){var n=o("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},"841c":function(t,e,o){"use strict";var n=o("d784"),r=o("825a"),i=o("1d80"),a=o("129f"),l=o("14c3");n("search",1,(function(t,e,o){return[function(e){var o=i(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,o):new RegExp(e)[t](String(o))},function(t){var n=o(e,t,this);if(n.done)return n.value;var i=r(t),s=String(this),c=i.lastIndex;a(c,0)||(i.lastIndex=0);var d=l(i,s);return a(i.lastIndex,c)||(i.lastIndex=c),null===d?-1:d.index}]}))},9263:function(t,e,o){"use strict";var n=o("ad6d"),r=o("9f7f"),i=RegExp.prototype.exec,a=String.prototype.replace,l=i,s=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=r.UNSUPPORTED_Y||r.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],u=s||d||c;u&&(l=function(t){var e,o,r,l,u=this,f=c&&u.sticky,h=n.call(u),p=u.source,m=0,g=t;return f&&(h=h.replace("y",""),-1===h.indexOf("g")&&(h+="g"),g=String(t).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==t[u.lastIndex-1])&&(p="(?: "+p+")",g=" "+g,m++),o=new RegExp("^(?:"+p+")",h)),d&&(o=new RegExp("^"+p+"$(?!\\s)",h)),s&&(e=u.lastIndex),r=i.call(f?o:u,g),f?r?(r.input=r.input.slice(m),r[0]=r[0].slice(m),r.index=u.lastIndex,u.lastIndex+=r[0].length):u.lastIndex=0:s&&r&&(u.lastIndex=u.global?r.index+r[0].length:e),d&&r&&r.length>1&&a.call(r[0],o,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(r[l]=void 0)})),r}),t.exports=l},"9f7f":function(t,e,o){"use strict";var n=o("d039");function r(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=r("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=r("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a623:function(t,e,o){"use strict";var n=o("23e7"),r=o("b727").every,i=o("a640"),a=o("ae40"),l=i("every"),s=a("every");n({target:"Array",proto:!0,forced:!l||!s},{every:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},ac1f:function(t,e,o){"use strict";var n=o("23e7"),r=o("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},b680:function(t,e,o){"use strict";var n=o("23e7"),r=o("a691"),i=o("408a"),a=o("1148"),l=o("d039"),s=1..toFixed,c=Math.floor,d=function(t,e,o){return 0===e?o:e%2===1?d(t,e-1,o*t):d(t*t,e/2,o)},u=function(t){var e=0,o=t;while(o>=4096)e+=12,o/=4096;while(o>=2)e+=1,o/=2;return e},f=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!l((function(){s.call({})}));n({target:"Number",proto:!0,forced:f},{toFixed:function(t){var e,o,n,l,s=i(this),f=r(t),h=[0,0,0,0,0,0],p="",m="0",g=function(t,e){var o=-1,n=e;while(++o<6)n+=t*h[o],h[o]=n%1e7,n=c(n/1e7)},b=function(t){var e=6,o=0;while(--e>=0)o+=h[e],h[e]=c(o/t),o=o%t*1e7},v=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==h[t]){var o=String(h[t]);e=""===e?o:e+a.call("0",7-o.length)+o}return e};if(f<0||f>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(p="-",s=-s),s>1e-21)if(e=u(s*d(2,69,1))-69,o=e<0?s*d(2,-e,1):s/d(2,e,1),o*=4503599627370496,e=52-e,e>0){g(0,o),n=f;while(n>=7)g(1e7,0),n-=7;g(d(10,n,1),0),n=e-1;while(n>=23)b(1<<23),n-=23;b(1<<n),g(1,1),b(2),m=v()}else g(0,o),g(1<<-e,0),m=v()+a.call("0",f);return f>0?(l=m.length,m=p+(l<=f?"0."+a.call("0",f-l)+m:m.slice(0,l-f)+"."+m.slice(l-f))):m=p+m,m}})},d58f:function(t,e,o){var n=o("1c0b"),r=o("7b0b"),i=o("44ad"),a=o("50c4"),l=function(t){return function(e,o,l,s){n(o);var c=r(e),d=i(c),u=a(c.length),f=t?u-1:0,h=t?-1:1;if(l<2)while(1){if(f in d){s=d[f],f+=h;break}if(f+=h,t?f<0:u<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:u>f;f+=h)f in d&&(s=o(s,d[f],f,c));return s}};t.exports={left:l(!1),right:l(!0)}},d784:function(t,e,o){"use strict";o("ac1f");var n=o("6eeb"),r=o("d039"),i=o("b622"),a=o("9263"),l=o("9112"),s=i("species"),c=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),u=i("replace"),f=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),h=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var o="ab".split(t);return 2!==o.length||"a"!==o[0]||"b"!==o[1]}));t.exports=function(t,e,o,u){var p=i(t),m=!r((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),g=m&&!r((function(){var e=!1,o=/a/;return"split"===t&&(o={},o.constructor={},o.constructor[s]=function(){return o},o.flags="",o[p]=/./[p]),o.exec=function(){return e=!0,null},o[p](""),!e}));if(!m||!g||"replace"===t&&(!c||!d||f)||"split"===t&&!h){var b=/./[p],v=o(p,""[t],(function(t,e,o,n,r){return e.exec===a?m&&!r?{done:!0,value:b.call(e,o,n)}:{done:!0,value:t.call(o,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),w=v[0],x=v[1];n(String.prototype,t,w),n(RegExp.prototype,p,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}u&&l(RegExp.prototype[p],"sham",!0)}},d81d:function(t,e,o){"use strict";var n=o("23e7"),r=o("b727").map,i=o("1dde"),a=o("ae40"),l=i("map"),s=a("map");n({target:"Array",proto:!0,forced:!l||!s},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},fba6:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.fromorder}},[o("el-form-item",{attrs:{label:"订单号"}},[o("el-input",{attrs:{placeholder:""},model:{value:t.fromorder.OrderNo,callback:function(e){t.$set(t.fromorder,"OrderNo",e)},expression:"fromorder.OrderNo"}})],1),o("el-form-item",{attrs:{label:"客户名称"}},[o("el-input",{attrs:{placeholder:""},model:{value:t.fromorder.name,callback:function(e){t.$set(t.fromorder,"name",e)},expression:"fromorder.name"}})],1),o("el-form-item",{attrs:{label:"订单状态"}},[o("el-select",{attrs:{placeholder:""},model:{value:t.fromorder.orderStaus,callback:function(e){t.$set(t.fromorder,"orderStaus",e)},expression:"fromorder.orderStaus"}},[o("el-option",{attrs:{label:"全部",value:"-1"}}),o("el-option",{attrs:{label:"等待提交审核",value:"0"}}),o("el-option",{attrs:{label:"等待财务审核",value:"1"}}),o("el-option",{attrs:{label:"测评操作中",value:"2"}}),o("el-option",{attrs:{label:"财务审核不通过",value:"3"}}),o("el-option",{attrs:{label:"测评结束",value:"4"}}),o("el-option",{attrs:{label:"等待财务处理补退差价",value:"5"}}),o("el-option",{attrs:{label:"退单等待财务退款",value:"6"}}),o("el-option",{attrs:{label:"退单成功",value:"7"}})],1)],1),o("el-form-item",{attrs:{label:"利润值"}},[o("el-select",{attrs:{placeholder:""},model:{value:t.fromorder.profit,callback:function(e){t.$set(t.fromorder,"profit",e)},expression:"fromorder.profit"}},[o("el-option",{attrs:{label:"全部",value:"-1"}}),o("el-option",{attrs:{label:"非负数",value:"0"}}),o("el-option",{attrs:{label:"负数",value:"1"}})],1)],1),o("el-form-item",{attrs:{label:"创建时间"}},[o("el-col",{attrs:{span:11}},[o("el-form-item",{attrs:{prop:"date1"}},[o("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:t.fromorder.date1,callback:function(e){t.$set(t.fromorder,"date1",e)},expression:"fromorder.date1"}})],1)],1),o("el-col",{staticClass:"line",attrs:{span:1}},[t._v("-")]),o("el-col",{attrs:{span:11}},[o("el-form-item",{attrs:{prop:"date2"}},[o("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:t.fromorder.date2,callback:function(e){t.$set(t.fromorder,"date2",e)},expression:"fromorder.date2"}})],1)],1)],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")])],1)],1),o("div",[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.addorder()}}},[t._v("新建订单")]),o("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.batchDownload()}}},[t._v("批量下载")])],1),o("div",{staticClass:"tableMag"},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:"","show-summary":"","summary-method":t.getSummaries}},[o("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("copyorderno",{attrs:{orderno:t.row.orderno}})]}}])}),o("el-table-column",{attrs:{prop:"hzsjname",label:"客户名称","min-width":"6%"}}),o("el-table-column",{attrs:{prop:"payselstr",label:"支付选择","min-width":"5%"}}),o("el-table-column",{attrs:{prop:"channelstr",label:"收款方式","min-width":"6%"}}),o("el-table-column",{attrs:{prop:"yskmoney",label:"应收金额","min-width":"5%"}}),o("el-table-column",{attrs:{prop:"sskmoney",label:"已收金额","min-width":"5%"}}),o("el-table-column",{attrs:{prop:"fkmoney",label:"已返款金额","min-width":"5%"}}),o("el-table-column",{attrs:{prop:"fkmoney",label:"当前利润","min-width":"5%",formatter:t.profit}}),o("el-table-column",{attrs:{prop:"ztstr",label:"订单状态","min-width":"5%"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("p",[t._v(t._s(e.row.ztstr)+" "),o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"需要补退差价",placement:"top-start"}},[1==e.row.ifneedbt?o("i",{staticClass:"el-icon-money",staticStyle:{color:"red",cursor:"pointer"},on:{click:function(o){return t.showmoney(e.row.orderno)}}}):t._e()])],1)]}}])}),o("el-table-column",{attrs:{prop:"cjsj",label:"创建时间","min-width":"8%"}}),o("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"12%"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.zt||"3"==e.row.zt?[o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.goProduct(e.row.orderno)}}},[t._v("添加产品")]),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.review(e.row.orderno)}}},[t._v("提交财务审核")]),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.delOrder(e.row.orderno)}}},[t._v("删除")])]:t._e(),"0"!=e.row.zt?o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.goProduct(e.row.orderno)}}},[t._v("测评产品管理")]):t._e(),"2"==e.row.zt||"4"==e.row.zt?["2"==e.row.zt?o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.chargeback(e.row.orderno)}}},[t._v("退单")]):t._e(),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.spread(e.row.orderno)}}},[t._v("补退差价")]),1==e.row.ifneedbt?o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.showmoney(e.row.orderno)}}},[t._v("差价数据")]):t._e(),"0"!=e.row.paysel?o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.addPayment(e.row.orderno)}}},[t._v("新增收款")]):t._e(),"0"!=e.row.paysel?o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.dowload(e.row.orderno)}}},[t._v("下载数据")]):t._e()]:t._e(),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.worklog(e.row.orderno)}}},[t._v("记事本")]),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.showLog(e.row.orderno)}}},[t._v("查看日志")])]}}])})],1)],1),o("Pagination",{staticClass:"pagination",attrs:{pagination:t.pagination},on:{search:t.search}}),o("el-dialog",{attrs:{title:"差价数据",visible:t.DifferencePricesToggle,width:"30%"},on:{"update:visible":function(e){t.DifferencePricesToggle=e}}},[o(t.DifferencePricesLoad,{tag:"component",attrs:{orderno:t.orderno}})],1),o("el-dialog",{attrs:{title:t.dialog.title,visible:t.dialog.Visible,width:t.dialog.width},on:{"update:visible":function(e){return t.$set(t.dialog,"Visible",e)}}},[o(t.dialog.dialogComponent,{tag:"component",attrs:{orderno:t.orderno},on:{dialogToggle:t.dialogToggle}})],1),o("el-dialog",{attrs:{title:"操作日志",visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e},close:t.closeDialog}},[o(t.Log,{tag:"component",attrs:{logorderno:t.orderno}})],1)],1)},r=[],i=(o("a623"),o("4160"),o("d81d"),o("13d5"),o("b0c0"),o("a9e3"),o("b680"),o("d3b7"),o("ac1f"),o("841c"),o("159b"),o("333d")),a=o("0038"),l={name:"ClientOrder",components:{Pagination:i["a"],copyorderno:a["a"]},data:function(){return{fromorder:{OrderNo:"",jduser:"0",name:"",orderStaus:"-1",date1:"",date2:"",profit:"-1"},pagination:{total:0,size:20,current:1},dialog:{title:"",Visible:!1,width:"",dialogComponent:null},tableData:[],addordercom:null,addPaymentcom:null,hargebackccom:null,spreadcom:null,worklogcom:null,dowloadcom:null,batchDownloadcom:null,logshow:!1,loading:!0,DifferencePricesToggle:!1,DifferencePricesLoad:null,dialogVisible:!1,orderno:"",Log:null}},mounted:function(){this.search()},methods:{search:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=e.length&&("current"==e[0]?this.pagination.current=e[1]:"size"==e[0]&&(this.pagination.size=e[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getTopProductList",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,ddh:this.fromorder.OrderNo,hzsjname:this.fromorder.name,zt:this.fromorder.orderStaus,sjs:this.fromorder.date1,sje:this.fromorder.date2,iffs:this.fromorder.profit}}).then((function(e){t.pagination.total=e.data.results,t.tableData=e.data.rows,t.loading=!1})).catch((function(t){}))},showmoney:function(t){null==this.DifferencePricesLoad&&(this.DifferencePricesLoad=function(){return o.e("chunk-2d0b2ab0").then(o.bind(null,"24a9"))}),this.DifferencePricesToggle=!0,this.orderno=t},goProduct:function(t){this.$router.push({path:"/addproduct",query:{orderno:t}});var e={path:"/addproduct?orderno="+t,name:"测评产品管理",icon:"addproduct"};this.$store.commit("tagsView/selectMenu",e)},addorder:function(){this.dialog.title="添加测评订单",this.dialog.Visible=!0,this.dialog.width="450px",null==this.addproductcom&&(this.addproductcom=function(){return o.e("chunk-2d207765").then(o.bind(null,"a143"))}),this.dialog.dialogComponent=this.addproductcom},dowload:function(t){this.orderno=t,this.dialog.title="下载订单表格数据",this.dialog.Visible=!0,this.dialog.width="70%",null==this.dowloadcom&&(this.dowloadcom=function(){return o.e("chunk-6b92b78b").then(o.bind(null,"f32f"))}),this.dialog.dialogComponent=this.dowloadcom},batchDownload:function(){this.dialog.title="下载订单表格数据",this.dialog.Visible=!0,this.dialog.width="70%",null==this.batchDownloadcom&&(this.batchDownloadcom=function(){return o.e("chunk-29fea561").then(o.bind(null,"ed9e"))}),this.dialog.dialogComponent=this.batchDownloadcom},dialogToggle:function(){this.dialog.title="",this.dialog.Visible=!1,this.dialog.width="",this.search()},addPayment:function(t){this.dialog.title="新增收款",this.dialog.Visible=!0,this.dialog.width="300px",null==this.addPaymentcom&&(this.addPaymentcom=function(){return o.e("chunk-2d0a3577").then(o.bind(null,"0287"))}),this.orderno=t,this.dialog.dialogComponent=this.addPaymentcom},chargeback:function(t){this.dialog.title="退单退款",this.dialog.Visible=!0,this.dialog.width="600px",this.orderno=t,null==this.hargebackccom&&(this.hargebackccom=function(){return o.e("chunk-47401daa").then(o.bind(null,"ff48"))}),this.dialog.dialogComponent=this.hargebackccom},worklog:function(t){this.dialog.title="记事本",this.dialog.Visible=!0,this.dialog.width="600px",this.orderno=t,null==this.worklogcom&&(this.worklogcom=function(){return o.e("chunk-2d0b5fd2").then(o.bind(null,"1af2"))}),this.dialog.dialogComponent=this.worklogcom},spread:function(t){this.dialog.title="补退差价",this.dialog.Visible=!0,this.dialog.width="600px",this.orderno=t,null==this.spreadcom&&(this.spreadcom=function(){return o.e("chunk-3d9c0ab7").then(o.bind(null,"5a49"))}),this.dialog.dialogComponent=this.spreadcom},delOrder:function(t){var e=this;this.$alert("确认要删除该订单吗?","删除提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(){e.axios.get("/Handler/CPManageSystem.ashx?cmd=delTOPCPOrder&topordernos="+t).then((function(t){t.data>0?(e.$message({type:"success",message:"删除成功!"}),e.search()):e.$message({type:"warning",message:"删除失败!"})})).catch((function(t){e.$message({type:"warning",message:"删除失败!"})}))})).catch((function(){}))},review:function(t){var e=this;this.$prompt("您确认该订单测评产品已添加完成并要提交财务审核?","提交提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPlaceholder:"财务备注"}).then((function(o){e.axios.get("/Handler/CPManageSystem.ashx?cmd=comitTOPCPOrder&toporderno="+t+"&remark="+o.value).then((function(t){t.data.rescode>0?(e.$message({type:"success",message:"提交成功!"}),e.search()):e.$message({type:"warning",message:"提交失败!"})})).catch((function(t){e.$message({type:"warning",message:"提交失败!"})}))})).catch((function(){}))},showLog:function(t){this.dialogVisible=!0,this.orderno=t,null==this.Log&&(this.Log=function(){return o.e("chunk-574ade6f").then(o.bind(null,"714d"))})},closeDialog:function(){this.dialogVisible=!1},profit:function(t,e,o,n){return(t.sskmoney-t.fkmoney).toFixed(2)},getSummaries:function(t){var e=t.columns,o=t.data,n=[];return e.forEach((function(t,e){if(0!==e){var r=o.map((function(e){return Number(e[t.property])}));r.every((function(t){return isNaN(t)}))||(n[e]=r.reduce((function(t,e){var o=Number(e);return isNaN(o)?t:t+e}),0))}else n[e]="合计"})),n[7]=n[5]-n[6],n.forEach((function(t,e){isNaN(t)||(n[e]=t.toFixed(2))})),n}}},s=l,c=o("2877"),d=Object(c["a"])(s,n,r,!1,null,null,null);e["default"]=d.exports}}]);