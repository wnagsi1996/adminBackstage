(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9b62922e"],{"0038":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("p",[e._v(e._s(e._f("ordernofilter")(this.ordernodata))+" "),r("i",{staticClass:"el-icon-document-copy",on:{click:function(t){return e.copyorderno()}}})])])},o=[],i={name:"OrderCopy",props:{orderno:{type:String,default:""}},data:function(){return{ordernodata:""}},mounted:function(){this.ordernodata=this.orderno},methods:{copyorderno:function(){var e=document.createElement("input");e.value=this.ordernodata,document.body.appendChild(e),e.select(),document.execCommand("Copy"),this.$message({message:"复制成功",type:"success"}),e.remove()}},filters:{ordernofilter:function(e){var t,r;return e.length>10?(t=e.substring(0,5),r=e.substring(e.length-5,e.length),t+"..."+r):e}},watch:{orderno:function(e,t){this.ordernodata=e}}},a=i,l=r("2877"),s=Object(l["a"])(a,n,o,!1,null,null,null);t["a"]=s.exports},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,r){var n=r("c6b6"),o=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var i=r.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(e,t)}},"333d":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.pagination.total>e.pagination.size,expression:"pagination.total>pagination.size"}],attrs:{background:"","current-page":e.pagination.current,"page-sizes":e.pagination.sizes,"page-size":e.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},o=[],i={name:"Pagination",props:{pagination:{type:Object,default:function(){return{size:20,current:0,total:0,sizes:[20,50,100,200]}}}},methods:{handleSizeChange:function(e){var t=["size",e];this.$emit("search",t)},handleCurrentChange:function(e){var t=["current",e];this.$emit("search",t)}}},a=i,l=r("2877"),s=Object(l["a"])(a,n,o,!1,null,null,null);t["a"]=s.exports},"841c":function(e,t,r){"use strict";var n=r("d784"),o=r("825a"),i=r("1d80"),a=r("129f"),l=r("14c3");n("search",1,(function(e,t,r){return[function(t){var r=i(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,e,this);if(n.done)return n.value;var i=o(e),s=String(this),c=i.lastIndex;a(c,0)||(i.lastIndex=0);var d=l(i,s);return a(i.lastIndex,c)||(i.lastIndex=c),null===d?-1:d.index}]}))},9263:function(e,t,r){"use strict";var n=r("ad6d"),o=r("9f7f"),i=RegExp.prototype.exec,a=String.prototype.replace,l=i,s=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=o.UNSUPPORTED_Y||o.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],u=s||d||c;u&&(l=function(e){var t,r,o,l,u=this,p=c&&u.sticky,g=n.call(u),h=u.source,f=0,m=e;return p&&(g=g.replace("y",""),-1===g.indexOf("g")&&(g+="g"),m=String(e).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==e[u.lastIndex-1])&&(h="(?: "+h+")",m=" "+m,f++),r=new RegExp("^(?:"+h+")",g)),d&&(r=new RegExp("^"+h+"$(?!\\s)",g)),s&&(t=u.lastIndex),o=i.call(p?r:u,m),p?o?(o.input=o.input.slice(f),o[0]=o[0].slice(f),o.index=u.lastIndex,u.lastIndex+=o[0].length):u.lastIndex=0:s&&o&&(u.lastIndex=u.global?o.index+o[0].length:t),d&&o&&o.length>1&&a.call(o[0],r,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(o[l]=void 0)})),o}),e.exports=l},"9f7f":function(e,t,r){"use strict";var n=r("d039");function o(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=n((function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,r){"use strict";var n=r("23e7"),o=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},bfa7:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.fromorder}},[r("el-form-item",{attrs:{label:"订单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.OrderNo,callback:function(t){e.$set(e.fromorder,"OrderNo",t)},expression:"fromorder.OrderNo"}})],1),r("el-form-item",{attrs:{label:"购买单号"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.xdorderno,callback:function(t){e.$set(e.fromorder,"xdorderno",t)},expression:"fromorder.xdorderno"}})],1),r("el-form-item",{attrs:{label:"订单类别"}},[r("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.orderType,callback:function(t){e.$set(e.fromorder,"orderType",t)},expression:"fromorder.orderType"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),r("el-option",{attrs:{label:"免评单",value:"0"}}),r("el-option",{attrs:{label:"留评单",value:"1"}})],1)],1),r("el-form-item",{attrs:{label:"去向中介"}},[r("el-select",{attrs:{placeholder:""},on:{focus:e.getAgent},model:{value:e.fromorder.agent,callback:function(t){e.$set(e.fromorder,"agent",t)},expression:"fromorder.agent"}},[r("el-option",{attrs:{label:"全部",value:"-1"}}),e._l(e.agentdata,(function(e){return r("el-option",{key:e.rid,attrs:{label:e.name,value:e.rid}})}))],2)],1),r("el-form-item",{attrs:{label:"去向个人"}},[r("el-input",{attrs:{placeholder:""},model:{value:e.fromorder.txtbuyer,callback:function(t){e.$set(e.fromorder,"txtbuyer",t)},expression:"fromorder.txtbuyer"}})],1),r("el-form-item",{attrs:{label:"接单时间"}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date1"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.fromorder.date1,callback:function(t){e.$set(e.fromorder,"date1",t)},expression:"fromorder.date1"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date2"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.fromorder.date2,callback:function(t){e.$set(e.fromorder,"date2",t)},expression:"fromorder.date2"}})],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),r("div",[r("el-button",{attrs:{type:"primary"},on:{click:e.upload}},[e._v("批量导入评价")])],1),r("div",{staticClass:"tableMag"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[r("el-table-column",{attrs:{prop:"orderno",label:"订单号","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("copyorderno",{attrs:{orderno:e.row.orderno}})]}}])}),r("el-table-column",{attrs:{prop:"rid",label:"RID","min-width":"3%"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("p",[e._v("is"+e._s(t.row.rid))])]}}])}),r("el-table-column",{attrs:{prop:"pimg",label:"图片","min-width":"3%"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("a",{attrs:{href:e.row.ProductUrl,target:"_blank"}},[r("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover",content:e.row.ProductTitle}},[r("img",{staticStyle:{width:"50px"},attrs:{slot:"reference",src:e.row.ProductImgUrl},slot:"reference"})])],1)]}}])}),r("el-table-column",{attrs:{prop:"price",label:"客单价","min-width":"4%"}}),r("el-table-column",{attrs:{prop:"mjusername",label:"放单人员","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"ztstr",label:"订单状态","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.ztstr))]),""!=t.row.fkimgurl?r("i",{staticClass:"el-icon-picture-outline fkIMG",on:{click:function(r){return e.showReviewImg(t.row.fkimgurl)}}}):e._e()]}}])}),r("el-table-column",{attrs:{prop:"ordertypestr",label:"订单类别","min-width":"6%"},scopedSlots:e._u([{key:"default",fn:function(t){return[""!=t.row.lpimgurl||""!=t.row.lpurl?[""!=t.row.lpimgurl||""==t.row.lpurl?r("p",[e._v(e._s(t.row.ordertypestr)+" "),r("i",{staticClass:"i-pointer el-icon-picture",on:{click:function(r){return e.showReviewImg(t.row.lpimgurl)}}})]):""==t.row.lpimgurl||""!=t.row.lpurl?r("p",[e._v(e._s(t.row.ordertypestr)+" "),r("i",{staticClass:"i-pointer el-icon-link",on:{click:function(r){return e.openReviewLink(t.row.lpurl)}}})]):r("p",[e._v(e._s(t.row.ordertypestr)+" "),r("i",{staticClass:"i-pointer el-icon-picture",on:{click:function(r){return e.showReviewImg(t.row.lpimgurl)}}}),r("i",{staticClass:"i-pointer el-icon-link",on:{click:function(r){return e.openReviewLink(t.row.lpurl)}}})])]:[r("p",[e._v(e._s(t.row.ordertypestr))])]]}}])}),r("el-table-column",{attrs:{prop:"zjname",label:"去向（中介或个人）","min-width":"5%"}}),r("el-table-column",{attrs:{prop:"jddate",label:"接单时间","min-width":"8%"}}),r("el-table-column",{attrs:{prop:"xdOrderno",label:"购买单号","min-width":"5%"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"10%"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"==t.row.zt?r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.review(t.row.orderno,"1",t.row.realprice)}}},[e._v("接单")]):e._e(),"2"==t.row.zt||"5"==t.row.zt?[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.cancelOrder(r,t.row,t.$index)}}},[e._v("取消接单")]),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.uploadorderno(t.row.orderno)}}},[e._v("提交测评信息")]),""!=t.row.mmjzjid&&"0"!=t.row.mmjzjid?[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.review(t.row.orderno,"0",t.row.realprice)}}},[e._v("取消中介绑定")])]:[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.bindUser(t.row.orderno)}}},[e._v("绑定个人刷手")]),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.bindAgent(t.row.orderno)}}},[e._v("绑定中介")])]]:e._e(),t.row.zt>="4"&&"5"!=t.row.zt?[""==t.row.lpurl&&""==t.row.lpimgurl?r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.reviewUrl(t.row.orderno)}}},[e._v("上传留评链接")]):r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.reviewUrl(t.row.orderno)}}},[e._v("修改留评链接")])]:e._e(),"9"==t.row.zt?r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.chargeback(t.row.orderno)}}},[e._v("退单")]):e._e(),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.handleLogClick(t.row)}}},[e._v("查看详情")])]}}])})],1)],1),r("Pagination",{staticClass:"pagination",attrs:{pagination:e.pagination},on:{search:e.search}}),r("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.Visible,width:e.dialog.width},on:{"update:visible":function(t){return e.$set(e.dialog,"Visible",t)}}},[r(e.dialog.dialogComponent,{tag:"component",attrs:{orderno:e.orderno,agentList:e.agentdata},on:{dialogToggle:e.dialogToggle}})],1),r(e.log,{tag:"component",attrs:{logorderno:e.logorderno,logshow:e.logshow},on:{handleLogClick:e.handleLogClick}})],1)},o=[],i=(r("a434"),r("d3b7"),r("ac1f"),r("841c"),r("333d")),a=r("0038"),l={name:"ReviewOrder",components:{Pagination:i["a"],copyorderno:a["a"]},data:function(){return{fromorder:{OrderNo:"",xdorderno:"",orderType:"-1",agent:"-1",txtbuyer:"",date1:"",date2:""},pagination:{total:0,size:20,current:1},dialog:{title:"",Visible:!1,width:"",dialogComponent:null},tableData:[],log:null,logorderno:"",logshow:!1,loading:!0,agentdata:[],agentcom:null,uploadOrdercom:null,reviewUrlcom:null,uploadFilecom:null,chargebackcom:null,DifferencePricesToggle:!1,DifferencePricesLoad:null,dialogVisible:!1,orderno:""}},mounted:function(){this.search()},methods:{search:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=t.length&&("current"==t[0]?this.pagination.current=t[1]:"size"==t[0]&&(this.pagination.size=t[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPOrderDetailList",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,orderno:this.fromorder.OrderNo,xdorderno:this.fromorder.xdorderno,zjID:this.fromorder.agent,iflp:this.fromorder.orderType,sjs:this.fromorder.date1,sje:this.fromorder.date2,buyer:this.fromorder.txtbuyer,state:"2,3,4,5,8,9,12,13"}}).then((function(t){e.pagination.total=t.data.results,e.tableData=t.data.rows,e.loading=!1})).catch((function(e){}))},dialogToggle:function(){this.dialog.title="",this.dialog.Visible=!1,this.dialog.width="",this.orderno=this.orderno.constructor===Object?JSON.stringify(this.orderno=[]):"",this.search()},bindUser:function(e){var t=this;this.$prompt("绑定个人刷手","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(r){var n=r.value;t.axios.get("/Handler/CPManageSystem.ashx?cmd=setCPOrderDetailSDUserName&orderno="+e+"&sdusername="+n).then((function(e){e.data.rescode>0?(t.$message({type:"success",message:e.data.resdesc}),t.search()):t.$message({type:"warning",message:e.data.resdesc})})).catch((function(e){}))})).catch((function(){}))},getAgent:function(){var e=this;0==this.agentdata.length&&this.axios.get("/Handler/CPManageSystem.ashx?cmd=getCPAgentList").then((function(t){""!=t.data&&(e.agentdata=t.data.rows)})).catch((function(e){}))},bindAgent:function(e){this.getAgent(),this.dialog.title="绑定中介",this.dialog.Visible=!0,this.dialog.width="300px",null==this.agentcom&&(this.agentcom=function(){return r.e("chunk-2d238049").then(r.bind(null,"fe1e"))}),this.dialog.dialogComponent=this.agentcom},uploadorderno:function(e){this.orderno=e,this.dialog.title="上传测评订单",this.dialog.Visible=!0,this.dialog.width="500px",null==this.uploadOrdercom&&(this.uploadOrdercom=function(){return r.e("chunk-3a3ea127").then(r.bind(null,"1035"))}),this.dialog.dialogComponent=this.uploadOrdercom},reviewUrl:function(e){this.orderno=e,this.dialog.title="上传留评链接",this.dialog.Visible=!0,this.dialog.width="500px",null==this.reviewUrlcom&&(this.reviewUrlcom=function(){return r.e("chunk-1b483dd4").then(r.bind(null,"8f1e"))}),this.dialog.dialogComponent=this.reviewUrlcom},handleLogClick:function(e){this.logshow?this.logshow=!1:(this.logorderno=e.orderno,this.logshow=!0,null==this.log&&(this.log=function(){return r.e("chunk-c59ed1d4").then(r.bind(null,"9621"))}))},cancelOrder:function(e,t,r){var n=this;this.axios.get("/Handler/CPManageSystem.ashx?cmd=cancelJDCPOrderDetail&orderno="+t.orderno).then((function(e){e.data.rescode>0?(n.$message({type:"success",message:"取消成功!"}),n.tableData.splice(r,1)):n.$message({type:"warning",message:"取消失败!"})})).catch((function(e){n.$message({type:"warning",message:"取消失败!"})}))},showReviewImg:function(e){this.$alert("<img src="+e+">","",{dangerouslyUseHTMLString:!0}).then((function(){})).catch((function(){}))},openReviewLink:function(e){window.open(e)},upload:function(){this.dialog.title="批量导入订单留评",this.dialog.Visible=!0,this.dialog.width="500px",null==this.uploadFilecom&&(this.uploadFilecom=function(){return r.e("chunk-4b99f842").then(r.bind(null,"b418"))}),this.dialog.dialogComponent=this.uploadFilecom,this.orderno="review"},chargeback:function(e){this.dialog.title="退单",this.dialog.Visible=!0,this.dialog.width="500px",null==this.chargebackcom&&(this.chargebackcom=function(){return r.e("chunk-6f339608").then(r.bind(null,"b694"))}),this.dialog.dialogComponent=this.chargebackcom,this.orderno=e}}},s=l,c=(r("ecd1"),r("2877")),d=Object(c["a"])(s,n,o,!1,null,"8ffc04d8",null);t["default"]=d.exports},d784:function(e,t,r){"use strict";r("ac1f");var n=r("6eeb"),o=r("d039"),i=r("b622"),a=r("9263"),l=r("9112"),s=i("species"),c=!o((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),u=i("replace"),p=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),g=!o((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,u){var h=i(e),f=!o((function(){var t={};return t[h]=function(){return 7},7!=""[e](t)})),m=f&&!o((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[s]=function(){return r},r.flags="",r[h]=/./[h]),r.exec=function(){return t=!0,null},r[h](""),!t}));if(!f||!m||"replace"===e&&(!c||!d||p)||"split"===e&&!g){var b=/./[h],v=r(h,""[e],(function(e,t,r,n,o){return t.exec===a?f&&!o?{done:!0,value:b.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),w=v[0],x=v[1];n(String.prototype,e,w),n(RegExp.prototype,h,2==t?function(e,t){return x.call(e,this,t)}:function(e){return x.call(e,this)})}u&&l(RegExp.prototype[h],"sham",!0)}},ecd1:function(e,t,r){"use strict";var n=r("fa5e"),o=r.n(n);o.a},fa5e:function(e,t,r){}}]);