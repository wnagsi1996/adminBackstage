(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fbdedc2"],{"0b14":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"username"},[n("div",{staticClass:"userdata-left"},[n("div",{staticClass:"userdata-left-a"},e._l(e.newUserList.rows,(function(t,s){return n("a",{key:t.userid,class:t.userid==e.SelerCheck?"check":"",on:{click:function(n){return e.selUser(t.userid)}}},[e._v(e._s(t.username))])})),0),n("el-pagination",{attrs:{background:"",layout:"prev, pager, next","pager-count":5,"page-size":e.pagination.size,"hide-on-single-page":!0,total:e.pagination.total},on:{"current-change":e.hankChang}})],1),n("div",{staticClass:"userdesc-info"},[e.newUserListInfo.length>0&&Object.keys(e.newUserListInfo[0]).length>0?n("div",{staticClass:"userdesc-info-two"},[n("h5",[e._v("今日数据")]),n("div",{staticClass:"userdesc-info-day"},[n("ul",[void 0!=e.newUserListInfo[0].dayjdmpnum?n("li",[n("p",[e._v("接单: "+e._s(e.newUserListInfo[0].dayjdmpnum+e.newUserListInfo[0].dayjdlpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[0].dayjdmpnum)+"/留: "+e._s(e.newUserListInfo[0].dayjdlpnum))])]):e._e(),void 0!=e.newUserListInfo[0].daytdmpnum?n("li",[n("p",[e._v("卖家退单: "+e._s(e.newUserListInfo[0].daytdmpnum+e.newUserListInfo[0].daytdlpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[0].daytdmpnum)+"/留: "+e._s(e.newUserListInfo[0].daytdlpnum))])]):e._e(),void 0!=e.newUserListInfo[0].daysdmpnum?n("li",[n("p",[e._v("刷单: "+e._s(e.newUserListInfo[0].daysdmpnum+e.newUserListInfo[0].daysdmpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[0].daysdmpnum)+"/留: "+e._s(e.newUserListInfo[0].daysdlpnum))])]):e._e(),void 0!=e.newUserListInfo[0].daycdmpnum?n("li",[n("p",[e._v("买家退单: "+e._s(e.newUserListInfo[0].daycdmpnum+e.newUserListInfo[0].daycdmpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[0].daycdmpnum)+"/留: "+e._s(e.newUserListInfo[0].daycdlpnum))])]):e._e()])])]):e._e(),e.newUserListInfo.length>0?n("div",{staticClass:"userdesc-info-two"},[n("h5",[e._v("本月数据")]),n("div",{staticClass:"userdesc-info-day"},[n("ul",[void 0!=e.newUserListInfo[1].monthjdmpnum?n("li",[n("p",[e._v("接单: "+e._s(e.newUserListInfo[1].monthjdmpnum+e.newUserListInfo[1].monthjdlpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[1].monthjdmpnum)+"/留: "+e._s(e.newUserListInfo[1].monthjdlpnum))])]):e._e(),void 0!=e.newUserListInfo[1].monthtdmpnum?n("li",[n("p",[e._v("卖家退单: "+e._s(e.newUserListInfo[1].monthtdmpnum+e.newUserListInfo[1].monthtdlpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[1].monthtdmpnum)+"/留: "+e._s(e.newUserListInfo[1].monthtdlpnum))])]):e._e(),void 0!=e.newUserListInfo[1].monthsdmpnum?n("li",[n("p",[e._v("刷单: "+e._s(e.newUserListInfo[1].monthsdmpnum+e.newUserListInfo[1].monthsdlpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[1].monthsdmpnum)+"/留: "+e._s(e.newUserListInfo[1].monthsdlpnum))])]):e._e(),void 0!=e.newUserListInfo[1].monthcdmpnum?n("li",[n("p",[e._v("买家退单: "+e._s(e.newUserListInfo[1].monthcdmpnum+e.newUserListInfo[1].monthcdmpnum))]),n("span",[e._v("免: "+e._s(e.newUserListInfo[1].monthcdmpnum)+"/留: "+e._s(e.newUserListInfo[1].monthcdlpnum))])]):e._e()])])]):e._e()]),n("div",{staticClass:"userdata-content"},[n("ve-line",{staticClass:"line",attrs:{data:e.newUserListInfo[2]}})],1)])},a=[],r=(n("b0c0"),n("b64b"),n("ade3")),_=n("ba1a"),o=n.n(_),i={name:"UserMonthInfo",components:Object(r["a"])({},o.a.name,o.a),props:{userList:{type:Object,default:new Object},userListInfo:{type:Array,default:new Array},pagination:{type:Object,default:new Object}},data:function(){return{newUserList:{},newUserListInfo:[],SelerCheck:0}},mounted:function(){this.newUserList=this.userList,this.newUserListInfo=this.userListInfo,this.getCheck()},methods:{getCheck:function(){Object.keys(this.newUserList).length>0&&(this.SelerCheck=this.newUserList.rows[0].userid,this.pagination.total=this.newUserList.results)},selUser:function(e){this.SelerCheck=e,this.$emit("getSelerinfodata",e)},hankChang:function(e){this.pagination.index=e-1,this.$emit("getSelerUser",this.pagination)}},watch:{userList:function(e,t){this.newUserList=e,this.getCheck()},userListInfo:function(e,t){this.newUserListInfo=e}}},u=i,m=(n("23aa"),n("2877")),d=Object(m["a"])(u,s,a,!1,null,"79fafc88",null);t["a"]=d.exports},1148:function(e,t,n){"use strict";var s=n("a691"),a=n("1d80");e.exports="".repeat||function(e){var t=String(a(this)),n="",r=s(e);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(t+=t))1&r&&(n+=t);return n}},"23aa":function(e,t,n){"use strict";var s=n("86f1"),a=n.n(s);a.a},"408a":function(e,t,n){var s=n("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=s(e))throw TypeError("Incorrect invocation");return+e}},"4df1":function(e,t,n){},8300:function(e,t,n){"use strict";var s=n("bceb"),a=n.n(s);a.a},"86f1":function(e,t,n){},b0d7:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bodybj"},[n("div",{staticClass:"sel-month"},[n("div",{staticClass:"sel-month-info"},[e._v("月份汇总数据查询：当前月份:"+e._s(e.month))]),n("div",{staticClass:"sel-month-inp"},[n("el-date-picker",{attrs:{type:"month",placeholder:"选择月","value-format":"yyyy-MM"},model:{value:e.month,callback:function(t){e.month=t},expression:"month"}}),n("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)]),n("el-row",[n("el-col",{attrs:{span:8}},[n("div",{staticClass:"one-today public-statue"},[n("div",{staticClass:"today-title"},[n("h5",[e._v("当月数据")])]),n("div",{staticClass:"today-desc"},[e.summaryOrderData.length>0?n("OrderModule",{attrs:{orderdata:e.summaryOrderData}}):e._e()],1)])]),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"one-today public-statue"},[n("div",{staticClass:"today-title"},[n("h5",[e._v("进度条")])]),n("div",{staticClass:"today-desc"},[0!=e.summarytotalData.length?n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("div",{staticClass:"today-desc-total"},[n("h4",[e._v("卖家端")]),n("p",[e._v("本月目标："+e._s(e.summarytotalData[1].aims)+"，接单："+e._s(e.summarytotalData[1].jdnum)+"，退单:"+e._s(e.summarytotalData[1].tdnum)+"，实际完成:"+e._s(e.summarytotalData[1].jdnum-e.summarytotalData[1].tdnum))]),n("el-progress",{staticClass:"progress",attrs:{type:"circle",color:e._f("progressbarColor")(e.summarytotalData[1].SelerPercentage),percentage:e.summarytotalData[1].SelerPercentage>100?100:Number(e.summarytotalData[1].SelerPercentage)}})],1)]),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"today-desc-total"},[n("h4",[e._v("买家端")]),n("p",[e._v("本月目标："+e._s(e.summarytotalData[0].aims)+"，刷单："+e._s(e.summarytotalData[0].sdnum)+"，退单:"+e._s(e.summarytotalData[0].cdnum)+"，实际完成:"+e._s(e.summarytotalData[0].sdnum-e.summarytotalData[0].cdnum))]),n("el-progress",{staticClass:"progress",attrs:{type:"circle",color:e._f("progressbarColor")(e.summarytotalData[0].BuyerPercentage),percentage:e.summarytotalData[0].BuyerPercentage>100?100:Number(e.summarytotalData[0].BuyerPercentage)}})],1)])],1):e._e()],1)])])],1),n("div",{staticClass:"month-line public-statue"},[Object.keys(e.monthLineData).length>0?n("ve-line",{staticClass:"line",attrs:{data:e.monthLineData}}):e._e()],1),n("div",{staticClass:"public-statue userdesc-data"},[e._m(0),n("UserMonthInfo",{attrs:{userList:e.selerUserList,userListInfo:e.seleUserListInfo,pagination:e.pagination},on:{getSelerinfodata:e.getSelerinfodata,getSelerUser:e.getSelerUser}})],1),n("div",{staticClass:"public-statue userdesc-data"},[e._m(1),n("UserMonthInfo",{attrs:{userList:e.buyerUserList,userListInfo:e.buyerUserListInfo,pagination:e.buyerpagination},on:{getSelerinfodata:e.getBuyerinfodata,getSelerUser:e.getBuyerUser}})],1)],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"today-title"},[n("h5",[e._v("卖家端成员数据详情")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"today-title"},[n("h5",[e._v("买家端成员数据详情")])])}],r=n("f907"),_=r["a"],o=(n("f07b"),n("2877")),i=Object(o["a"])(_,s,a,!1,null,"7e59183a",null);t["default"]=i.exports},b680:function(e,t,n){"use strict";var s=n("23e7"),a=n("a691"),r=n("408a"),_=n("1148"),o=n("d039"),i=1..toFixed,u=Math.floor,m=function(e,t,n){return 0===t?n:t%2===1?m(e,t-1,n*e):m(e*e,t/2,n)},d=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},l=i&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){i.call({})}));s({target:"Number",proto:!0,forced:l},{toFixed:function(e){var t,n,s,o,i=r(this),l=a(e),c=[0,0,0,0,0,0],p="",h="0",f=function(e,t){var n=-1,s=t;while(++n<6)s+=e*c[n],c[n]=s%1e7,s=u(s/1e7)},y=function(e){var t=6,n=0;while(--t>=0)n+=c[t],c[t]=u(n/e),n=n%e*1e7},w=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==c[e]){var n=String(c[e]);t=""===t?n:t+_.call("0",7-n.length)+n}return t};if(l<0||l>20)throw RangeError("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return String(i);if(i<0&&(p="-",i=-i),i>1e-21)if(t=d(i*m(2,69,1))-69,n=t<0?i*m(2,-t,1):i/m(2,t,1),n*=4503599627370496,t=52-t,t>0){f(0,n),s=l;while(s>=7)f(1e7,0),s-=7;f(m(10,s,1),0),s=t-1;while(s>=23)y(1<<23),s-=23;y(1<<s),f(1,1),y(2),h=w()}else f(0,n),f(1<<-t,0),h=w()+_.call("0",l);return l>0?(o=h.length,h=p+(o<=l?"0."+_.call("0",l-o)+h:h.slice(0,o-l)+"."+h.slice(o-l))):h=p+h,h}})},bceb:function(e,t,n){},dfc1:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-row",e._l(e.neworderdata,(function(t,s){return n("el-col",{key:s,attrs:{span:12}},[n("div",{staticClass:"today-desc-title"},[n("h5",[e._v(e._s(t.title))]),n("p",[e._v(e._s(t.lpnum+t.mpnum))]),n("div",{staticClass:"today-desc-info"},[n("span",[e._v("免："+e._s(t.mpnum))]),n("span",[e._v("留："+e._s(t.lpnum))])])])])})),1)},a=[],r={name:"OrderModule",props:{orderdata:{type:Array,default:new Array}},data:function(){return{neworderdata:[]}},mounted:function(){this.neworderdata=this.orderdata},methods:{},watch:{orderdata:function(e,t){this.neworderdata=e}}},_=r,o=(n("8300"),n("2877")),i=Object(o["a"])(_,s,a,!1,null,"0cd31ae0",null);t["a"]=i.exports},f07b:function(e,t,n){"use strict";var s=n("4df1"),a=n.n(s);a.a},f907:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("4160"),core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("fb6a"),core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("b0c0"),core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("b680"),core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("159b"),core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__),G_damaila_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("ade3"),_components_AdminHome_UserMonthInfo_vue__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("0b14"),_components_AdminHome_OrderModule_vue__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("dfc1"),v_charts_lib_line__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("ba1a"),v_charts_lib_line__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(v_charts_lib_line__WEBPACK_IMPORTED_MODULE_8__),_components;__webpack_exports__["a"]={name:"MonthSummary",components:(_components={},Object(G_damaila_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["a"])(_components,v_charts_lib_line__WEBPACK_IMPORTED_MODULE_8___default.a.name,v_charts_lib_line__WEBPACK_IMPORTED_MODULE_8___default.a),Object(G_damaila_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["a"])(_components,"OrderModule",_components_AdminHome_OrderModule_vue__WEBPACK_IMPORTED_MODULE_7__["a"]),Object(G_damaila_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["a"])(_components,"UserMonthInfo",_components_AdminHome_UserMonthInfo_vue__WEBPACK_IMPORTED_MODULE_6__["a"]),_components),data:function(){return{month:"",summaryOrderData:[],summarytotalData:[],monthLineData:{},totalDataInfo:{},selerInfo:[],buyerInfo:[],selerAllUserInfo:{},selerUserList:{},seleUserListInfo:[],pagination:{index:0,size:12,total:0},buyerpagination:{index:0,size:12,total:0},buyerAllUserInfo:{},buyerUserList:{},buyerUserListInfo:[]}},mounted:function mounted(){var nowDate=new Date,nowMonth=nowDate.getMonth(),nowYear=nowDate.getFullYear();"0"==nowMonth&&(nowYear=eval(nowYear)-1,nowMonth=12),nowMonth=nowMonth<9?"0"+nowMonth:nowMonth,this.month=nowYear+"-"+nowMonth,this.getdata(),this.getSelerUser(),this.getBuyerUser()},methods:{getdata:function(){var e=this;this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMonthCPOrderDetailNums&month="+this.month).then((function(t){var n=t.data.sellerPlantNum,s=t.data.buyerPlantNum,a=0,r=0,_=0,o=0,i=0,u=0,m=0,d=0,l=["日期","接单","卖家退单","刷单","买家退单"],c=[];""!=t.data&&(t.data.monthViews.forEach((function(e){a+=e.jdmpnum,r+=e.jdlpnum,_+=e.sdmpnum,o+=e.sdlpnum,i+=e.tdmpnum,u+=e.tdlpnum,m+=e.cdmpnum,d+=e.cdlpnum;var t=e.day.slice(5);c.push({"日期":t,"接单":e.jdmpnum+e.jdlpnum,"卖家退单":e.tdmpnum+e.tdlpnum,"刷单":e.sdmpnum+e.sdlpnum,"买家退单":e.cdmpnum+e.cdlpnum})})),e.summaryOrderData=[{title:"本月接单",lpnum:r,mpnum:a},{title:"本月商家退单",lpnum:u,mpnum:i},{title:"本月刷单",lpnum:o,mpnum:_},{title:"本月买家退单",lpnum:d,mpnum:m}],e.monthLineData={},e.monthLineData.columns=l,e.monthLineData.rows=c,e.summarytotalData=[],e.summarytotalData.push({aims:n,sdnum:o+_,cdnum:d+m,BuyerPercentage:((o+_-(d+m))/n*100).toFixed(2)},{aims:s,jdnum:r+a,tdnum:u+i,SelerPercentage:((r+a-(u+i))/n*100).toFixed(2)}))})).catch((function(e){}))},getSelerUser:function(e){var t=this;e&&(this.pagination.index=e.index,this.pagination.size=e.size),this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMJUserList&pageindex="+this.pagination.index+"&len="+this.pagination.size).then((function(e){if(""!=e.data){t.selerUserList=e.data;var n=e.data.rows[0].userid;t.getSelerinfodata(n)}})).catch((function(e){}))},getSelerinfodata:function(e){var t=this;void 0!=this.selerAllUserInfo[e]?this.selerUserInfoData(this.selerAllUserInfo[e]):this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMJMonthCPOrderDetailNums&userid="+e+"&month="+this.month).then((function(n){""!=n.data&&(t.selerAllUserInfo[e]=n.data.monthViews,t.selerUserInfoData(n.data.monthViews))})).catch((function(e){}))},selerUserInfoData:function(e){var t,n,s,a,r,_=0,o=0,i=0,u=0,m=0,d=0,l=0,c=0,p={},h={},f={columns:["日期","接单","卖家退单","刷单","买家退单"],rows:[]};e.forEach((function(e){t=e.jdlpnum+e.jdmpnum,n=e.tdlpnum+e.tdmpnum,s=e.tdsdlpnum+e.tdsdmpnum,a=e.tdcdlpnum+e.tdcdmpnum,r=e.day.slice(5),f.rows.push({"日期":r,"接单":t,"卖家退单":n,"刷单":s,"买家退单":a}),1==e.ifcurday&&(p.dayjdlpnum=e.jdlpnum,p.dayjdmpnum=e.jdmpnum,p.daytdlpnum=e.tdlpnum,p.daytdmpnum=e.tdmpnum,p.daysdlpnum=e.tdsdlpnum,p.daysdmpnum=e.tdsdmpnum,p.daycdlpnum=e.tdcdlpnum,p.daycdmpnum=e.tdcdmpnum),_+=e.jdlpnum,o+=e.jdmpnum,i+=e.tdlpnum,u+=e.tdmpnum,m+=e.tdsdlpnum,d+=e.tdsdmpnum,l+=e.tdcdlpnum,c+=e.tdcdmpnum})),h.monthjdlpnum=_,h.monthjdmpnum=o,h.monthtdlpnum=i,h.monthtdmpnum=u,h.monthsdlpnum=m,h.monthsdmpnum=d,h.monthcdlpnum=l,h.monthcdmpnum=c,this.seleUserListInfo=[],this.seleUserListInfo.push(p),this.seleUserListInfo.push(h),this.seleUserListInfo.push(f)},getBuyerUser:function(e){var t=this;e&&(this.buyerpagination.index=e.index,this.buyerpagination.size=e.size),this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMMJUserList&pageindex="+this.buyerpagination.index+"&len="+this.buyerpagination.size).then((function(e){if(""!=e.data){t.buyerUserList=e.data;var n=e.data.rows[0].userid;t.getBuyerinfodata(n)}})).catch((function(e){}))},getBuyerinfodata:function(e){var t=this;void 0!=this.buyerAllUserInfo[e]?this.buyerUserInfoData(this.buyerAllUserInfo[e]):this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMMJMonthCPOrderDetailNums&userid="+e+"&month="+this.month).then((function(n){""!=n.data&&(t.buyerAllUserInfo[e]=n.data.monthViews,t.buyerUserInfoData(n.data.monthViews))})).catch((function(e){}))},buyerUserInfoData:function(e){var t,n,s,a=0,r=0,_=0,o=0,i={},u={},m={columns:["日期","刷单","退单"],rows:[]};e.forEach((function(e){t=e.lpnum+e.mpnum,n=e.clpnum+e.cmpnum,s=e.day.slice(5),m.rows.push({"日期":s,"刷单":t,"退单":n}),1==e.ifcurday&&(i.daysdlpnum=e.lpnum,i.daysdmpnum=e.mpnum,i.daycdlpnum=e.clpnum,i.daycdmpnum=e.cmpnum),a+=e.lpnum,r+=e.mpnum,_+=e.clpnum,o+=e.cmpnum})),u.monthsdlpnum=a,u.monthsdmpnum=r,u.monthcdlpnum=_,u.monthcdmpnum=o,this.buyerUserListInfo=[],this.buyerUserListInfo.push(i),this.buyerUserListInfo.push(u),this.buyerUserListInfo.push(m)},search:function(){this.getdata(),this.getSelerUser(),this.getBuyerUser()}}}}}]);