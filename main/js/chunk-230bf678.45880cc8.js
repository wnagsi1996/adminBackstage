(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-230bf678"],{"125f":function(e,t,a){"use strict";a.r(t);var n,i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bodybj"},[0!=e.reviewNum?a("div",{staticClass:"prompt public-statue"},[a("p",[e._v("您有"+e._s(e.reviewNum)+"单待催评"),a("a",{on:{click:e.pushOpen}},[e._v("前往")])])]):e._e(),a("el-row",[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"one-today public-statue"},[a("div",{staticClass:"today-title"},[a("h5",[e._v("本月数据")])]),a("div",{staticClass:"today-desc"},[e.todayData.length>0?a("OrderModule",{attrs:{orderdata:e.todayData}}):e._e()],1)])]),a("el-col",{attrs:{span:16}},[a("el-row",e._l(e.module,(function(t,n){return a("el-col",{key:n,attrs:{span:6}},[a("div",{staticClass:"public-statue month-finance",on:{click:function(a){return e.pushlink(t)}}},[a("h5",[e._v(e._s(t.title))]),a("p",[e._v(e._s(t.money))]),t.txt?a("span",[e._v(e._s(t.txt))]):e._e()])])})),1)],1)],1),a("div",{staticClass:"month-line public-statue"},[Object.keys(e.monthLineData).length>0?a("ve-line",{staticClass:"line",attrs:{data:e.monthLineData}}):e._e()],1),a("el-dialog",{attrs:{title:"提醒",visible:e.dialogVisible,width:"300px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",[e._v("您有"+e._s(e.reviewNum)+"订单需要催评")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.pushOpen}},[e._v("查看")])],1)])],1)},o=[],r=(a("99af"),a("4160"),a("fb6a"),a("b0c0"),a("159b"),a("ade3")),s=a("dfc1"),c=a("ba1a"),m=a.n(c),u=a("2b27"),p=a.n(u),d={name:"Home",components:(n={},Object(r["a"])(n,m.a.name,m.a),Object(r["a"])(n,"OrderModule",s["a"]),n),data:function(){return{todayData:[],monthLineData:{},module:[],dialogVisible:!1,reviewNum:0}},mounted:function(){this.getdata(),this.getdata1(),this.getReviewOrder()},methods:{getdata:function(){var e=this;this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMMJTotalData").then((function(t){var a=t.data;e.module=[{title:"待测评订单",money:a.waitcplpnum+a.waitcpmpnum,path:"/evaluationorder",txt:"免:".concat(a.waitcpmpnum," 留：").concat(a.waitcplpnum),name:"待测评订单",param:"1"},{title:"待审核订单",money:a.waitmjshnum,path:"/orderreview",name:"待审核订单",param:"1"},{title:"待返款订单",money:a.waitfknum,path:"/rebateorder",name:"待返款订单",param:"1"},{title:"价格异常",money:a.priceycnum,path:"/rebateorder",name:"待返款订单",param:"1"},Object(r["a"])({title:"订单审核驳回",money:a.bhmjshnum,param:"0",path:"/evaluationorder",name:"待测评订单"},"param","1"),{title:"损失金额",money:a.outmoney,param:"0"},{title:"等待财务处理",money:a.waitcwshnum,path:"/financialaudittrail",name:"财务处理进度查询",param:"1"},{title:"财务审核驳回",money:a.backcwshnum,path:"/financialaudittrail",name:"财务处理进度查询",param:"1"}]})).catch((function(e){}))},getdata1:function(){var e=this;this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMMJCurMonthCPOrderDetailNums_CurUser").then((function(t){var a,n,i,o,r=0,s=0,c=0,m=0,u=["日期","刷单","退单"],p=[];""!=t.data&&(t.data.monthViews.forEach((function(e){r+=e.mpnum,s+=e.lpnum,c+=e.cmpnum,m+=e.clpnum,1==e.ifcurday&&(a=e.mpnum,n=e.lpnum,i=e.cmpnum,o=e.clpnum);var t=e.day.slice(5);p.push({"日期":t,"刷单":e.mpnum+e.lpnum,"退单":e.cmpnum+e.clpnum})})),e.todayData=[{title:"今日刷单",lpnum:n,mpnum:a},{title:"今日退单",lpnum:o,mpnum:i},{title:"本月刷单",lpnum:s,mpnum:r},{title:"本月退单",lpnum:m,mpnum:c}],e.monthLineData.columns=u,e.monthLineData.rows=p)})).catch((function(e){}))},getReviewOrder:function(){var e=this,t=p.a.get("lpnum");this.axios.get("/Handler/CPManageSystem.ashx?cmd=getNotLPOrderNum").then((function(a){1==a.data.rescode&&(e.reviewNum=a.data.resdesc,null==t&&(p.a.set("lpnum",a.data.resdesc),e.dialogVisible=!0))})).catch((function(e){}))},pushlink:function(e){"1"==e.param&&("财务审核驳回"==e.title?this.$router.push({path:e.path,query:{type:"2"}}):"等待财务处理"==e.title?this.$router.push({path:e.path,query:{type:"0"}}):this.$router.push({path:e.path}),this.$store.commit("tagsView/selectMenu",e))},pushOpen:function(){this.dialogVisible=!1;var e={path:"/commentorder",name:"待留评订单",icon:"commentorder"};this.$router.push({path:e.path}),this.$store.commit("tagsView/selectMenu",e)}}},l=d,h=(a("76bc"),a("2877")),f=Object(h["a"])(l,i,o,!1,null,"073e8486",null);t["default"]=f.exports},"2b27":function(e,t,a){(function(){var t={expires:"1d",path:"; path=/",domain:"",secure:"",sameSite:"; SameSite=Lax"},a={install:function(e){e.prototype.$cookies=this,e.$cookies=this},config:function(e,a,n,i,o){t.expires=e||"1d",t.path=a?"; path="+a:"; path=/",t.domain=n?"; domain="+n:"",t.secure=i?"; Secure":"",t.sameSite=o?"; SameSite="+o:"; SameSite=Lax"},get:function(e){var t=decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null;if(t&&"{"===t.substring(0,1)&&"}"===t.substring(t.length-1,t.length))try{t=JSON.parse(t)}catch(a){return t}return t},set:function(e,a,n,i,o,r,s){if(!e)throw new Error("Cookie name is not find in first argument.");if(/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(e))throw new Error('Cookie key name illegality, Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]\t current key name: '+e);a&&a.constructor===Object&&(a=JSON.stringify(a));var c="";if(n=void 0==n?t.expires:n,n&&0!=n)switch(n.constructor){case Number:c=n===1/0||-1===n?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:if(/^(?:\d+(y|m|d|h|min|s))$/i.test(n)){var m=n.replace(/^(\d+)(?:y|m|d|h|min|s)$/i,"$1");switch(n.replace(/^(?:\d+)(y|m|d|h|min|s)$/i,"$1").toLowerCase()){case"m":c="; max-age="+2592e3*+m;break;case"d":c="; max-age="+86400*+m;break;case"h":c="; max-age="+3600*+m;break;case"min":c="; max-age="+60*+m;break;case"s":c="; max-age="+m;break;case"y":c="; max-age="+31104e3*+m;break;default:new Error('unknown exception of "set operation"')}}else c="; expires="+n;break;case Date:c="; expires="+n.toUTCString();break}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(a)+c+(o?"; domain="+o:t.domain)+(i?"; path="+i:t.path)+(void 0==r?t.secure:r?"; Secure":"")+(void 0==s?t.sameSite:s?"; SameSite="+s:""),this},remove:function(e,a,n){return!(!e||!this.isKey(e))&&(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:t.domain)+(a?"; path="+a:t.path)+"; SameSite=Lax",this)},isKey:function(e){return new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){if(!document.cookie)return[];for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),t=0;t<e.length;t++)e[t]=decodeURIComponent(e[t]);return e}};e.exports=a,"undefined"!==typeof window&&(window.$cookies=a)})()},"76bc":function(e,t,a){"use strict";var n=a("b2cd"),i=a.n(n);i.a},8300:function(e,t,a){"use strict";var n=a("bceb"),i=a.n(n);i.a},b2cd:function(e,t,a){},bceb:function(e,t,a){},dfc1:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",e._l(e.neworderdata,(function(t,n){return a("el-col",{key:n,attrs:{span:12}},[a("div",{staticClass:"today-desc-title"},[a("h5",[e._v(e._s(t.title))]),a("p",[e._v(e._s(t.lpnum+t.mpnum))]),a("div",{staticClass:"today-desc-info"},[a("span",[e._v("免："+e._s(t.mpnum))]),a("span",[e._v("留："+e._s(t.lpnum))])])])])})),1)},i=[],o={name:"OrderModule",props:{orderdata:{type:Array,default:new Array}},data:function(){return{neworderdata:[]}},mounted:function(){this.neworderdata=this.orderdata},methods:{},watch:{orderdata:function(e,t){this.neworderdata=e}}},r=o,s=(a("8300"),a("2877")),c=Object(s["a"])(r,n,i,!1,null,"0cd31ae0",null);t["a"]=c.exports}}]);